/**
 * Created by Franzi on 17.05.2017.
 */
(function () {
    "use strict";

    var graph = new joint.dia.Graph();
    var paper = new joint.dia.Paper({
        el: $('#canvas'),
        width: $('#canvas').outerWidth(),
        height: $('#canvas').outerHeight(),
        model: graph,
        defaultLink: new joint.dia.Link({
            attrs: {
                '.marker-target': {d: 'M 10 0 L 0 5 L 10 10 z'}
            }
        })
    });

    //
    // paper.on('cell:pointerdblclick', function (cellView, evt, x, y) {
    //     var portsArray = cellView.model.get('outPorts') || [];
    //     cellView.model.set('outPorts', portsArray.concat([name]), cellView.opt);
    // });



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
            position: {x: 400, y: 10},
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
                { position: 0.5, attrs: { text: { text: 'Label', 'font-size': 20} } }
            ]
        });

        graph.addCells([rectLeft, rectRight, l]);
    }

    function initCircles() {
        joint.shapes.devs.CircleModel = joint.shapes.devs.Model.extend({

            markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
            portMarkup: '<g class="port port<%= id %>"><rect class="port-body"/><text class="port-label"/></g>',

            defaults: joint.util.deepSupplement({
                type: 'devs.CircleModel',
                attrs: {
                    '.body': {r: 50, cx: 50},
                     text: {text: 'Circle' , 'ref-y': 0.5, 'y-alignment': 'middle', 'font-size': 20},
                    '.port-body': {width: 10, height: 10, x: -5, stroke: 'gray', fill: 'lightgray', magnet: 'active'}
                }

            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.devs.CircleModelView = joint.shapes.devs.ModelView;
        var circleLeft = new joint.shapes.basic.Circle({
            position: {x: 10, y: 400},
            size: {width: 80, height: 80},
            attrs: {circle: {fill: 'white'}, text: {text: 'Circle', fill: 'black', 'font-size': 20}}
        });

        var circleRight = new joint.shapes.basic.Circle({
            position: {x: 400, y: 400},
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
            position: {x: 500 / 2, y: 500 / 2},
            size: {width: 80, height: 80},
            attrs: {
                text: {text: 'Circle', fill: 'black', 'font-size': 20}
            }
        });
        graph.addCells([rect]);

    }

    function addCircle() {
        var circle = new joint.shapes.basic.Circle({
            position: {x: 500 / 2, y: 500 / 2},
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

