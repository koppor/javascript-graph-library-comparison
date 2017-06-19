(function () {
    paper.install(window);

    function initRectangles() {
        var rectLeft = new Path.Rectangle([25, 10], [80, 80]);
        rectLeft.style = {
            fillColor: "lightgray",
            strokeColor: "#000"
        };

        var rectRight = new Path.Rectangle([400, 10], [80, 80]);
        rectRight.style = {
            fillColor: "lightgray",
            strokeColor: "#000",
            dashArray: [5]
        };
    }

    function initCircles() {
        var circleLeft = new Path.Circle([60, 440], 40);
        circleLeft.style = {
            fillColor: "#FFF",
            strokeColor: "#000"
        };


        var circleRight = new Path.Circle([440, 440], 40);
        circleRight.style = {
            fillColor: "#FFF",
            strokeColor: "#000"
        };

    }

    function main() {
        console.log("main");
        paper.setup("paperjsCanvas");
        initRectangles();
        initCircles();
    }

    main();

})();
