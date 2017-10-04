/**
 * Created by asst on 30.05.2017.
 */

(function () {
    "use strict";

//JSON Shapes
    var jsonRectangles = [
        {
            "x_ax": 10, "y_ax": 10, "width": 80, "height": 80, "class": "rectLeft", "lable": "Rect"
        },
        {
            "x_ax": 200, "y_ax": 10, "width": 80, "height": 80, "class": "rectRight", "lable": "Rect",
        }];

    var jsonCircles = [
        {
            "x_axis": 25, "y_axis": 220, "radius": 40, "class": "circLeft", "lable": "Circle"
        },
        {
            "x_axis": 220, "y_axis": 220, "radius": 40, "class": "circRight", "lable": "Circle"
        }];

    var width = 500, height = 500, radius = 6;

//SVG Container, # benötigt, da drawing area über div-id angesprochen wird
    var svgContainer = d3.select("#canvas").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("position", "absolute")
        .style("overflow", "hidden")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink");

//Drag Shapes
    var dragGroup = d3.drag()
        .on("start", function (d) {
            d3.event.sourceEvent.stopPropagation();
            console.log("drag start!");
        })
        .on("drag", dragmove);

//Rectangle Groups
    var rectGroups = svgContainer.selectAll(".rectGroups")
        .data(jsonRectangles)
        .enter()
        .append("g")
        .attr("class", function (d) {
            return d.class;
        })
        .call(dragGroup);

    rectGroups.append('rect')
        .attr("x", function (d) {
            return d.x_ax;
        })
        .attr("y", function (d) {
            return d.y_ax;
        })
        .attr("transform", function (d) {
            return "translate(" + d.x_ax + "," + d.y_ax + ")";
        })
        .attr("id", function (d) {
            return d.class;
        })
        .attr("width", "80")
        .attr("height", "80")
        .style("fill", "#D3D3D3")
        .style("stroke", "black");

    rectGroups.append('text')
        .text(function (d) {
            return d.lable
        })
        .attr("transform", function (d) {
            return "translate(" + (d.x_ax + d.width / 2 - 20) + "," + (d.y_ax + d.height / 2) + ")";
        })
        .attr("x", function (d) {
            return (d.x_ax)
        })
        .attr("y", function (d) {
            return (d.y_ax)
        })
        .style("font-size", "20px")
        .style("fill", "black");

//Add Circles
    var circGroups = svgContainer.selectAll(".circGroups")
        .data(jsonCircles)
        .enter()
        .append("g")
        .attr("class", function (d) {
            return d.class;
        })
        .call(dragGroup);

    circGroups.append('circle')
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
        .style("fill", "white")
        .style("stroke", "black");

    var circLables = circGroups.append('text')
        .text(function (d) {
            return d.lable
        })
        .attr("transform", function (d) {
            return "translate(" + (d.x_axis - d.radius + 15) + "," + (d.y_axis + 5) + ")";
        })
        .attr("x", function (d) {
            return (d.x_axis)
        })
        .attr("y", function (d) {
            return (d.y_axis)
        })
        .style("font-size", "20px")
        .style("fill", "black");


    var lables = svgContainer.append("g")
        .attr("class", "line1");

//Line between rects
    var line = lables.append("line")
        .attr("x1", 100)
        .attr("y1", 60)
        .attr("x2", 400)
        .attr("y2", 60)
        .style("stroke", "black");

    lables
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .append("text")
        .attr("x", 220)
        .attr("y", 65)
        .text("Label")
        .attr("id","rectLabel")
        .style("font-size", "20px");

//line between circles
    var line2 = svgContainer.append("line")
        .style("stroke-dasharray", ("3, 3"))
        .attr("x1", 90)
        .attr("y1", 440)
        .attr("x2", 400)
        .attr("y2", 440)
        .style("stroke", "black");

//Adding Rectangle:
    d3.select("#addRectBtn").on("click", function () {
        svgContainer.append("rect")
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .attr("x", 210)
            .attr("y", 210)
            .attr("width", "80px")
            .attr("height", "80px")
            .style("fill", "lightgrey")
            .style("stroke", "black")
            .call(dragGroup)
    });

//Add Circle:
    d3.select("#addCircleBtn").on("click", function () {
        svgContainer.append("circle")
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .attr("cx", 250)
            .attr("cy", 250)
            .attr("r", 40)
            .style("fill", "white")
            .style("stroke", "black")
            .call(dragGroup)
    });

    function updateLabel(x1,y1,x2,y2) {
        var x = (parseInt(x1,10)+parseInt(x2,10))/2;
        var y = (parseInt(y1,10)+parseInt(y2,10))/2;
        // d3.select("#rectLabel").attr("x", x);
        // d3.select("#rectLabel").attr("y", y);
        d3.select("#rectLabel").attr("transform", function () {
            return "translate(" + x  + "," + y  + ")"
        });
        debugger;

    }

    function dragmove(d) {

        var x = Math.min(Math.max(40, d3.event.x, 80), 500);
        var y = Math.min(Math.max(40, d3.event.y, 40), 460);

        if (d3.select(this).attr("id") === "#rectLabel") {
            d3.select(this).attr("transform", function () {
                return "translate(" + x - 100 + "," + y - 100 + ")"
            })
        }

        if (document.getElementById("#addCircleBtn") === true) {
            d3.select(this).attr("transform", "translate(" + (x - 250) + "," + (y - 250) + ")");
        } else {
            d3.select(this).attr("transform", "translate(" + (x - 250) + "," + (y - 250) + ")");
        }

        if (d3.select(this).attr("class") === "rectLeft") {
            var x = Math.min(Math.max(40, d3.event.x, 80), 500);
            var y = Math.min(Math.max(40, d3.event.y, 40), 460);
                updateLabel(d3.select("#rectLeft")
                .attr("x"),d3.select("#rectLeft")
                .attr("y"),d3.select("#rectRight")
                .attr("x"),d3.select("#rectRight")
                .attr("y")
            );
        } else if (d3.select(this).attr("class") === "rectRight") {
            var x = Math.min(Math.max(d3.event.x, 0), 420);
            var y = Math.min(Math.max(40, d3.event.y, 40), 460);
            updateLabel(d3.select("#rectLeft")
                .attr("x"),d3.select("#rectLeft")
                .attr("y"),d3.select("#rectRight")
                .attr("x"),d3.select("#rectRight")
                .attr("y")
            );

        } else if (d3.select(this).attr("class") === "circLeft") {
            var x = Math.min(Math.max(40, d3.event.x, 80), 500);
            var y = Math.min(Math.max(40, d3.event.y, 40), 460);
        } else if (d3.select(this).attr("class") === "circRight") {
            var x = Math.min(Math.max(d3.event.x, 0), 420);
            var y = Math.min(Math.max(40, d3.event.y, 40), 460);
        }

        if (d3.select(this).attr("class") === "rectLeft") {
            d3.select(this).attr("transform", "translate(" + (x - 100) + "," + (y - 60) + ")");
            line.attr("x1", x);
            line.attr("y1", y);
        } else if (d3.select(this).attr("class") === "rectRight") {
            d3.select(this).attr("transform", "translate(" + (x - 400) + "," + (y - 60) + ")");
            line.attr("x2", x);
            line.attr("y2", y);
        }
        if (d3.select(this).attr("class") === "circLeft") {
            d3.select(this).attr("transform", "translate(" + (x - 90) + "," + (y - 440) + ")");
            line2.attr("x1", x);
            line2.attr("y1", y);
        } else if (d3.select(this).attr("class") === "circRight") {
            d3.select(this).attr("transform", "translate(" + (x - 400) + "," + (y - 440) + ")");
            line2.attr("x2", x);
            line2.attr("y2", y);
        }
    }

//Print function
    d3.select("#exportBtn").on("click", function () {
        var downloadWindow = window.open("Image", "Image from D3");
        downloadWindow.document.write('<canvas id="canvas" width="500px" height="500px"></canvas>');
        var svg = document.getElementById("canvas").innerHTML;
        canvg(downloadWindow.document.getElementById("canvas"), svg.trim());
        var dataURL = downloadWindow.document.getElementById("canvas").toDataURL();
        downloadWindow.location = dataURL;
    });

})();
