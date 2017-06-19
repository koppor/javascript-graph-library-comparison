(function () {

    function initRectangles() {
        var rectLeft = new paper.Rectangle(10, 10, 80, 80);
    }

    function initCircles() {
    }

    function main() {
        console.log("main");
        var canvas = document.getElementById("canvas");
        paper.setup(canvas);

        initRectangles();
        initCircles();

        paper.view.draw();

    }

    main();

})();
