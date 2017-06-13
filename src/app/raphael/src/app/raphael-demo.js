(function () {
    "use strict";
    //Libraries
    var paper = Raphael("canvas");
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
            object.attr({
                "arrow-end": "block-wide-long",
                "arrow-start": "block-wide-long"
            });
        });

        watch(destination.attrs, destAttr, function () {
            object.attr("path", renderPath());
            object.attr({
                "arrow-end": "block-wide-long",
                "arrow-start": "block-wide-long"
            });
        });

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
    Raphael.el.text = function (text) {
        var element = this;
        var center = element.center();
        var textElement = paper.text(center.x, center.y, text);

        watch(element.attrs, ["cx", "cy", "x", "y", "path"], function () {
            var center = element.center();
            textElement.attr({x: center.x, y: center.y});
        })
    };

    /**
     * Adds drag to a rectangle
     * @param rect The Raphael rectangle
     */
    function addDragRectangle(rect) {
        var x, y;
        rect.drag(function (dx, dy) {
            this.attr({
                x: Math.min(Math.max(x + dx, 0), 380),
                y: Math.min(Math.max(y + dy, 10), 380)
            });
        }, function () {
            x = this.attr("x");
            y = this.attr("y");
        })
    }

    /**
     * Adds a Rectangle
     */
    function addRectangle() {
        var color = '#' + Math.random().toString(16).substr(-6);

        var rect = paper.rect(10, 10, 80, 80);
        rect.attr({
            "fill": color
        });

        addDragRectangle(rect);
        rect.text("Rect");

        rect.dblclick(function () {
            var bbox = rect.getBBox();
            var xOffset = bbox.x2 + 10;
            var yOffset = bbox.y;

            var popup = paper.rect(xOffset, yOffset, 80, 80);
        });

    }

    /**
     * Inits the rectangles
     */
    function initRectangles() {
        var rectLeft = paper.rect(10, 10, 80, 80);
        var rectRight = paper.rect(380, 10, 80, 80);
        rectLeft.attr({
            "fill": "#999999",
            "stroke": "#000"
        });

        rectRight.attr({
            "fill": "#999999",
            "stroke": "#000",
            "stroke-dasharray": "-"
        });

        addDragRectangle(rectLeft);
        addDragRectangle(rectRight);
        rectLeft.text("Rect");
        rectRight.text("Rect");
        var arrow = paper.arrow(rectLeft, rectRight);

        arrow.text("Label");
        $("#addRectBtn").click(function () {
            addRectangle()
        });
    }

    /**
     * Adds drag functionality to circles
     * @param circle The circle
     */
    function addDragCircle(circle) {
        var x, y;
        circle.drag(function (dx, dy) {
            this.attr({
                cx: Math.min(Math.max(x + dx, 50), 420),
                cy: Math.min(Math.max(y + dy, 50), 420)
            });
        }, function () {
            x = this.attr("cx");
            y = this.attr("cy");
        });
    }

    /**
     * Adds a circle
     */
    function addCircle() {
        var color = '#' + Math.random().toString(16).substr(-6);

        var circle = paper.circle(50, 50, 40);
        circle.attr({
            "fill": color
        });

        addDragCircle(circle);
        circle.text("Circle");
    }


    /**
     * Inits the circles
     */
    function initCircles() {
        var circleLeft = paper.circle(50, 420, 40);
        var circleRight = paper.circle(410, 420, 40);

        circleLeft.attr({
            "fill": "#FFF",
            "stroke": "#000"
        });

        circleRight.attr({
            "fill": "#FFF",
            "stroke": "#000"
        });

        addDragCircle(circleLeft);
        addDragCircle(circleRight);

        circleLeft.text("Circle");
        circleRight.text("Circle");

        var arrow = paper.arrow(circleLeft, circleRight);
        arrow.attr("stroke-dasharray", "-");
        $("#addCircleBtn").click(function () {
            addCircle()
        });
    }

    /**
     * Main entry method
     */
    function main() {
        initRectangles();
        initCircles();
    }

    main();

})();

