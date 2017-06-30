(function () {
    "use strict";

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


    function initRectangles() {
        var canvas = new draw2d.Canvas("canvas");

        var rectLeft;
        rectLeft = canvas.add(new draw2d.shape.basic.Rectangle({
            width: 80,
            height: 80,
            x: 5,
            y: 10,
            keepAspectRatio: true
        }));


        var rectRight;
        rectRight = canvas.add(new draw2d.shape.basic.Rectangle({
            width: 80,
            height: 80,
            x: 380,
            y: 10,
            keepAspectRatio: true
        }));


    }
    function initCircle() {
        var canvas = new draw2d.Canvas("canvas");

        canvas.add(new draw2d.shape.basic.Circle({radius: 40, x: 5, y: 400}));
        canvas.add(new draw2d.shape.basic.Circle({radius: 40, x: 380, y: 400}));
    }





    function main() {
        initRectangles();
        initCircle();
    }

    main();
}());
