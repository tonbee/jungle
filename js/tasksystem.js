"use strict";

(function(){

    var fps = 10;

    var stage = {
        cell_width : 23,
        view_width : 600,
        view_height : 500,
        point : 0
    }

    var task_list = [];

    function Musi(){
        this.x = stage.point + stage.view_width - 1;
        this.base = Math.floor(Math.random() * stage.view_height);

        var obj = $("<div>");
        obj.attr("class","test_musi");
        $("#stage0").append(obj);
        this.obj = obj;
        this.life = 0;
    }

    Musi.prototype.step = musi_step;

    function musi_step(){
        this.life += 1;
        this.x -= 10;
        var y = this.base + Math.sin(this.life) * (stage.view_height / 8);
        var in_view = set_view(this.obj,this.x,y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }

    function set_view(obj,x,y){
        var view_x = x - stage.point;
        if (view_x < 0 || stage.view_width < view_x) {
            return false;
        }
        var view_y = y;
        obj.offset({top: view_y, left : view_x});
        return true;
    }

    function task_start(){
        var interval = 1000 / fps;

        var main_loop = function(){
            var new_task_list = [];
            for (var i = 0,l=task_list.length;i<l;i++){
                var task = task_list.shift();
                if (task.step()) {
                    task_list.push(task);
                } else {
                    console.log("task destory");
                    console.log(task);
                    console.log(task_list.length);
                }
            }
            setTimeout(main_loop,interval);
        }

        main_loop();
    }

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

    function move_right(){
        stage.point += 5;
    }
    function move_left(){
        stage.point -= 5;
    }

    function register_handlers(){
        // keycode <-:37 ^:38 ->:39 V:40
        $(window).keydown(function(e){
            if (e.keyCode === 39) {
                move_right();
            } else if (e.keyCode == 37) {
                move_left();
            }
        });

        $("#chara_button").click(function(e){
            task_list.push(new Musi());
        });
    }

    var scroll_task = {
        last_point : 0
    };
    scroll_task.step = scroll_step;

    task_list.push(scroll_task);

    function scroll_step(){
        if (scroll_task.last_point === stage.point) {return true;}

        var point = stage.point;
        scroll_task.last_point = point;
        var offset = point % stage.cell_width;
        var map_point = Math.floor(point / stage.cell_width);
        map_point = (map_width + map_point) % map_width;
        $("#stage0").offset({top: offset.top,left : -offset});
        redraw_table(map_point);
        return true;
    }

    register_handlers();
    main();
    redraw_table(0);
    task_start();
}());
