(function () {
    "use strict";

    //Libraries
    //The rapahel canvas
    var paper = Raphael("canvas");
    //Watches for changes in position
    var watch = WatchJS.watch;

    /**
     * Creates an arrow
     * @param source The target element
     * @param destination The source element
     */
    Raphael.fn.arrow = function (source, destination) {
        var x1 = source.attr("x") || source.attr("cx");
        var y1 = source.attr("y") || source.attr("cy");
        var x2 = destination.attr("y") || destination.attr("cy");
        var y2 = destination.attr("y") || destination.attr("cy");

        function renderPath() {
            var width = (source.attr("width") / 2) || source.attr("r");
            var sourceElement = source.center();
            var destElement = destination.center();
            return "M" + (sourceElement.x + width) + " " + sourceElement.y + "L" + (destElement.x - width) + " " + destElement.y;
        }

        renderPath();

        var object = this.path(renderPath());
        var srcAttr = source.type === "circle" ? ["cx", "cy"] : ["x", "y"];
        var destAttr = destination.type === "circle" ? ["cx", "cy"] : ["x", "y"];

        watch(source.attrs, srcAttr, function () {
            object.attr("path", renderPath());
        });

        watch(destination.attrs, destAttr, function () {
            object.attr("path", renderPath());
        });

        object.node.setAttribute("class", "line");
        return object;
    };

    /**
     * Center function
     * @returns {*}
     */
    Raphael.el.center = function () {
        var element = this;
        if (element) {
            var bbox = element.getBBox();

            if (element.type === "circle") {
                return {
                    x: bbox.cx,
                    y: bbox.cy
                };
            } else if (element.type === "rect") {
                return {
                    x: (bbox.x2 - (bbox.width / 2)),
                    y: (bbox.y2 - (bbox.height / 2))
                };
            } else if (element.type === "path") {
                return {
                    x: (bbox.x + bbox.x2) / 2,
                    y: (bbox.y + bbox.y2) / 2
                };
            }
        }
    };

    /**
     * Adds text to the element
     * @param text
     */
    Raphael.el.setText = function (text) {
        var element = this;
        var center = element.center();
        var textElement = paper.text(center.x, center.y, text);
        textElement.attr("font-size", 20);

        watch(element.attrs, ["cx", "cy", "x", "y", "path"], function () {
            var center = element.center();
            textElement.attr({x: center.x, y: center.y});
        })
    };

    /**
     * Makes an element draggable
     */
    Raphael.el.makeDraggable = function (minX, minY, maxX, maxY) {
        var element = this;
        var x, y;
        this.drag(function (dx, dy) {
            if (element.type === "rect") {
                element.attr({
                    x: Math.min(Math.max(x + dx, minX), maxX),
                    y: Math.min(Math.max(y + dy, minY), maxY)
                });
            } else if (element.type === "circle") {
                element.attr({
                    cx: Math.min(Math.max(x + dx, minX), maxX),
                    cy: Math.min(Math.max(y + dy, minY), maxY)
                });
            }
        }, function () {
            if (element.type === "rect") {
                x = element.attr("x");
                y = element.attr("y");
            } else if (element.type === "circle") {
                x = element.attr("cx");
                y = element.attr("cy");
            }
        })
    };

    /**
     * Sets the html color
     * @param htmlColor The html color
     */
    Raphael.el.setColor = function (htmlColor) {
        this.attr({
            "fill": htmlColor
        });
    };

    /**
     * Sets the stroke color
     * @param strokeColor The stroke color
     */
    Raphael.el.setStrokeColor = function (strokeColor) {
        this.attr({
            "stroke": strokeColor
        });
    };

    /**
     * Sets the stroke style
     * @param strokeStyle The stroke style
     */
    Raphael.el.setStrokeStyle = function (strokeStyle) {
        this.attr("stroke-dasharray", strokeStyle);
    };

    /**
     * Sets the class name attribute
     * @param className The classname
     */
    Raphael.el.setClassName = function (className) {
        this.node.setAttribute("class", className);
    };


    /**
     * Adds a Rectangle
     */
    function addRectangle(x, y) {
        var color = 'lightgrey';

        var rect = paper.rect(x || 10, y || 10, 80, 80);
        rect.setColor(color);

        rect.makeDraggable(0, 0, 420, 420);
        rect.setText("Rect");

        return rect;
    }

    /**
     * Inits the rectangles
     */
    function initRectangles() {
        var rectLeft = paper.rect(10, 10, 80, 80);
        rectLeft.setStrokeColor("#000");
        rectLeft.makeDraggable(0, 0, 420, 420);
        rectLeft.setColor("#d3d3d3");
        rectLeft.setText("Rect");

        var rectRight = paper.rect(410, 10, 80, 80);
        rectRight.makeDraggable(0, 0, 420, 420);
        rectRight.setColor("#d3d3d3");
        rectRight.setText("Rect");
        rectRight.setStrokeStyle("- ");
        rectRight.node.setAttribute("class", "rectRight");

        var arrow = paper.arrow(rectLeft, rectRight);

        arrow.setText("Label");
    }

    /**
     * Adds a circle
     */
    function addCircle(x, y) {
        var color = 'white';

        var circle = paper.circle(x || 50, y || 50, 40);
        circle.setColor(color);
        circle.makeDraggable(40, 40, 460, 460);
        circle.setText("Circle");
        circle.node.setAttribute("id", circle.id);

        return circle;
    }

    /**
     * Inits the circles
     */
    function initCircles() {
        var circleLeft = paper.circle(50, 450, 40);
        circleLeft.setColor("#FFF");
        circleLeft.setStrokeColor("#000");
        circleLeft.makeDraggable(40, 40, 460, 460);
        circleLeft.setText("Circle");

        var circleRight = paper.circle(450, 450, 40);
        circleRight.setColor("#FFF");
        circleRight.setStrokeColor("#000");
        circleRight.makeDraggable(40, 40, 460, 460);
        circleRight.setText("Circle");

        var arrow = paper.arrow(circleLeft, circleRight);
        arrow.setClassName("circleArrow");
        arrow.attr("stroke-dasharray", "- ");
    }

    /**
     * Exports the SVG as png image by converting it to a canvas element using canvg and then using
     * the HTML 5 canvas canvas#toDataURL
     */
    function exportAsImage() {
        var downloadWindow = window.open("Image", "Image from Raphael");
        downloadWindow.document.write('<canvas id="canvas" width="500px" height="500px"></canvas>');
        var svg = document.getElementById("canvas").innerHTML;
        canvg(downloadWindow.document.getElementById("canvas"), svg);
        var dataURL = downloadWindow.document.getElementById("canvas").toDataURL();
        downloadWindow.location = dataURL;
    }

    /**
     * Main entry method
     */
    function main() {
        initRectangles();
        initCircles();

        $("#addRectBtn").click(function () {
            addRectangle(500 / 2 - 40, 500 / 2 - 40)
        });

        $("#addCircleBtn").click(function () {
            addCircle(500 / 2, 500 / 2);
        });

        $('#exportBtn').click(exportAsImage);
    }

    main();

})();

