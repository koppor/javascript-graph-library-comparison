(function () {
    "use strict";

    var canvas = new fabric.Canvas('canvas2');
    canvas.setHeight(500);
    canvas.setWidth(500);
    //1.Rectangle
    var rect = new fabric.Rect({
        top: 10,
        left: 5,
        width: 80,
        height: 80,
        fill: 'lightgrey',
        stroke: 'black'

    });

    var text = new fabric.Text('Rect', {
        fontSize: 20,
        top: 40,
        left: 25

    });

    var group0 = new fabric.Group([rect, text], {
        fontFamily: 'sans-serif'
    });


    //2.Rectangle
    var rect2 = new fabric.Rect({
        top: 10,
        left: 400,
        width: 80,
        height: 80,
        fill: 'lightgrey',
        strokeWidth: 2,
        stroke: 'black',
        strokeDashArray: [5, 5]

    });

    var text8 = new fabric.Text('Rect', {
        fontSize: 20,
        top: 40,
        left: 420

    });

    var group1 = new fabric.Group([rect2, text8], {
        fontFamily: 'sans-serif'
    });


    //1.Line
    var line = new fabric.Line([200, 180, 515, 180], {
        left: rect.width + 5,
        top: rect.height / 2 + 10,
        stroke: 'black'
    });
    /*
     //1.Triangle
     var triangle = new fabric.Triangle({
     width: 20, height: 30, angle: 90, fill: 'black', left: 400, top: 40
     });
     */
    //1.Text
    var text2 = new fabric.Text('Label', {
        fontSize: 20,
        left: 210,
        top: 40
    });

    var group4 = new fabric.Group([line, text2], {
        fontFamily: 'sans-serif'
    });


    var group17 = new fabric.Group([group0, group1, group4], {
        fontFamily: 'sans-serif'
    });
    canvas.add(group17);

    //1.Circle
    var circle = new fabric.Circle({
        radius: 40,
        top: 400,
        left: 10,
        fill: '#FFF',
        stroke: '#000'
    });

    var textCircle1 = new fabric.Text('Circle', {
        fontSize: 20,
        top: 430,
        left: 25

    });

    var group2 = new fabric.Group([circle, textCircle1], {
        fontFamily: 'sans-serif'
    });

    //2.Circle
    var circle2 = new fabric.Circle({
        radius: 40,
        fill: '#FFF',
        stroke: '#000',
        top: 400,
        left: 400
    });

    var text4 = new fabric.Text('Circle', {
        top: 430,
        left: 415,
        fontSize: 20

    });

    var group3 = new fabric.Group([circle2, text4], {
        fontFamily: 'sans-serif'
    });

    var linieCircle = new fabric.Line([400, 180, 740, 180], {
        left: circle.width + 10,
        top: 440,
        length: 800,
        stroke: 'black',
        strokeDashArray: [5, 5]
    });

    /*
     //2.Triangle
     var triangle = new fabric.Triangle({
     width: 20, height: 30, angle: 270, fill: 'black', left: 165, top: 358
     });

     */
    var group5 = new fabric.Group([linieCircle, group3, group2], {});

    canvas.add(group5);

    //Add rectangle
    $("#addRectBtn").click(function () {

        var rect = new fabric.Rect({
            top: 200,
            left: 5,
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
    });

    //Add circle
    $("#addCircleBtn").click(function () {
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
    });


    //Add arrow
    $("#exportBtn").click(function () {
        var canvas = document.getElementById("canvas2");
        var downloadWindow = window.open("Image", "Image from FabricJS");
        downloadWindow.location = canvas.toDataURL();
    });

})();
