"use strict";
var stage;

(function(){

    var fps = 10;

    stage = {
        view_width : 800,
        view_height : 572,
        map_pos: 0,
    }

    var task_list = [];

    /* Player Object */

    var player_width = 83;
    var player_height = 278;

    function Player(){
        this.width = player_width;
        this.height = player_height;

        this.x = 20 ;// tekitou
        this.y = stage.view_height - player_height;
        this.obj = $("#player");
        this.img_obj = $("#player_image");

        this.down_cycle = 0;
        this.walk_span = 0;
        this.walk_cycle = 0;
        this.walk_right_images = [
            "1-01_right.png",
            "1-02_right.png",
            "1-03_right.png",
            "1-04_right.png",
            "1-05_right.png",
            "1-06_right.png",
        ];
        this.walk_left_images = [
            "1-01_left.png",
            "1-02_left.png",
            "1-03_left.png",
            "1-04_left.png",
            "1-05_left.png",
            "1-06_left.png",
        ];
    }

    Player.prototype.step = player_step;
    var walk_span_unit = 4;
    var walk_diff = 20;
    function player_step(){
        set_view(this.obj,this.x,this.y);
        if (stage.view_width < this.x) {
            scroll = "right";
        }
        if (this.x < 0) {
            scroll = "left";
        }

        if (!in_turn) {
            if (last_move === "right" || last_move === "left") {
                this.walk_span = (this.walk_span + 1) % walk_span_unit;
                if (this.walk_span === 0) {
                    if (last_move === "right") {
                        var images = this.walk_right_images;
                        this.x += walk_diff;
                    } else {
                        var images = this.walk_left_images;
                        this.x -= walk_diff;
                    }
                    var length = images.length;
                    this.walk_cycle = (this.walk_cycle + 1) % length;
                    this.img_obj.attr("src","images/" + images[this.walk_cycle]);
                }
            }

            var down_unit = 5;
            if (last_move === "down") {
                var images;
                if (player_dir === "right") {
                    images = ["3-01_right.png","3-02_right.png","3-03_right.png"];
                } else {
                    images = ["3-01_left.png","3-02_left.png","3-03_left.png"];
                }
                var length = images.length;
                this.down_cycle += 1;
                if (this.down_cycle > (length - 1) * down_unit ) {
                    this.down_cycle = (length - 1) * down_unit;
                }
                var idx = Math.floor(this.down_cycle / down_unit);
                this.img_obj.attr("src","images/" + images[idx]);
            }
            if (last_move === ""){
                last_move_count += 1;
                if (last_move_count > 14) {
                    player_dir = "";
                    return true;
                }
                var idx = Math.floor(last_move_count / 5);
                var images;
                if (player_dir === "right") {
                    // right ->
                    images = ["1-01_right.png","2-01.png","2-02.png"]
                } else {
                    // left ->
                    images = ["2-04.png","2-03.png","2-02.png"]
                }
                this.img_obj.attr("src","images/" + images[idx]);
            }
        }

        return true;
    }

    var last_move_count = 0;
    var last_move = "";
    var player_dir = "";

    Player.prototype.move_right = move_right;
    function move_right(){
        last_move = "right"
        player_dir = "right"

        if (player_dir === "left") {
            in_turn = true;
            player.turn_right();
        }
    }

    Player.prototype.move_left = move_left;
    function move_left(){
        last_move = "left"
        player_dir = "left"

        if (player_dir === "right") {
            in_turn = true;
            player.turn_left();
        }
    }

    Player.prototype.reset = player_reset;
    function player_reset(position){
        this.x = position;
    }

    var in_turn = false;
    var turn_interval = 100;
    function player_turn(images,img_obj){
        console.log("in_turn");
        var cycle = 0;
        var loop = function(){
            img_obj.attr("src","images/" + images[cycle]);
            cycle += 1
            if (cycle !== images.length) {
                setTimeout(loop,turn_interval);
            } else {
                in_turn = false;
            }
        }
        loop();
    }

    Player.prototype.turn_right = player_turn_right;
    function player_turn_right(){
        var images = ["2-04.png","2-03.png","2-02.png","2-01.png","1-01_right.png"]
        var img_obj = this.img_obj;
        player_turn(images,img_obj);
    }

    Player.prototype.turn_left = player_turn_left;
    function player_turn_left(){
        var images = ["1-01_right.png","2-01.png","2-02.png","2-03.png","2-04.png"]
        var img_obj = this.img_obj;
        player_turn(images,img_obj);
    }

    /* Utils */

    function random(n){
        return Math.floor(Math.random() * n);
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

    /* Map(haikei) */
    var map_images = [
        "images/haike1.png","images/haike2.png","images/haike3.jpg","images/haike4.png",
        "images/haike5.png"
    ];

    var map = [];

    function init_map(map_size){
        var selected = [];
        var i = 0;
        for (;;) {
            var n = random(map_images.length);
            if (selected[n] === true) continue;
            selected[n] = true;
            map.push(n);
            i += 1;
            if (map_size === i) break;
        }
    }

    function move_map_pos(diff){
        stage.map_pos += diff;
        var length = map.length;
        stage.map_pos = (stage.map_pos + length) % length;
    }

    // スクロール直後などのマップ更新処理
    function map_reset(){
        console.log(stage.map_pos);
        console.log(map);
        var length = map.length;
        var map0_file = map_images[map[(length + stage.map_pos - 1) % length]];
        var map1_file = map_images[map[(length + stage.map_pos    ) % length]];
        var map2_file = map_images[map[(length + stage.map_pos + 1) % length]];
        console.log(map0_file);
        console.log(map1_file);
        console.log(map2_file);
        $("#map0").attr("src",map0_file);
        $("#map1").attr("src",map1_file);
        $("#map2").attr("src",map2_file);
    }


    /* Main */

    var player;
    function init_player(){
        player = new Player();
        task_list.push(player);
    }

    function register_handlers(){
        // keycode <-:37 ^:38 ->:39 V:40
        $(window).keydown(function(e){
            if (e.keyCode === 39) {
                if (!in_turn) { player.move_right();}
            } else if (e.keyCode == 37) {
                if (!in_turn) { player.move_left();}
            } else if (e.keyCode == 40) {
                console.log("down");
                last_move = "down";
                player.down_cycle = 0;
            }
        });
        $(window).keyup(function(e){
            if (e.keyCode === 39 || e.keyCode === 37) {
                console.log(last_move + " done.");
                last_move = "";
                last_move_count = 0;
            }
        });

        $("#chara_button").click(function(e){
            task_list.push(new Objects.Musi());
        });
    }

    var scroll = "none";
    var origin_left = -stage.view_width+10;

    function scroll_reset(player_position){
        var inner = $("#stage_inner");
        inner.offset({top: inner.offsetTop, left : origin_left});
        //inner.offset({top: inner.offsetTop, left : inner.offsetLeft});
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

    /* Entry Point */

    init_player();
    init_map(3);
    register_handlers();
    scroll_reset(10);
    task_start();
}());
