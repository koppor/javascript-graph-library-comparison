(function () {
    "use strict";

    var graph = new joint.dia.Graph();
    var graph2 = new joint.dia.Graph();

    var paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: 800,
        height: 800,
        model: graph,
        gridSize: 1
    });
    graph.on('all', function (eventName, cell) {

        console.log(arguments);
    });


    var paper2 = new joint.dia.Paper({
        el: $('#myholder2'),
        width: 800,
        height: 800,
        model: graph2,
        gridSize: 1
    });
    graph2.on('all', function (eventName, cell) {
        console.log(arguments);
    });


    var rect = new joint.shapes.basic.Rect({
        position: { x: 100, y: 50 },
        size: { width: 100, height: 80 },
        attrs: { rect: { fill: 'black' }, text: { text: 'Rect', fill: 'white' } },
    });



    var circle = new joint.shapes.basic.Circle({
        position: { x: 100, y: 150 },
        size: { width: 80, height: 40 },
        attrs: { rect: { fill: 'white' }, text: { text: 'Circle', fill: 'black' } }
    });

    /*
    rect.attr({
        rect: { fill: '#2C3E50', rx: 5, ry: 5, 'stroke-width': 2, stroke: 'black' },
        text: {
            text: 'my label', fill: '#3498DB',
            'font-size': 18, 'font-weight': 'bold', 'font-variant': 'small-caps', 'text-transform': 'capitalize'
        }
    });
 */
    var rect2 = rect.clone();
    rect2.translate(300);

    var circle2 = circle.clone();
    circle2.translate(300);

    rect.on('change:position', function (element) {
        console.log(element.id, ':', element.get('position'));
    });

    circle.on('change:position', function (element) {
        console.log(element.id, ':', element.get('position'));
    });

    var link = new joint.dia.Link({
        source: { id: rect.id },
        target: { id: rect2.id },
    });


    link.attr({
        '.connection': { stroke: 'red' },
        '.marker-target': { fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z' },
    });

    var link2 = new joint.dia.Link({
        source: { id: circle.id },
        target: { id: circle2.id }
    });

    link2.attr({
        '.connection-wrap': { stroke: 'black' },
        '.marker-source': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' },
    });

    graph.addCells([rect, rect2, link]);
    graph.addCells([circle, circle2, link2]);
})()