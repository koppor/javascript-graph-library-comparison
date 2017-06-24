/**
 * Created by Franzi on 19.06.2017.
 */
(function () {
    "use strict";

    var canvas2 = $('#canvas2');
    var graph = new joint.dia.Graph();


    var paper = new joint.dia.Paper({
        el: canvas2,
        width: 1800,
        height: 1800,
        model: graph,
        defaultLink: new joint.dia.Link({
            attrs: {
                '.marker-target': {d: 'M 10 0 L 0 5 L 10 10 z'},
                text: 'label'
            }
        })
    });


    var items = 5;
    var pos = 50;
    var pos2 = 10;
    var rect;
    var l;
    var rectId =0;
    var recID2 =0;

    for (var i = 0; i < items; i++) {
        for (var j = 0; j < items; j++) {

            rect = new joint.shapes.basic.Rect({
                id: 'rect'+rectId,
                position: {x: pos2, y: pos},
                size: {width: 100, height: 80},
                attrs: {
                    '.label': {text: 'Model'}
                }
            });
            graph.addCell([rect]);

            if(j >=1 && j <= (items-1)) {
                 l = new joint.dia.Link({
                    source: {id: 'rect'+(rectId-1)},
                    target: {id: 'rect'+rectId}

                });
                graph.addCell(l);
            }
            rectId++;
            pos2 =  pos2 + 150;
        }

        pos2 = 10;
        pos = pos +150;
    }


    for (var z = 0; z <= items; z++) {
        for (var h = 0; h < items; h++) {
            if(z>1) {

                var rec1 =((rectId % items));
                var rec2 =(((rectId % items )+ items));

                if(recID2>= 5 && z > 2)
                {
                    rec1 =rec1 + recID2;
                    rec2 = rec2+recID2;
                }
                l = new joint.dia.Link({
                    source: {id: 'rect' +( rec1)},
                    target: {id: 'rect' + (rec2)}

                });

                console.log(rec1 + '    '+ rec2);
                graph.addCell(l);
            }
            rectId++;
        }
        if(z>1) {
            recID2 = recID2 + items;
        }
    }
}());
