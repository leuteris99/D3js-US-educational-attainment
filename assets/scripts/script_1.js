var width = 950;
var height = 450;

        d3.select("#pie-chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
                .attr("id", "barGroup");

        var canvas = d3.select("#barGroup");

        d3.tsv("assets/data/species.tsv", function(data){
            var colorLight = d3.scaleOrdinal()
                .range(["#2196f3","#4caf50","#ffeb3b","#ff5722","#f44336"]);
            var colorDark = d3.scaleOrdinal()
                .range(["#0069c0","#087f23","#c8b900","#c41c00","#b90007"]);

            canvas.append("g")
                .attr("id", "bars")
                .selectAll("rect")
                .data(data)
                .enter()
                    .append("rect")
                    .attr("id", function(d,i){ return "rect" + i; })
                    .attr("width", 10)
                    .attr("height", 25)
                    .attr("y", function(d,i){ return i * 50; })
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

            canvas.append("g")
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

            function onBarHover(d,i){
                var curTxt = "#txt" + i;
                var curRect = "#rect" + i;
                var infoText = "Education Level: " + d["Education Level"]
                + ", Percent: " + (d.Percent * 100)   + "%, Count: " + d.Count
                + " , Age Range: " + d["Age Range"];

                d3.select(curRect)
                    .transition()
                        .duration(500)
                        .attr("fill", function(d){ return colorDark(d.Percent); })
                        .attr("width", 950)
                        .attr("height", 60)
                        .attr("transform", "translate(0,-15)");

                d3.select(curTxt)
                    .text(function(d){ 
                        return  infoText;
                    });
                
                responsiveVoice.speak(infoText);
            }

            function onBarOut(d,i){
                var curTxt = "#txt" + i;
                var curRect = "#rect" + i;

                d3.select(curRect)
                    .transition()
                        .duration(500)
                        .attr("fill", function(d){ return colorLight(d.Percent); })
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