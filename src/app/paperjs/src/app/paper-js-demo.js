(function () {
    paper.install(window);

    /**
     * Convenience Method  that makes a text for an element
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
     * Convenience Method that makes a group with a element and text element draggable
     * @param element The rectangle or circle
     * @param textElement The text element
     * @returns {Group} The Group
     */
    function makeDraggableAsGroup(element, textElement) {
        var group = new Group([element, textElement]);

        group.onMouseDrag = function (event) {
            var x = group.position.x;
            var y = group.position.y;
            var dx = event.delta.x;
            var dy = event.delta.y;
            var newX = Math.min(Math.max(x + dx, 40), 460);
            var newY = Math.min(Math.max(y + dy, 40), 460);
            group.position.x = newX;
            group.position.y = newY;
        };
        return group;
    }

    function makeLine(groupLeft, groupRight, dashArray) {
        var line = new Path.Line({
            from: groupLeft.getBounds().rightCenter,
            to: groupRight.getBounds().leftCenter,
            strokeColor: "#000",
            dashArray: dashArray || []
        });


    }


    /**
     * Init for rectangles
     */
    function initRectangles() {
        var rectLeft = new Path.Rectangle({
            x: 20,
            y: 10,
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

        //----------------------------------------------
        // ADD TO GROUP
        //----------------------------------------------
        var rectLeftGroup = makeDraggableAsGroup(rectLeft, rectLeftText);
        var rectRightGroup = makeDraggableAsGroup(rectRight, rectRightText);

        //----------------------------------------------
        // ADD LINES
        //----------------------------------------------
        makeLine(rectLeftGroup, rectRightGroup);
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

        //----------------------------------------------
        // ADD TO GROUP
        //----------------------------------------------
        var circleLeftGroup = makeDraggableAsGroup(circleLeft, circleLeftText);
        var circleRightGroup = makeDraggableAsGroup(circleRight, circleRightText);

        //----------------------------------------------
        // ADD LINES
        //----------------------------------------------
        makeLine(circleLeftGroup, circleRightGroup, [5]);
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
