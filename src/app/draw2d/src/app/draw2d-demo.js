(function () {
    "use strict";

    // Libraries
    var canvas = new draw2d.Canvas("canvas");



    function initRectangles() {




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

        var leftCircle = new draw2d.shape.basic.Circle({radius: 40});
        leftCircle.setColor("#000000");
        leftCircle.setBackgroundColor("#FFFFFF");
        leftCircle.add(new draw2d.shape.basic.Label({text:"Circle"}), new draw2d.layout.locator.CenterLocator());
        canvas.add( leftCircle, 5,400);


        var rightCircle = new draw2d.shape.basic.Circle({radius: 40});
        rightCircle.setColor("#000000");
        rightCircle.setBackgroundColor("#FFFFFF");
        rightCircle.add(new draw2d.shape.basic.Label({text:"Circle"}), new draw2d.layout.locator.CenterLocator());
        canvas.add( rightCircle, 380,400);
    }





    function main() {
        initRectangles();
        initCircle();
    }

    main();
}());
