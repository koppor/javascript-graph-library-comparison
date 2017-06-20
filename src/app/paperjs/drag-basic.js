// Create a circle shaped path at the center of the view:
var path = new Path.Rectangle({
    center: view.center,
	x:100,
	y:100,
	width:100,
	height:100,
    fillColor: 'blue'
});
        var rectLeftText = new PointText({
            point: path.getBounds().center,
            content: "Rect",
            fillColor: "black",
            fontSize: 20
        });
        rectLeftText.getBounds().center = path.getBounds().center;

var group = new Group([path, rectLeftText]);
// Install a drag event handler that moves the path along.
group.onMouseDrag = function(event) {
    group.position += event.delta;
}   