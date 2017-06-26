(function () {
    "use strict";

    jsPlumb.ready(function () {

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

        }

        function initCircles() {

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
