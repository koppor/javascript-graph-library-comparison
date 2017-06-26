(function () {
    "use strict";

    jsPlumb.ready(function () {

        jsPlumb.setContainer("container");

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

            jsPlumb.draggable([rectLeftId, rectRightId], {
                containment: true
            });

            jsPlumb.connect({
                source: rectLeftId,
                target: rectRightId
            });

        }

        function initCircles() {
            var circleLeftId = "circleLeft";
            var circleRightId = "circleRight";

            jsPlumb.draggable([circleLeftId, circleRightId], {
                containment: true
            });

            jsPlumb.connect({
                source: circleLeftId,
                target: circleRightId
            });
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
