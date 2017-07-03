
(function () {
    "use strict";


    var canvas = new draw2d.Canvas("canvas");


    function initRectangles() {

    var rect1 = new draw2d.shape.basic.Rectangle({
        x: 380,
        y: 10,
        width: 80,
        height: 80,
        fill: '#D3D3D3'
    });

    rect1.add(new draw2d.shape.basic.Label({text:"Rect",stroke: 0
    }),  new draw2d.layout.locator.CenterLocator());
    rect1.createPort("input", new draw2d.layout.locator.LeftLocator(rect1));
    rect1.setDashArray("- ");
    canvas.add(rect1);
    rect1.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());

        var rect2 = new draw2d.shape.basic.Rectangle({
        x: 5,
        y: 10,
        width: 80,
        height: 80,
            fill: '#D3D3D3'
        // bgColor: 'lightgrey'
    });
    rect2.add(new draw2d.shape.basic.Label({text:"Rect",stroke: 0 }),  new draw2d.layout.locator.CenterLocator());
    rect2.createPort("output", new draw2d.layout.locator.RightLocator(rect2));
    canvas.add(rect2);
    rect2.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());


        var label = new draw2d.shape.basic.Label({text:"Label",stroke: 0 });

    var c = new draw2d.Connection({
        source: rect2.getOutputPort(0),
        target: rect1.getInputPort(0),
        router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter()
    });
       //c.setDashArray("--.");
       c.add(label, new draw2d.layout.locator.ManhattanMidpointLocator());
        console.log("C: " + c);
        canvas.add(c);

// you can set the vertices of the connection via API. But normally this is
// happen by the user or by reading the JSON file via a draw2d.io.Reader.
// .... anyway - it is possible via API too.
//
    /*c.setVertices([{
        x: 350,
        y: 75
    }, {
        x: 170,
        y: 175
    }]);

*/
    }
    function initCircle() {

        var leftCircle = new draw2d.shape.basic.Circle({radius: 40});
        //leftCircle.setColor("#000000");
        leftCircle.setBackgroundColor("#FFFFFF");
        leftCircle.add(new draw2d.shape.basic.Label({text:"Circle",stroke: 0 }), new draw2d.layout.locator.CenterLocator());
        leftCircle.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());
        //canvas.add( leftCircle, 10,400);


        var rightCircle = new draw2d.shape.basic.Circle({radius: 40});
        //rightCircle.setColor("#000000");
        rightCircle.setBackgroundColor("#FFFFFF");
        rightCircle.add(new draw2d.shape.basic.Label({text:"Circle",stroke: 0 , fill: '#FFFFFF'}).setColor("#FFFFFF"), new draw2d.layout.locator.CenterLocator());
        rightCircle.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());
     //   canvas.add( rightCircle, 380,400);

        rightCircle.createPort("input", new draw2d.layout.locator.LeftLocator(rightCircle));
        canvas.add(rightCircle,380,400);
        leftCircle.createPort("output", new draw2d.layout.locator.RightLocator(leftCircle));
        canvas.add(leftCircle,10,400);

        //d.setSource(leftCircle.getOutputPort(0));
        //d.setTarget(rightCircle.getInputPort(0));


       var d = new draw2d.Connection({
            //dashArray: "--",
           stroke: '1',
            source: leftCircle.getOutputPort(0),
            target: rightCircle.getInputPort(0),
            router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter()
        });
        d.setDashArray("--");
        canvas.add(d);


    }


    function exportAsImage() {
        var downloadWindow = window.open("Image", "Image from Draw2d");
        downloadWindow.document.write('<canvas id="canvas" width="500px" height="500px"></canvas>');
        var svg = document.getElementById("canvas").innerHTML;
        canvg(downloadWindow.document.getElementById("canvas"), svg);
        var dataURL = downloadWindow.document.getElementById("canvas").toDataURL();
        downloadWindow.location = dataURL;
    }

        
    function createNewRect() {

        var rect = new draw2d.shape.node.Between({
            x: 200,
            y: 200,
            width: 80,
            height: 80,
            //bgColor: 'lightgrey'
        });
        rect.add(new draw2d.shape.basic.Label({text:"Rect", stroke: 0}),  new draw2d.layout.locator.CenterLocator());
        rect.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());
        canvas.add(rect)
        canvas.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
       // var rect = canvas.add(new draw2d.shape.node.Between({width: 80, height: 80, x: 200, y: 200,}));

        //canvas.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
    }
    
    function createNewCircle() {
        var leftCircle = new draw2d.shape.basic.Circle({radius: 40});
        //leftCircle.setColor("#000000");
        leftCircle.setBackgroundColor("#FFFFFF");
        leftCircle.add(new draw2d.shape.basic.Label({text:"Circle", stroke:0}), new draw2d.layout.locator.CenterLocator());
        leftCircle.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());
        canvas.add( leftCircle, 200,200);
    }


    function main() {
        initRectangles();
        initCircle();
        $("#addRectBtn").click(function () {
            createNewRect();
           // canvas.add(new draw2d.shape.basic.Rectangle({width: 80, height: 80, x: 200, y: 200, keepAspectRatio: true}));

        });
        $("#addCircleBtn").click(function () {
            createNewCircle();
            //canvas.add(new draw2d.shape.basic.Circle({radius: 40, x: 200, y: 200}));

        });
        $('#exportBtn').click(exportAsImage);
    }
    main();
}());
