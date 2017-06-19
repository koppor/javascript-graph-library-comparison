/**
 * Created by Franzi on 17.05.2017.
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


    var rect = new joint.shapes.devs.Model({
        position: { x: 10, y: 50 },
        size: { width: 100, height: 80 },
        attrs: {
            '.label': { text: 'Model'}
        }

    });

    joint.shapes.devs.CircleModel = joint.shapes.devs.Model.extend({

        markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
        portMarkup: '<g class="port port<%= id %>"><rect class="port-body"/><text class="port-label"/></g>',

        defaults: joint.util.deepSupplement({
            type: 'devs.CircleModel',
            attrs: {
                '.body': { r: 50, cx: 50 },
                '.label': { text: 'Circle Model', 'ref-y': 0.5, 'y-alignment': 'middle' },
                '.port-body': { width: 10, height: 10, x: -5, stroke: 'gray', fill: 'lightgray', magnet: 'active' }
            }

        }, joint.shapes.devs.Model.prototype.defaults)
    });

    joint.shapes.devs.CircleModelView = joint.shapes.devs.ModelView;
        var circle = new joint.shapes.devs.CircleModel({
        position: { x: 10, y: 400 },
        size: { width: 100, height: 80 },
        attrs: { circle: { fill: 'white' }, text: { text: 'Circle', fill: 'black' } }
});


    function out(m) {
        $('#paper-link-out').html(m);
    }


    var rect2 = new joint.shapes.devs.Model({
        position: { x: 310, y: 50 },
        size: { width: 100, height: 80 },

        attrs: {
            '.label': { text: 'Model', 'ref-x': .5, 'ref-y': .2 },
            rect: { rx: 5, ry: 5, stroke: 'black', 'stroke-dasharray': '2,5'}
        },

    });


    var circle2 = new joint.shapes.devs.CircleModel({
        position: { x: 310, y: 400 },
        size: { width: 100, height: 80 },
        attrs: { circle: { fill: 'white' }, text: { text: 'Circle', fill: 'black' } }
    });

    rect.on('change:position', function(element) {
    //    console.log(element.id, ':', element.get('position'));
    });
    circle.on('change:position', function(element) {
      //  console.log(element.id, ':', element.get('position'));
    });


    graph.addCells([rect, rect2]);
    graph.addCells([circle, circle2]);

    graph.on('change:source change:target', function(link) {
        if (link.get('source').id && link.get('target').id) {
            // both ends of the link are connected.
        }
    });


    paper.on('cell:pointerdblclick', function(cellView, evt, x, y) {

        var portsArray = cellView.model.get('outPorts') || [];
        cellView.model.set('outPorts', portsArray.concat([name]), cellView.opt);


     //   var portsArray = cellView.model.get('outPorts') || [];
       // cellView.model.set('outPorts', portsArray.concat([name]), cellView.opt);

                   //  "<div><button class='btn btn-block' id='" + btnDashedId + "'>Dashed</button>" +
                     //   "<button class='btn btn-block' id='" + btnSolidId + "'>Solid</button></div>";

    });


    document.getElementById('addRectBtn').onclick= function() {
        var rec=  new joint.shapes.devs.Model({
            position: { x: 10, y: 10 },
            size: { width: 100, height: 80 },
            attrs: {
                '.label': { text: 'Model' },
                rect: { fill: '#2C3E50', rx: 5, ry: 5, 'stroke-width': 2, stroke: 'black'}
            }

        });
        graph.addCells([rec]);
    };


    document.getElementById('addCircleBtn').onclick= function() {

        var circle2 = new joint.shapes.devs.CircleModel({

            position: { x: 10, y: 10 },
            size: { width: 100, height: 80 },
            attrs: { circle: { fill: 'white' }, text: { text: 'Circle', fill: 'black' } }
        });

        graph.addCells([circle2]);

    };


}());

