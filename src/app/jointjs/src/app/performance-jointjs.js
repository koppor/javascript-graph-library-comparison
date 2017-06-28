/**
 * Created by Franzi on 19.06.2017.
 */
(function () {
    "use strict";

    var canvas2 = $('#jointjs');
    var graph = new joint.dia.Graph();


    var paper = new joint.dia.Paper({
        el: canvas2,
        width: canvas2.width(),
        height: canvas2.height(),
        model: graph
    });

    function generateGrid() {

        var y = parseInt($("#yInput").val(), 10);
        var x = parseInt($("#xInput").val(), 10);
        var pos = 50;
        var pos2 = 10;
        var rect;
        var l;
        var rectId = 0;
        var recID2 = 0;

        for (var i = 0; i < y; i++) {
            for (var j = 0; j < x; j++) {

                rect = new joint.shapes.basic.Rect({
                    id: 'rect' + rectId,
                    position: {x: pos2, y: pos},
                    size: {width: 100, height: 80},
                    attrs: {
                        '.label': {text: 'Model'}
                    }
                });
                graph.addCell([rect]);

                if (j >= 1 && j <= (y - 1)) {
                    l = new joint.dia.Link({
                        source: {id: 'rect' + (rectId - 1)},
                        target: {id: 'rect' + rectId}

                    });
                    graph.addCell(l);
                }
                rectId++;
                pos2 = pos2 + 150;
            }

            pos2 = 10;
            pos = pos + 150;
            console.log("Percent: " + ((i / x) * 100 ) + "%")
        }


        for (var z = 0; z <= y; z++) {
            for (var h = 0; h < x; h++) {
                if (z > 1) {

                    var rec1 = ((rectId % x));
                    var rec2 = (((rectId % x ) + x));

                    if (recID2 >= 5 && z > 2) {
                        rec1 = rec1 + recID2;
                        rec2 = rec2 + recID2;
                    }
                    l = new joint.dia.Link({
                        source: {id: 'rect' + ( rec1)},
                        target: {id: 'rect' + (rec2)}

                    });

                    console.log(rec1 + '    ' + rec2);
                    graph.addCell(l);
                }
                rectId++;
            }
            if (z > 1) {
                recID2 = recID2 + x;
            }
        }
    }

    function main() {
        $("#generateBtn").click(generateGrid);
    }

    main();

}());
