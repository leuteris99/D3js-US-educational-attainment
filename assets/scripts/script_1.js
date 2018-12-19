var width = 950;    // width of the svg
var height = 450;   // height of the svg

// create the svg
d3.select("#bar-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
        .append("g")
            .attr("id", "barGroup");

    var canvas = d3.select("#barGroup");

    // add the data file
    d3.tsv("assets/data/species.tsv", function(data){
        // setup the color for the bars
        var colorLight = d3.scaleOrdinal()
            .range(["#2196f3","#4caf50","#ffeb3b","#ff5722","#f44336"]);

        // create the bars
        d3.select("#bar-chart #barGroup").append("g")
            .attr("id", "bars")
            .selectAll("rect")
            .data(data)
            .enter()
                .append("rect")
                .attr("id", function(d,i){ return "rect" + i; })
                .attr("width", 10)
                .attr("height", 25)
                .attr("y", function(d,i){ return i * 50; })
                .attr("opacity", "0.9")
                .attr("fill", function(d){ return colorLight(d.Percent); })
                .on("mouseover", function(d,i){
                    onBarHover(d,i);
                })
                .on("mouseout", function(d,i){
                    onBarOut(d,i);
                })
                .transition()
                    .duration(1500)
                    .attr("width", function(d){ return d.Percent * 2500; });

        // create the text of the bars
        d3.select("#bar-chart #barGroup").append("g")
            .attr("id", "labels")
            .selectAll("text")
            .data(data)
            .enter()
                .append("text")
                .attr("id", function(d,i){ return "txt" + i; })
                .attr("y", function(d,i){ return (i * 50) + 20})
                .attr("x", 10)
                .attr("fill", "white")
                .text(function(d){ return d["Education Level"]; })
                .on("mouseover", function(d,i){
                     onBarHover(d,i);
                })
                .on("mouseout", function(d,i){
                    onBarOut(d,i);
                });

        // function that executes when the cursor is hovering a bar
        function onBarHover(d,i){
            var curTxt = "#txt" + i;
            var curRect = "#rect" + i;
            var infoText = "Education Level: " + d["Education Level"]
            + ", Percent: " + (d.Percent * 100)   + "%, Count: " + d.Count
            + " , Age Range: " + d["Age Range"];

            d3.select(curRect)
                .transition()
                    .duration(500)
                    .attr("opacity", "1")
                    .attr("width", 950)
                    .attr("height", 60)
                    .attr("transform", "translate(0,-15)");

            d3.select(curTxt)
                .text(function(d){ 
                    return  infoText;
                });
            
            responsiveVoice.speak(infoText);
        }

        // function that executes when the cursor is leaving a bar
        function onBarOut(d,i){
            var curTxt = "#txt" + i;
            var curRect = "#rect" + i;

            d3.select(curRect)
                .transition()
                    .duration(500)
                    .attr("opacity","0.9")
                    .attr("width", function(){ return d.Percent * 2500; })
                    .attr("height", 25)
                    .attr("transform", "translate(0,0)");

            d3.select(curTxt)
                .text(function(d){
                    return d["Education Level"];
                });
            
            responsiveVoice.cancel();
        }
    });