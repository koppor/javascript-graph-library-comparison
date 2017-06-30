(function () {
    "use strict";


    var canvas = new draw2d.Canvas("canvas");



    canvas.add(new draw2d.shape.basic.Rectangle({width: 80, height: 80, x: 5, y: 10, keepAspectRatio: true}));
    canvas.add(new draw2d.shape.basic.Rectangle({width: 80, height: 80, x: 380, y: 10, keepAspectRatio: true}));
    canvas.add(new draw2d.shape.basic.Circle({radius: 40, x: 5, y: 400}));
    canvas.add(new draw2d.shape.basic.Circle({radius: 40, x: 380, y: 400}));

}());
