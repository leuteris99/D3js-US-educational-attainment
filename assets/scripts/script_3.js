var height  = 400;//height of the svg canvas
var r = 200;//radius of the pies
//array that contains the names for all the states of u.s.
var states = ["Alabama","Alaska","Arizona",	"Arkansas",	"California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine	Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

d3.tsv("assets/data/data.tsv", function(data){
    //colors of the pies
    var color = d3.scaleOrdinal(["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4caf50","#8bc34a","#cddc39","#ffeb3b","#ffc107","#ff9800","#ff5722"]);
    var totalData1 = [];//array that contains the number of students in every state (A-M)
    var totalData2 = [];//array that contains the number of students in every state (N-W)
    for(var i = 0; i < states.length / 2; i++){
        totalData1[i] = data[0][states[i]];//fill the array with the data
    }
    for(var i = Math.round(states.length / 2),j=0; i < states.length; i++,j++){
        totalData2[j] = data[0][states[i]];//fill the array with the data
    }

    /** First chart (A-M)*/

    var canvas = d3.select("#pizza-chart")
        .append("svg")
        .attr("width", 600)
        .attr("height", height);

    var group = canvas.append("g")
        .attr("transform", "translate(300,200)");

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(r);

    var pie = d3.pie()
        .value(function(d){ return d; })
        .sort(null);
        
    var arcs = group.selectAll(".arc")
        .data(pie(totalData1))
        .enter()
            .append("g")
            .attr("class", "arc")
            .on("mouseover", function(d,i){ onMouseHover(d,i); })
            .on("mouseout", function(d,i){ onMouseOut(); });

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function(d){ return color(d.data); });

    //creating the "Select State" text
    canvas.append("g")
        .attr("id","selectText")
        .attr("transform", "translate(450,25)")
        .attr("font-size", "1em")
        .append("text")
            .text("Select State A-W");
    //create the value text under the Select State
    canvas.append("g")
        .attr("id","valueText")
        .attr("transform", "translate(450,40)")
        .attr("font-size", "0.8em")
        .append("text")
            .text("");
 
    canvas.append("g")
        .attr("transform", "translate(50,25)")
        .append("text")
            .text("States: A-M");


    /** Second chart (N-W)*/

    var canvasV2 = d3.select("#pizza-chart")
        .append("svg")
        .attr("width", 600)
        .attr("height", height);

    var groupV2 = canvasV2.append("g")
        .attr("transform", "translate(300,200)");

    var arcsV2 = groupV2.selectAll(".arc")
        .data(pie(totalData2))
        .enter()
            .append("g")
            .attr("class", "arc")
            .on("mouseover", function(d,i){ onMouseHover(d,i + totalData1.length); })
            .on("mouseout", function(d,i){ onMouseOut(); });

    arcsV2.append("path")
        .attr("d", arc)
        .attr("fill", function(d){ return color(d.data); });

    canvasV2.append("g")
        .attr("transform", "translate(50,25)")
        .append("text")
            .text("States: N-W");
    

    // onmouse functions
    function onMouseHover(d,i){
        var detailData = [];//array that contains the number of students of a state in a specific age
        for(var j = 1; j < 8; j++){
            detailData[j-1] = data[j][states[i]]; 
        }

        /** Details chart */
        // creates the details chart when the mouse is on hover
        var canvasV3 = d3.select("#pizza-chart")
            .append("svg")
            .attr("id", "details")
            .attr("width", 600)
            .attr("height", height);

        var groupV3 = canvasV3.append("g")
            .attr("transform", "translate(300,200)");

        var arcsV3 = groupV3.selectAll(".arc")
            .data(pie(detailData))
            .attr("class","details")
            .enter()
                .append("g")
                .attr("class", "arc");

        arcsV3.append("path")
            .attr("d", arc)
            .attr("fill", function(d){ return color(d.data); });

        // create the text inside the details pie
        var school = ["in preschool","in kindergarten","in grade 1 to grade 4","in grade 5 to grade 8","in high school","in college","in graduate school"];
        arcsV3.append("text")
            .attr("transform", function(d){ return "translate(" + arc.centroid(d) + ")" + "rotate(" + angle(d) + ")"; })
            .attr("text-anchor", "middle")
            .attr("font-size", "2.5em")
            .text(function(d,i){ return school[i]; });

        // Change the text to the selected state and the number of students
        d3.select("#selectText text")
            .text(states[i]);

        d3.select("#valueText text")
            .text(data[0][states[i]] + " Students");
    }

    function onMouseOut(){
        d3.select("#details")
            .remove();
        //make the text back to the default when the mouse stop hovering the state
        d3.select("#selectText text")
            .text("Select State A-W");

        d3.select("#valueText text")
            .text("");
    }

    // function that finds the angle to rotate the text inside the details pie
    function angle(d) {
        var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a - 180 : a;
      }
});
