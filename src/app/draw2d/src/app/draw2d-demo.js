/**
 * Created by Birasanth Pushpanathan on 17.05.2017.
 */
(function () {
    "use strict";


    var canvas = new draw2d.Canvas("canvas");

    function initRectangles() {

        var rectRight = new draw2d.shape.basic.Rectangle({
            x: 410,
            y: 10,
            width: 80,
            height: 80,
            bgColor: '#D3D3D3'
        });

        rectRight.add(new draw2d.shape.basic.Label({
            text: "Rect", stroke: 0, fontSize: 20
        }), new draw2d.layout.locator.CenterLocator());
        rectRight.createPort("input", new draw2d.layout.locator.LeftLocator(rectRight));
        rectRight.setDashArray("- ");
        canvas.add(rectRight);
        rectRight.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());

        var rectLeft = new draw2d.shape.basic.Rectangle({
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            bgColor: '#D3D3D3'
            // bgColor: 'lightgrey'
        });
        rectLeft.add(new draw2d.shape.basic.Label({
            text: "Rect",
            stroke: 0,
            fontSize: 20
        }), new draw2d.layout.locator.CenterLocator());
        rectLeft.createPort("output", new draw2d.layout.locator.RightLocator(rectLeft));
        canvas.add(rectLeft);
        rectLeft.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());


        var label = new draw2d.shape.basic.Label({text: "Label", stroke: 0, fontSize: 20});

        var connection = new draw2d.Connection({
            source: rectLeft.getOutputPort(0),
            target: rectRight.getInputPort(0),
            router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
            color: "#000"
        });
        connection.add(label, new draw2d.layout.locator.ManhattanMidpointLocator());
        canvas.add(connection);
    }

    function initCircle() {

        var circleLeft = new draw2d.shape.basic.Circle({radius: 40});
        circleLeft.setBackgroundColor("#FFFFFF");
        circleLeft.add(new draw2d.shape.basic.Label({
            text: "Circle",
            stroke: 0,
            fontSize: 20
        }), new draw2d.layout.locator.CenterLocator());
        circleLeft.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());

        var circleRight = new draw2d.shape.basic.Circle({radius: 40});
        circleRight.setBackgroundColor("#FFFFFF");
        circleRight.add(new draw2d.shape.basic.Label({
            text: "Circle",
            stroke: 0,
            fill: '#FFFFFF',
            fontSize: 20
        }).setColor("#FFFFFF"), new draw2d.layout.locator.CenterLocator());
        circleRight.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());
        circleRight.createPort("input", new draw2d.layout.locator.LeftLocator(circleRight));
        canvas.add(circleRight, 410, 410);
        circleLeft.createPort("output", new draw2d.layout.locator.RightLocator(circleLeft));
        canvas.add(circleLeft, 10, 410);

        var connection = new draw2d.Connection({
            stroke: '1',
            source: circleLeft.getOutputPort(0),
            target: circleRight.getInputPort(0),
            router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
            color: "#000"
        });
        connection.setDashArray("--");
        canvas.add(connection);
    }


    function exportAsImage() {
        var downloadWindow = window.open();
        var writer = new draw2d.io.png.Writer();
        downloadWindow.document.write('<img id="download">');
        var element = downloadWindow.document.getElementById("download");

        writer.marshal(canvas, function (image) {
            element.setAttribute("src", image);
        });
    }


    function createNewRect() {

        var rect = new draw2d.shape.node.Between({
            x: 210,
            y: 210,
            width: 80,
            height: 80,
            bgColor: "#D3D3D3"
        });

        rect.add(new draw2d.shape.basic.Label({text: "Rect", stroke: 0}), new draw2d.layout.locator.CenterLocator());
        rect.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());
        canvas.add(rect);
        canvas.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
    }

    function createNewCircle() {
        var leftCircle = new draw2d.shape.basic.Circle({radius: 40});
        leftCircle.setBackgroundColor("#FFFFFF");
        leftCircle.add(new draw2d.shape.basic.Label({
            text: "Circle",
            stroke: 0
        }), new draw2d.layout.locator.CenterLocator());
        leftCircle.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());
        canvas.add(leftCircle, 200, 200);
    }


    function main() {
        initRectangles();
        initCircle();
        $("#addRectBtn").click(createNewRect);
        $("#addCircleBtn").click(createNewCircle);
        $('#exportBtn').click(exportAsImage);
    }

    main();
}());
