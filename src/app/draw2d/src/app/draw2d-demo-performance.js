(function () {
    "use strict";

    var canvas = new draw2d.Canvas("draw2dCanvas");

    function InformationPanel() {
        this.nodeCount = $("#nodeCount");
        this.timeTaken = $("#timeTaken");
    }

    function generateGrid() {
        var y = parseInt($("#yInput").val(), 10);
        var x = parseInt($("#xInput").val(), 10);
        var informations = new InformationPanel();
        var height = 0;

        //Clear all elements
        canvas.clear();
        alert("Depending on your input, this might take some time! Check the console -> Press F12");
        var start = performance.now();
        for (var i = 0; i < y; i++) {
            height = i * 100;
            for (var j = 0; j < x; j++) {
                var id = "rect-" + i + "-" + j;
                var rect = new draw2d.shape.basic.Rectangle({
                    width: 80,
                    height: 80,
                    x: j * 100,
                    y: height,
                    bgColor: '#D3D3D3'
                });

                rect.createPort("input", new draw2d.layout.locator.BottomLocator(rect));
                rect.createPort("input", new draw2d.layout.locator.LeftLocator(rect));

                rect.createPort("output", new draw2d.layout.locator.RightLocator(rect));
                rect.createPort("output", new draw2d.layout.locator.TopLocator(rect));

                rect.setId(id);
                canvas.add(rect);

                if (i > 0) {
                    var topNeighbour = "rect-" + (i - 1) + "-" + j;
                    var rectTop = canvas.getFigure(topNeighbour);

                    var connection = new draw2d.Connection({
                        source: rect.getOutputPort(1),
                        target: rectTop.getInputPort(0),
                        router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
                        color: "#ff0000"
                    });

                    canvas.add(connection);

                }

                if (j > 0) {
                    var neighbour = "rect-" + i + "-" + (j - 1);
                    var rectLeft = canvas.getFigure(neighbour);

                    var connection = new draw2d.Connection({
                        source: rectLeft.getOutputPort(0),
                        target: rect.getInputPort(1),
                        router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
                        color: "#ff0000"
                    });

                    canvas.add(connection);
                }

            }

            console.log("Rendered: " + ((i / y) * 100).toFixed() + "%");
        }

        var end = performance.now();
        console.log("Rendered: 100%");
        console.log("Rendering finished");
        informations.nodeCount.text("Nodes: " + (x * y));
        informations.timeTaken.text("Time Taken: Finished in " + (end - start).toFixed() + " ms");
    }


    function main() {
        $("#generateBtn").click(generateGrid);
    }

    main();
}());
