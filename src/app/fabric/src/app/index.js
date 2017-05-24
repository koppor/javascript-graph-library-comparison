<!DOCTYPE html>
<html lang="en">
<head>
  <script src="jquery-3.2.1.min.js"></script>
  <script src="fabric.min.js"></script>
  <script>
        $(document).ready(function(){
            var canvas = new fabric.Canvas('canvas');
//1.Rectangle
var rect = new fabric.Rect({
  top: 400,
  left: 100,
  width: 100,
  height: 100,
  fill: '#da9494'  
});

var text = new fabric.Text('Text', {
  fontSize: 30,
  top: 420,
  left: 120
});

var group = new fabric.Group([ rect, text ], {
  left: 100,
  top: 230,
  angle: 0
});

canvas.add(group);


//2.Rectangle
var rect = new fabric.Rect({
  top: 400,
  left: 400,
  width: 100,
  height: 100,
  fill: '#da9494'  
});

var text = new fabric.Text('Text', {
  fontSize: 30,
  top: 420,
  left: 420
});

var group = new fabric.Group([ rect, text ], {
  left: 430,
  top: 230,
  angle: 0
});

canvas.add(group);

//1.Circle
var circle = new fabric.Circle({ 
	radius: 50,
	fill: '#eef',
	originX: 'center',
	originY: 'center'
});

var text = new fabric.Text('Text', {
  fontSize: 30,
  originX: 'center',
  originY: 'center'
});

var group = new fabric.Group([ circle, text ], {
  left: 100,
  top: 130,
  angle: 0
});

canvas.add(group);

//2.Circle
var circle = new fabric.Circle({ 
	radius: 50,
	fill: '#eef',
	originX: 'center',
	originY: 'center'
});

var text = new fabric.Text('Text', {
  fontSize: 30,
  originX: 'center',
  originY: 'center'
});

var group = new fabric.Group([ circle, text ], {
  left: 430,
  top: 130,
  angle: 0
});

canvas.add(group);

//1.Line
function makeLine(coords) {
    return new fabric.Line(coords, {
      fill: '#94b2da',
      stroke: '#94b2da',
      strokeWidth: 3,
      selectable: true,
    });
  }

  var line = makeLine([ 200, 180, 400, 180]);
  canvas.add(line);
  
  
 //2. Dotted Line TODO
  function makeLine(coords) {
    return new fabric.Line(coords, {
      fill: 'black',
      stroke: 'black',
      strokeWidth: 3,
      selectable: true	  
    });
  }
  
  var line = makeLine([ 200, 280, 400, 280]);
  canvas.add(line);
  
//1.Triangle
  var triangle = new fabric.Triangle({
  width: 20, height: 30, angle: 90, fill: '#94b2da', left: 430, top: 170
});
canvas.add(triangle);
  
  
//2.Triangle
  var triangle = new fabric.Triangle({
  width: 20, height: 30, angle: 90, fill: '#c6da94', left: 430, top: 270
});
canvas.add(triangle);
  
//1.Text
var text = new fabric.Text('Text', {
  fontSize: 30,
  left: 250,
  top: 150
});
canvas.add(text);

//2.Text
var text = new fabric.Text('Text', {
  fontSize: 30,
  left: 250,
  top: 250
});
canvas.add(text);

});

</script>

</head>

<body>
  <div>
    <header>
      <h1>Fabric</h1>
    </header>
   <canvas id="canvas" width="1300" height="800"></canvas>
</body>
</html>