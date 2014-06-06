"use strict";

(function(){

    var fps = 10;

    var stage = {
        view_width : 800,
        view_height : 572,
        map_pos: 0,
    }

    var map_images = [
        "haike1.png","haike2.png",
    ];

    var task_list = [];

    function Musi(){
        this.x = stage.view_width - 1;
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

        this.x = 20 ;// tekitou
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
        var view_x = x;
        if (view_x < 0 || stage.view_width < view_x) {
            return false;
        }
        var view_y = y;
        obj.offset({top: view_y, left : view_x});
        return true;
    }

    function move_map_pos(diff){
        stage.map_pos += diff;
        var length = map_images.length;
        stage.map_pos = (stage.map_pos + length) % length;
    }

    function map_reset(){
        console.log(stage.map_pos);
        var length = map_images.length
        var map0_file = map_images[(length + stage.map_pos - 1) % length];
        var map1_file = map_images[(length + stage.map_pos    ) % length];
        var map2_file = map_images[(length + stage.map_pos + 1) % length];
        console.log(map0_file);
        console.log(map1_file);
        console.log(map2_file);
        $("#map0").attr("src",map0_file);
        $("#map1").attr("src",map1_file);
        $("#map2").attr("src",map2_file);
    }

    var scroll = "none";
    var origin_left = -stage.view_width+10;

    function scroll_reset(player_position){
        var inner = $("#stage_inner");
        inner.offset({top: inner.offsetTop, left : origin_left});
        player.reset(player_position);
        map_reset();
        scroll = "none";
    }

    function task_start(){
        var interval = 1000 / fps;
        var scroll_interval = 10;

        var cycle = 0;
        var diff = 10;

        var scroll_reset_inner = function(player_position){
            scroll_reset(player_position)
            setTimeout(main_loop,interval);
        }

        var inner = $("#stage_inner");

        var scroll_right_loop = function(){
            cycle -= 8;
            if (cycle <= (-1 * stage.view_width)) {
                scroll_reset_inner(diff);
                return;
            }
            inner.offset({top: inner.offsetTop, left : origin_left + cycle});
            setTimeout(scroll_right_loop,scroll_interval);
        }

        var scroll_left_loop = function(){
            cycle += 8;
            if (stage.view_width < cycle) {
                scroll_reset_inner(stage.view_width-diff);
                return;
            }
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
                    move_map_pos(1);
                    scroll_right_loop();
                    return;
                }
                if (scroll === "left") {
                    move_map_pos(-1);
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
    function init_player(){
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

    init_player();
    register_handlers();
    scroll_reset(10);
    task_start();
}());
