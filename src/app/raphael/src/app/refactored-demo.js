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
            var sourceElement = getCenter(source);
            var destElement = getCenter(destination);
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
     * Returns the center of an element
     * @param element The element is either a circle or a rect
     * @returns {*} Object of x and y
     */
    function getCenter(element) {
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
                console.log(bbox);
                return {
                    x: (bbox.x + bbox.x2) / 2,
                    y: (bbox.y + bbox.y2) / 2
                };
            }
        }
    }

    /**
     * Set the text to an element center
     * @param element The element
     * @param text The text to set
     */
    function setText(element, text) {
        var center = getCenter(element);
        var textElement = paper.text(center.x, center.y, text);

        watch(element.attrs, ["cx", "cy", "x", "y", "path"], function () {
            var center = getCenter(element);
            textElement.attr({x: center.x, y: center.y});
        })

    }

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
        setText(rectLeft, "Rect");
        setText(rectRight, "Rect");
        var arrow = paper.arrow(rectLeft, rectRight);

        setText(arrow, "Label")
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

        setText(circleLeft, "Circle");
        setText(circleRight, "Circle");

        var arrow = paper.arrow(circleLeft, circleRight);
        arrow.attr("stroke-dasharray", "-")
    }

    function main() {
        initRectangles();
        initCircles();
    }

    main();

})();

