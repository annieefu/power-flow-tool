import pandas as pd
import pandapower as pp
import pandapower.networks
import pandapower.topology
import pandapower.plotting
import pandapower.converter
import pandapower.estimation
import numpy as np
import json
from flask import Flask, render_template, request, json, jsonify

#create empty net
net = pp.create_empty_network() 

#create buses
b1 = pp.create_bus(net, vn_kv=275, name="Bus 1")
b2 = pp.create_bus(net, vn_kv=275, name="Bus 2")
#create load elements
pp.create_load(net, bus=b2, p_mw=1000, q_mvar=120, name="Load")
#create generator
pp.create_gen(net, bus=b1, p_mw = 1050, vm_pu = 1.02, slack=True)

#Define standard type library for TL

pandapower.create_std_type(net, {"r_ohm_per_km": 0.042, "x_ohm_per_km": 0.09224,"c_nf_per_km": 0, "max_i_ka": 1.243, 
                                 "r0_ohm_per_km": 0.012075, "x0_ohm_per_km": 0.061175,"c0_nf_per_km": 0.101930, "type": "ol"},
                            name="LineA",element = "line")   

pandapower.create_std_type(net, {"r_ohm_per_km": 0.0595, "x_ohm_per_km": 0.3253,"c_nf_per_km": 0, "max_i_ka": 1.198, 
                                 "r0_ohm_per_km": 0.057375, "x0_ohm_per_km": 0.363625,"c0_nf_per_km": 0.57375 , "type": "ol"},
                           name="LineB",element = "line") 

pandapower.create_std_type(net, {"r_ohm_per_km": 0.0438, "x_ohm_per_km": 0.2994,"c_nf_per_km": 0, "max_i_ka": 0.987, 
                                 "r0_ohm_per_km": 0.04345, "x0_ohm_per_km": 0.2561,"c0_nf_per_km":  0.43556, "type": "ol"},
                           name="LineC",element = "line") 

pandapower.create_std_type(net, {"r_ohm_per_km": 0.0438, "x_ohm_per_km": 0.1424,"c_nf_per_km": 0, "max_i_ka": 0.98754, 
                                 "r0_ohm_per_km": 0.04345, "x0_ohm_per_km": 0.2561,"c0_nf_per_km":  0.43556, "type": "ol"},
                           name="LineD",element = "line") 

#Create Lines
line4 = pp.create_line(net, b1, b2, length_km=60, std_type="LineA",  name="Line 4")
line3 = pp.create_line(net, b1, b2, length_km=60, std_type="LineB",  name="Line 3")
line2 = pp.create_line(net, b1, b2, length_km=60, std_type="LineC",  name="Line 2")
line1 = pp.create_line(net, b1, b2, length_km=60, std_type="LineD",  name="Line 1")
net.line.in_service.at[3]=False

pp.runpp(net) #Executes power flow

#DataFrame to store line parameters and powerflow results  
#If this is created as a function it wont work inside app GET/POST request

Columns = ['LineName', 'p_from_mw','i_ka','loading','Length_km','max_i_ka','r_ohm_per_km','Xfinal_per_km', 'Vinj']
InfoLines = pd.DataFrame([],columns = Columns)

for x in range(len(net.line)):
    InfoLines.loc[x] = x   
    InfoLines.loc[x]['LineName']=net.line.name[x]
    InfoLines.loc[x]['p_from_mw']= round(net.res_line.p_from_mw.at[x],1)
    InfoLines.loc[x]['i_ka']= round(net.res_line.i_ka.at[x],2)
    InfoLines.loc[x]['loading']=round(net.res_line.loading_percent.at[x], 2) 
    InfoLines.loc[x]['Length_km']=net.line.length_km.at[x]
    InfoLines.loc[x]['max_i_ka']=round(net.line.max_i_ka.at[x],3)
    InfoLines.loc[x]['r_ohm_per_km']=round(net.line.r_ohm_per_km.at[x],3)
    InfoLines.loc[x]['Xfinal_per_km']=round(net.line.x_ohm_per_km.at[x], 3)
    InfoLines.loc[x]['Vinj']= 0
InfoLines2 = InfoLines.to_json(orient="index"); InfoLines = json.loads(InfoLines2)


#DataFrame to store SV information 
Columns = ['LineName', 'LineStatus','SV', 'UseSV','Mode']
SVins = pd.DataFrame([],columns = Columns)
for x in range(len(net.line)):
    SVins.loc[x] = x
    SVins.loc[x]['LineName'] = net.line.name[x]    
    SVins.loc[x]['LineStatus'] = 1
    SVins.loc[x]['SV'] = 0
    SVins.loc[x]['UseSV']=0
    SVins.loc[x]['Mode'] = 0
SVinfo2 = SVins.to_json(orient="index"); SVinfo = json.loads(SVinfo2)


# Store initail powerflow results -- This values are with line 1 OFFF. 

Init_Xperkm1=net.line.iloc[:,6].copy()
Init_Ika1=net.res_line.i_ka[:].copy()
Init_P_mw1=net.res_line.p_from_mw[:].copy()

# Store initail powerflow results -- This values are with line 1 ON. 
net.line.in_service.at[3]=True
pp.runpp(net) #Executes power flow
Init_Xperkm2=net.line.iloc[:,6].copy()
Init_Ika2=net.res_line.i_ka[:].copy()
Init_P_mw2=net.res_line.p_from_mw[:].copy()



#Here Starts Flask framework
application = Flask(__name__)

#GET --> Python to Js
#POST --> Js to Python

#The GET request return to Js the Json with the initial Line parameters and SV installed 
@application.route("/", methods=['GET'])
def home():
    print('GET request received')
    return render_template('index.html', InfoLinesFile=json.dumps(InfoLines), SVinfofile=json.dumps(SVinfo))

#The POST request receive the Json with the info of the SV installed, modify the line parameters, run a powerflow  
# and return to Js the updated files with the new line parameters and SV results

@application.route('/', methods = ['POST'])
def postJsonHandler():
    json_data=request.get_json() #Request Json from Js
    sv=pd.DataFrame(json_data)  #Conver the Json to a DataFrame
    print(sv)
    print('POST request received')    
    
    if sv['LineStatus'][3]==1:
        print('Line 1 is ON')
        Init_Xperkm= Init_Xperkm2
        Init_Ika= Init_Ika2
        Init_P_mw= Init_P_mw2

    if sv['LineStatus'][3]==0:
        print('Line 1 is OFF')
        Init_Xperkm= Init_Xperkm1
        Init_Ika= Init_Ika1
        Init_P_mw= Init_P_mw1

    
   

    Sim2 = np.arange(len(sv))
    VinjSV=2.830 #Voltage injected per SmartValve
    NSV_Deployment=0 #counter with the total SV deployments
    NSV_Devices=0 #counter with the total number of SV installed
    TNvinj=[0,0,0,0]

    net.load.p_mw.at[0]= sv['Load'][0]

    #Modify line parameters with the SmartValve installed
    for n in Sim2:
        if sv['LineStatus'][n]==0:
            net.line.in_service.at[n]=False
        else:
            net.line.in_service.at[n]=True
        # Update the line para meters if a new SV was installes and the line is ON or if the SV was removed
        if sv['SV'][n] > 0 and sv['LineStatus'][n]==1:
            NSV_Deployment=NSV_Deployment+1
            NSV_Devices= NSV_Devices + sv['SV'][n]
            TNvinj[n]= sv['SV'][n]*sv['UseSV'][n]*VinjSV
            Xinj=sv['SV'][n]*sv['UseSV'][n]*VinjSV/Init_Ika.at[n]
            Xinj_perkm=Xinj/net.line.length_km.at[n]
            net.line.x_ohm_per_km.at[n]=Init_Xperkm.at[n] + sv['Mode'][n]*Xinj_perkm
        else:
            net.line.x_ohm_per_km.at[n]=Init_Xperkm.at[n]
        


    print(NSV_Devices)   
    pp.runpp(net) #Executes power flow after installed the SmartValves

    Fin_P_mw=net.res_line.p_from_mw[:]    #final power flowing through the lines
    dif_Pmw=(Init_P_mw-Fin_P_mw).to_numpy() #Calculate the dif between the initial and final power through the lines
    absMode=(abs(sv['Mode'])*sv['LineStatus']).to_numpy()
    dif_Pmw=dif_Pmw*absMode #To monitor only the lines with an SmartValve installed
    print('difMW', dif_Pmw)


    Mw_Push=round(dif_Pmw[dif_Pmw>0].sum()) #Sum the power pushed from lines with an SmartValve in Push mode
    Mw_Pull=round(dif_Pmw[dif_Pmw<0].sum()) #Sum the power pulled to lines with an SmartValve in Pull mode
    Vinj_Total= sum(TNvinj)     #Calculates the total voltage injected in the system

    # DataFrame to store the information of the SmartValve's impact on the system 
    SInfo = pd.DataFrame([],columns = ['Mw_Push', 'Mw_Pull', 'Num_SV', 'Total_Vinj', 'Perc_used'])
    SInfo.loc[0] = 0
    SInfo.loc[0]['Mw_Push'] = Mw_Push; SInfo.loc[0]['Mw_Pull'] = Mw_Pull
    SInfo.loc[0]['Num_SV'] = NSV_Deployment; SInfo.loc[0]['Total_Vinj'] = Vinj_Total
    # SInfo.loc[0]['Perc_used'] = 100
    if NSV_Devices > 0:
        SInfo.loc[0]['Perc_used'] = ((Vinj_Total/NSV_Devices)/VinjSV)*100
    else:
        SInfo.loc[0]['Perc_used']=0
    SInfo2 = SInfo.to_json(orient="index"); SInfo = json.loads(SInfo2) #DataFrame-to-Json
    


    #DataFrame to store line parameters and powerflow results 
    Columns = ['LineName', 'p_from_mw','i_ka','loading','Length_km','max_i_ka','r_ohm_per_km','Xfinal_per_km', 'Vinj']
    InfoLines = pd.DataFrame([],columns = Columns)

    for x in range(len(net.line)):
        InfoLines.loc[x] = x   
        InfoLines.loc[x]['LineName']=net.line.name[x]
        InfoLines.loc[x]['p_from_mw']= round(net.res_line.p_from_mw.at[x],1)
        InfoLines.loc[x]['i_ka']= round(net.res_line.i_ka.at[x],2)
        InfoLines.loc[x]['loading']=round(net.res_line.loading_percent.at[x], 2) 
        InfoLines.loc[x]['Length_km']=net.line.length_km.at[x]
        InfoLines.loc[x]['max_i_ka']=round(net.line.max_i_ka.at[x],3)
        InfoLines.loc[x]['r_ohm_per_km']=round(net.line.r_ohm_per_km.at[x],3)
        InfoLines.loc[x]['Xfinal_per_km']=round(net.line.x_ohm_per_km.at[x], 3)
        InfoLines.loc[x]['Vinj']= TNvinj[x]
    InfoLines2 = InfoLines.to_json(orient="index"); InfoLines = json.loads(InfoLines2)

    print(InfoLines)

    TheResult= {'SVResult': SInfo, 'LineResults': InfoLines}
   
    return jsonify(TheResult)