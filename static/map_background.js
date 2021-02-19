

// const map_background_svg = d3.select("#map_background_svg");
// var width;
// var height;
// var data_file;
// var click1 = false;
// var click2 = false;
// var click3 = false;
// var click4 = false;
// var sv3click = false;
// var sv4click = false;
// var menu_vis = 0;
// var line_name;
// var convert_number;
// var scenario = 0;
// var sv_active;
// // var current_line =1;

// var slider4_val = 0;
// var megawatts = 0;


// // TODO: Programatically initialize variables
// // forloop: get the length of the JSON from Flask, create an:
// // 1 array of 0s for quantity of SVs
// // 2 array of -1s for whether they are pushing or pulling
// // 3 array of SmartValve IDs
// var sv_quant_array = [0, 0, 0, 0]; // 0 if off, 1 if on
// var sv_pushpull_array = [-1, -1, -1, -1];
// var sv_id_array = ["line1sv", "line2sv", "line3sv", "line4sv"];


// // LINE VARIABLES
// var line_power_array = [-1, 1, 1, 1] // 0 for off, 1 for on
// var line_name_array = ["Line 1", "Line 2", "Line 3", "Line 4"]

// // color codes
// zero_forty = "#89FF7E";
// fourty_sixty = "#82FA19";
// sixty_eighty = "#FFFA70";
// eighty_hundred = "#FCB573";
// over_hundred = "#FF5C5C";

// const requestData = async function () {
//   // Call the device screensize
//   width = map_background_svg.node().getBoundingClientRect().width;
//   height = map_background_svg.node().getBoundingClientRect().height;
//   // put it in updatechart function
//   console.log(map_background_svg.node().getBoundingClientRect())


//   // POWER FLOW DATA

//   // Map of England

//   const map_uk = await d3.json({{ url_for('static', filename='js/main_scripts.js') }});
//   console.log(map_uk)

//   // UK Map
//   const map = map_background_svg.append("g").on("click", close_menu);
//   const grid_elements = map_background_svg.append("g")
//   var areas = topojson.feature(map_uk, map_uk.objects.eer);
//   var areasMesh = topojson.mesh(map_uk, map_uk.objects.eer);
//   var projection = d3.geoMercator().fitSize([width, height], areas);
//   var path = d3.geoPath().projection(projection);
//   // Fill
//   let the_map = map.selectAll("path.area_fill")
//     .data(areas.features)
//     .join("path")
//     .attr("class", "area_fill")
//     .attr("d", path)
//     .attr("z-index", "0")
//     .attr("fill", "rgb(145, 205, 154)")
//     .attr('transform', 'translate(-80,0)');

//   // Outlines simulating datum + join
//   let map_outline = map.selectAll("path.area_outline")
//     .data([areasMesh])
//     .join("path")
//     .attr("class", "area_outline")
//     .attr("d", path)
//     .attr("z-index", "0")
//     .attr("fill", "none")
//     .attr("stroke", "rgb(240, 255, 237)")
//     .attr("stroke-width", "1.5px")
//     .style("stroke-linejoin", "round")
//     .attr('transform', 'translate(-80,0)');


//   // TODO after MVP: a shortest distance algorithm to pull transmission lines into the right position,
//   // based on the svg coordinate grid.
//   function shortest_distance(x1, y1, x2, y2) {
//   }


//   // TOOLTIP DATA
//   let tooltip_0 = await d3.json("json/InfoLines.json"); // Base Case
//   let tooltip_1 = await d3.json("json/Sc01.json"); // Scenario 1: SV4 pushes
//   let tooltip_2 = await d3.json("json/Sc02.json"); // Scenario 2: SV3 pulls
//   let tooltip_3 = await d3.json("json/Sc03.json"); // Scenario 3: SV3 and 4

//   let tooltip_width = 205;
//   let tooltip_height = 185;

//   // now add the tooltip
//   let tooltip = map_background_svg.append("g")
//     .attr("class", "tooltip")
//     .attr("id", "tooltip_id")
//     .attr("visibility", "hidden")
//     .style("z-index", 99);

//   tooltip.append("rect")
//     .attr("fill", "white")
//     .attr("opacity", 1)
//     .attr("x", 10)
//     .attr("y", 10)
//     .style("z-index", 99)
//     .attr("width", tooltip_width)
//     .attr("height", tooltip_height);


//   tooltip.append("text")
//     .attr("fill", "#EC3115")
//     .attr("font-size", "22px")
//     .text("LINE OVERVIEW")
//     .attr("font-family", "'Poppins', sans-serif")
//     .attr("x", 18)
//     .attr("y", 36);


//   tooltip.append("text")
//     .attr("fill", "black")
//     .attr("font-size", "22px")
//     .attr("font-weight", "600")
//     .text("X")
//     .on("mouseover", function () { return tooltip.style("cursor", "pointer") })
//     .on("click", function () { return tooltip.style("visibility", "hidden") })
//     .attr("font-family", "'Poppins', sans-serif")
//     .attr("x", 193)
//     .attr("y", 36);


//   let line_names_buses = tooltip.append("text")
//     .attr("fill", "#0A0908")
//     .attr("font-family", "'Poppins', sans-serif")
//     .attr("color", "#0A0908")
//     .attr("font-weight", "500")
//     .attr("font-size", "13px")
//     .attr("text-anchor", "left")
//     .attr("alignment-baseline", "hanging")
//     .attr("x", 18)
//     .attr("y", 46);

//   let act_power = tooltip.append("text")
//     .attr("fill", "#0A0908")
//     .attr("font-family", "'Poppins', sans-serif")
//     .attr("font-size", "13px")
//     .attr("font-weight", "300")
//     .attr("text-anchor", "left")
//     .attr("alignment-baseline", "hanging")
//     .attr("x", 18)
//     .attr("y", 66);


//   let current = tooltip.append("text")
//     .attr("fill", "#0A0908")
//     .attr("font-family", "'Poppins', sans-serif")
//     .attr("font-size", "13px")
//     .attr("font-weight", "300")
//     .attr("text-anchor", "left")
//     .attr("alignment-baseline", "hanging")
//     .attr("x", 18)
//     .attr("y", 86);



//   let resistance = tooltip.append("text")
//     .attr("fill", "#0A0908")
//     .attr("font-family", "'Poppins', sans-serif")
//     .attr("font-size", "13px")
//     .attr("font-weight", "300")
//     .attr("text-anchor", "left")
//     .attr("alignment-baseline", "hanging")
//     .attr("x", 18)
//     .attr("y", 106);

//   let final_reactance = tooltip.append("text")
//     .attr("fill", "#0A0908")
//     .attr("font-family", "'Poppins', sans-serif")
//     .attr("font-size", "13px")
//     .attr("font-weight", "600")
//     .attr("text-anchor", "left")
//     .attr("alignment-baseline", "hanging")
//     .attr("x", 18)
//     .attr("y", 126);


//   let length = tooltip.append("text")
//     .attr("fill", "#0A0908")
//     .attr("font-family", "'Poppins', sans-serif")
//     .attr("font-size", "13px")
//     .attr("font-weight", "300")
//     .attr("text-anchor", "left")
//     .attr("alignment-baseline", "hanging")
//     .attr("x", 18)
//     .attr("y", 146);


//   let max_current = tooltip.append("text")
//     .attr("fill", "#0A0908")
//     .attr("font-family", "'Poppins', sans-serif")
//     .attr("font-size", "13px")
//     .attr("font-weight", "300")
//     .attr("text-anchor", "left")
//     .attr("alignment-baseline", "hanging")
//     .attr("x", 18)
//     .attr("y", 166);


//   function show_lineinfo() {
//     three_menu.style("visibility", "hidden");
//     tooltip.style("visibility", "visible").style("z-index", 100);
//   }


//   // CREATE the SmartValve Control Panel


//   let sv_controls_width = 290;
//   let sv_controls_height = 230;

//   // now add the tooltip
//   let sv_controls = map_background_svg.append("g")
//     .attr("class", "sv_controls")
//     .attr("id", "sv_controls_id")
//     .attr("visibility", "hidden")
//     .style("z-index", 99);

//   sv_controls.append("rect")
//     .attr("fill", "white")
//     .attr("opacity", 1)
//     .attr("x", 20)
//     .attr("y", 370)
//     .style("z-index", 99)
//     .attr("width", sv_controls_width)
//     .attr("height", sv_controls_height);


//   sv_controls.append("text")
//     .attr("fill", "#EC3115")
//     .attr("font-size", "22px")
//     .text("SMARTVALVE CONTROLS")
//     .attr("font-family", "'Poppins', sans-serif")
//     .attr("x", 36)
//     .attr("y", 400);

//   let controls_linename = sv_controls.append("text")
//     .attr("fill", "grey")
//     .attr("font-size", "18px")
//     .attr("font-family", "'Poppins', sans-serif")
//     .attr("x", 36)
//     .attr("y", 426);

//   sv_controls.append("rect")
//     .attr("fill", "lightgrey")
//     .attr("x", 128)
//     .attr("y", 456)
//     .attr("width", "60px")
//     .attr("height", "26px")
//     .attr("rx", 12)
//     .attr("ry", 12);

  
//   let pushpull_button = sv_controls.append("circle")
//     .attr("fill", "white")
//     .attr("cx", 143)
//     .attr("cy", 468)
//     .attr("r", 15)
//     .attr("stroke", "grey")
//     .attr("stroke-width", "2px")
//     .on("click", toggle_pushpull);


//   let pull_text = sv_controls.append("text")
//   .attr("fill", "grey")
//   .attr("font-size", "18px")
//   .attr("font-family", "'Poppins', sans-serif")
//   .text("Pull")
//   .attr("x", 86)
//   .attr("y", 476);


//   let push_text = sv_controls.append("text")
//   .attr("fill", "grey")
//   .attr("font-size", "18px")
//   .attr("font-family", "'Poppins', sans-serif")
//   .text("Push")
//   .attr("x", 197)
//   .attr("y", 476);



//   // CREATE the three-part menu

//   var three_menu_width = 120;
//   var three_menu_height = 80;

//   let three_menu = map_background_svg.append("g")
//     .attr("class", "tooltip")
//     .attr("width", three_menu_width)
//     .attr("height", three_menu_height)
//     .attr("visibility", "hidden")
//     .style("z-index", 99);

//   let info_button = three_menu.append("g")

//   info_button.append("circle")
//     .attr("fill", "white")
//     .attr("id", "menu_lineinfo")
//     .attr("cx", "4")
//     .attr("cy", "40")
//     .attr("r", 14)
//     .on("click", show_lineinfo)
//     .on("mouseover", function () { return info_button.style("cursor", "pointer") })
//     .style("z-index", 99);

//   info_button.append("svg:image")
//     .attr('x', -5)
//     .attr('y', 32)
//     .attr('width', 17)
//     .attr('height', 17)
//     .on("click", show_lineinfo)
//     .on("mouseover", function () { return info_button.style("cursor", "pointer") })
//     .attr("xlink:href", "/images/info_icon.png")


//   let linepower_button = three_menu.append("g")

//   linepower_button.append("circle")
//     .attr("fill", "white")
//     .attr("id", "menu_linepower")
//     .attr("cx", "30")
//     .attr("cy", "10")
//     .attr("r", 14)
//     .style("z-index", 99);


//   linepower_button.append("svg:image")
//     .attr('x', 21)
//     .attr('y', 1)
//     .attr('width', 17)
//     .attr('height', 17)
//     .on("mouseover", function () { return linepower_button.style("cursor", "pointer") })
//     .on("click", toggle_linepower)
//     .attr("xlink:href", "/images/power_icon.png")


//   let addsv_button = three_menu.append("g")

//   addsv_button.append("circle")
//     .attr("fill", "white")
//     .attr("cx", "56")
//     .attr("cy", "40")
//     .attr("r", 14)
//     .on("click", update_sv)
//     .on("mouseover", function () { return addsv_button.style("cursor", "pointer") })
//     .style("z-index", 99);
//   addsv_button.append("svg:image")
//     .attr('x', 47)
//     .attr("id", "addsv_button")
//     .attr('y', 29)
//     .attr('width', 19)
//     .attr('height', 21)
//     .attr("xlink:href", "/images/add_sv.png")
//     .on("mouseover", function () { return addsv_button.style("cursor", "pointer") })
//     .on("click", update_sv)


//   // Appending UI Elements
//   // Create a button
//   function createButton(svg, x, y, width, height, buttonText, buttonf, input, className, textName) {
//     svg.append("rect")
//       .attr("class", className)
//       .attr("x", x)
//       .attr("y", y)
//       .attr("width", width)
//       .attr("height", height)
//       .attr("rx", 3)
//       .attr("ry", 3)
//       .style("cursor", "pointer")
//       .style('stroke', 'none')
//       .style("color", "white")
//       .style('fill', "grey")
//       .on("click", function (d) {
//         buttonf(input);
//       })

//     svg.append("text")
//       .attr("class", textName)
//       .attr("x", x + width / 2)
//       .attr("y", y + height / 2)
//       .text(buttonText)
//       .style("text-anchor", "middle")
//       .style("font-family", "Arial")
//       .style("font-size", "18px")
//       .attr("color", "white")
//       .attr("font-weight", "bold")
//       .style("cursor", "pointer")
//       .style("alignment-baseline", "middle")
//       .on("click", function () {
//         buttonf(input);
//       });
//   }

//   // Create System Overview

//   function create_systemOverview(added_loading, pulled, pushed, num_sv, sv_capacity, volt_injected) {
//     // 0MW Additional Loading Enabled 
//     // 0MW Pulled | 0MW Pushed
//     // 0 SmartValves
//     // 0% Total SV Capacity Used
//     // 0kv Total Voltage Injected
//     grid_elements.append("rect")
//       .attr("x", 1000)
//       .attr("y", 15)
//       .attr("width", 310)
//       .attr("height", 240)
//       .style('fill', "white")
//     grid_elements.append("text")
//       .attr("x", 1060)
//       .attr("y", 42)
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "22px")
//       .text("SYSTEM OVERVIEW")
//       .style('fill', "#ec3204")
//     grid_elements.append("text")
//       .attr("x", 1022)
//       .attr("y", 74)
//       .attr("font-weight", "800")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "26px")
//       .text(added_loading)
//       .style('fill', "grey")
//     grid_elements.append("text")
//       .attr("x", 1038)
//       .attr("y", 74)
//       .attr("font-weight", "800")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "16px")
//       .text("MW")
//       .style('fill', "grey")
//     grid_elements.append("text")
//       .attr("x", 1077)
//       .attr("y", 74)
//       .attr("font-weight", "300")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "16px")
//       .text("Additional Loading Enabled")
//       .style('fill', "grey")
//     grid_elements.append("text")
//       .attr("x", 1042)
//       .attr("y", 120)
//       .attr("font-weight", "800")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "26px")
//       .text(pulled)
//       .style('fill', "grey")
//     grid_elements.append("text")
//       .attr("x", 1058)
//       .attr("y", 120)
//       .attr("font-weight", "800")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "16px")
//       .text("MW")
//       .style('fill', "grey")
//     grid_elements.append("text")
//       .attr("x", 1097)
//       .attr("y", 120)
//       .attr("font-weight", "300")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "16px")
//       .text("Pulled")
//       .style('fill', "grey")

//     grid_elements.append("text")
//       .attr("x", 1154)
//       .attr("y", 120)
//       .attr("font-weight", "800")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "26px")
//       .text("| " + pushed)
//       .style('fill', "grey")
//     grid_elements.append("text")
//       .attr("x", 1186)
//       .attr("y", 120)
//       .attr("font-weight", "800")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "16px")
//       .text("MW")
//       .style('fill', "grey")
//     grid_elements.append("text")
//       .attr("x", 1240)
//       .attr("y", 120)
//       .attr("font-weight", "300")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "16px")
//       .text("Pushed")
//       .style('fill', "grey")

//     grid_elements.append("text")
//       .attr("x", 1176)
//       .attr("y", 157)
//       .attr("font-weight", "800")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "26px")
//       .text(num_sv)
//       .style('fill', "grey")
//     grid_elements.append("text")
//       .attr("x", 1198)
//       .attr("y", 157)
//       .attr("font-weight", "300")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "16px")
//       .text("SmartValves")
//       .style('fill', "grey")

//     grid_elements.append("text")
//       .attr("x", 1045)
//       .attr("y", 196)
//       .attr("font-weight", "800")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "26px")
//       .text(sv_capacity + "%")
//       .style('fill', "grey")
//     grid_elements.append("text")
//       .attr("x", 1085)
//       .attr("y", 196)
//       .attr("font-weight", "300")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "16px")
//       .text("SmartValve Capacity Used")
//       .style('fill', "grey")


//     grid_elements.append("text")
//       .attr("x", 1078)
//       .attr("y", 238)
//       .attr("font-weight", "800")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "26px")
//       .text(volt_injected)
//       .style('fill', "grey")
//     grid_elements.append("text")
//       .attr("x", 1100)
//       .attr("y", 238)
//       .attr("font-weight", "800")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "16px")
//       .text("kv")
//       .style('fill', "grey")
//     grid_elements.append("text")
//       .attr("x", 1120)
//       .attr("y", 238)
//       .attr("font-weight", "300")
//       .attr("text-anchor", "right")
//       .attr("font-family", "'Poppins','sans-serif'")
//       .attr("font-size", "16px")
//       .text("Total Voltage Injected")
//       .style('fill', "grey")
//   }
//   create_systemOverview(0, 0, 0, 0, 0, 0)

//   // Create a Display
//   function createDisplay(svg, x, y, width, height, displayText, className, textName) {
//     svg.append("rect")
//       .attr("class", className)
//       .attr("x", x)
//       .attr("y", y)
//       .attr("width", width)
//       .attr("height", height)
//       .attr("rx", 3)
//       .attr("ry", 3)
//       .attr("stroke", "black")
//       .style('stroke-width', "3px")
//       .style("color", "green")
//       .style('fill', "white")

//     svg.append("text")
//       .attr("class", textName)
//       .attr("x", x + width / 2)
//       .attr("y", y + height / 2)
//       .text(displayText)
//       .style("text-anchor", "middle")
//       .style("font-family", "Arial")
//       .style("font-size", "18px")
//       .attr("color", "white")
//       .attr("font-weight", "bold")
//       .text(displayText)
//       .style("alignment-baseline", "middle");
//   }

//   // Create Push/Pull Value Displays

//   function push_pull_graphic() {


//     let graphic = map_background_svg.append("svg:image")
//       .attr('x', 985)
//       .attr('y', 12)
//       .attr('id', 'graphic')
//       .attr('width', 320)
//       .attr('height', 280)
//       .attr("visibility", "hidden")
//       .attr("xlink:href", "/images/push_modeV3.png")

//   }


//   //Create the Line Sliders, all hidden until made visible by call.

//   function create_slider4() {
//     let sliderStep = d3
//       .sliderBottom()
//       .min(0)
//       .max(100) // repopulate with the new value
//       .width(150)
//       .tickFormat(d3.format('100'))
//       .ticks(1)
//       .step(100)
//       .default(0)
//     // .on('change', update)

//     var gStep = map_background_svg.append("svg")
//       .attr('width', 300)
//       .attr('height', 100)
//       // .attr("visibility", "hidden")
//       .append('g')
//       .attr('transform', 'translate(30,60)')

//     var gText = map_background_svg.append("text")
//       .text("SmartValve 4")
//       .attr("id", "slidertext4")
//       .attr('transform', 'translate(20,40)')
//       .attr("visibility", "hidden")

//     let slider4 = gStep.call(sliderStep)
//       .attr("visibility", "hidden")
//       .attr("id", "slider4");
//   }

//   create_slider4();

//   let slide4 = document.getElementById('slider4')

//   slide4.onchange = slides

//   function slides(val) {
//     let slid = Number(val.target.value)
//     console.log(slid)
//   }

//   // DISPLAY GAUGES: BEGIN 

//   //Grid Elements

//   // Smartvalve
//   // function smartvalve(x, y, id, inservice, push, voltage) {
//   // }

//   //Create a Bus
//   function create_bus(x, y, name, grid_voltage, in_service) {
//     grid_elements.append("rect")
//       .attr("x", x)
//       .attr("y", y)
//       .attr("width", 10)
//       .attr("height", 10)
//       .attr('id', name)
//       .attr("fill", function (x) {
//         if (in_service == true) {
//           return "white"
//         }
//         else {
//           return "lightgrey"
//         }
//       }
//       )
//       .attr("stroke", "white")
//       .attr("stroke-width", "1px")
//     return [x, y];
//   }

//   function send_data(user_array, password_array){
//       // $(function(){
//       //   $('button').click(function(){
//             var user = user_array;
//             var pass = password_array;

          
//   }

//   // Update Functions
//   // Update Functions
//   // Update Functions
//   // Update Functions
  

//   function update_tooltip(line_number, scenario_number) {
//     if (line_number == 3) {
//       line_name = "Line 3"
//       convert_number = 1;
//     }
//     else if (line_number == 4) {
//       line_name = "Line 4"
//       convert_number = 0;
//     }
//     else if (line_number == 2) {
//       line_name = "Line 2"
//       convert_number = 2;
//     }
//     line_names_buses.text(line_name)
//     // set the right file variable

//     if (scenario_number == 0) {
//       data_file = tooltip_0
//     }
//     else if (scenario_number == 1) {
//       data_file = tooltip_1
//     }
//     else if (scenario_number == 2) {
//       data_file = tooltip_2
//     }
//     else if (scenario_number == 3) {
//       data_file = tooltip_3
//     }
//     // Change the tooltip text fields
//     act_power.text("Power: " + data_file["p_from_mw"][String(convert_number)] + " MW")
//     current.text("Current: " + data_file["i_ka"][String(convert_number)] + " kA")
//     resistance.text("Resistance: " + (data_file['r_ohm_per_km'][String(convert_number)]).toFixed(2) + " Ω/km")
//     final_reactance.text("Final Reactance: " + (data_file['Xfinal_per_km'][String(convert_number)]).toFixed(2) + " Ω/km")
//     length.text("Length: " + ((data_file['Length_km'][String(convert_number)])).toFixed(2) + " km")
//     max_current.text("Maximum Current: " + (data_file['max_i_ka'][String(convert_number)]).toFixed(2) + " kA")
//   }

//   function close_menu() {
//     if (menu_vis == 1) {
//       three_menu.style("visibility", "hidden").style("z-index", 100)
//         .transition()
//         .duration(600);
//       addsv_button.style("visibility", "hidden")

//       menu_vis = 0
//     }
//   }

//   function update_menu(line_id) {
//     console.log(menu_vis)
//     menu_vis = 1;

//     console.log(line_power_array)
//     three_menu.style("visibility", "visible").style("z-index", 100)
//       .transition()
//       .duration(600);
//     addsv_button.attr("visibility", "visible")

//     if (line_id == "line3") {
//       line_name = "Line 3"
//       convert_number = 1
//       current_line = 3;
//     }
//     else if (line_id == "line4") {
//       line_name = "Line 4"
//       convert_number = 0
//       current_line = 4;
//     }
//     else if (line_id == "line2") {
//       line_name = "Line 2"
//       convert_number = 2
//       current_line = 2;
//     }
//     else if (line_id == "line1") {
//       line_name = "Line 1"
//       current_line = 1;
//     }


//     line_power_array.forEach(function(d, i) { 
//       if (line_power_array[current_line-1] == -1){
//         console.log("arraylog" + line_power_array[current_line-1])
//         addsv_button.style("visibility", "hidden")
//       }
//       else if (line_power_array[current_line-1]==1){
//       console.log("arraylog" + line_power_array[current_line-1])
//       addsv_button.style("visibility", "visible")
//       }
//     });

//     if (sv_quant_array[current_line - 1] == 1) { // if the sv is on, make it the off button
//       d3.selectAll("#addsv_button").attr("xlink:href", "images/smartvalve_off.png")
//         .on("click", sv_off)
//     } // if it's off, make it the on button
//     else {
//       d3.selectAll("#addsv_button").attr("xlink:href", "images/add_sv.png")
//       .on("click", update_sv)

//     }
//     three_menu.attr("transform", "translate(" + (d3.event.pageX - 60) + "," + (d3.event.pageY - 173) + ")");

//   }
//   //Line Mouseover Functions
//   function linemouseover1() { // when the line is mousedover
//     d3.selectAll("#line1").style("cursor", "pointer")
//     d3.selectAll("#line1").style("box-shadow", "3px 3px 5px 6px #ccc");

//   }
//   function linemouseover2() {
//     d3.selectAll("#line2").style("cursor", "pointer")
//     d3.selectAll("#line2").style("box-shadow", "3px 3px 5px 6px #ccc");
//     // update_tooltip(2, scenario)
//   }
//   function linemouseover3() {
//     d3.selectAll("#line3").style("cursor", "pointer")
//     d3.selectAll("#line3").style("box-shadow", "3px 3px 5px 6px #ccc");
//     // update_tooltip(3, scenario)
//   }
//   function linemouseover4() {
//     d3.selectAll("#line4").style("cursor", "pointer")
//     d3.selectAll("#line4").style("box-shadow", "3px 3px 5px 6px #ccc");
//     // update_tooltip(4, scenario)
//   }

//   //line click open menu
//   function linemenu_open() {
//     let line_id = d3.select(this).attr("id")
//     update_menu(line_id)


//     // TUESDAY TODO: UDPATE THE TOOLTIP VARIABLES

//     // // update the variable in the tooltip 
//     // if (line_id == "line1") {
//     //   update_tooltip(1, scenario)
//     // }
//     // else if (line_id == "line2") {
//     //   update_tooltip(2, scenario)
//     // }
//     // else if (line_id == "line3") {
//     //   update_tooltip(3, scenario)
//     // }
//     // else if (line_id == "line4") {
//     //   update_tooltip(4, scenario)
//     // }

//   }

//   function linemouseoff() {
//     //   tooltip.style("visibility", "hidden");
//   }

//   function percent_to_hue(percent) {
//     if (percent < 40) {
//       return zero_forty
//     }
//     else if (percent < 60) {
//       return fourty_sixty
//     }
//     else if (percent < 80) {
//       return sixty_eighty
//     }
//     else if (percent <= 100) {
//       return eighty_hundred
//     }
//     else if (percent > 100) {
//       return over_hundred
//     }
//   }

//   function update(scenario_number) {
//     if (scenario_number == 0) {
//       file_name = tooltip_0;
//     }
//     else if (scenario_number == 1) {
//       file_name = tooltip_1;
//     }
//     else if (scenario_number == 2) {
//       file_name = tooltip_2;
//     }
//     else if (scenario_number == 3) {
//       file_name = tooltip_3;
//     }
//     // 0 is line 4
//     // 1 is line 3
//     // 2 is line 2

//     console.log(scenario_number)
//     let percent_2 = String(file_name["loading"]["2"].toFixed(0))
//     let percent_3 = String(file_name["loading"]["1"].toFixed(0))
//     let percent_4 = String(file_name["loading"]["0"].toFixed(0))
//     d3.selectAll("#percentage2").text(percent_2 + "%")
//     d3.selectAll("#percentage3").text(percent_3 + "%")
//     d3.selectAll("#percentage4").text(percent_4 + "%")
//     if (percent_2 < 40) {
//       d3.selectAll("#circle2")
//         .transition()
//         .duration(1000)
//         .attr("fill", percent_to_hue(percent_2))
//     }
//     d3.selectAll("#circle3")
//       .transition()
//       .duration(1000)
//       .attr("fill", percent_to_hue(percent_3))
//     d3.selectAll("#circle4")
//       .transition()
//       .duration(1000)
//       .attr("fill", percent_to_hue(percent_4))

//     d3.selectAll("#graphic")
//       .attr("visibility", function () {
//         if (scenario == 0) {
//           return "hidden"
//         }
//         else {
//           return "visible"
//         }
//       })
//       .attr("xlink:href", function () {
//         if (scenario_number == 0) {
//           return "images/Pull_modeV3.png";
//         }
//         else if (scenario_number == 1) {
//           return "images/push_modeV3.png";
//         }
//         else if (scenario_number == 2) {
//           return "images/Pull_modeV3.png";
//         }
//         else if (scenario_number == 3) {
//           return "images/push-pullV3.png";
//         }

//       }
//       )
//   }

//   function update_sv() { // click to add an sv
//     console.log(sv_pushpull_array + " IN UPDATE FUNCTION")
//     // console.log(current_line + ": " + sv_pushpull_array[current_line-1])

//     // 0 if off, >1 for quantity

//     let line_id = String("line" + current_line)
//     console.log(current_line + " CURRENT LINE")
//     let active_line_index = Number(current_line)-1
//     // console.log(active_line_index)


//   console.log(sv_pushpull_array[active_line_index] + " LINE OFF OR ON")

//     let sv_id = String(line_id + "sv") 
//     console.log("updated_sv" + sv_id)
//     three_menu.style("visibility", "hidden")
//     addsv_button.style("visibility", "hidden")
//     // for all the SVs, 
//     // check the array of IDs = the current line id
//     // line1sv, line2sv, line2sv
//     sv_id_array.forEach(function(d, i) { 
//       if (d != sv_id ){ // if the ID doesn't match
//         if (Number(sv_pushpull_array[i]) == Number(-1)){
//         d3.selectAll(String("#" + d)).attr("xlink:href", "images/pull_gray.gif")
//       }
//       else if (Number(sv_pushpull_array[i]) == Number(1)){  
//         d3.selectAll(String("#" + d)).attr("xlink:href", "images/push_gray.gif")
//         }
//       }
//     else {
//       if (Number(sv_pushpull_array[i]) == Number(-1)){
//       d3.selectAll(String("#" + d)).attr("xlink:href", "images/pull_mode.gif")
//     }
//       else if (Number(sv_pushpull_array[i]) == Number(1)){
//         d3.selectAll(String("#" + d)).attr("xlink:href", "images/push_mode.gif")
//       }
// };

//     });

//     sv_controls.attr("visibility", "visible")
//     controls_linename.text(line_name)

//     // EXPORT QUANTITY SV IN JSON FORMAT


//     if (sv_quant_array[current_line - 1] == 0) {
//       sv_quant_array[current_line - 1] = Number(1)
//       d3.selectAll(String("#" + sv_id)) // #line3sv visible
//         .style("visibility", "visible")
//     }
//     else if (sv_quant_array[current_line - 1] == 1) {
//       // console.log("it's off")

//     }
//     // console.log(sv_quant_array)
//     // update_displays(svclick_array)
//   }

//   function toggle_linepower(){
//     //flip it
//     let line_id = String("line" + current_line)
//     let sv_id = String(line_id + "sv") // line3sv

//     if (line_power_array[Number(current_line)-1] == Number(-1)){ // if it was off before, turn on and make sv button visible
//       line_power_array[Number(current_line)-1] =  Number(1);
//     }
//     else if (line_power_array[Number(current_line)-1] == Number(1)){
//       line_power_array[Number(current_line)-1] = Number(-1);
//     }
//     console.log(line_power_array + " IN Power FUNCTION")
//   }

//   function toggle_pushpull(){
//     //flip it
//     let line_id = String("line" + current_line)
//     let sv_id = String(line_id + "sv") // line3sv
//     console.log("toggled" + sv_id)

//     if (sv_pushpull_array[Number(current_line)-1] == Number(-1)){
//      sv_pushpull_array[Number(current_line)-1] =  Number(1);
//     }
//     else if (sv_pushpull_array[Number(current_line)-1] == Number(1)){
//       sv_pushpull_array[Number(current_line)-1] = Number(-1);
//     }
//     console.log(sv_pushpull_array + " IN TOGGLE FUNCTION")
//     update_svcontrols(sv_id)
//   }

//   function update_svcontrols(sv_id){
//     if (sv_id == "line1sv"){
//       line_name = "Line 1"
//       current_line = 1
//     }
//     else if (sv_id == "line2sv"){
//       line_name = "Line 2"
//       current_line = 2
//     }
//     else if (sv_id == "line3sv"){
//       line_name = "Line 3"
//     // console.log("updated" + sv_id)
//       current_line = 3
//     }
//     else if (sv_id == "line4sv"){
//       line_name = "Line 4"
//     // console.log("updated" + sv_id)
//       current_line = 4
//     }

//     if (sv_pushpull_array[current_line-1] == -1) {
//       pushpull_button.attr("cx", 143);
//       }
//     else if (sv_pushpull_array[current_line-1] == 1){
//       pushpull_button.attr("cx", 183);
//     }
//     console.log(sv_pushpull_array + " IN CONTROLS FUNCTION")
//     // console.log(current_line)
//     // console.log(sv_pushpull_array)
//     update_sv();
    
//   }

//   function switch_svcontrol () {
//     let this_id = d3.select(this).attr("id")
//     console.log(this_id)
//     update_svcontrols(this_id)
//   }



//   function sv_off() {
//     let line_id = String("line" + current_line)
//     let sv_id = String(line_id + "sv") // line3sv
//     d3.selectAll(String("#" + sv_id))
//       .style("visibility", "hidden")
//     three_menu.style("visibility", "hidden")
//     addsv_button.style("visibility", "hidden")
//     sv_quant_array[current_line - 1] = Number(0)
//     console.log(sv_quant_array)
//     // update_svcontrols(sv_id);
//   }

//   // This function, update_displays(), takes two arrays of equal length.
//   // The first is an array of the quantity of SmartValves on each line, Number 0-10
//   // The second is an array of whether the SmartValves are push/pull on each line. Number 1 for push, -1 for push.
//   // Check that the number of lines matches the length of both arrays.

//   function update_displays(array_of_quantities, array_of_pushpull) {
//     // Send Arrays to the Python
//     // export to csv
//   }


//   // function send_data() {
//   //   var appdir = "/";
//   //   update_var();
//   //   console.log(send_msg)
//   //   $.ajax({
//   //     type: "POST",
//   //     url: server + appdir,
//   //     data: JSON.stringify(send_msg),
//   //     dataType: 'json',
//   //     contentType: 'application/json',
//   //   }).done(function (data) {
//   //     $('#Response').html(data['message']);
//   //   });

//   // }

//   console.log(JSON.stringify([[0, 0, 0, 0], [0, 0, 0, 0]]))

//   // function svclick3() {
//   //   console.log(sv3click)
//   //   if (sv3click == false) { // if SV3 is off, turn on SmartValve 3
//   //     d3.selectAll("#line3sv")
//   //       .attr("transform", "translate(0, 4)")
//   //       // .attr("xlink:href", "/images/pull_mode.gif")
//   //       .attr("class", "valve_on")
//   //     sv3click = true;
//   //     if (sv4click == false) { // if SV4 is is off, the scenario is 2
//   //       scenario = 2;
//   //       update(scenario)
//   //     }
//   //     else if (sv4click == true) { // if SV4 is on, the scenario is 3
//   //       scenario = 3;
//   //       update(scenario)
//   //     }
//   //   }
//   //   else if (sv3click == true) { // turn off SV3
//   //     d3.selectAll("#line3sv")
//   //       .attr("transform", "translate(0, -4)")
//   //       .attr("xlink:href", "/images/smartvalve_off.png")
//   //       .attr("class", "valve_off")
//   //     if (sv4click == true) { //if SV4 is on, scenario is 1
//   //       scenario = 1;
//   //       update(scenario)
//   //     }
//   //     else if (sv4click == false) { // if SV4 is off, scenario is 0
//   //       scenario = 0;
//   //       update(scenario)
//   //     }
//   //     sv3click = false;
//   //   }
//   // }

//   function svclick4() {
//     console.log(sv4click)
//     if (sv4click == false) { // turn on SV4
//       d3.selectAll("#smartvalve4")
//         .attr("xlink:href", "/images/push_mode.gif")
//         .attr("class", "valve_on")
//       if (sv3click == false) { // if SV4 is on and 3 is off, push mode
//         scenario = 1 // basic push mode
//         update(scenario);
//       }
//       else if (sv3click == true) { // if SV4 is on and SV3 is on
//         scenario = 3;
//         update(scenario);
//       }
//       sv4click = true;
//     }
//     else if (sv4click == true) { // if SV4 was on and now off
//       d3.selectAll("#smartvalve4")
//         .attr("xlink:href", "/images/smartvalve_off.png")
//         .attr("class", "valve_off")
//       if (sv3click == true) { // if SV3 is on still
//         scenario = 2;
//         update(scenario)
//       }
//       else if (sv3click == false) { // if SV3 is off, then base case
//         scenario = 0;
//         update(scenario)
//       }
//       sv4click = false;
//     }
//   }



//   // function mouseclick3() {
//   //   console.log(click3)
//   //   if (click3 == false) {
//   //     //when you click a line, smartvalve gets added, it's off.
//   //     d3.selectAll("#line3sv")
//   //       .attr("visibility", "visible")
//   //       .style("opacity", "1")
//   //       .style("cursor", "pointer")
//   //       // click the smartvalve to toggle push/pull, and the display
//   //       .on("click", svclick3);
//   //     click3 = true;
//   //   }
//   //   else if (click3 == true) {
//   //     //when you click a line, smartvalve gets added
//   //     d3.selectAll("#smartvalve3").attr("visibility", "hidden");
//   //     d3.selectAll("#graphic").attr("visibility", "hidden");
//   //     click3 = false;
//   //   }

//   // }


//   // function mouseclick4(line) {
//   //   console.log(click4)
//   //   if (click4 == false) {
//   //     //when you click a line, smartvalve gets added, it's off.
//   //     d3.selectAll("#smartvalve4")
//   //       .attr("visibility", "visible")
//   //       .attr('y', 210 + 31)
//   //       .style("opacity", "1")
//   //       .style("cursor", "pointer")
//   //       // click the smartvalve to toggle push/pull, and the display
//   //       .on("click", svclick4);
//   //     click4 = true;
//   //   }
//   //   else if (click4 == true) {
//   //     //when you click a line, smartvalve gets added
//   //     d3.selectAll("#smartvalve4").attr("visibility", "hidden");
//   //     d3.selectAll("#graphic").attr("visibility", "hidden");
//   //     click4 = false;
//   //   }

//   // }



//   // MANUALLY CREATE LINE 1
//   function create_line_1(from_bus, to_bus, elbow, percentage, location, std_type, name, in_service) {
//     // console.log(from_bus.getBBox().y);
//     let line1 = grid_elements.append("line")
//       .attr('x1', from_bus[0] + 5)
//       .attr('y1', from_bus[1] + 10)
//       .attr('x2', elbow[0] + Number(2))
//       .attr('y2', elbow[1] - Number(2))
//       .attr('z-index', 1)
//       .attr("id", "line1")
//       .attr('stroke-width', "3px")
//       .attr("stroke-dasharray", "2")
//       .attr('stroke', "slategrey")
//       .on("click", linemenu_open)
//       .on("mouseover", linemouseover1)

//     let line2 = grid_elements.append("line")
//       .attr('x1', elbow[0] + Number(2))
//       .attr('y1', elbow[1] - 2)
//       .attr('x2', to_bus[0])
//       .attr('y2', to_bus[1] + 7)
//       .attr('z-index', 1)
//       .attr("id", "line1")
//       .attr('stroke-width', "3px")
//       .attr("stroke-dasharray", "2")
//       .attr('stroke', "slategrey")
//       .on("click", linemenu_open)
//       .on("mouseover", linemouseover1)

//     grid_elements.append("circle")
//       .attr("cx", (elbow[0] + Number(2)))
//       .attr("cy", (elbow[1] - 30))
//       .attr("r", 13)
//       .attr("fill", "#DEDEDE")

//     grid_elements.append("text")
//       .attr("x", (elbow[0] + Number(2) - 8))
//       .attr("y", (elbow[1] - 27))
//       .attr("font-size", "10px")
//       .attr("id", "percentage1")
//       .attr("font-family", "Arial")
//       .attr("font-weight", "bold")
//       .text(Math.round(percentage) + "%");

//     //SMARTVALVE: begins hidden 
//     let sv1 = grid_elements.append("svg:image")
//       .attr('x', elbow[0] + 17)
//       .attr('y', elbow[1] - 8)
//       .attr('id', 'line1sv')
//       .attr('width', 32)
//       .attr('height', 32)
//       .on("click", switch_svcontrol)
//       .attr("visibility", "hidden")
//   }

//   // MANUALLY CREATE LINE 2
//   function create_line_2(from_bus, to_bus, elbow, percentage, location, std_type, name, in_service) {
//     // console.log(from_bus.getBBox().y);
//     console.log(percentage)
//     let line3 = grid_elements.append("line")
//       .attr('x1', from_bus[0] + 5)
//       .attr('y1', from_bus[1] + 10)
//       .attr('x2', elbow[0] + Number(2))
//       .attr('y2', elbow[1] - Number(2))
//       .attr('z-index', "0")
//       .attr("id", "line2")
//       .attr('stroke-width', "3px")
//       .attr('stroke', "black")
//       .on("click", linemenu_open)
//       .on("mouseover", linemouseover2)
//       .on("mouseout", linemouseoff)

//     let line4 = grid_elements.append("line")
//       .attr('x1', elbow[0] + Number(2))
//       .attr('y1', elbow[1] - 2)
//       .attr('x2', to_bus[0])
//       .attr('y2', to_bus[1] + 7)
//       .attr('z-index', "0")
//       .attr("id", "line2")
//       .attr('stroke-width', "3px")
//       .attr('stroke', "black")
//       .on("click", linemenu_open)
//       .on("mouseover", linemouseover2)
//       .on("mouseout", linemouseoff)

//     grid_elements.append("circle")
//       .attr("cx", (elbow[0] - Number(4)))
//       .attr("cy", (elbow[1] - 12))
//       .attr("r", 13)
//       .attr("id", "circle2")
//       .attr("fill", zero_forty)
//     // .attr("stroke", "darkgrey")
//     // .attr("stroke-width", "1px");

//     let percentage2 = grid_elements.append("text")
//       .attr("x", (elbow[0] - Number(7) - 7))
//       .attr("y", (elbow[1] - 9))
//       .attr("font-size", "10px")
//       .attr("font-family", "Arial")
//       .attr("id", "percentage2")
//       .attr("font-weight", "bold")
//       .text(Math.round(percentage) + "%");


//     //SMARTVALVE: begins hidden 
//     let sv2 = grid_elements.append("svg:image")
//       .attr('x', elbow[0] + 18)
//       .attr('y', elbow[1] + 10)
//       .attr('id', 'line2sv')
//       .attr('width', 32)
//       .attr('height', 32)
//       .on("click", switch_svcontrol)
//       .attr("visibility", "hidden")

//   }


//   // MANUALLY CREATE LINE 3
//   function create_line_3(from_bus, to_bus, elbow, percentage, location, std_type, name, in_service) {
//     // console.log(from_bus.getBBox().y);
//     console.log(percentage)
//     let line5 = grid_elements.append("line")
//       .attr('x1', from_bus[0] + 5)
//       .attr('y1', from_bus[1] + 10)
//       .attr('x2', elbow[0] + Number(2))
//       .attr('y2', elbow[1] - Number(2))
//       .attr('z-index', 0)
//       .attr('stroke-width', "3px")
//       .attr('stroke', "black")
//       .attr("id", "line3")
//       .on("click", linemenu_open)
//       .on("mouseover", linemouseover3)
//       .on("mouseout", linemouseoff)

//     let line6 = grid_elements.append("line")
//       .attr('x1', elbow[0] + Number(2))
//       .attr('y1', elbow[1] - 2)
//       .attr('x2', to_bus[0])
//       .attr('y2', to_bus[1] + 7)
//       .attr('z-index', 0)
//       .attr("id", "line3")
//       .attr('stroke-width', "3px")
//       .attr('stroke', "black")
//       .on("click", linemenu_open)
//       .on("mouseover", linemouseover3)
//       .on("mouseout", linemouseoff)

//     grid_elements.append("circle")
//       .attr("cx", (elbow[0] - Number(5)))
//       .attr("cy", (elbow[1] - 8))
//       .attr("r", 13)
//       .attr("id", "circle3")
//       .attr("fill", zero_forty)
//     // .attr("stroke", "darkgrey")
//     // .attr("stroke-width", "1px");

//     grid_elements.append("text")
//       .attr("x", (elbow[0] - Number(28) + 14))
//       .attr("y", (elbow[1] - 4))
//       .attr("font-size", "10px")
//       .attr("font-family", "Arial")
//       .attr("font-weight", "bold")
//       .attr("id", "percentage3")
//       .text(percentage + "%");

//     //SMARTVALVE: begins hidden 
//     let sv3 = grid_elements.append("svg:image")
//       .attr('x', elbow[0] + 11)
//       .attr('y', elbow[1] + 22)
//       .attr('id', 'line3sv')
//       .attr('width', 32)
//       .attr('height', 32)
//       .attr("visibility", "hidden")
//       .on("click", switch_svcontrol)
//   }

//   // MANUALLY CREATE LINE 4
//   function create_line_4(from_bus, to_bus, elbow, percentage, location, std_type, name, in_service) {
//     // console.log(from_bus.getBBox().y);

//     let line7 = grid_elements.append("line")
//       .attr('x1', from_bus[0] + 5)
//       .attr('y1', from_bus[1] + 10)
//       .attr('x2', elbow[0] + Number(2))
//       .attr('y2', elbow[1] - Number(2))
//       .attr('z-index', 0)
//       .attr("id", "line4")
//       .attr('stroke-width', "3px")
//       .attr('stroke', "black")
//       .on("click", linemenu_open)
//       .on("mouseover", linemouseover4)
//       .on("mouseout", linemouseoff)

//     let line8 = grid_elements.append("line")
//       .attr('x1', elbow[0] + Number(2))
//       .attr('y1', elbow[1] - 2)
//       .attr('x2', to_bus[0])
//       .attr('y2', to_bus[1] + 7)
//       .attr("id", "line4")
//       .attr('z-index', 0)
//       .attr('stroke-width', "3px")
//       .attr('stroke', "black")
//       .on("click", linemenu_open)
//       .on("mouseover", linemouseover4)
//       .on("mouseout", linemouseoff)

//     grid_elements.append("circle")
//       .attr("cx", (elbow[0] - Number(5)))
//       .attr("cy", (elbow[1] - 7))
//       .attr("r", 13)
//       .attr("id", "circle4")
//       .attr("fill", over_hundred)
//     // .attr("stroke", "white")
//     // .attr("stroke-width", "1px");

//     grid_elements.append("text")
//       .attr("x", (elbow[0] - Number(17)))
//       .attr("y", (elbow[1] - 3))
//       .attr("font-size", "10px")
//       .attr("font-family", "Arial")
//       .attr("font-weight", "bold")
//       .attr("id", "percentage4")
//       .text(Math.round(percentage) + "%");

//     //SMARTVALVE: begins hidden 
//     let sv4 = grid_elements.append("svg:image")
//       .attr('x', elbow[0])
//       .attr('y', elbow[1] + 25)
//       .attr('id', 'line4sv')
//       .attr('width', 32)
//       .attr('height', 32)
//       .attr("visibility", "hidden")
//       .on("click", switch_svcontrol)
//   }


//   // Create a Load
//   function create_load(x, y, bus, active_power, reactive_power, name) {
//     grid_elements.append("circle")
//       .attr("cx", x + 6)
//       .attr("cy", y + 6)
//       .attr("r", 14)
//       .attr('id', name)
//       .attr("fill", "none")
//       .attr("stroke", "white")
//       .attr("stroke-width", "1.5px")
//     grid_elements.append("svg:image")
//       .attr('x', Number(Number(x) - Number(7.25)))
//       .attr('y', Number(Number(y) - Number(8)))
//       .attr('id', id)
//       .attr('width', 27)
//       .attr('height', 27)
//       .attr("xlink:href", "images/load2.gif")



//     grid_elements.append("rect")
//       .attr("x", x - 16)
//       .attr("y", y - 28)
//       .attr("width", 43)
//       .attr("height", 15)
//       .attr("rx", 3)
//       .attr("ry", 3)
//       .attr("fill", "white")

//     grid_elements.append("text")
//       .attr("x", x - 14)
//       .attr("y", y - 18)
//       .attr("font-family", "'Poppins','sans-serif'")
//       .text("1000 MW")
//       .attr("font-size", "9px")

//     // console.log(bus.attr("id"))
//     // let bus_x = d3.select("bus.id").attr("x")
//     // let bus_y = d3.select("bus.id").attr("y")


//     // //Connecting Line
//     // map_background_svg.append("line")
//     // .attr('x1', Number(bus_x))
//     // .attr('y1', Number(bus_y))
//     // .attr('x2', Number(x))
//     // .attr('y2', Number(y))
//     // .attr('z-index', 99)
//     // .attr('stroke-width', "2px")
//     // .attr('stroke', "lightgrey")
//   }


//   // Create a Generator
//   function create_gen(x, y, bus, type, active_power, reactive_power, voltage_pt, slack) {
//     grid_elements.append("circle")
//       .attr("cx", x)
//       .attr("cy", y)
//       .attr("r", 13)
//       .attr('id', name)
//       .attr("fill", "lightblue")
//       .attr("stroke", "white")
//       .attr("stroke-width", "1px")

//     grid_elements.append("rect")
//       .attr("x", x - 16)
//       .attr("y", y - 35)
//       .attr("width", 40)
//       .attr("height", 15)
//       .attr("rx", 3)
//       .attr("ry", 3)
//       .attr("fill", "white")

//     grid_elements.append("text")
//       .attr("x", x - 14)
//       .attr("y", y - 25)
//       .attr("font-family", "'Poppins','sans-serif'")
//       .text("1015 MW")
//       .attr("font-size", "9px")

//     if (type == "wind") {
//       grid_elements.append("svg:image")
//         .attr('x', Number(Number(x) - Number(12.5)))
//         .attr('y', Number(Number(y) - Number(12.5)))
//         .attr('id', id)
//         .attr('width', 25)
//         .attr('height', 25)
//         .attr("xlink:href", "images/wind_turbine.gif")
//     }


//     //       Connection Line to Bus ()
//     //       let bus_x = d3.select(bus.id).x
//     //       let bus_y = d3.select(bus.id).y
//     // map_background_svg.append("line")
//     //       .attr('x1', Number(bus_x))
//     //       .attr('y1', Number(bus_y))
//     //       .attr('x2', Number(x))
//     //       .attr('y2', Number(y))
//     //       .attr('z-index', 99)
//     //       .attr('stroke-width', "2px")
//     //       .attr('stroke', "lightgrey")
//   }


//   //MAP ELEMENTS BELOW
//   // Zoom in/Out Disabled for now
//   //var zoomin_button = createButton(map_background_svg, 1250, 500, 40, 40, "+", "", "" , "", "");
//   //var zoomout_button = createButton(map_background_svg, 1250, 555, 40, 40, "-", "", "" , "", "");


//   // UPDATE FUNCTION
//   //BUTTONS / DISPLAYS
//   // var mw_display = createDisplay(map_background_svg, 1200, 38, 100, 60, (megawatts + " MW"), "", "")
//   push_pull_graphic();

//   // create buses
//   var b1 = create_bus(570, 180, id = "b1", name = "Bus 1", grid_voltage = 275, in_service = true)
//   var b2 = create_bus(740, 390, id = "b2", name = "Bus 2", grid_voltage = 275, in_service = true)
//   // //create load elements
//   var l1 = create_load(764, 387, b1, 890, 80, name = "Load")
//   // //create generator
//   var g1 = create_gen(570, 160, b1, type = "wind", 950, 1.01, true)

//   var line1 = create_line_1(b1, b2, [596, 380], percentage = 0, std_type = "LineA", name = "Line 1", in_service = false)
//   var line2 = create_line_2(b1, b2, [635, 320], percentage = 35, std_type = "LineB", name = "Line 2", in_service = true)
//   var line3 = create_line_3(b1, b2, [678, 280], percentage = 29, std_type = "LineC", name = "Line 3", in_service = true)
//   var line4 = create_line_4(b1, b2, [700, 210], percentage = 105, std_type = "LineD", name = "Line 4", in_service = true)
//   // console.log(line4)


// }

// requestData(); // execute
