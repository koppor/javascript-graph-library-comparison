(function () {
    "use strict";
    const paper = Raphael("canvas");
    const watch = WatchJS.watch;

    Raphael.fn.arrow = function (source, destination, size) {
        var x1 = source.x;
        var y1 = source.y;
        var x2 = destination.x;
        var y2 = destination.y;
        var angle = Raphael.angle(x1, y1, x2, y2);
        var a45 = Raphael.rad(angle - 45);
        var a45m = Raphael.rad(angle + 45);
        var x2a = x2 + Math.cos(a45) * size;
        var y2a = y2 + Math.sin(a45) * size;
        var x2b = x2 + Math.cos(a45m) * size;
        var y2b = y2 + Math.sin(a45m) * size;

        function renderPath() {
            var sourceElement = source.raphaelElement;
            var destElement = destination.raphaelElement;
            var sourceBb = sourceElement.getBBox();
            var destBb = destElement.getBBox();
            console.log(destBb);
        }

        renderPath();

        var object = this.path(
            "M" + x1 + " " + y1 + "L" + x2 + " " + y2 +
            "M" + x2 + " " + y2 + "L" + x2a + " " + y2a +
            "M" + x2 + " " + y2 + "L" + x2b + " " + y2b
        );

        watch(source.raphaelElement.attrs, ["cx", "cy"], function () {
            object.attr("path", "M" + source.raphaelElement.attrs
                    .cx + " " + source.raphaelElement.attrs
                    .cy + "L" + x2 + " " + y2 +
                "M" + x2 + " " + y2 + "L" + x2a + " " + y2a +
                "M" + x2 + " " + y2 + "L" + x2b + " " + y2b)
        });


        return object;
    };


    /**
     * Shape Constructor
     * @param x - X Position
     * @param y - Y Position
     * @param paper The paper to draw on
     * @constructor
     */
    function Shape(x, y, paper) {
        this.paper = paper;
        this.x = x;
        this.y = y;
        this.text = "";
        this.color = "#FFF";
        this.strokeColor = "#FFF";
        this.strokeStyle = null;
        this.connections = [];
        this.raphaelElement = null; // Object from RaphaelJS
        this.setColor(this.color);
        this.setStrokeColor(this.strokeColor);
        this.setStrokeStyle(this.strokeStyle);
    }

    /**
     * Prototype definitions
     * @type {{setPosition: Shape.setPosition, setColor: Shape.setColor, setStrokeColor: Shape.setStrokeColor, setStrokeStyle: Shape.setStrokeStyle, addAttribute: Shape.addAttribute}}
     */
    Shape.prototype = {

        setPosition: function (x, y) {
            this.x = typeof x === "undefined" ? this.x : x;
            this.y = typeof y === "undefined" ? this.y : y;
            if (this.raphaelElement) {
                if (this.raphaelElement.type === "circle") {
                    this.addAttribute("cx", x);
                    this.addAttribute("cy", y);
                } else if (this.raphaelElement.type === "rect") {
                    this.addAttribute("x", x);
                    this.addAttribute("y", y);
                } else {
                    console.log("Warning : Unknown element type");
                }
            }
        },

        setColor: function (color) {
            this.color = color;
            this.addAttribute("fill", this.color);
        },

        setStrokeColor: function (strokeColor) {
            this.strokeColor = strokeColor;
            this.addAttribute("stroke", this.strokeColor);
        },

        setStrokeStyle: function (strokeStyle) {
            this.strokeStyle = strokeStyle;
            this.addAttribute("stroke-dasharray", this.strokeStyle);
        },

        addAttribute: function (name, value) {
            if (this.raphaelElement) {
                this.raphaelElement.attr(name, value);
            }
        },

        getCenter: function () {
            if (this.raphaelElement) {
                var bbox = this.raphaelElement.getBBox();
                if (this.raphaelElement.type === "circle") {
                    return {x: bbox.cx, y: bbox.cy};
                } else if(this.raphaelElement ==="rect") {
                    //TODO
                    return "";
                }

            }
        }


    };

    /**
     * Cricle Object
     * @param x Shape#x
     * @param y Shape#y
     * @param r The radius
     * @param paper Shape#paper
     * @constructor
     */
    function Circle(x, y, r, paper) {
        Shape.call(this, x, y, paper);
        this.r = r;
        this.raphaelElement = paper.circle(0, 0, r);
        this.setPosition(x, y);
        (function () {
            var x, y;
            this.raphaelElement.drag(function (dx, dy) {
                this.attr({
                    cx: Math.min(Math.max(x + dx, 0), 400),
                    cy: Math.min(Math.max(y + dy, 0), 400)
                });
            }, function () {
                x = this.attr("cx");
                y = this.attr("cy");
            });
        }).bind(this)();
    }

    Circle.prototype = Object.create(Shape.prototype);

    Circle.prototype.constructor = Circle;

    /**
     * Rectangle Object
     * @param x Shape#x
     * @param y Shape#y
     * @param width The width of the rect
     * @param height The height of the rect
     * @param paper Shape#paper
     * @constructor
     */
    function Rectangle(x, y, width, height, paper) {
        Shape.call(this, x, y, paper);
        this.width = width;
        this.height = height;
        this.raphaelElement = paper.rect(0, 0, width, height);
        //this.addAttribute("x", x);
        //this.addAttribute("y", y);
        this.setPosition(x, y);
        (function () {
            var x, y;
            this.raphaelElement.drag(function (dx, dy) {
                this.attr({
                    x: Math.min(Math.max(x + dx, 0), 440),
                    y: Math.min(Math.max(y + dy, 0), 440)
                });
            }, function () {
                x = this.attr("x");
                y = this.attr("y");
            })
        }).bind(this)();
    }

    Rectangle.prototype = Object.create(Shape.prototype);

    Rectangle.prototype.constructor = Rectangle;

    initCircles();
    initRects();

    function initCircles() {
        var c1 = new Circle(30, 40, 25, paper);
        c1.setStrokeColor("#0f0");
        var c2 = new Circle(400, 40, 25, paper);
        c1.setPosition(33, 44);
        c1.setColor("#0FF");
        c2.setStrokeColor("#f00");
        c2.setStrokeStyle("-");
        c2.setColor("#FFF");
        paper.arrow(c1, c2, 10);
    }

    function initRects() {
        var r1 = new Rectangle(30, 440, 25, 25, paper);
        var r2 = new Rectangle(440, 440, 25, 25, paper);
        r1.setColor("#F0F");
        r2.setColor("#FF0");
        r2.setStrokeStyle(".")
    }

})();

