(function () {

    var point1 = new Point(50, 50);
    var point2 = new Point(150, 100);
    var rectangle = new Rectangle(point1, point2);
    var cornerSize = new Size(20, 20);
    var path = new Path.RoundRectangle(rectangle, cornerSize);
    path.fillColor = 'black';

    var pointTextLocation = new paper.Point(25,25);
    var myText = new paper.PointText(pointTextLocation);
    myText.fillColor = 'white';
    myText.content = 'BPMN';
    myText.position.y = 50 + 50/2;
    myText.position.x = 100;
    //myText.justification = 'center';


    var rectangle2 = new Rectangle(new Point(250, 150), new Point(150, 100));
    var cornerSize2 = new Size(20, 20);
    var path2 = new Path.RoundRectangle(rectangle2, cornerSize2);
    path2.fillColor = 'black';

    var pointTextLocation = new paper.Point(25,25);
    var myText2 = new paper.PointText(pointTextLocation);
    myText2.fillColor = 'white';
    myText2.content = 'Tosca';
    myText2.position.y = 100 + 50/2;
    myText2.position.x = 150+ 50;
    //myText.justification = 'center';

    /////////////////////////////////////////////////////////////////////
    // Values

    var values = {
        radius: 10,
        tolerance: 5
    };

    checkValues();

    /////////////////////////////////////////////////////////////////////
    // Mouse handling

    var handle;
    function checkValues() {
        var min = values.radius * 2;
        if (values.tolerance < min) values.tolerance = min;
        handle = values.radius * Numerical.KAPPA;
    }

    var path;
    function onMouseDown(event) {
        path = new Path({
            segments: [event.point, event.point],
            strokeColor: 'black',
            strokeWidth: 5,
            strokeCap: 'round'
        });
        prevPoint = path.firstSegment.point;
        curPoint = path.lastSegment.point;
        curHandleSeg = null;
    }

    var curPoint, prevPoint, curHandleSeg;
    function onMouseDrag(event) {
        console.log("i bims");

        var point = event.point;
        var diff = (point - prevPoint).abs();
        if (diff.x < diff.y) {
            curPoint.x = prevPoint.x;
            curPoint.y = point.y;
        } else {
            curPoint.x = point.x;
            curPoint.y = prevPoint.y;
        }
        var normal = curPoint - prevPoint;
        normal.length = 1;
        if (curHandleSeg) {
            curHandleSeg.point = prevPoint + (normal * values.radius);
            curHandleSeg.handleIn = normal * -handle;
        }
        var minDiff = Math.min(diff.x, diff.y);
        if (minDiff > values.tolerance) {
            var point = curPoint - (normal * values.radius);
            var segment = new Segment(point, null, normal * handle);
            path.insert(path.segments.length - 1, segment);
            curHandleSeg = path.lastSegment;
            // clone as we want the unmodified one:
            prevPoint = curHandleSeg.point.clone();
            path.add(curHandleSeg);
            curPoint = path.lastSegment.point;
        }
    }
    console.log("i bims");

})();

