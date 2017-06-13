
var point1 = new Point(50, 50);
var point2 = new Point(150, 100);
var rectangle = new Rectangle(point1, point2);
var cornerSize = new Size(20, 20);
var path = new Path.RoundRectangle(rectangle, cornerSize);
path.fillColor = 'black';

var pointTextLocation = new paper.Point(25, 25);
var myText = new paper.PointText(pointTextLocation);
myText.fillColor = 'white';
myText.content = 'BPMN';
myText.position.y = 50 + 50 / 2;
myText.position.x = 100;

var rectangle2 = new Rectangle(new Point(300, 50), new Point(400, 100));
var cornerSize2 = new Size(20, 20);
var path2 = new Path.RoundRectangle(rectangle2, cornerSize2);
path2.fillColor = 'black';
path2.style = {
    strokeColor: 'black',
    dashArray: [4, 10],
    strokeWidth: 4,
    strokeCap: 'round'
};


var to = new Point(300, 75);
var from = new Point(150, 75);
var path = new Path.Line(from, to);
path.strokeColor = 'black';
path.simplify(300);
var vector  = path.getPointAt(path.length) - path.getPointAt(path.length-25);
var arrowVector = vector.normalize(18);
var path2 = new Path({
    segments: [path.getPointAt(path.length) + arrowVector.rotate(145),
        path.getPointAt(path.length),
        path.getPointAt(path.length) + arrowVector.rotate(-145)],
    fillColor: 'black',
    strokeWidth: 6,
});
path2.scale(1.3);

var pointTextLocation = new paper.Point(25, 25);
var myText2 = new paper.PointText(pointTextLocation);
myText2.fillColor = 'white';
myText2.content = 'Tosca';
myText2.position.y = 75;
myText2.position.x = 350;

rectangle2.selected = true;
rectangle.selected = true;

// The Path.Circle constructor takes a Point(x, y), and a radius
var myBall = new Path.Circle(new Point(100, 370), 25);
myBall.fillColor = 'white';
myBall.strokeColor = 'black'

var myText2 = new paper.PointText(pointTextLocation);
myText2.fillColor = 'black';
myText2.content = 'circle1';
myText2.position.y = 370;
myText2.position.x = 100;

// The Path.Circle constructor takes a Point(x, y), and a radius
var myBall = new Path.Circle(new Point(350, 370), 25);
myBall.fillColor = 'white';
myBall.strokeColor = 'black'

var myText2 = new paper.PointText(pointTextLocation);
myText2.fillColor = 'black';
myText2.content = 'circle2';
myText2.position.y = 370;
myText2.position.x = 350;

var from = new Point(325, 370);
var to = new Point(125, 370);
var path = new Path.Line(from, to);
path.strokeColor = 'black';
path.dashArray = [10, 12];
path.simplify(300);
var vector  = path.getPointAt(path.length) - path.getPointAt(path.length-25);
var arrowVector = vector.normalize(18);
var path2 = new Path({
    segments: [path.getPointAt(path.length) + arrowVector.rotate(145),
        path.getPointAt(path.length),
        path.getPointAt(path.length) + arrowVector.rotate(-145)],
    fillColor: 'black',
    strokeWidth: 6,
});
path2.scale(1.3);

/////////////////////////////////////////////////////////////////////
// Values

var values = {
    radius: 10,
    tolerance: 5
};


/////////////////////////////////////////////////////////////////////
// Mouse handling

var handle;
var path;
var curPoint, prevPoint, curHandleSeg;

// parameters
var headLength = 10;
var headAngle = 0;
var arrowColor = 'black';

// the arrow
var arrow = null;

function checkValues() {
    var min = 1;
    if (values.tolerance < min) values.tolerance = min;
    handle = values.radius * Numerical.KAPPA;
}

/*function onMouseUp(event) {
    path.simplify(300);
    var vector  = path.getPointAt(path.length) - path.getPointAt(path.length-25);
    var arrowVector = vector.normalize(18);
    var path2 = new Path({
        segments: [path.getPointAt(path.length) + arrowVector.rotate(145),
            path.getPointAt(path.length),
            path.getPointAt(path.length) + arrowVector.rotate(-145)],
        fillColor: 'black',
        strokeWidth: 6,
    });
    path2.scale(1.3);
}

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

    if(document.getElementById("dashedLine").checked) {
        path.dashArray = [10, 12];
    }
}*/

function addRect() {

        // The Path.Circle constructor takes a Point(x, y), and a radius
        var myBall = new Path.Rectangle(new Point(25, 25), new Point(125, 75));
        myBall.fillColor = 'purple';
        var myText2 = new paper.PointText(pointTextLocation);
        myText2.fillColor = 'white';
        myText2.content = "rectangle";
        myText2.position.y = 50;
        myText2.position.x = 75;
}

function addCircle() {

    // The Path.Circle constructor takes a Point(x, y), and a radius
    var myBall = new Path.Circle(new Point(25, 25), 25);
    myBall.fillColor = 'tomato';
    var myText2 = new paper.PointText(pointTextLocation);
    myText2.fillColor = 'white';
    myText2.content = "circle";
    myText2.position.y = 25;
    myText2.position.x = 25;
}
function onMouseDrag(event) {

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


checkValues();
document.getElementById("newField").addEventListener("click", addRect);

checkValues();
document.getElementById("newField2").addEventListener("click", addCircle);
