(function () {
    "use strict";

    jsPlumb.ready(function () {

        jsPlumb.setContainer("container");
        jsPlumb.importDefaults({
            ConnectionsDetachable: false
        });

        function exportAsImage() {
            alert("export");
        }

        function addRectangle() {
            alert("add rect");
        }

        function addCircle() {
            alert("add circle");
        }

        function initRectangles() {
            var rectLeftId = "rectLeft";
            var rectRightId = "rectRight";
            var commonConnectStyle = {
                anchors: ["Right", "Left"],
                type: "Straight"

            };

            jsPlumb.draggable([rectLeftId, rectRightId], {
                containment: true
            });

            jsPlumb.connect({
                source: rectLeftId,
                target: rectRightId,
                deleteEndpointsOnDetach: false,
                connector: ["Straight"],
                endpointStyle: {fill: "black"},
                endpoints:["Blank","Blank"]

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
                endpoints:["Blank","Blank"]

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
