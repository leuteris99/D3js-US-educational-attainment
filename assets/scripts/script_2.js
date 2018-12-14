/**
 * Chart of the map of USA
 */
var dataSet = 0; // a variable that shows which radio button is pressed

// create the svg
var canvas = d3.select("#map-chart")
    .append("svg")
    .attr("width",620 * 8)
    .attr("height", 210 * 8)

//data to create the map
d3.json("assets/data/Map/cb_2017_us_state_5m.json", function(data){
    //data for the students of each state
    d3.json("assets/data/us.json", function(usdata){
        // create the groups that contain the geographic data of each state
        var group = canvas.selectAll("g")
            .data(data.features)
            .enter()
                .append("g");

        var projection = d3.geoMercator().scale(100 * 8).translate([300 * 8,180 * 8]);
        var path = d3.geoPath().projection(projection);

        // adding the path(contains the data) and some attr in the states
        var areas = group.append("path")
            .attr("d", path)
            .attr("class", "area")
            .attr("id", function(d,i){ return "state" + i; })
            .attr("opacity", 0.7)
            .attr("fill", "steelblue")
            .attr("stroke", "black")
            .on("mouseover", function(d,i){ mouseHoverState(d,i); })
            .on("mouseout", function(d,i){ mouseOutState(d,i); });

        // Text that shows the name of the selected state
        canvas.append("text")
            .attr("id", "selectText")
            .attr("transform", "translate(50,700)")
            .attr("font-size","5em")
            .text("Select A State");

        // Text that shows some additional data for the selected state
        canvas.append("text")
            .attr("id", "dataText")
            .attr("transform", "translate(50,800)")
            .attr("font-size","3em")
            .text("");

        // function that triggers when the cursor is hovering a state
        function mouseHoverState(d,i){
            d3.select("#selectText")
                .text(function(){ return d.properties.NAME; });

            getStateData(searchStateData(d));

            d3.select("#state" + i)
                .attr("opacity", 1);
        }
        // function that triggers when the cursor is leaving a state
        function mouseOutState(d,i){
            d3.select("#state" + i)
                .attr("opacity", 0.7);

            responsiveVoice.cancel();
        }

        // Takes the selected state from the map json file 
        // and search by name inside the us.json file,
        // than returns where you can find the selected state in us.json
        function searchStateData(d){
            for(var j = 0; j < usdata.children.length; j++){
                for(var k = 0; k < usdata.children[j].children.length; k++){
                    if(usdata.children[j].children[k].name === d.properties.NAME){
                        var ar = [j,k];
                        return ar;
                    }
                }
            }
        }
        // Takes as arguments where you can find the selected state
        // in us.json, than execute the corresponding code
        // to vizualize the data based to which radio button is selected
        function getStateData(ar){
            switch(dataSet){
                case 0:
                    d3.select("#dataText")
                        .text(function(){ return usdata.children[ar[0]].children[ar[1]]["Total College"] + " Total Students";});
                    responsiveVoice.speak("Total students at the college in " + usdata.children[ar[0]].children[ar[1]].name +": " + usdata.children[ar[0]].children[ar[1]]["Total College"]);
                    break;
                case 1:
                    d3.select("#dataText")
                        .text(function(){ return usdata.children[ar[0]].children[ar[1]]["Percent College"] + "% Students in College";});
                        responsiveVoice.speak("Percent of students at the college in " + usdata.children[ar[0]].children[ar[1]].name +": " + usdata.children[ar[0]].children[ar[1]]["Percent College"] + " percent");
                    break;
                case 2:
                    d3.select("#dataText")
                        .text(function(){ return usdata.children[ar[0]].children[ar[1]]["Percent College - Male"] + "% Male Students in College";});
                        responsiveVoice.speak("Percent of male students at the college in " + usdata.children[ar[0]].children[ar[1]].name +": " + usdata.children[ar[0]].children[ar[1]]["Percent College - Male"] + " percent");
                    break;
                case 3:
                    d3.select("#dataText")
                        .text(function(){ return usdata.children[ar[0]].children[ar[1]]["Percent College - Female"] + "% Female Students in College";});
                        responsiveVoice.speak("Percent of female students at the college in " + usdata.children[ar[0]].children[ar[1]].name +": " + usdata.children[ar[0]].children[ar[1]]["Percent College - Female"] + " percent");
                    break;
                default:
                    d3.select("#dataText")
                        .text(function(){ return usdata.children[ar[0]].children[[1]]["Total College"] + " Total Students";});
            }
        }
    })
});

// onClick Listeners for the radio buttons
d3.select("#mode1")
    .on("click", function(){ dataSet = 0; });
d3.select("#mode2")
    .on("click", function(){ dataSet = 1; });
d3.select("#mode3")
    .on("click", function(){ dataSet = 2; });
d3.select("#mode4")
    .on("click", function(){ dataSet = 3; });

    //     -----Testing logs-----
    //     console.log(usdata);
    //     console.log(usdata.children[0].children[0]["Total College"]);
    //     console.log(usdata.children[0].children[0].name);
    //     console.log(usdata.children[0].children.length);