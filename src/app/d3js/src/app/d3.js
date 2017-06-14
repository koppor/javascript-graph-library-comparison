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
        "color": "lightgray",
        "stroke": "black",
        "label": "Rect",
        "class": "firstRect"
    },
    {
        "x_ax": 170,
        "y_ax": 20,
        "width": 80,
        "height": 80,
        "color": "lightgray",
        "stroke": "black",
        "label": "Rect",
        "class": "secondRect"
    }];

var jsonCircles = [
    {
        "x_axis": 30,
        "y_axis": 200,
        "radius": 40,
        "color": "white",
        "stroke": "black",
        "label": "Circle",
        "class": "firstCirc"
    },
    {
        "x_axis": 200,
        "y_axis": 200,
        "radius": 40,
        "color": "white",
        "stroke": "black",
        "label": "Circle",
        "class": "secondCirc"
    }];

//SVG Container, # benötigt, da drawing area über div-id angesprochen wird
var svgContainer = d3.select("#graphDraw").append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .style("border", "black");

//Create Arrows
var defs = svgContainer.append("defs");

var defDef = defs.append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 0 12 12")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 12)
    .attr("markerHeight", 12)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
    .style("fill", "black")
    .attr("class", "arrow");

//Drag Shapes
var dragGroup = d3.drag()
    .on("start", function () {
        d3.event.sourceEvent.stopPropagation();
        console.log("drag start!");
    })
    .on("drag", dragmove);

//Draw Rectangles
var rectangles = svgContainer.selectAll("rect")
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
    .attr("width", function (d) {
        return d.width;
    })
    .attr("height", function (d) {
        return d.height;
    })
    .style("fill", function (d) {
        return d.color;
    })
    .style("stroke", function (d) {
        return d.stroke;
    })


rectangles.append("text")
    .attr("dx", function(d){return -20})
    .style("fill", "black")
    .style("font-size", 14)
    .text(function (d) {return d.label});

//Draw Circles
var circles = svgContainer.selectAll("circle")
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
    })
    .style("fill", function (d) {
        return d.color;
    })
    .style("stroke", function (d) {
        return d.stroke;
    })
    .append("text")
    .text("Circle");

//line between rects
var line = svgContainer.append("line")
    .style("stroke", "black")
    .attr("x1", 120)
    .attr("y1", 70)
    .attr("x2", 340)
    .attr("y2", 70)
    .attr("marker-end", "url(#arrow");

//line between circles
var line2 = svgContainer.append("line")
//.style("stroke-dasharray", ("3, 3"))
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke", "black")
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
        .attr("class", "newRect")
        .attr("x", 40)
        .attr("y", 40)
        .attr("width", 80)
        .attr("height", 80)
        .style("border", "black")
        // .style("stroke", "black")
        // .style("fill", "none")
        .call(dragGroup)
});

//Add Circle:
d3.select("#addCircle").on("click", function () {
    svgContainer.append("circle")
        .attr("class", "newCirc")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("cx", 60)
        .attr("cy", 400)
        .attr("r", 40)
        .style("border", "black")
        // .style("stroke", "black")
        // .style("fill", "none")
        .call(dragGroup)
});

function dragmove(d) {
    var x = d3.event.x;
    var y = d3.event.y;

    if (d3.select(this).attr("class") === "newCirc") {
        d3.select(this).attr("transform", "translate(" + (x - 60) + "," + (y - 400) + ")");
    } else {
        d3.select(this).attr("transform", "translate(" + (x - 40) + "," + (y - 40) + ")");
    }

    if (d3.select(this).attr("class") === "firstRect") {
        d3.select(this).attr("transform", "translate(" + (x - 100) + "," + (y - 50) + ")");
        line.attr("x1", x);
        line.attr("y1", y);
    } else if (d3.select(this).attr("class") === "secondRect") {
        d3.select(this).attr("transform", "translate(" + (x - 170) + "," + (y - 50) + ")");
        line.attr("x2", x);
        line.attr("y2", y);
    }

    if (d3.select(this).attr("class") === "firstCirc") {
        d3.select(this).attr("transform", "translate(" + (x - 70) + "," + (y - 200) + ")");
        line2.attr("x1", x);
        line2.attr("y1", y);
    } else if (d3.select(this).attr("class") === "secondCirc") {
        d3.select(this).attr("transform", "translate(" + (x - 160) + "," + (y - 200) + ")");
        line2.attr("x2", x);
        line2.attr("y2", y);
    }
}

//Save SVG as Img
d3.select('#saveButton').on('click', function () {
    var html = d3.select("svg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;

    //console.log(html);
    var imgsrc = 'data:image/svg+xml;base64,' + btoa(html);
    var img = '<img src="' + imgsrc + '">';
    d3.select("#svgdataurl").html(img);


    var canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    var image = new Image;
    image.src = imgsrc;
    image.onload = function () {
        context.drawImage(image, 0, 0);

        var canvasdata = canvas.toDataURL("image/png");

        var pngimg = '<img src="' + canvasdata + '">';
        d3.select("#pngdataurl").html(pngimg);

        var a = document.createElement("a");
        a.download = "sample.png";
        a.href = canvasdata;
        a.click();
    };
});


//alternative
// d3.select('#saveButton').on('click', function(){
// var html = d3.select("svg")
//     .attr("title", "test2")
//     .attr("version", 1.1)
//     .attr("xmlns", "http://www.w3.org/2000/svg")
//     .node().parentNode.innerHTML;
// d3.select("body").append("div")
//     .attr("id", "download")
//     .html("Right-click on this preview and choose Save as<br />Left-Click to dismiss<br />")
//     .append("img")
//     .attr("src", "data:image/svg+xml;base64,"+ btoa(html));
// });


// var tooltip = d3.select("")
//     .append("div")
//     .attr('class','tooltipdiv')
//     .style("position", "absolute")
//     .style("z-index", "10")
//     .style("visibility", "hidden")
//     .text("a simple tooltip");
//
// circles.on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d);})
//     .on("mousemove", function(){return tooltip.style("top",
//         (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
//     .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


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




