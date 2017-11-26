//Define Margin
var margin = {left: 80, right: 80, top: 50, bottom: 50 }, 
    width = 960 - margin.left -margin.right,
    height = 500 - margin.top - margin.bottom;

//Define Tooltip
var tooltip = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

//Define Scales   
var x = d3.scale.linear()
    .domain([0,16]).range([0, width]);

var y = d3.scale.linear()
    .domain([-10,400]).range([height, 0]);

//Zoom Var
var zoom = d3.behavior.zoom().x(x).y(y).scaleExtent([1, 32]).on("zoom", zoomed);

//Define SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom);

//Define X-axis
var xAxis = d3.svg.axis().scale(x).orient("bottom").tickSize(-height);


//Define Y-axis
var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5).tickSize(-width);

//Zoom
function zoomed() {
    svg.selectAll(".dot")
        .attr("cx", function(d) {return x(d.gdp);})
        .attr("cy", function(d) {return y(d.epc);})
    svg.select(".x.axis").call(xAxis)
    svg.select(".y.axis").call(yAxis)
}

//Get Data for everything
d3.csv("scatterdata.csv", function(error, data) {

//color
    var colors = d3.scale.category10();
    colors.domain(d3.keys(data[0]).filter(function(key) { return key !== "country"; }));
    
    data.forEach(function(d) {
        d.country = d.country;
        d.gdp = +d.gdp;
        d.population = +d.population;
        d.epc = +d.epc;
        d.total = +d.total;
    });
    
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none");

    //scatterplot
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) { return Math.sqrt(d.total)/.2; })
        .attr("cx", function(d) {return x(d.gdp);})
        .attr("cy", function(d) {return y(d.epc);})
        .style("fill", function (d) { return colors(d.country); })
        .on("mouseover", function(d) {
            tooltip .transition()
                    .duration(500)
                    .style("opacity", .9);
            tooltip .html("<strong><u>" + d.country + "</u></strong>"+ "<br/>"
                          + "<strong>Population : </strong>" + d.population + " Million" + "<br/>"
                          + "<strong>GDP : </strong>" + d.gdp + " Trillion" + "<br/>"
                          + "<strong>EPC : </strong>" + d.epc + " Million BTUs" + "<br/>"
                          + "<strong>TEC : </strong>" + d.total + " Trillion BTUs")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            tooltip .transition()        
                    .duration(500)      
                    .style("opacity", 0);
        });

    //x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("y", 50)
        .attr("x", width/2)
        .style("text-anchor", "end")
        .attr("font-size", "16px")
        .text("GDP (in Trillion US Dollars) in 2010");


    //y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -50)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("font-size", "16px")
        .text("Energy Consumption per Capita (in Million BTUs per person)");

    // legend
    svg.append("rect")
        .attr("x", width-250)
        .attr("y", height-190)
        .attr("width", 220)
        .attr("height", 180)
        .attr("fill", "lightgrey")
        .style("stroke-size", "1px");

    svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-100)
        .attr("cy", height-175)
        .style("fill", "white");

    svg.append("circle")
        .attr("r", 15.8)
        .attr("cx", width-100)
        .attr("cy", height-150)
        .style("fill", "white");

    svg.append("circle")
        .attr("r", 50)
        .attr("cx", width-100)
        .attr("cy", height-80)
        .style("fill", "white");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-15)
        .style("text-anchor", "middle")
        .style("fill", "Black") 
        .attr("font-size", "20px")
        .text("Total Energy Consumption");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-150)
        .style("text-anchor", "end")
        .text(" 10 Trillion BTUs");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-80)
        .style("text-anchor", "end")
        .text(" 100 Trillion BTUs");
   
    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-165)
        .style("text-anchor", "end")
        .text(" 1 Trillion BTUs");
    

});