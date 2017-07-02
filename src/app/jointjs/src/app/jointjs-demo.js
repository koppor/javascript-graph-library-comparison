/**
 * Created by Franzi on 17.05.2017.
 */
(function () {
    "use strict";
    var canvas = $('#canvas');
    var graph = new joint.dia.Graph;
    var gridSize = 1;
    var paper = new joint.dia.Paper({
        el: canvas,
        width: canvas.width(),
        height: canvas.height(),
        model: graph,
        gridSize: 1

    });

    paper.on('cell:pointermove', function (cellView, evt, x, y) {

        var bbox = cellView.getBBox();
        var constrained = false;

        var constrainedX = x;

        if (bbox.x <= 0) { constrainedX = x + gridSize; constrained = true; }
        if (bbox.x + bbox.width >= canvas.width()) { constrainedX = x - gridSize; constrained = true; }

        var constrainedY = y;

        if (bbox.y <= 0) {  constrainedY = y + gridSize; constrained = true }
        if (bbox.y + bbox.height >= canvas.height()) { constrainedY = y - gridSize; constrained = true; }

        //if you fire the event all the time you get a stack overflow
        if (constrained) { cellView.pointermove(evt, constrainedX, constrainedY); }
    });



    function initRectangles() {

        var rectLeft = new joint.shapes.basic.Rect({
            position: {x: 10, y: 10},
            size: {width: 80, height: 80},
            attrs: {
                fill: 'lightgrey',
                text: {text: 'Rect','ref-y': 0.5, 'y-alignment': 'middle', 'font-size': 20},
                rect: { stroke: 'black',fill: 'lightgrey'}
            }
        });

        var rectRight = new joint.shapes.basic.Rect({
            position: {x: 410, y: 10},
            size: {width: 80, height: 80},
            attrs: {
                text: {text: 'Rect','ref-y': 0.5, 'y-alignment': 'middle', 'font-size': 20},
                rect: { stroke: 'black', 'stroke-dasharray': '3',fill: 'lightgrey'}
            }
        });

        var l = new joint.dia.Link({
            source: { id: rectLeft.id },
            target: { id: rectRight.id },
            attrs: {
                '.connection': { stroke: 'black' } },
                labels: [
                {  attrs: { text: { text: 'Label', 'font-size': 20} } ,
                    position: 0.5}
            ]
        });

        graph.addCells([rectLeft, rectRight, l]);
    }

    function initCircles() {
        var circleLeft = new joint.shapes.basic.Circle({
            position: {x: 10, y: 410},
            size: {width: 80, height: 80},
            attrs: {circle: {fill: 'white'}, text: {text: 'Circle', fill: 'black', 'font-size': 20}}
        });
        var circleRight = new joint.shapes.basic.Circle({
            position: {x: 410, y: 410},
            size: {width: 80, height: 80},
            attrs: {circle: {fill: 'white'}, text: {text: 'Circle', fill: 'black', 'font-size': 20}}
        });
        var l = new joint.dia.Link({
            source: { id: circleLeft.id },
            target: { id: circleRight.id },
            attrs: {
                '.label': {text: 'Label'},
                '.connection': { 'stroke-dasharray': 3, stroke: 'black' } }
        });
        graph.addCells([circleLeft, circleRight,l]);

    }

    function addRectangle() {
        var rect = new joint.shapes.basic.Rect({
            position: {x: (500 / 2) -50, y: (500 / 2)-50},
            size: {width: 80, height: 80},
            attrs: {
                text: {text: 'Rect', fill: 'black', 'font-size': 20},
                rect: { stroke: 'black',fill: 'lightgrey'}
            }
        });
        graph.addCells([rect]);

    }

    function addCircle() {
        var circle = new joint.shapes.basic.Circle({
            position: {x: (500 / 2) -50, y: (500 / 2)-50},
            size: {width: 80, height: 80},
            attrs: {circle: {fill: 'white'}, text: {text: 'Circle', fill: 'black', 'font-size': 20}}
        });
        graph.addCells([circle]);
    }

    function exportAsImage() {
        var downloadWindow = window.open("Image", "Image from JointJS");
        downloadWindow.document.write('<canvas id="canvas" width="500px" height="500px"></canvas>');
        canvg(downloadWindow.document.getElementById("canvas"), $(paper.svg).html());
        var dataURL = downloadWindow.document.getElementById("canvas").toDataURL();
        downloadWindow.location = dataURL;
    }

    function main() {
        initRectangles();
        initCircles();

        $("#addRectBtn").click(function () {
            addRectangle();
        });

        $("#addCircleBtn").click(function () {
            addCircle();
        });

        $("#exportBtn").click(function () {
            exportAsImage();
        });
    }

    main();

}());

