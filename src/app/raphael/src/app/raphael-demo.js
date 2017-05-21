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
        console.log(source);

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
            var s = "t" + this.x + "," + this.y;
            this.raphaelElement.transform(s);
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
                console.log("Attribute: %s = %s", name, value);
                this.raphaelElement.attr(name, value);
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
        this.setPosition(x, y);
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

        var x, y;
        c1.setColor("#FFF");
        c1.raphaelElement.drag(function (dx, dy) {
            this.attr({
                cx: Math.min(Math.max(x + dx, 0), 400),
                cy: Math.min(Math.max(y + dy, 0), 400)
            });
        }, function () {
            x = this.attr("cx");
            y = this.attr("cy");
        });

        var i, j;
        c2.setStrokeColor("#f00");
        c2.setStrokeStyle("-");
        c2.setColor("#FFF")
        c2.raphaelElement.drag(function (dx, dy) {
            this.attr({
                cx: Math.min(Math.max(i + dx, 0), 440),
                cy: Math.min(Math.max(j + dy, 0), 440)
            });
        }, function () {
            i = this.attr("cx");
            j = this.attr("cy");
        });
        paper.arrow(c1, c2, 10);
    }

    function initRects() {
        var r1 = new Rectangle(30, 440, 25, 25, paper);
        var r2 = new Rectangle(440, 440, 25, 25, paper);
        r1.setStrokeColor("#0FF");
        r1.setColor("#000");

        var x, y;
        
        r2.setStrokeStyle(".");
    }

})();

