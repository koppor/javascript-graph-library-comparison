
(function () {
    "use strict";
    Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
        var angle = Raphael.angle(x1, y1, x2, y2);
        var a45 = Raphael.rad(angle - 45);
        var a45m = Raphael.rad(angle + 45);
        var x2a = x2 + Math.cos(a45) * size;
        var y2a = y2 + Math.sin(a45) * size;
        var x2b = x2 + Math.cos(a45m) * size;
        var y2b = y2 + Math.sin(a45m) * size;
        return this.path(
            "M" + x1 + " " + y1 + "L" + x2 + " " + y2 +
            "M" + x2 + " " + y2 + "L" + x2a + " " + y2a +
            "M" + x2 + " " + y2 + "L" + x2b + " " + y2b
        );
    };

    var paper = Raphael("canvas");

    initCircles();
    initRects();

    function initCircles() {
        var circle1 = paper.circle(30, 40, 10);
        var circle2 = paper.circle(440, 40, 10)
        var arrow = paper.arrow(30 + 10, 40, 440 - 10, 40, 5);
        var text = paper.text(195, 35, "Text")
        var circleText = paper.text(30, 40, "C")
        circle1.attr("fill", "#0f0");
        circle1.attr("stroke", "#fff");
        arrow.attr("stroke", "#f00");
        arrow.attr("stroke-dasharray", "-");
    }

    function initRects() {
        var rect1 = paper.rect(30, 440, 10, 10)
        var rect2 = paper.rect(440, 440, 10, 10)
        var arrow = paper.arrow(30 + 10, 440 + 5, 440, 440 + 5, 5);

        arrow.attr("stroke", "#00f");
        arrow.attr("stroke-dasharray", ".");
        rect1.attr("fill", "#00f");
        rect1.attr("stroke", "#0FF");
        rect2.attr("stroke-dasharray", ".")
    }

})();

