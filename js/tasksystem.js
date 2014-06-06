"use strict";

(function(){

    var fps = 10;

    var stage = {
        cell_width : 23,
        view_width : 800,
        view_height : 572,
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
        this.x -= 5;
        var y = this.base + Math.sin(this.life/2) * (stage.view_height / 8);
        var in_view = set_view(this.obj,this.x,y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }

    var player_width = 83;
    var player_height = 278;
    function Player(){
        this.width = player_width;
        this.height = player_height;

        this.x = stage.point + 20 ;// tekitou
        this.y = stage.view_height - player_height;
        this.obj = $("#player");
        this.img_obj = $("#player_image");
    }

    Player.prototype.step = player_step;
    function player_step(){
        set_view(this.obj,this.x,this.y);
        if (stage.view_width < this.x) {
            scroll = "right";
        }
        if (this.x < 0) {
            scroll = "left";
        }
        return true;
    }

    Player.prototype.move_right = move_right;
    function move_right(){
        this.img_obj.attr("src","hito1_right.png");
        this.x += 5;
    }
    Player.prototype.move_left = move_left;
    function move_left(){
        this.img_obj.attr("src","hito1_left.png");
        this.x -= 5;
    }

    Player.prototype.reset = player_reset;
    function player_reset(position){
        this.x = position;
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

    var scroll = "none";

    function task_start(){
        var interval = 1000 / fps;
        var scroll_interval = 10;

        var cycle = 0;
        var origin_left = -stage.view_width+10;

        var scroll_reset = function(position){
            var inner = $("#stage_inner");
            inner.offset({top: inner.offsetTop, left : origin_left});
            player.reset(position);
            scroll = "none";
            setTimeout(main_loop,interval);
        }
        var diff = 10;
        var scroll_right_loop = function(){
            cycle -= 8;
            if (cycle <= (-1 * stage.view_width)) {
                scroll_reset(diff);
                return;
            }
            var inner = $("#stage_inner");
            inner.offset({top: inner.offsetTop, left : origin_left + cycle});
            setTimeout(scroll_right_loop,scroll_interval);
        }

        var scroll_left_loop = function(){
            cycle += 8;
            if (stage.view_width < cycle) {
                scroll_reset(stage.view_width-diff);
                return;
            }
            var inner = $("#stage_inner");
            inner.offset({top: inner.offsetTop, left : origin_left + cycle});
            setTimeout(scroll_left_loop,scroll_interval);
        }

        var main_loop = function(){
            if (scroll !== "none") {
                for (var i = 0,l=task_list.length;i<l;i++){
                    var task = task_list.shift();
                    if (task !== player){
                        task.obj.remove();
                    } else {
                        task_list.push(task);
                    }
                }
                cycle = 0;
                if (scroll === "right") {
                    scroll_right_loop();
                    return;
                }
                if (scroll === "left") {
                    scroll_left_loop();
                    return;
                }
            }
            for (var i = 0,l=task_list.length;i<l;i++){
                var task = task_list.shift();
                if (task.step()) {
                    task_list.push(task);
                } else {
                    console.log("task destroy");
                    console.log(task);
                    console.log(task_list.length);
                }
            }
            setTimeout(main_loop,interval);
        }

        main_loop();
    }

    var player;
    function main(){
        console.log("main start");
        // generate_table();
        player = new Player();
        task_list.push(player);
    }

    function register_handlers(){
        // keycode <-:37 ^:38 ->:39 V:40
        $(window).keydown(function(e){
            if (e.keyCode === 39) {
                player.move_right();
            } else if (e.keyCode == 37) {
                player.move_left();
            }
        });

        $("#chara_button").click(function(e){
            task_list.push(new Musi());
        });
    }

    main();
    register_handlers();
    task_start();
}());
