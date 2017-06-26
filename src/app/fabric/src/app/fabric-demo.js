(function(){

	var canvas = new fabric.Canvas('canvas');	
	//1.Rectangle
	var rect = new fabric.Rect({
	  top: 130,
	  left: 10,
	  width: 100,
	  height: 100,
	  fill: 'gray',
	  stroke: '#99999',
	});

	var text = new fabric.Text('Rect', {
	  fontSize: 30,
	  top: 130,
	  left: 10,
	});

	var group0 = new fabric.Group([ rect, text ], {
	  left: 10,
	  top: 130,
	  angle: 0
	});

	canvas.add(group0);


	//2.Rectangle
	var rect = new fabric.Rect({
	  top: 130,
	  left: 338,
	  width: 100,
	  height: 100,
	  fill: 'gray',
	  stroke: '#99999',
	  strokeWidth: 2,
	  strokeDashArray: [7,5]
	});

	var text = new fabric.Text('Rect', {
	  fontSize: 30,
	  top: 130,
	  left: 338
	});

	var group1 = new fabric.Group([ rect, text ], {
	  left: 338,
	  top: 130,
	  angle: 0
	});

	canvas.add(group1);

	//1.Circle
	var circle = new fabric.Circle({ 
		radius: 50,
		fill: '#FFF',
		originX: 'center',
		originY: 'center',
		stroke: '#000'
	});

	var text = new fabric.Text('Circle', {
	  fontSize: 30,
	  originX: 'center',
	  originY: 'center'
	});

	var group2 = new fabric.Group([ circle, text ], {
	  left: 10,
	  top: 300,
	  angle: 0
	});

	canvas.add(group2);

	//2.Circle
	var circle = new fabric.Circle({ 
		radius: 50,
		fill: '#FFF',
		originX: 'center',
		originY: 'center',
		stroke: '#000'
	});

	var text = new fabric.Text('Circle', {
	  fontSize: 30,
	  originX: 'center',
	  originY: 'center'
	});

	var group3 = new fabric.Group([ circle, text ], {
	  left: 338,
	  top: 300,
	  angle: 0
	});

	canvas.add(group3);

	//1.Line
	function makeLine(coords) {
		return new fabric.Line(coords, {
		  fill: 'black',
		  stroke: 'black',
		  strokeWidth: 3,
		  selectable: true
		});
	  }

	  var line = makeLine([ 200, 180, 400, 180]);
	  
	  //1.Triangle
	  var triangle = new fabric.Triangle({
	  width: 20, height: 30, angle: 90, fill: 'black', left: 430, top: 170
		});
	  
	  //1.Text
	  var text = new fabric.Text('Label', {
		fontSize: 30,
		left: 250,
		top: 150
	  });
	  
	  var group4 = new fabric.Group([ line, triangle, text ], {
		left: 110,
		top: 150,
		angle: 0
	 });

	 canvas.add(group4);
		
	 //2. Dotted Line
	function makeLineTwo(coords) {
		return new fabric.Line(coords, {
			stroke: 'black',
			strokeWidth: 3,
			strokeDashArray: [5,5],
			selectable: true	  
		});
	}
	  
	var line = makeLineTwo([ 200, 345, 400, 345]);
	  
	//2.Triangle
	var triangle = new fabric.Triangle({
		width: 20, height: 30, angle: 270, fill: 'black', left: 165, top: 358
	});

	//2.Text
	var text = new fabric.Text('Label', {
		fontSize: 30,
		left: 250,
		top: 310
	});

	var group5 = new fabric.Group([ line, triangle, text], {
		left: 110,
		top: 310,
		angle: 0
	});

	canvas.add(group5);
		
		//Add rectangle
		$("#b").click(function(){
		
		var rect = new fabric.Rect({
		  top: 10,
		  left: 10,
		  width: 100,
		  height: 100,
		  fill: 'gray',
		  stroke: '#99999'
		  
		});

		var text = new fabric.Text('Rect', {
		  fontSize: 30,
		  top: 10,
		  left: 10,
		});

		var groupRect = new fabric.Group([ rect, text ], {
		  left: 10,
		  top: 10,
		  angle: 0
		});

		canvas.add(groupRect);
		});
		
		//Add circle
		$("#b1").click(function(){
		
		var circle = new fabric.Circle({ 
		radius: 50,
		fill: '#FFF',
		originX: 'center',
		originY: 'center',
		stroke: '#000'
		});
		
		var text = new fabric.Text('Circle', {
		fontSize: 30,
		originX: 'center',
		originY: 'center'
		});

		var groupCircle = new fabric.Group([ circle, text ], {
		left: 10,
		top: 10,
		angle: 0
		});
		canvas.add(groupCircle);
		});
		
		
		
		//Add arrow
		$("#b2").click(function(){
		//Line
		function makeLine(coords) {
			return new fabric.Line(coords, {
			fill: 'black',
			stroke: 'black',
			strokeWidth: 3,
			selectable: true
			});
		}

		var line = makeLine([ 200, 180, 400, 180]);
	  
		//Triangle
		var triangle = new fabric.Triangle({
			width: 20, height: 30, angle: 90, fill: 'black', left: 430, top: 170
		});
	  
		//Text
		var text = new fabric.Text('Label', {
			fontSize: 30,
			left: 250,
			top: 150
		});
	  
		var groupArrow = new fabric.Group([ line, triangle, text ], {
			left: 10,
			top: 10,
			angle: 0
		});

		canvas.add(groupArrow);
		
		});
		
		//Add dotted arrow
		$("#b3").click(function(){
		//Add Line	
		function makeLineTwo(coords) {
		return new fabric.Line(coords, {
		  stroke: 'black',
		  strokeWidth: 3,
		  strokeDashArray: [5,5],
		  selectable: true	  
			});
		}
	  
		var line = makeLineTwo([ 160, 345, 362, 345]);
		  
		//2.Triangle
		var triangle = new fabric.Triangle({
		width: 20, height: 30, angle: 270, fill: 'black', left: 130, top: 358
		});

		//2.Text
		var text = new fabric.Text('Label', {
		fontSize: 30,
		left: 200,
		top: 310
		});

		var groupDottedLine = new fabric.Group([ line, triangle, text], {
		left: 10,
		top: 10,
		angle: 0
		});

		canvas.add(groupDottedLine);
		
		});
		
})()