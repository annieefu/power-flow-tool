var BUTTON_CANVAS = d3.selectAll("#buttons_here").append("g")
.attr("width", "200px")
.attr("height", "200px")

BUTTON_CANVAS.append("circle")
.attr("cx", 40)
.attr("cy", 40)
.attr("r", 40)
.attr("fill", "blue")
.on("click", post_function)



BUTTON_CANVAS.append("circle")
.attr("cx", 170)
.attr("cy", 40)
.attr("r", 40)
.attr("fill", "green")
.on("click", get_function)

// Post 
function post_function(){
    console.log("Post button clicked")

    // POST
    fetch('/', {
        // Declare what type of data we're sending
        headers: {
          'Content-Type': 'application/json'
        },
        // Specify the method
        method: 'POST',
        // A JSON payload
        body: JSON.stringify({
          "LineName": {
            "0": "Line 1",
            "1": "Line 2",
            "2": "Line 3"
          },
          "SV": {
            "0": 0,
            "1": 0,
            "2": 0
          },
          "Mode": {
            "0": 0,
            "1": 0,
            "2": 0
          }
        })
    }).then(function (response) { // At this point, Flask has printed our JSON
        return response.text();
    }).then(function (text) {
        console.log('POST response: ');
        // Should be 'OK' if everything was successful
        console.log(text);
    });




}

function get_function(){
  console.log("Get button clicked")
  
  //GET
  


}