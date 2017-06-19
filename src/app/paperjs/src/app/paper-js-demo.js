(function () {
    paper.install(window);

    /**
     * Makes a text for an element
     * @param element The element to set the text
     * @param text The string text
     * @returns {PointText} The configured point text element
     */
    function makeText(element, text) {
        var center = element.getBounds().center;
        var pointText = new PointText({
            point: center,
            content: text,
            fillColor: "black",
            fontSize: 20
        });
        pointText.getBounds().center = center;

        return pointText;
    }

    /**
     * Init for rectangles
     */
    function initRectangles() {
        var rectLeft = new Path.Rectangle({
            x: 20,
            y: 10,
            center: view.center,
            width: 80,
            height: 80,
            fillColor: 'lightgray',
            strokeColor: "#000"
        });

        var rectRight = new Path.Rectangle({
            x: 400,
            y: 10,
            center: view.center,
            width: 80,
            height: 80,
            fillColor: 'lightgray',
            strokeColor: "#000",
            dashArray: [5]
        });
        //----------------------------------------------
        // TEXT SETUP
        //----------------------------------------------
        var rectLeftText = makeText(rectLeft, "Rect");
        var rectRightText = makeText(rectRight, "Rect");


    }

    /**
     * Init for circles
     */
    function initCircles() {
        var circleLeft = new Path.Circle({
            x: 60,
            y: 440,
            radius: 40,
            fillColor: "#FFF",
            strokeColor: "#000"
        });


        var circleRight = new Path.Circle({
            //[440, 440], 40
            x: 440,
            y: 440,
            radius: 40,
            fillColor: "#FFF",
            strokeColor: "#000"
        });

        //----------------------------------------------
        // TEXT SETUP
        //----------------------------------------------
        var circleRightText = makeText(circleRight, "Circle");
        var circleLeftText = makeText(circleLeft, "Circle");

    }

    /**
     * Main Method
     */
    function main() {
        paper.setup("paperjsCanvas");
        initRectangles();
        initCircles();
    }

    main();

})();
