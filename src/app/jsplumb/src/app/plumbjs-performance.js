(function () {
    "use strict";
    var div = document.createElement('div');
    var items = (50 * 50);
    var divsForDemo = "";

    for (var i = 0; i < items; i++) {
        divsForDemo += "<div></div><div id=\"item_rect" + i + "\" class=\"item box \"><div class=\"text\">" + i + "</div></div></div>";
    }

    div.innerHTML = divsForDemo;

    document.getElementById('canvas').appendChild(div);

    $(".item").resizable({
        resize: function (event, ui) {
            jsPlumb.repaint(ui.helper);
        },
        handles: "all"
    });


    jsPlumb.ready(function () {


        jsPlumb.setContainer("canvas");

        var common = {
            connector: ["Straight"],
            anchor: ["Left", "Right"],
            endpoint: "Dot"
        };
        var i;
        for (i = 0; i < (items - 1); i++) {

            jsPlumb.connect({
                source: "item_rect" + i,
                target: "item_rect" + (i + 1),
            }, common);
        }
        jsPlumb.draggable($(".item"), {
            grid: [50, 50]
        });

    });
})
()