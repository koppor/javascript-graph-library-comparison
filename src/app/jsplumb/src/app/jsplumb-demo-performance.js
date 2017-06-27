(function () {
    "use strict";
    jsPlumb.ready(function () {
        jsPlumb.setContainer("jsplumb");
        jsPlumb.importDefaults({
            ConnectionsDetachable: false
        });

        function addRectangle(x, y, id) {
            var $newRect = $('<div id="' + id + '"class="common" style="left:' + x + 'px; top:' + y + 'px ;">Rect</div>');
            jsPlumb.draggable($newRect, {containment: true});
            $("#jsplumb").append($newRect);
            return $newRect;
        }


        function generateGrid() {
            var y = parseInt($("#yInput").val(), 10);
            var x = parseInt($("#xInput").val(), 10);
            var height = 0;
            var connect = function (source, target) {
                var commonConnectStyle = {anchors: ["Right", "Left", "Top", "Bottom"]};
                jsPlumb.connect({
                    source: source,
                    target: target,
                    deleteEndpointsOnDetach: false,
                    connector: ["Straight"],
                    endpointStyle: {fill: "black"},
                    endpoints: ["Blank", "Blank"],
                    paintStyle: {stroke: "black", strokeWidth: 1}
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
                        connect($newRect, neighbour)
                    }

                    if (i > 0) {
                        var topNeighbour = "rect-" + (i - 1) + "-" + j;
                        connect($newRect, topNeighbour);
                    }

                    neighbour = $newRect;
                }
            }
        }

        function main() {
            $("#generateBtn").click(generateGrid);
        }

        main();
    });

})();
