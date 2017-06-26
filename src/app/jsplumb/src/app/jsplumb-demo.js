(function () {
    "use strict";

    jsPlumb.ready(function () {

        jsPlumb.setContainer("container");
        jsPlumb.importDefaults({
            ConnectionsDetachable: false
        });

        function addRectangle() {
            var $newRect = $("<div class='common rectCommon newPosition'>Rect</div>");
            $("#container").append($newRect);
            jsPlumb.draggable($newRect, {containment: true});
        }

        function addCircle() {
            var $newCircle = $("<div class='common circleCommon newPosition'>Circle</div>");
            $("#container").append($newCircle);
            jsPlumb.draggable($newCircle, {containment: true});
        }

        function exportAsImage() {
            alert("export");
        }

        function initRectangles() {
            var rectLeftId = "rectLeft";
            var rectRightId = "rectRight";
            var commonConnectStyle = {
                anchors: ["Right", "Left"],
                type: "Straight"

            };

            jsPlumb.draggable([rectLeftId, rectRightId], {containment: true});

            jsPlumb.connect({
                source: rectLeftId,
                target: rectRightId,
                deleteEndpointsOnDetach: false,
                connector: ["Straight"],
                endpointStyle: {fill: "black"},
                endpoints: ["Blank", "Blank"],
                paintStyle: {stroke: "black", strokeWidth: 1},
                overlays: [["Label", {
                    label: "Label",
                    cssClass:"connectionLabel"
                }]]
            }, commonConnectStyle);
        }

        function initCircles() {
            var circleLeftId = "circleLeft";
            var circleRightId = "circleRight";
            var commonConnectStyle = {
                anchors: ["Right", "Left"]
            };

            jsPlumb.draggable([circleLeftId, circleRightId], {
                containment: true
            });

            jsPlumb.connect({
                source: circleLeftId,
                target: circleRightId,
                deleteEndpointsOnDetach: false,
                connector: ["Straight"],
                endpoints: ["Blank", "Blank"],
                paintStyle: {stroke: "black", strokeWidth: 1, dashstyle: "4 2"}
            }, commonConnectStyle);
        }

        function main() {
            initRectangles();
            initCircles();
            $("#addRectBtn").click(addRectangle);
            $("#addCircleBtn").click(addCircle);
            $("#exportBtn").click(exportAsImage);
        }

        main();
    });

})();
