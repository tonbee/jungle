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

    function generate_objects_dom(object){
        var obj = $("<div>");
        obj.attr("class","objects");
        var img = $("<img>");
        img.attr("src",object.images[0]);
        obj.append(img);
        $("#stage0").append(obj);

        object.obj = obj;
        object.img = img;
        object.width = img.width;
        object.height = img.height;

        /*
        img.attr("width",object.scale);
        img.attr("height",object.scale);
        */

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

    Objects.Fumidai = Fumidai;
    function Fumidai(){

        /* 座標の初期値 */
        this.x = random(stage.view_width - 100) + 50;
        this.y = (stage.view_height * 4 / 5) + random(stage.view_height/5);
        /* 使う画像のリスト */
        this.images = ["objects/668.png","objects/669.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.state = random(2);
        this.life = random(10);
    }

    /* 名前をいれておく */
    Fumidai.obj_name = "フミダイ";
    /* 動物ならdynamic,植物ならstatic */
    Fumidai.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Fumidai.map = [0,3,5];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Fumidai.prototype.step = fumidai_step;
    function fumidai_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        /* 画像のさしかえ(不要ならいらない) */
        this.life += 1;
        if (this.life % 10 === 0) {
            this.state = 1 - this.state;
            this.img.attr("src",this.images[this.state]);
        }

        /* 表示 */
        /* はほぼ共通なので以下をコピペ */
        var in_view = set_view(this.obj,this.x,this.y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }

    Objects.Garubanzo = Garubanzo;
    function Garubanzo(){

        /* 座標の初期値 */
        this.x = random(stage.view_width - 20) + 10;
        // 画面下部
        this.y = (stage.view_height * 4 / 5) + random(stage.view_height/5);
        /* 使う画像のリスト */
        this.images = ["objects/670.png","objects/671.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.life = 0;
    }

    /* 名前をいれておく */
    Garubanzo.obj_name = "ガルバンゾ";
    /* 動物ならdynamic,植物ならstatic */
    Garubanzo.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Garubanzo.map = [];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Garubanzo.prototype.step = garubanzo_step;
    function garubanzo_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        /* 画像のさしかえ(不要ならいらない) */
        /*
        this.life += 1;
        if (this.life % 10 === 0) {
            this.state = 1 - this.state;
            this.img.attr("src",this.images[this.state]);
        }
        */

        // not yet

        /* 表示 */
        /* はほぼ共通なので以下をコピペ */
        var in_view = set_view(this.obj,this.x,this.y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }
    Objects.Garubanzo = Garubanzo;
    function Garubanzo(){

        /* 座標の初期値 */
        this.x = random(stage.view_width - 20) + 10;
        // 画面下部
        this.y = (stage.view_height * 4 / 5) + random(stage.view_height/5);
        /* 使う画像のリスト */
        this.images = ["objects/670.png","objects/671.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.life = 0;
    }

    /* 名前をいれておく */
    Garubanzo.obj_name = "ガルバンゾ";
    /* 動物ならdynamic,植物ならstatic */
    Garubanzo.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Garubanzo.map = [];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Garubanzo.prototype.step = garubanzo_step;
    function garubanzo_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        /* 画像のさしかえ(不要ならいらない) */
        /*
        this.life += 1;
        if (this.life % 10 === 0) {
            this.state = 1 - this.state;
            this.img.attr("src",this.images[this.state]);
        }
        */

        // not yet

        /* 表示 */
        /* はほぼ共通なので以下をコピペ */
        var in_view = set_view(this.obj,this.x,this.y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }


    Objects.Zenmai = Zenmai;
    function Zenmai(){

        /* 座標の初期値 */
        this.x = random(stage.view_width - 20) + 10;
        // 画面下部
        this.y = (stage.view_height * 4 / 5) + random(stage.view_height/5);
        /* 使う画像のリスト */
        this.images = ["objects/672.png","objects/673.png",
                       "objects/675.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.life = random(20);
        this.state = 0;
    }

    /* 名前をいれておく */
    Zenmai.obj_name = "ゼンマイ";
    /* 動物ならdynamic,植物ならstatic */
    Zenmai.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Zenmai.map = [];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Zenmai.prototype.step = zenmai_step;
    function zenmai_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        /* 画像のさしかえ(不要ならいらない) */
        this.life += 1;
        if (this.life % 20 === 0) {
            this.state += 1;
            this.state = this.state % this.images.length;
            this.img.attr("src",this.images[this.state]);
        }

        /* 表示 */
        /* はほぼ共通なので以下をコピペ */
        var in_view = set_view(this.obj,this.x,this.y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }

    Objects.Eringi = Eringi;
    function Eringi(){

        /* 座標の初期値 */
        this.x = random(stage.view_width - 20) + 10;
        // this.y = (stage.view_height * 4 / 5) + random(stage.view_height/5);
        this.y = stage.view_height / 5 * 2;
        /* 使う画像のリスト */
        this.images = ["objects/706.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.life = random(20);
        this.state = 0;
    }

    /* 名前をいれておく */
    Eringi.obj_name = "エリンギ";
    /* 動物ならdynamic,植物ならstatic */
    Eringi.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Eringi.map = [];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Eringi.prototype.step = eringi_step;
    function eringi_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        /* 画像のさしかえ(不要ならいらない) */

        /* 表示 */
        /* はほぼ共通なので以下をコピペ */
        var in_view = set_view(this.obj,this.x,this.y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }

    Objects.Nira = Nira;
    function Nira(){

        /* 座標の初期値 */
        this.x = random(stage.view_width - 20) + 10;
        this.y = (stage.view_height * 4 / 5) + random(stage.view_height/5);
        /* 使う画像のリスト */
        this.images = ["objects/713.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.life = random(20);
        this.state = 0;
    }

    /* 名前をいれておく */
    Nira.obj_name = "ニラ";
    /* 動物ならdynamic,植物ならstatic */
    Nira.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Nira.map = [];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Nira.prototype.step = nira_step;
    function nira_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        /* 画像のさしかえ(不要ならいらない) */

        /* 表示 */
        /* はほぼ共通なので以下をコピペ */
        var in_view = set_view(this.obj,this.x,this.y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }

    Objects.Nikusyoku = Nikusyoku;
    function Nikusyoku(){

        /* 座標の初期値 */
        this.x = random(stage.view_width - 20) + 10;
        this.y = (stage.view_height * 4 / 5) + random(stage.view_height/5);
        /* 使う画像のリスト */
        this.images = ["objects/721.png","objects/722.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.life = random(20);
        this.state = 0;
    }

    /* 名前をいれておく */
    Nikusyoku.obj_name = "ニクショク";
    /* 動物ならdynamic,植物ならstatic */
    Nikusyoku.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Nikusyoku.map = [];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Nikusyoku.prototype.step = nikusyoku_step;
    function nikusyoku_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        /* 画像のさしかえ(不要ならいらない) */
        // not yet

        /* 表示 */
        /* はほぼ共通なので以下をコピペ */
        var in_view = set_view(this.obj,this.x,this.y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }

    Objects.Ki = Ki;
    function Ki(){

        /* 座標の初期値 */
        this.x = random(stage.view_width - 20) + 10;
        this.y = (stage.view_height * 4 / 5) + random(stage.view_height/5);
        /* 使う画像のリスト */
        this.images = ["objects/723.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        console.log(this.img);
        this.life = random(20);
        this.state = 0;
    }

    /* 名前をいれておく */
    Ki.obj_name = "キ";
    /* 動物ならdynamic,植物ならstatic */
    Ki.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Ki.map = [1,2,4];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Ki.prototype.step = ki_step;
    function ki_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        /* 画像のさしかえ(不要ならいらない) */
        // not yet

        /* 表示 */
        /* はほぼ共通なので以下をコピペ */
        var in_view = set_view(this.obj,this.x,this.y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }

    Objects.Propera = Propera;
    function Propera(){

        /* 座標の初期値 */
        this.x = random(stage.view_width - 20) + 10;
        this.y = (stage.view_height * 4 / 5) + random(stage.view_height/5);
        /* 使う画像のリスト */
        this.images = ["objects/731.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.life = random(20);
        this.state = 0;
    }

    /* 名前をいれておく */
    Propera.obj_name = "プロペラ";
    /* 動物ならdynamic,植物ならstatic */
    Propera.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Propera.map = [2];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Propera.prototype.step = pro_step;
    function pro_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        /* 画像のさしかえ(不要ならいらない) */
        // not yet

        /* 表示 */
        /* はほぼ共通なので以下をコピペ */
        var in_view = set_view(this.obj,this.x,this.y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }

    Objects.Buton = Buton;
    function Buton(){

        /* 座標の初期値 */
        this.x = random(stage.view_width - 20) + 10;
        this.y = (stage.view_height * 4 / 5) + random(stage.view_height/5);
        /* 使う画像のリスト */
        this.images = ["objects/734.png","objects/735.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.life = random(20);
        this.state = 0;
    }

    /* 名前をいれておく */
    Buton.obj_name = "ブトン";
    /* 動物ならdynamic,植物ならstatic */
    Buton.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Buton.map = [];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Buton.prototype.step = buton_step;
    function buton_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        /* 画像のさしかえ(不要ならいらない) */
        // not yet

        /* 表示 */
        /* はほぼ共通なので以下をコピペ */
        var in_view = set_view(this.obj,this.x,this.y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }

    Objects.Kirikabu = Kirikabu;
    function Kirikabu(){

        /* 座標の初期値 */
        this.x = random(stage.view_width - 20) + 10;
        this.y = (stage.view_height * 4 / 5) + random(stage.view_height/5);
        /* 使う画像のリスト */
        this.images = ["objects/734.png","objects/735.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.life = random(20);
        this.state = 0;
    }

    /* 名前をいれておく */
    Kirikabu.obj_name = "キリカブ";
    /* 動物ならdynamic,植物ならstatic */
    Kirikabu.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Kirikabu.map = [];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Kirikabu.prototype.step = kirikabu_step;
    function kirikabu_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        /* 画像のさしかえ(不要ならいらない) */
        // not yet

        /* 表示 */
        /* はほぼ共通なので以下をコピペ */
        var in_view = set_view(this.obj,this.x,this.y);
        if (!in_view) {
            this.obj.remove();
        } else {
            return true;
        }
    }

    Objects.Hisokusari = Hisokusari;
    function Hisokusari(){

        /* 座標の初期値 */
        this.x = random(stage.view_width - 20) + 10;
        this.y = (stage.view_height * 4 / 5) + random(stage.view_height/5);
        /* 使う画像のリスト */
        this.images = ["objects/741.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.life = random(20);
        this.state = 0;
    }

    /* 名前をいれておく */
    Hisokusari.obj_name = "ヒソクサリ";
    /* 動物ならdynamic,植物ならstatic */
    Hisokusari.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Hisokusari.map = [];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Hisokusari.prototype.step = hisokusari_step;
    function hisokusari_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */

        /* 画像のさしかえ(不要ならいらない) */
        // not yet

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
