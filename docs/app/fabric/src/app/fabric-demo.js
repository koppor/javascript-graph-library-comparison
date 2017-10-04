(function () {
    "use strict";

    var canvas = new fabric.Canvas('canvas', {
        selection: false
    });

    //1.Rectangle
    canvas.setDimensions({width: 500, height: 500});

    function LineRenderer(src, target, lineText, strokeDashArray) {
        var self = this;
        this.src = src;
        this.target = target;
        this.strokeDashArray = strokeDashArray;
        this.line = null;
        this.lineText = lineText;
        this.textElement = null;
        this.render = function () {
            var points = self._getPoints();
            if (self.line !== null) {
                canvas.remove(self.line);
            }

            if (self.lineText) {
                if (self.textElement) {
                    canvas.remove(self.textElement);
                }

                var left = (self.src.group.left + self.target.group.left) / 2;
                var top = (self.src.group.top + self.target.group.top) / 2;

                self.textElement = new fabric.Text("Label", {
                    fontSize: 20,
                    top: top + 30,
                    left: left + 10
                });
                canvas.add(self.textElement);
            }

            self.line = new fabric.Line([100, 100, 420, 100], {
                stroke: 'black',
                fontFamily: 'sans-serif',
                name: 'Linie',
                selectable: false,
                hasControls: false,
                hasBorders: false,
                centeredRotation: false,
                centeredScaling: false
            });

            self.line.set({
                x1: points.x1,
                y1: points.y1,
                x2: points.x2,
                y2: points.y2
            });

            if (self.strokeDashArray) {
                self.line.set({
                    strokeDashArray: self.strokeDashArray
                })
            }

            canvas.add(self.line);
        };

        this._getPoints = function () {
            var x1 = self.src.group.left + self.src.getBoundingRectWidth();
            var y1 = self.src.group.top + (self.src.getBoundingRectHeight() / 2);
            var x2 = self.target.group.left;
            var y2 = self.target.group.top + (self.src.getBoundingRectHeight() / 2);

            return {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            }
        }
    }

    var rectLineRenderer;
    var circleLineRenderer;

    function initRectangles() {
        var rectLeft = new fabric.Rect({
            top: 10,
            left: 10,
            width: 80,
            height: 80,
            fill: 'lightgrey',
            name: 'rectLeft',
            stroke: 'black'
        });

        var rectLeftText = new fabric.Text('Rect', {
            fontSize: 20,
            top: rectLeft.top + 30,
            left: rectLeft.left + 20
        });

        var rectLeftGroup = new fabric.Group([rectLeft, rectLeftText], {
            name: 'rectLeft',
            fontFamily: 'sans-serif',
            fontSize: 20
        });
        canvas.add(rectLeftGroup);

        //2.Rectangle
        var rectRight = new fabric.Rect({
            top: 10,
            left: 410,
            width: 80,
            height: 80,
            fill: 'lightgrey',
            strokeWidth: 1,
            stroke: 'black',
            name: 'rectRight',
            strokeDashArray: [3, 3]
        });

        var rectRightText = new fabric.Text('Rect', {
            fontSize: 20,
            top: rectRight.top + 30,
            left: rectRight.left + 20
        });

        var rectRightGroup = new fabric.Group([rectRight, rectRightText], {
            name: 'rectRight',
            fontFamily: 'sans-serif'
        });
        canvas.add(rectRightGroup);

        rectLineRenderer = new LineRenderer(rectLeft, rectRight, "Label");

        rectLineRenderer.render();
    }

    function initCircles() {
        //1.Circle
        var circleLeft = new fabric.Circle({
            radius: 40,
            top: 400,
            left: 10,
            fill: '#FFF',
            stroke: '#000'
        });

        var circleLeftText = new fabric.Text('Circle', {
            fontSize: 20,
            top: 430,
            left: 25
        });

        var circleLeftGroup = new fabric.Group([circleLeft, circleLeftText], {
            fontFamily: 'sans-serif',
            name: 'circleLeft'
        });

        canvas.add(circleLeftGroup);

        //2.Circle
        var circleRight = new fabric.Circle({
            radius: 40,
            fill: '#FFF',
            stroke: '#000',
            top: 400,
            left: 400
        });

        var circleRightText = new fabric.Text('Circle', {
            top: 430,
            left: 415,
            fontSize: 20
        });

        var circleRightGroup = new fabric.Group([circleRight, circleRightText], {
            fontFamily: 'sans-serif',
            name: 'circleRight'
        });

        canvas.add(circleRightGroup);
        circleLineRenderer = new LineRenderer(circleLeft, circleRight, null, [5, 5]);
        circleLineRenderer.render();

    }

    //Add rectangle
    function addRectangle() {

        var rect = new fabric.Rect({
            top: 200,
            left: 220,
            width: 80,
            height: 80,
            fill: 'lightgrey ',
            stroke: 'black'
        });
        var text = new fabric.Text('Rect', {
            fontSize: 20,
            top: 230,
            left: 240,
            fontFamily: 'sans-serif'
        });

        var groupRect = new fabric.Group([rect, text], {
            fontFamily: 'sans-serif'

        });
        canvas.add(groupRect);
    }

    //Add circle
    function addCircle() {
        var circle = new fabric.Circle({
            radius: 40,
            fill: '#FFF',
            stroke: '#000',
            top: 200,
            left: 220
        });
        var text = new fabric.Text('Circle', {
            top: 230,
            left: 235,
            fontSize: 20

        });
        var groupCircle = new fabric.Group([circle, text], {
            fontFamily: 'sans-serif'
        });
        canvas.add(groupCircle);
    }

    //Add arrow
    function exportAsImage() {
        var downloadWindow = window.open("Image", "Image from FabricJS");
        downloadWindow.location = canvas.toDataURL();
    }

    canvas.observe('object:moving', function (options) {
        var obj = options.target;
        var p = options.target;
        var xPos = obj.left + obj.width;
        var yPos = obj.top + obj.height;
        obj.top = obj.top < 0 ? 0 : yPos < 500 ? obj.top : 420;
        obj.left = obj.left < 0 ? 0 : xPos < 500 ? obj.left : 420;

        if (obj.name.match(/rect[Left,Right]/)) {
            rectLineRenderer.render();
        } else if (obj.name.match(/circle[Left,Right]/)) {
            circleLineRenderer.render();
        }

        obj.setCoords();
        canvas.renderAll();

    });

    function main() {
        initRectangles();
        initCircles();
        $("#addCircleBtn").click(addCircle);
        $('#exportBtn').click(exportAsImage);
        $("#addRectBtn").click(addRectangle);
    }

    main();
})();
