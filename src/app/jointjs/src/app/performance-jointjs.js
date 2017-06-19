/**
 * Created by Franzi on 19.06.2017.
 */
(function () {
    "use strict";

    var canvas = $('#canvas');
    var graph = new joint.dia.Graph();


    var link2 = new joint.dia.Link({
        el: $('#link'),
        text: 'Label'
    });

    var paper = new joint.dia.Paper({
        el: canvas,
        width: canvas.outerWidth(),
        height: canvas.outerHeight(),
        model: graph,
        defaultLink: new joint.dia.Link({
            attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' },
                text: 'label'}
        })
    });



    var items = (25 * 25);

    for (var i = 0; i < items; i++) {

        var rect = new joint.shapes.devs.Model({
            position: {x: 10, y: 50},
            size: {width: 100, height: 80},
            attrs: {
                '.label': {text: 'Model'}
            }
        });

        var rect2 = new joint.shapes.devs.Model({
            position: {x: 10, y: 50},
            size: {width: 100, height: 80},
            attrs: {
                '.label': {text: 'Model'}
            }

        });

        graph.addCell([rect, rect2, link2]);
    }



}());
