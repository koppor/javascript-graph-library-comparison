/**
 * Created by asst on 30.05.2017.
 */

//JSON Shapes
var jsonRectangles = [
    {
        "x_ax": 20,
        "y_ax": 20,
        "width": 80,
        "height": 80,
        "class": "rectLeft",
        "lable": "Rect"
    },
    {
        "x_ax": 170,
        "y_ax": 20,
        "width": 80,
        "height": 80,
        "class": "rectRight",
        "lable": "Rect",
    }];

var jsonCircles = [
    {
        "x_axis": 30,
        "y_axis": 200,
        "radius": 40,
        "class": "circLeft",
        "lable": "Circle"
    },
    {
        "x_axis": 200,
        "y_axis": 200,
        "radius": 40,
        "class": "circRight",
        "lable": "Circle"
    }];

var width = 500, height = 500, radius= 80;

//SVG Container, # benötigt, da drawing area über div-id angesprochen wird
var svgContainer = d3.select("#canvas").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position", "absolute")
    // .style("left", -0.888889)
    .style("overflow", "hidden")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink");

var rectGroup = svgContainer.append("g");
var circGroup = svgContainer.append("g");

//Create Arrows
// var defs = svgContainer.append("defs");
//
// var defDef = defs.append("marker")
//     .attr("id", "arrow")
//     .attr("viewBox", "0 0 12 12")
//     .attr("refX", 6)
//     .attr("refY", 6)
//     .attr("markerWidth", 12)
//     .attr("markerHeight", 12)
//     .attr("orient", "auto")
//     .append("path")
//     .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
//     .style("fill", "black")
//     .attr("class", "arrow");

//Drag Shapes
var dragGroup = d3.drag()
    .on("start", function (d) {
        d3.event.sourceEvent.stopPropagation();
        console.log("drag start!");
    })
    .on("drag", dragmove);

//Draw Rectangles
var rectangles = rectGroup.selectAll("rect")
    .data(jsonRectangles)
    .enter()
    .append("rect")
    .call(dragGroup);

//Rectangles Attributes
var rectangleAttributes = rectangles
    .attr("class", function (d) {
        return d.class;
    })
    .attr("transform", function (d) {
        return "translate(" + d.x_ax + "," + d.y_ax + ")";
    })
    .attr("x", function (d) {
        return d.x_ax;
    })
    .attr("y", function (d) {
        return d.y_ax;
    })

rectGroup.selectAll("text")
    .data(jsonRectangles)
    .enter()
    .append("text")
    .attr("class", function(d) {return d.class})
    .text(function (d) { return d.lable})
    .attr("transform", function (d) {
        return "translate(" + (d.x_ax + d.width)/2 + "," + (d.y_ax+ d.height)/2 + ")";
    })
    .attr("x", function (d) {return (d.x_ax)})
    .attr("y", function (d) {return (d.y_ax)})
    .call(dragGroup);


//Draw Circles
var circles = circGroup.selectAll("circle")
    .data(jsonCircles)
    .enter()
    .append("circle")
    .call(dragGroup);

//Cicles Attributes
var circleAttributes = circles
    .attr("class", function (d) {
        return d.class;
    })
    .attr("transform", function (d) {
        return "translate(" + d.x_axis + "," + d.y_axis + ")";
    })
    .attr("cx", function (d) {
        return d.x_axis;
    })
    .attr("cy", function (d) {
        return d.y_axis;
    })
    .attr("r", function (d) {
        return d.radius;
    });

circGroup.selectAll("text2")
    .data(jsonCircles)
    .enter()
    .append("text")
    .attr("class", function(d) {return d.class})
    .text(function (d) { return d.lable})
    .attr("transform", function (d) {
        return "translate(" + (d.x_axis - d.radius) + "," + (d.y_axis) + ")";
    })
    .attr("x", function (d) {return (d.x_axis)})
    .attr("y", function (d) {return (d.y_axis)})
    .call(dragGroup);


//line between rects
var line = svgContainer.append("line")
    .style("stroke-dasharray", ("3, 3"))
    .attr("x1", 120)
    .attr("y1", 80)
    .attr("x2", 340)
    .attr("y2", 80)
    .attr("marker-end", "url(#arrow");

//line between circles
var line2 = svgContainer.append("line")
    .attr("x1", 100)
    .attr("y1", 400)
    .attr("x2", 360)
    .attr("y2", 400)
    // .attr("class", "arrowHead");
    .attr("marker-end", "url(#arrow");

//Adding Rectangle:
d3.select("#addRect").on("click", function () {
    svgContainer.append("rect")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("x", 300)
        .attr("y", 200)
        .call(dragGroup)
});

//Add Circle:
d3.select("#addCircle").on("click", function () {
    svgContainer.append("circle")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("cx", 50)
        .attr("cy", 150)
        .attr("r", 40)
        .call(dragGroup)
});

function dragmove(d) {
    var x = Math.max(radius, Math.min( width - radius,d3.event.x));
    var y = Math.max(radius, Math.min( height - radius,d3.event.y));
    if (document.getElementById("#addCircle") === true){
    d3.select(this).attr("transform", "translate(" + (x - 50) + "," + (y-150) + ")");
    } else {
    d3.select(this).attr("transform", "translate(" + (x - 300) + "," + (y-200) + ")");
    }

    if (d3.select(this).attr("class") === "rectLeft") {
        d3.select(this).attr("transform", "translate(" + (x - 100) + "," + (y - 60) + ")");
        line.attr("x1", x);
        line.attr("y1", y);
    } else if (d3.select(this).attr("class") === "rectRight") {
        d3.select(this).attr("transform", "translate(" + (x - 170) + "," + (y - 60) + ")");
        line.attr("x2", x);
        line.attr("y2", y);
    }

    if (d3.select(this).attr("class") === "circLeft") {
        d3.select(this).attr("transform", "translate(" + (x - 70) + "," + (y - 200) + ")");
        line2.attr("x1", x);
        line2.attr("y1", y);
    } else if (d3.select(this).attr("class") === "circRight") {
        d3.select(this).attr("transform", "translate(" + (x - 160) + "," + (y - 200) + ")");
        line2.attr("x2", x);
        line2.attr("y2", y);
    }
}


// draw Line
// var line = d3.line()
//     .curve(d3.curveBasis);
//
// var svgContainer = d3.select("svg")
//     .call(d3.drag()
//         .container(function() { return this; })
//         .subject(function() { var p = [d3.event.x, d3.event.y]; return [p, p]; })
//         .on("start", dragstarted));
//
// function dragstarted() {
//     var d = d3.event.subject,
//         active = svgContainer.append("path").datum(d),
//         x0 = d3.event.x,
//         y0 = d3.event.y;
//
//     d3.event.on("drag", function() {
//         var x1 = d3.event.x,
//             y1 = d3.event.y,
//             dx = x1 - x0,
//             dy = y1 - y0;
//
//         if (dx * dx + dy * dy > 100) d.push([x0 = x1, y0 = y1]);
//         else d[d.length - 1] = [x1, y1];
//         active.attr("d", line);
//     });
// }




