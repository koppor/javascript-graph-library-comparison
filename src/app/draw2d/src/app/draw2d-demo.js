/*(function () {
 "use strict";

 // Libraries
 var canvas = new draw2d.Canvas("canvas");

 function initRectangles() {

 var rectLeft = new draw2d.shape.node.Start();
 canvas.add( start, 80,80);
 /* rectLeft = canvas.add(new draw2d.shape.node.Start()({
 width: 80,
 height: 80,
 x: 5,
 y: 10,
 keepAspectRatio: true
 }));

 var rectRight;
 rectRight = canvas.add(new draw2d.shape.node.Start()({
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
 rightCircle.add(new draw2d.shape.basic.Label({text:"Circle"}).setColor("#FFFFFF"), new draw2d.layout.locator.CenterLocator());
 canvas.add( rightCircle, 380,400);
 }



 function main() {
 initRectangles();
 initCircle();
 }

 main();
 }());
 */
(function () {
    "use strict";


    var canvas = new draw2d.Canvas("canvas");


    var rect1 = new draw2d.shape.basic.Rectangle({
        x: 380,
        y: 10,
        width: 80,
        height: 80,
        bgColor: 'lightgrey'
    });
    var rect2 = new draw2d.shape.basic.Rectangle({
        x: 5,
        y: 10,
        width: 80,
        height: 80,
        bgColor: 'lightgrey'
    });
    rect1.createPort("input", new draw2d.layout.locator.LeftLocator(rect1));
    canvas.add(rect1);
    rect2.createPort("output", new draw2d.layout.locator.RightLocator(rect2));
    canvas.add(rect2);


    var c = new draw2d.Connection({
        source: rect2.getOutputPort(0),
        target: rect1.getInputPort(0),
        router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter()
    });


// you can set the vertices of the connection via API. But normally this is
// happen by the user or by reading the JSON file via a draw2d.io.Reader.
// .... anyway - it is possible via API too.
//
    c.setVertices([{
        x: 350,
        y: 75
    }, {
        x: 170,
        y: 175
    }]);
    canvas.add(new draw2d.shape.basic.Circle({radius: 40, x: 5, y: 400}));
    canvas.add(new draw2d.shape.basic.Circle({radius: 40, x: 380, y: 400}));


    //Add rectangle
    $("#addRectBtn").click(function () {

        canvas.add(new draw2d.shape.basic.Rectangle({width: 80, height: 80, x: 200, y: 200, keepAspectRatio: true}));

    });
    $("#addCircleBtn").click(function () {

        canvas.add(new draw2d.shape.basic.Circle({radius: 40, x: 200, y: 200}));

    });
    canvas.add(c);

}());
