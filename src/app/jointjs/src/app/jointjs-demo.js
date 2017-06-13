/**
 * Created by Franzi on 17.05.2017.
 */
(function () {
    "use strict";

    var graph = new joint.dia.Graph;
    var graph2 = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: 500,
        height: 500,
        model: graph,
        gridSize: 1
    });
    graph.on('all', function(eventName, cell) {
       // console.log(arguments);
    });
    var paper2 = new joint.dia.Paper({
        el: $('#myholder2'),
        width: 500,
        height: 500,
        model: graph2,
        gridSize: 1
    });
    graph2.on('all', function(eventName, cell) {
       // console.log(arguments);
    });
    var rect = new joint.shapes.basic.Rect({
        position: { x: 10, y: 50 },
        size: { width: 100, height: 80 },
        attrs: { rect: { fill: '#2C3E50' }, text: { text: 'Rect', fill: 'white' } },
    });
    var circle = new joint.shapes.basic.Circle({
        position: { x: 10, y: 400 },
        size: { width: 100, height: 80 },
        attrs: { rect: { fill: 'white' }, text: { text: 'Circle', fill: 'black' } }
    });


    var rect2 = rect.clone();
    rect2.translate(300);

    rect2.attr({
        rect: { fill: '#2C3E50', rx: 5, ry: 5, 'stroke-width': 2, stroke: 'black', 'stroke-dasharray': '2,5' },
    });


    var circle2 = circle.clone();
    circle2.translate(300);
    rect.on('change:position', function(element) {
    //    console.log(element.id, ':', element.get('position'));
    });
    circle.on('change:position', function(element) {
      //  console.log(element.id, ':', element.get('position'));
    });
    var link = new joint.dia.Link({

        source: { id: rect.id },
        target: { id: rect2.id },
        labels : [ {
            position : .5,
            attrs : {
                text : {
                    text : 'LinkLabel',
                    fill : 'gray'
                }
            }
        } ]
    });
    link.attr({
        '.connection': { stroke: 'red', text: 'text' },
        '.marker-target': { fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z' },

    });
    var link2 = new joint.dia.Link({
        el: $('#link'),
        source: { id: circle.id },
        target: { id: circle2.id }
    });
    link2.attr({
        '.connection': { 'stroke-dasharray': '2,5'},
        '.marker-source': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' },
    });
    graph.addCells([rect, rect2, link]);
    graph.addCells([circle, circle2, link2]);

}());