/**
 * Created by asst on 30.05.2017.
 */

//JSON Shapes
var jsonCircles = [
    { "x_axis": 30, "y_axis": 30, "radius": 20, "color": "white", "stroke": "black"},
    { "x_axis": 170, "y_axis": 30, "radius": 20, "color": "white", "stroke": "black"}];

var jsonRectangles = [
    { "x_ax": 30, "y_ax": 100, "width": 50, "height": 50, "color": "white", "stroke": "black"},
    { "x_ax": 170, "y_ax": 100, "width": 50, "height": 50, "color": "white", "stroke": "black"}];

//JSON Lines
//var jsonLines = [
  //  { "x_1": 50,"y_1": 30,"x_2": 150,"y_2": 30,"stroke": "black"},
    //{ "x_1": 50,"y_1": 100 ,"x_2":150 ,"y_2": 100,"stroke": "black"}];

//SVG Container
var svgContainer = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .style("stroke", "black");

// Define drag beavior
//var drag = d3.drag()
  //  .on("drag", dragmove);

//Drag nodes
var drag = d3.drag()
    //.on("drag", function() {
      //  d3.event.sourceEvent.stopPropagation()
    //})
    .on("drag", dragmove);

//Draw Circles
var circles = svgContainer.selectAll("circle")
    .data(jsonCircles)
    .enter()
    .append("circle")
    .call(drag);

//Cicles Attributes
var circleAttributes = circles
    .attr("cx", function (d) {return d.x_axis;})
    .attr("cy", function (d) {return d.y_axis;})
    .attr("r", function (d) {return d.radius;})
    .style("fill", function(d) {return d.color;})
    .style("stroke", function (d) {return d.stroke;});

//Draw Rectangles
var rectangles = svgContainer.selectAll("rect")
    .data(jsonRectangles)
    .enter()
    .append("rect")
    .call(drag);

//Cicles Attributes
var rectangleAttributes = rectangles
    .attr("x", function (d) {return d.x_ax;})
    .attr("y", function (d) {return d.y_ax;})
    .attr("width", function (d) {return d.width;})
    .attr("height", function(d) {return d.height;})
    .style("fill", function(d) {return d.color;})
    .style("stroke", function (d) {return d.stroke;});

//var line = svgContainer.selectAll("line")
//          .data(jsonLines)
//        .enter()
//      .append("line");

//var lineAttributes = line
//					.attr("x1", function(d) {return d.x_1;})
//					.attr("y1", function(d) {return d.y_1;})
//					.attr("x2", function(d) {return d.x_2;})
//					.attr("y2", function(d) {return d.y_2;})
//					.style("fill", function(d) {return d.stroke});

var line = svgContainer.append("line")
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke", "blue")
    .attr("x1", 50)
    .attr("y1", 30)
    .attr("x2", 150)
    .attr("y2", 30);

var line = svgContainer.append("line")
//.style("stroke-dasharray", ("3, 3"))
    .style("stroke", "green")
    .attr("x1", 80)
    .attr("y1", 125)
    .attr("x2", 170)
    .attr("y2", 125)
    .attr("class", "arrowHead");

function dragmove(d) {
    var x = d3.event.x;
    var y = d3.event.y;
    d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}

