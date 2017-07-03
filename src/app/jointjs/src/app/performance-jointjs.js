(function () {
    "use strict";
    //DO jointjs init stuff
    var canvas = $('#jointjs');
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: canvas,
        width: canvas.width(),
        height: canvas.height(),
        model: graph
    });

    /**
     * Simple information pan
     * @constructor
     */
    function InformationPanel() {
        this.nodeCount = $("#nodeCount");
        this.timeTaken = $("#timeTaken");
    }

    /**
     * Adds a rectangle at position (x,y) with id
     * @param x Position X on the canvas
     * @param y Position Y on the canvas
     * @param id The Id of the new rectangle
     */
    function addRectangle(x, y, id) {

        var rect = new joint.shapes.basic.Rect({
            position: {x: x, y: y},
            size: {width: 80, height: 80},
            id: id,
            attrs: {
                rect: {fill: 'lightgrey'}
            }
        });
        graph.addCells([rect]);
    }

    /**
     * Connects a source and a target element with different anchors
     * @param source The source element
     * @param target The target element
     */
    function connect(source, target) {

        var l = new joint.dia.Link({
            source: {id: source},
            target: {id: target},
            attrs: {
                '.connection': {stroke: 'red', strokeWidth: 1}

            }
        });
        graph.addCells([l]);
    }

    /**
     * Main method which generates a X * X sized grid to test the performance
     */
    function generateGrid() {
        (console.clear || function () {
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        })();
        var y = parseInt($("#yInput").val(), 10);
        var x = parseInt($("#xInput").val(), 10);
        var information = new InformationPanel();
        var height = 0;

        //Remove all elements from container
        graph.clear();
        alert("Depending on your input, this might take some time! Check the console -> Press F12");
        var start = performance.now();
        for (var i = 0; i < y; i++) {
            height = i * 100;
            for (var j = 0; j < x; j++) {
                var id = "rect-" + i + "-" + j;
                addRectangle(j * 100, height, id);
                if (j > 0) {
                    var neighbour = "rect-" + i + "-" + (j - 1);
                    connect(neighbour, id);
                }

                if (i > 0) {
                    var topNeighbour = "rect-" + (i - 1) + "-" + j;
                    connect(topNeighbour, id);
                }
            }
            console.log("Rendered: " + ((i / y) * 100).toFixed() + "%");
        }

        var end = performance.now();
        console.log("Rendered: 100%");
        information.nodeCount.text("Nodes: " + (x * y));
        information.timeTaken.text("Time Taken: Finished in " + (end - start).toFixed() + " ms");
    }

    /**
     * Main Methods
     */
    function main() {
        $("#generateBtn").click(generateGrid);
    }

    main();

})();
