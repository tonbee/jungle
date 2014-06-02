"use strict";

(function(){
    var stage_y = 20;
    var stage_x = 30;

    var img_map = [];

    function generate_table(){
        for (var i = 0;i<stage_y;i++){
            var line = [];
            var tr_tag = $("<tr>");
            for (var x = 0;x < stage_x;x++){
                var td_tag = $("<td>");
                var img_tag = $("<img>");
                img_tag.attr("src","tuti.jpg");
                td_tag.append(img_tag);
                tr_tag.append(td_tag);
                line.push(img_tag);
            }
            img_map.push(line);
            $("#stage0").append(tr_tag);
        }
    }

    function main(){
        console.log("main start");
        generate_table();
    }

    var map_width;
    var map_height;
    function init_map(width,height){
        var map = [];
        map_width = width;
        map_height = height;
        var ground = 10;

        for (var x = 0;x < width;x++){
            ground += Math.floor(Math.random() * 3) - 1;
            if (ground >= height) { ground = height - 1};
            if (ground < 0 ) { ground = 0};

            var line = [];
            for (var y = 0;y < (height-ground);y++){
                line[y] = 0;
            }
            for (var y = (height-ground);y<height;y++){
                line[y] = 1;
            }
            map.push(line);
        }
        return map;
    }

    var map = init_map(60,20);
    function redraw_table(left){
        for (var y = 0;y < map_height;y++){
            for (var x = 0;x < stage_x;x++){
                var x_idx = (left + x) % map_width;
                var obj = map[x_idx][y];
                var img_name;
                if (obj === 1) {
                    img_name = "tuti.jpg";
                } else {
                    img_name = "sora.jpg"
                }
                img_map[y][x].attr("src",img_name);
            }
        }

        return;
    }

    var playing = false;
    function register_handler(){
        $("#scroll_button").click(function(ev){
            if (playing) {
                scroll_stop();
            } else {
                scroll_start();
            }
        });
    }

    function scroll_stop(){
        playing = false;
    }

    var count = 0;
    var left = 0;

    function scroll_start(){
        playing = true;
        var unit = 1;
        redraw_table(left);

        var loop = function(){
            count++;
            if (count == 23) {
                count = 0;
                left = (left + 1) % map_width;
                redraw_table(left);
            }
            var offset = $("#stage0").offset();
            $("#stage0").offset({top: offset.top,left : -count});
            if (playing) {
                setTimeout(loop,10);
            }
        };
        loop();
    }

    register_handler();
    main();
    redraw_table(0);
}());
