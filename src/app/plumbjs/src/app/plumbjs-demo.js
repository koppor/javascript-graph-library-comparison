(function () {
    "use strict";
    var div = document.createElement('div');

    var divsForDemo = "<div id=\"item_circle1\" class=\"circleBase type1\" style=\"margin-left:100px;margin-top: 100px\">\
        <div class=\"text\">Circle 1</div>\
    </div>\
    <div id=\"item_circle2\" class=\"circleBase type1\" style=\"margin-left: 300px;margin-top: 100px\">\
        <div class=\"text\">Circle 2</div>\
    </div>\
    <div id=\"item_rect2\" class=\"item\" style=\"margin-left:100px;margin-top: 400px\">\
        <div class=\"text\">Rectangle 2</div>\
    </div>\
    <div id=\"item_rect1\" class=\"item\" style=\"margin-left:300px;margin-top: 400px\">\
        <div class=\"text\">Rectangle 1</div>\
    </div>";

    div.innerHTML = divsForDemo;

    document.getElementById('canvas').appendChild(div);

    $(".item").resizable({
        resize: function (event, ui) {
            jsPlumb.repaint(ui.helper);
        },
        handles: "all"
    });

    $(".circleBase").resizable({
        resize: function (event, ui) {
            jsPlumb.repaint(ui.helper);
        },
        handles: "all"
    });

    initJSPLumb()
    $("#addRectBtn").click(function () {
        $('svg').each(function() {
            console.log("test")
            $(this).remove();

        });
            var old = document.getElementById('canvas').innerHTML;

            old = old.concat("<div id=\"item\" class=\"item\" style=\"margin-left:300px;margin-top: 200px\"><div class=\"text\">Item 1</div></div>");
            div.innerHTML = old;
            document.getElementById('canvas').appendChild(div);
            initJSPLumb();
        }
    );
    $("#addCircleBtn").click(function () {
        $('svg').each(function() {
            console.log("test")
                $(this).remove();

        });

            var old = document.getElementById('canvas').innerHTML;

            old = old.concat("<div id=\"item_circle4\" class=\"circleBase type1\" style=\"margin-left:150px;margin-top: 200px\">\
                     <div class=\"text\">item 1</div>\
                    </div>");


            div.innerHTML = old;

            document.getElementById('canvas').appendChild(div);
            initJSPLumb();
        }
    );
})()

function initJSPLumb() {

    jsPlumb.ready(function () {
        jsPlumb.setContainer("canvas");

        var common = {
            connector: ["Straight"],
            anchor: ["Left", "Right"],
            endpoint: "Dot"
        };

        jsPlumb.connect({
            source: "item_circle1",
            target: "item_circle2",
            endpoint: "Dot"
        }, common);

        jsPlumb.connect({
            source: "item_rect1",
            target: "item_rect2",
        }, common);

        jsPlumb.draggable($(".item"), {
            grid: [50, 50],
            start: function (params) {
                console.log(params);
                console.log("DragEND!");
                $('#' + params.id).removeAttr('style')

            }
        });
        jsPlumb.draggable($(".circleBase"), {
            grid: [50, 50],
            start: function (params) {
                console.log(params);
                console.log("DragEND!");
                $('#' + params.id).removeAttr('style')

            }
        });



    });

}