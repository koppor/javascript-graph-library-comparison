(function () {
    "use strict";


    var canvas = new fabric.Canvas('canvas2', {
        selection: true
    });
    //1.Rectangle
    canvas.setDimensions({width:500,height:500});




var group3;
var group2;
var group0;
var group1;
var lin;
var text4;
var text2;
    var linieCircle;
    var circle1;
    var circle2;

    function initRectangles() {
       var  rect1 = new fabric.Rect({
            top: 10,
            left: 10,
            width: 80,
            height: 80,
            fill: 'lightgrey',
           name: 'rect1',
            stroke: 'black'
        });

        var text1 = new fabric.Text('Rect', {
            fontSize: 20,
            top: rect1.top + 30,
            left: rect1.left + 20
        });

         group0 = new fabric.Group([rect1, text1], {
            name: 'rect1',
            fontFamily: 'sans-serif'
        });
        canvas.add(group0);

        //2.Rectangle
      var  rect2 = new fabric.Rect({
            top: 10,
            left: 410,
            width: 80,
            height: 80,
            fill: 'lightgrey',
            strokeWidth: 1,
            stroke: 'black',
             name: 'rect2',
            strokeDashArray: [3, 3]
        });

        var text8 = new fabric.Text('Rect', {
            fontSize: 20,
            top: rect2.top + 30,
            left: rect2.left + 20
        });

         group1 = new fabric.Group([rect2, text8], {
            name: 'rect2',
            fontFamily: 'sans-serif'
        });
        canvas.add(group1);

        //1.Line
         lin = new fabric.Line([100, 100, 420, 100], {
            left: rect1.width + 10,
            top: rect1.height / 2 + 10,
            stroke: 'black',
           fontFamily: 'sans-serif',
           name:'Linie',
           selectable: true,
           hasControls: false,
           hasBorders: false,
           centeredRotation: false,
           centeredScaling: false
        });
        //1.Text
         text2 = new fabric.Text('Label', {
            fontSize: 20,
            top: lin.top -10,
             left: lin.left + lin.width/2
        });

        canvas.add(text2);
        canvas.add(lin);

    }

    function initCircles() {
        //1.Circle
         circle1 = new fabric.Circle({
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

         group2 = new fabric.Group([circle1, textCircle1], {
            fontFamily: 'sans-serif',
            name: 'circle1'
        });

        canvas.add(group2);

        //2.Circle
        var circle2 = new fabric.Circle({
            radius: 40,
            fill: '#FFF',
            stroke: '#000',
            top: 400,
            left: 400
        });

         text4 = new fabric.Text('Circle', {
            top: 430,
            left: 415,
            fontSize: 20
        });

         group3 = new fabric.Group([circle2, text4], {
            fontFamily: 'sans-serif',
            name:'circle2'
        });
        canvas.add(group3);

        linieCircle = new fabric.Line([410, 440, 100, 440], {
            stroke: 'black',
            fontFamily: 'sans-serif',
            name:'linieCircle',
            left: circle1.width + 10,
            top: 440,
            selectable: true,
            hasControls: false,
            hasBorders: false,
            centeredRotation: false,
            centeredScaling: false,
            strokeDashArray: [5, 5]
        });
        /*
         linieCircle = new fabric.Line([400, 180, 740, 180], {
            left: circle1.width + 10,
            top: 440,
            length: 800,
            stroke: 'black',
            strokeDashArray: [5, 5]
        });
        */
        canvas.add(linieCircle);
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
        var canvas = document.getElementById("canvas2");
        var downloadWindow = window.open("Image", "Image from FabricJS");
        downloadWindow.location = canvas.toDataURL();
}

    canvas.observe('object:moving', function (options) {
        var obj = options.target;
        var p = options.target;

        if (p.name ==='Linie') {
            var _l = lin.left;
            var _t = lin.top;
            group0.set({
                'left': (lin.calcLinePoints().x1 + _l),
                'top': (lin.calcLinePoints().y1 + _t)
            });
            group0.lin.set({
                'x1': group0.left,
                'y1': group0.top
            });
            group0.lin.setCoords();
            group1.set({
                'left': (lin.calcLinePoints().x2 + _l),
                'top': (lin.calcLinePoints().y2 + _t)
            });
            group1.lin.set({
                'x2': group1.left,
                'y2': group1.top
            });
            group1.lin.setCoords();
            canvas.renderAll();
        }
        if (p.name === 'rect1') {
            lin.set({
                x1: group0.getCenterPoint().x, y1: group0.getCenterPoint().y, selectable: true
            });
        }
        else { if (p.name === 'rect2') {
            lin.set({
                        x2: group1.getCenterPoint().x, y2: group1.getCenterPoint().y, selectable: true
                    });
        }
        }
        text2.top = lin.top+lin.height/2;
        text2.left = lin.left+lin.width/2;
        text2.setCoords();

        group0.setCoords();
        group1.setCoords();
        canvas.renderAll();

        //ADD Move Line for Circle Line
        if (p.name ==='linieCircle') {
            var _v = linieCircle.left;
            var _r = linieCircle.top;

            group2.set({
                'left': (linieCircle.calcLinePoints().x1 + _v),
                'top': (linieCircle.calcLinePoints().y1 + _r)
            });

            group2.linieCircle.set({
                'x1': group2.left,
                'y1': group2.top
            });

            group2.linieCircle.setCoords();
            canvas.renderAll();
            group3.set({
                'left': (linieCircle.calcLinePoints().x2 + _v),
                'top': (linieCircle.calcLinePoints().y2 + _r)
            });
            group3.linieCircle.set({
                'x2': group3.left-40,
                'y2': group3.top
            });

            group3.linieCircle.setCoords();
            canvas.renderAll();
        }
        if (p.name === 'circle1') {
            linieCircle.set({
                x1: group2.getCenterPoint().x, y1: group2.getCenterPoint().y, selectable: true
            });
        }
        else { if (p.name === 'circle2') {
            linieCircle.set({
                x2: group3.getCenterPoint().x, y2: group3.getCenterPoint().y, selectable: true
            });
        }
        }
        linieCircle.setCoords();
        group2.setCoords();
        group3.setCoords();
        canvas.renderAll();


        if(obj.getHeight() > obj.canvas.height || obj.getWidth() > obj.canvas.width){
            obj.setScaleY(obj.originalState.scaleY);
            obj.setScaleX(obj.originalState.scaleX);
        }
        obj.setCoords();
        if(obj.getBoundingRect().top - (obj.cornerSize / 2) < 0 ||
            obj.getBoundingRect().left -  (obj.cornerSize / 2) < 0) {
            obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top + (obj.cornerSize / 2));
            obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left + (obj.cornerSize / 2));
        }
        if(obj.getBoundingRect().top+obj.getBoundingRect().height + obj.cornerSize  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width + obj.cornerSize  > obj.canvas.width) {
            obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top - obj.cornerSize / 2);
            obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left - obj.cornerSize /2);
        }
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
