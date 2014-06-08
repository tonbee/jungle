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

    function generate_objects_dom(object,fn){
        var obj = $("<div>");
        obj.attr("class","objects");
        var img = $("<img>");
        img.attr("src",object.images[0]);
        obj.append(img);
        $("#stage0").append(obj);

        object.obj = obj;
        object.img = img;

        object.myloaded = false;
        var first_bind = function(){
            var jq = $(img);
            object.width = jq.width();
            object.height = jq.height();
            if (fn !== undefined) {
                fn();
            }
            if (object.scale !== undefined) {
                change_scale(object,object.scale);
            }
            img.unbind("load",first_bind);
        };
        img.bind("load",first_bind);
        return;
    }

    function change_scale(object,rate){
        var jq = $(object.img);
        var height = jq.height();
        var width = jq.width();
        var new_height = height * rate / 100;
        var new_width = width * rate / 100;
        object.img.attr("height",new_height);
        object.img.attr("width",new_width);

        object.x = object.x + (height - new_width) / 2;
        object.y = object.y + (height - new_height);
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
        this.images = [
            "objects/fumidai/fumidai1.png",
            "objects/fumidai/fumidai2.png",
            "objects/fumidai/fumidai3.png",
            "objects/fumidai/fumidai4.png"
        ]
        /* 拡大率の設定 %指定 */
        this.scale = 80 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.state = random(this.images.length);
        this.span = 2;
        this.life = random(this.span);
    }

    Fumidai.obj_name = "フミダイ";
    Fumidai.kind = "static";
    Fumidai.map = [0,3,5];
    Fumidai.prototype.step = common_step;
    function common_step(){
        this.life += 1;
        if (this.life % this.span === 0) {
            this.state = (this.state + 1) % this.images.length;
            this.img.attr("src",this.images[this.state]);
        }
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
        this.images = [
            "objects/garuvbanzo/garubanzo1.png",
            "objects/garuvbanzo/garubanzo2.png",
            "objects/garuvbanzo/garubanzo3.png",
            "objects/garuvbanzo/garubanzo4.png"
        ]
        /* 拡大率の設定 %指定 */
        this.scale = 80 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        generate_objects_dom(this)
        this.span = 10;
        this.life = random(this.span);
        this.state = 0;
        this.alive = true;
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
        if (this.alive === false) return;
        this.life += 1;
        if (this.life % this.span === 0) {
            this.state += 1;
            if (this.state === this.images.length) {
                this.alive = false;
                this.obj.remove();
                return;
            }
            this.img.attr("src",this.images[this.state]);
        }
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

        /* 使う画像のリスト */
        this.images = ["objects/706.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        var self = this;
        generate_objects_dom(this,function(){
            /* 座標の初期値 */
            var width = self.width;
            self.x = random(stage.view_width - width) + width/2;
            self.y = (stage.view_height * 9 / 10) + random(stage.view_height/10)-self.height;
        });

        /* オブジェクト生成 thisを指定して関数を呼びだす */
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


    Objects.HosoMukade = HosoMukade;
    function HosoMukade(){
        this.images = [
            "objects/hosomukade/hosomukade1.png",
            "objects/hosomukade/hosomukade2.png",
            "objects/hosomukade/hosomukade3.png"
        ];

        var self = this;
        this.scale = 90 + random(20);
        generate_objects_dom(this,function(){
            /* 座標の初期値 */
            var width = self.width;
            self.x = random(stage.view_width - width) + width/2;
            self.y = (stage.view_height * 9 / 10) + random(stage.view_height/10)-self.height;
        });

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        this.span = 2;
        this.life = random(this.span);
        this.state = random(this.images.length);
    }

    /* 名前をいれておく */
    HosoMukade.obj_name = "ホソムカデ";
    /* 動物ならdynamic,植物ならstatic */
    HosoMukade.kind = "static";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    HosoMukade.map = [];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    HosoMukade.prototype.step = common_step;


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
        /* 使う画像のリスト */
        this.images = ["objects/723.png"];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        var self = this;
        generate_objects_dom(this,function(){
            /* 座標の初期値 */
            var width = self.width;
            self.x = random(stage.view_width - width) + width/2;
            self.y = (stage.view_height * 9 / 10) + random(stage.view_height/10)-self.height;
        });
        this.life = random(20);
        this.state = 0;
        this.cycle = 50 + random(20);
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

        var limit = 7;
        this.life += 1;
        if (this.life < limit * this.cycle) {
            if (this.life % this.cycle === 0) {
                change_scale(this,120);
            }
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

        var self = this;
        generate_objects_dom(this,function(){
            /* 座標の初期値 */
            var width = self.width;
            self.x = random(stage.view_width - width) + width/2;
            self.y = (stage.view_height * 9 / 10) + random(stage.view_height/10)-self.height;
        });

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

    Objects.OOM = OOM;
    function OOM(){

        /* 使う画像のリスト */
        this.images = ["objects/740.png"];
        /* 拡大率の設定 %指定 */
        //this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        var self = this;
        generate_objects_dom(this,function(){
            /* 座標の初期値 */
            self.x = random(stage.view_width - self.width);
            var range = (stage.view_height - self.height);
            self.y = (range * 4/ 5) + random(range/5);
        })
        this.life = random(20);
        this.state = 0;
    }

    /* 名前をいれておく */
    OOM.obj_name = "王蟲";
    /* 動物ならdynamic,植物ならstatic */
    OOM.kind = "dynamic";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    OOM.map = [0];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    OOM.prototype.step = oom_step;
    function oom_step(){
        /*
          this.xとthis.yが座標
          座標の更新と絵の切り替えと表示を行う
        */
        if (this.state === 0) {
            this.x -= 1;
            if (random(100) < 10) {
                this.state = 1;
            }
        } else {
            if (random(100) < 10) {
                this.state = 0;
            }
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

    Objects.Nenkin = Nenkin;
    function Nenkin(){

        /* 使う画像のリスト */
        this.images = [
            "objects/702.png","objects/703.png",
            "objects/704.png","objects/705.png"
        ];
        /* 拡大率の設定 %指定 */
        this.scale = 50 + random(50);

        /* オブジェクト生成 thisを指定して関数を呼びだす */
        var self = this;
        generate_objects_dom(this,function(){
            /* 座標の初期値 */
            if (self.x === undefined) {
                self.x = random(stage.view_width - self.width);
                var range = (stage.view_height - self.height);
                self.y = (range * 4/ 5) + random(range/5);
            }
        })
        this.state = 0;
        this.life = 0;
    }

    /* 名前をいれておく */
    Nenkin.obj_name = "粘菌";
    /* 動物ならdynamic,植物ならstatic */
    Nenkin.kind = "dynamic";
    /*  出現するマップ番号をいれる からはどこでも出現 */
    Nenkin.map = [];

    /* 表示更新のために定期的に呼ばれる関数。stepメソッドとして登録 */
    Nenkin.prototype.step = nenkin_step;
    function nenkin_step(){
        this.life += 1;
        if (this.state < 3) {
            if (this.life % 10 === 0) {
                this.state += 1;
                this.img.attr("src",this.images[this.state]);
            }
        } else {
            if (this.life % 500 === 0) {
                this.state = 0;
                this.img.attr("src",this.images[this.state]);
            }
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

}());
