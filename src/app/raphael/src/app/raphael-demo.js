(function () {
    "use strict";
    const paper = Raphael("canvas");
    const watch = WatchJS.watch;

    Raphael.fn.arrow = function (source, destination, size) {
        var x1 = source.x;
        var y1 = source.y;
        var x2 = destination.x;
        var y2 = destination.y;

        function renderPath() {
            var sourceElement = source.getCenter();
            var destElement = destination.getCenter();
            return "M" + sourceElement.x + " " + sourceElement.y + "L" + destElement.x + " " + destElement.y;
        }

        renderPath();

        var object = this.path(renderPath());

        var srcAttr = source.raphaelElement.type === "circle" ? ["cx", "cy"] : ["x", "y"];
        var destAttr = destination.raphaelElement.type === "circle" ? ["cx", "cy"] : ["x", "y"];

        watch(source.raphaelElement.attrs, srcAttr, function () {
            object.attr("path", renderPath())
        });

        watch(destination.raphaelElement.attrs, destAttr, function () {
            object.attr("path", renderPath())
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
        this.connections = paper.set();
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
                } else if (this.raphaelElement.type === "rect") {
                    return {x: (bbox.x2 - (bbox.width / 2)), y: (bbox.y2 - (bbox.height / 2))};
                }

            }
        },
        setText: function (text) {
            var center = this.getCenter();
            if (text) {
                this.text = paper.text(center.x, center.y, text);
            } else {
                this.text.attr({text: text});
            }

            var _ = this;
            var _text = this.text;
            watch(this.raphaelElement.attrs, ["cx", "cy", "x", "y"], function () {
                var center = _.getCenter();
                _text.attr({x: center.x, y: center.y});
            })
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
                console.log(this.getBBox());

                x = this.attr("x");
                y = this.attr("y");
            })
        }).bind(this)();
    }

    Rectangle.prototype = Object.create(Shape.prototype);

    Rectangle.prototype.constructor = Rectangle;

    main();

    function main() {
        var c1 = new Circle(30, 40, 25, paper);
        c1.setStrokeColor("#0f0");
        c1.setPosition(33, 44);
        c1.setColor("#0FF");
        c1.setText("CIRCLE");
        c1.raphaelElement.attr({text: "TEST"});
        var c2 = new Circle(400, 40, 25, paper);
        c2.setStrokeColor("#f00");
        c2.setStrokeStyle("-");
        c2.setColor("#FFF");
        c2.setText("CIRCLE")

        var r1 = new Rectangle(5, 440, 50, 50, paper);
        r1.setColor("#F0F");
        r1.setText("RECT")
        var r2 = new Rectangle(415, 440, 50, 50, paper);
        r2.setText("RECT")
        r2.setColor("#FF0");
        r2.setStrokeStyle(".");

        paper.arrow(r1, r2);
        paper.arrow(c1, c2);
        paper.arrow(r1, c1);
        paper.arrow(r1, c2);
        paper.arrow(r2, c1);
        paper.arrow(r2, c2);
    }


})();

