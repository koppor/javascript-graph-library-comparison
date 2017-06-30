

$(window).load(function () {


    var canvas = new draw2d.Canvas("canvas");


    canvas.add(new draw2d.shape.node.Start(), 20, 10, 80, 80);


    canvas.add(new draw2d.shape.node.End(),400, 10, 80, 80);


    var shape =  new draw2d.shape.basic.Circle({x:40,y:10, stroke:3});

    //canvas.add(shape);

});
