"use strict";
var Objects = {};

(function(){
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

    function generate_objects_dom(object,image){
        var obj = $("<div>");
        obj.attr("class","objects");
        var img = $("<img>");
        img.attr("src",image);

        img.attr("width",object.scale);
        img.attr("height",object.scale);

        obj.append(img);
        $("#stage0").append(obj);

        object.obj = obj;
        object.img = img;
        return;
    }

    /* Objects */

    // Objects.Musi = Musi;

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

    Objects.Progre = Progre;
    function Progre(){

        /* 座標の初期値 */
        this.x = random(stage.view_width);
        this.y = random(stage.view_height);
        /* 使う画像のリスト */
        this.images = ["objects/736.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
    }

    /* 名前をいれておく */
    Progre.obj_name = "プログレ";
    /* 動物ならdynamic,植物ならstatic */
    Progre.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Progre.map = [];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Progre.prototype.step = progre_step;
    function progre_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        this.x += random(11) - 5;
        this.y += random(11) - 5;

        /* 画像のさしかえ(不要ならいらない) */
        this.img.attr("src",this.images[0]);

        /* 表示 */
        /* はほぼ共通なので以下をコピペ */
        var in_view = set_view(this.obj,this.x,this.y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }

}());
