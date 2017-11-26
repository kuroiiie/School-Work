/* ----------------------------------------------------------------------------
File: MultiLine.js
Contructs the multi line graph using D3
-----------------------------------------------------------------------------*/ 

// Search "D3 Margin Convention" on Google to understand margins.
var margin = {top: 100, right: 80, bottom: 75, left:80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Define SVG
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parses incoming date into Year format
var parseDate = d3.time.format("%Y").parse;

/* --------------------------------------------------------------------
SCALE and AXIS are two different methods of D3. See D3 API Refrence and 
look up SVG AXIS and SCALES. See D3 API Refrence to understand the 
difference between Ordinal vs Linear scale.
----------------------------------------------------------------------*/

// Define X and Y SCALE. 
var x = d3.time.scale()
.range([0, width]);

var y = d3.scale.linear()
.range([height, 0]);

// Defines colors
var color = d3.scale.category10();

// Define X and Y AXIS
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(12);

// Define X and Y Grid
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);

// functions for the X and Y Grid to be created
function gridXaxis() {
    return d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(12)
}

function gridYaxis() {
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10)
}

// Interpolates the line
var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.epc); });



// EPC_2000_2010_new.csv
d3.csv("EPC_2000_2010_new.csv", function(error, data) {
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

    data.forEach(function(d) {
        d.date = parseDate(d.date);
    });

    var cities = color.domain().map(function(name) {
        return {
            name: name,
            values: data.map(function(d) {
                return {date: d.date, epc: +d[name]};
            })
        };
    });
    
    // Return X and Y SCALES (domain)
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([
        d3.min(cities, function(c) { return d3.min(c.values, function(v) { return +v.epc; }); }),
        d3.max(cities, function(c) { return d3.max(c.values, function(v) { return +v.epc; }); })
    ]);
    
    // xAxis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")

    // yAxis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -170)
        .attr("dy", "-3em")
        .style("font-size", "20px")
        .style("text-anchor", "middle")
        .text("Energy Consumption per Capita");

    // xAxis grid
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(gridXaxis()
              .tickSize(-height, 0, 0)
              .tickFormat("")
        )
    
    //  yAxis grid
    svg.append("g")         
        .attr("class", "grid")
        .call(gridYaxis()
              .tickSize(-width, 0, 0)
              .tickFormat("")
        )

    //  xAxis label
    svg.append("text")
        .attr("transform", "translate(" + (width/2) + " ," + (height + margin.bottom ) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Year");

  
    // data for each country
    var city = svg.selectAll(".city")
        .data(cities)
        .enter().append("g")
        .attr("class", "city");

    
    // data values(d.value) labels
    city.append("text")
        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
        .transition().duration(1000)
        .delay( function(d,i) {
            return i * 300;
        })
        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.epc) + ")"; })
        .attr("x", 3)
        .attr("dy", ".35em")
        .style("font-size", "13px")
        .text(function(d) { return d.name; });
      
    //  title of the graph
    svg.append("text")
        .attr("x", (width / 2))     
        .attr("y", 0 - (margin.top / 2))
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .style("font-size", "40px")
        .style("text-decoration", "underline")
        .text("EPC 2000 to 2010");

    //  country paths
    city.append("path")
        .attr("class", "line")
        .transition().duration(1000)
        .delay( function(d,i) {
            return i * 500;
        })
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return color(d.name); });

});