(function () {
    "use strict";
    jsPlumb.ready(function () {
        jsPlumb.setContainer("jsplumb");
        jsPlumb.importDefaults({ConnectionsDetachable: false});
        jsPlumb.setSuspendDrawing(false, true);


        function addRectangle(x, y, id) {
            var $newRect = $('<div id="' + id + '" class="common" style="left:' + x + 'px; top:' + y + 'px ;"></div>');
            $("#jsplumb").append($newRect);
            jsPlumb.draggable($newRect, {containment: true});
            return $newRect;
        }


        function generateGrid() {
            var y = parseInt($("#yInput").val(), 10);
            var x = parseInt($("#xInput").val(), 10);
            var height = 0;
            var connect = function (source, target, anchors) {
                var commonConnectStyle = {anchors: anchors};
                jsPlumb.connect({
                    source: source,
                    target: target,
                    deleteEndpointsOnDetach: false,
                    connector: ["Straight"],
                    endpointStyle: {fill: "black"},
                    endpoints: ["Blank", "Blank"],
                    paintStyle: {stroke: "red", strokeWidth: 1},
                    isSource: true,
                    isTarget: true
                }, commonConnectStyle);

            };

            //Remove all elements from container
            jsPlumb.empty("jsplumb");

            for (var i = 0; i < y; i++) {
                height = i * 100;
                var neighbour = null;
                for (var j = 0; j < x; j++) {
                    var id = "rect-" + i + "-" + j;
                    var $newRect = addRectangle(j * 100, height, id);
                    if (neighbour !== null) {
                        connect($newRect, neighbour, ["Left", "Right"])
                    }

                    if (i > 0) {
                        var topNeighbour = "rect-" + (i - 1) + "-" + j;
                        connect($newRect, topNeighbour, ["Top", "Bottom"]);
                    }

                    neighbour = $newRect;

                }
                console.log("Rendered: " + ((i / y) * 100) + "%");
            }
            console.log("Rendered: 100%");

        }

        function main() {
            $("#generateBtn").click(generateGrid);
        }

        main();
    });

})();
