var FlowChart = (function(){
    "use strict";

    // 初期値
    var defaults = {
        start_x   : 100,   // 1つ目のオブジェクトの位置(X)
        width     : 200,   // 横幅(単位: px)
        height    : 60,    // 高さ(単位: px)
        distance_x: 50,    // チャート間のX距離(単位: px)
        distance_y: 20,    // チャート間のY距離(単位: px)

        fullscreen: false, // フルスクリーン表示
        margin    : 20,    // マージン(単位: px)
    };

    // 環境変数
    var options = {};
    Object.assign(options, defaults);

    // 基準となるチャート図
    var root;

    /**
     * キャンパス
     * @param {String} id
     * @param {Object} o
     */
    var Canvas = function(id, o) {
        // 環境変数 (上書き)
        if (typeof options !== 'undefined') {
            Object.assign(options, o);
        }

        // キャンパスを準備する
        this.stage = new createjs.Stage(id);

        // マウスオーバーを有効にする
        this.stage.enableMouseOver();

        // 方眼紙を追加する
        this.line = new createjs.Shape();
        this.stage.addChild(this.line);
        this.drawBackground(); // 方眼紙を描く

        // フルスクリーン
        if (options.fullscreen === true) {
            this.fullscreen();
            window.addEventListener("resize", this.fullscreen.bind(this));
        }
    };
    Canvas.prototype.init = function(label, children) {
        // 基準となるチャートを追加する
        root = new Chart(this.stage, label, options.width, options.height);
        root.addChildren(children);
        root.draggable = true;
        root.box.x = options.start_x;
        root.vCentered();

        // 描画更新
        createjs.Ticker.on("tick", this.stage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF; // 60FPSに設定する
    };
    Canvas.prototype.drawBackground = function() {
        var d = 10;
        this.line.graphics
            .clear()
            .setStrokeStyle(0.1)
            .beginStroke("#000");
        for (var x = d; x < this.stage.canvas.width; x += d) {
            this.line.graphics
                .moveTo(x, 0)
                .lineTo(x, this.stage.canvas.height);
        }
        for (var y = d; y < this.stage.canvas.height; y += d) {
            this.line.graphics
                .moveTo(0, y)
                .lineTo(this.stage.canvas.width, y);
        }
        this.line.graphics.endStroke();
    };
    Canvas.prototype.fullscreen = function(event) {
        // 画面幅・高さを取得する
        var w = window.innerWidth;
        var h = window.innerHeight;

        // Canvas要素の画面幅・高さに合わせる
        this.stage.canvas.width  = w - (options.margin * 2);
        this.stage.canvas.height = h - (options.margin * 2);
        this.stage.canvas.style.margin = options.margin + 'px';

        // 方眼紙を更新する
        this.drawBackground();

        // 縦の中心に配置する
        if (typeof root !== 'undefined') {
            root.vCentered();
        }
    };

    /**
     * チャート
     *
     * @param {createjs.Stage} stage
     * @param {String} text
     * @param {Number} width
     * @param {Number} height
     */
    var Chart = function(stage, text, width, height ) {
        this.stage = stage;
        this.draggable = false;

        // 親チャート(単数)
        this.parent = undefined;

        // 子チャート(複数)
        this.children = [];

        // Y軸の位置補正
        this.top = 0;

        // 横幅,高さを設定する
        this.width  = width;
        this.height = height;

        // コンテナを準備する (グループ化)
        this.box = new createjs.Container();
        this.box.name   = text;
        this.box.cursor = "pointer";

        // 背景を追加する
        this.bg = new createjs.Shape();
        this.bg.graphics
            .setStrokeStyle(1.0)
            .beginStroke("#ffffff")
            .beginFill("#0275d8")
            .drawRoundRect(0.5, 0.5, this.width - 1.0, this.height - 1.0, 16);
        this.box.addChild(this.bg);

        // ラベルを追加する
        this.label = new createjs.Text(text, "16px sans-serif", "#ffffff");
        this.label.x = 20;
        this.label.y = this.height / 2;
        this.label.textAlign = "left";
        this.label.textBaseline = "middle";
        this.box.addChild(this.label);

        // 線を用意する (親子間のline)
        this.line = new createjs.Shape();
        this.box.addChild(this.line);

        // 点を用意する
        this.parentBall = new createjs.Shape(); // 親側
        this.childBall  = new createjs.Shape(); // 子側

        // 追加ボタンを配置する
        this.btn = new AddButton(this);
        this.btn.x = this.width - 36;
        this.btn.y = 2;
        this.box.addChild(this.btn);

        // 削除ボタンを配置する
        this.rmbtn = new RemoveButton(this);
        this.rmbtn.x = this.width - 10;
        this.rmbtn.y = 2;
        this.box.addChild(this.rmbtn);

        // イベント定義
        this.dragPointX = 0; // ドラッグ開始位置(X)
        this.dragPointY = 0; // ドラッグ開始位置(Y)
        this.box.on("dblclick", this.dblclick.bind(this));
        this.box.on("mousedown", this.mousedown.bind(this));
        this.box.on("pressmove", this.pressmove.bind(this));
        this.box.on("pressup", this.pressup.bind(this));
        this.stage.addChild(this.box);
    };
    Chart.prototype.dblclick = function(e){
        e.stopPropagation();
        var text = prompt('ラベルを入力してください', this.label.text);
        if (text !== '' && text !== null) {
            this.label.text = text;
        }
        return false;
    };
    Chart.prototype.mousedown = function(e){
        e.stopPropagation();
        if (this.draggable !== true) {
            return false;
        }
        this.dragPointX = this.stage.mouseX - this.box.x;
        this.dragPointY = this.stage.mouseY - this.box.y;
        this.bg.alpha = 0.5; // 半透明にする
    };
    Chart.prototype.pressmove = function(e){
        e.stopPropagation();
        if (this.draggable !== true) {
            return false;
        }
        var x = this.stage.mouseX - this.dragPointX; // 移動(X)
        var y = this.stage.mouseY - this.dragPointY; // 移動(Y)
        this.position('left', x, y);
        this.drawLine(); // 線を引く
    };
    Chart.prototype.pressup = function(e){
        e.stopPropagation();
        if (this.draggable !== true) {
            return false;
        }
        this.bg.alpha = 1.0; // 半透明を元に戻す
        this.drawLine();     // 線を引く
    };
    Chart.prototype.position = function(type, x, y) {
        switch(type) {
            // 左上の座標を指定する場合
            default:
            case 'left':
                this.box.x = x;
                this.box.y = y;
                break;

            // 中央座標を指定する場合
            case 'center':
                this.box.x = x - (this.width / 2);  // 幅補正
                this.box.y = y - (this.height / 2); // 高さ補正
                break;
        }

        // 線を引く
        this.drawLine();
    };
    Chart.prototype.addChild = function(text, children) {
        var x = this.width + options.distance_x,
            y = 0,
            n = this.children.length;
        if (n > 0) {
            for (var i = 0; i < n; ++i) {
                if (y < this.children[i].box.y) {
                    y = this.children[i].box.y
                }
            }
            y += options.height + options.distance_y;
        }

        var flow = new Chart(this.stage, text, this.width, this.height);
        flow.position('left', x, y);
        flow.joint(this);
        flow.addChildren(children);
        this.children.push(flow);
        this.box.addChild(flow.box);

        return this;
    };
    Chart.prototype.addChildren = function(list) {
        list = list || [];
        for (var i = 0; i < list.length; ++i) {
            var label = list[i]['label'],
                children = list[i]['children'] || [];
            this.addChild(label, children);

            // 隣接要素を再配置する
            if (i === list.length - 1) {
                this.relocation(false);
            }
        }

        return this;
    };
    Chart.prototype.joint = function(parent) {
        this.parent = parent;

        // 点を表示する(親側)
        this.parentBall.graphics
            .setStrokeStyle(1.6)
            .beginStroke("#444")
            .beginFill("#ccc")
            .drawCircle(0, 0, 4);
        this.parentBall.x = this.parent.width;
        this.parentBall.y = this.parent.height / 2;
        this.parent.box.addChild(this.parentBall);

        // 点を表示する(子側)
        this.childBall.graphics
            .setStrokeStyle(1.6)
            .beginStroke("#444")
            .beginFill("#ccc")
            .drawCircle(0, 0, 4);
        this.childBall.x = 0;
        this.childBall.y = this.parent.height / 2;
        this.box.addChild(this.childBall);

        // 線を引く
        this.drawLine();

        return this;
    };
    Chart.prototype.drawLine = function() {
        if (typeof this.parent !== 'undefined') {
            // 線を引く(親)
            var x = this.parentBall.x - this.box.x;
            var y = this.parentBall.y - this.box.y;
            var end_x = this.childBall.x;
            var end_y = this.childBall.y;
            this.line.graphics
                .clear()
                .setStrokeStyle(1)
                .beginStroke("gray")
                .moveTo(x, y)
                .lineTo(x + (end_x - x) / 2, y)
                .lineTo(x + (end_x - x) / 2, end_y)
                .lineTo(end_x, end_y)
                .endStroke();
        }
        for (var i = 0; i < this.children.length; ++i) {
            // 線を引く(子)
            this.drawLine.call(this.children[i]);
        }
        return this;
    };
    Chart.prototype.vCentered = function() {
        if (typeof this.box === 'undefined') {
            return this;
        }

        var x = this.box.x,
            y = (this.stage.canvas.height / 2) - (options.height / 2);
        this.position('left',x, y);
        return this;
    };
    Chart.prototype.relocation = function(isParent) {
        isParent = isParent || false;

        if (this.children.length < 1) {
            return false;
        }

        // 子要素を再配置する
        var i, c, x, y,
            t = this.children,
            n = t.length,
            h = options.height,
            d = options.distance_y,
            ch  = 0;

        // 子要素の高さを算出する
        for (i = 0; i < n; ++i) {
            c = t[i];
            ch += (c.top > 0) ? c.top * 2 : h; // 子要素の高さ
        }
        ch += d * (n - 1); // 子要素同時の間隔

        // 子要素の配置する
        var top = ch / 2, position = 0;
        for (i = 0; i < n; ++i) {
            c = t[i];
            y = position - top;
            if (t[i].top > 0) {
                y += t[i].top;
                position += t[i].top * 2 + d;
            } else {
                y += (h / 2);
                position += h + d;
            }
            c.position('left', c.box.x, y);
        }
        this.top = top;
        this.position('left', this.box.x, this.box.y + top);

        // 隣接要素 & 親要素も再配置する
        if (isParent === true && typeof this.parent !== "undefined") {
            this.parent.relocation(true);
        }

        return this;
    };
    Chart.prototype.remove = function() {
        var self = this;

        // 子チャートを全て削除する
        for (var i = 0; i < this.children.length; ++i) {
            this.remove.call(this.children[i]);
        }

        // 親のchildrenリストから取り除く
        if (typeof this.parent !== 'undefined') {
            this.parent.children = this.parent.children.filter(function( chart ) {
                return chart !== self;
            });
        }

        // 自分自身を破棄する
        if (typeof this.parent !== 'undefined') {
            this.parent.box.removeChild(this.box);
            this.parent.box.removeChild(this.line);
            this.parent.relocation(true);
        } else {
            this.stage.removeChild(this.box);
        }
        this.stage      = undefined;
        this.box        = undefined;
        this.line       = undefined;
        this.children   = undefined;
        this.width      = undefined;
        this.height     = undefined;
        this.parentBall = undefined;
        this.childBall  = undefined;
        this.dragPointX = undefined;
        this.dragPointY = undefined;

        return this;
    };

    /**
     * 追加ボタン
     */
    var AddButton = function(parent) {
        this.stage  = parent.stage;
        this.parent = parent;

        // ボタンを追加する
        this.btn = new createjs.Shape();
        this.btn.cursor = "pointer";
        this.style("#444", "#ccc");

        // イベント定義
        this.btn.on("click", this.click.bind(this));
        this.btn.on("mouseover", this.mouseover.bind(this));
        this.btn.on("mouseout", this.mouseout.bind(this));
        this.btn.on("mousedown", this.stop.bind(this));
        this.btn.on("pressmove", this.stop.bind(this));
        this.btn.on("pressup", this.stop.bind(this));
        return this.btn;
    };
    AddButton.prototype.style = function(line, bg) {
        this.btn.graphics
            .clear()
            .setStrokeStyle(1.6)
            .beginStroke(line)
            .beginFill(bg)
            .drawCircle(0, 0, 12)
            .setStrokeStyle(1)
            .beginStroke(line)
            .moveTo(0, 6)
            .lineTo(0, -6)
            .moveTo(6, 0)
            .lineTo(-6, 0);

        return this;
    };
    AddButton.prototype.click = function(e) {
        e.stopPropagation();
        var text = prompt('ラベルを入力してください');
        console.log("---------------")
        console.log(text)
        console.log(this)
        console.log("---------------")
        if (text !== '' && text !== null) {
            this.parent
                .addChild("ccc", [])
                .relocation(true);
            root.vCentered();
        }
    };
    AddButton.prototype.mouseover = function(e) {
        e.stopPropagation();
        this.style("#666", "#eee");
    };
    AddButton.prototype.mouseout = function(e) {
        e.stopPropagation();
        this.style("#444", "#ccc");
    };
    AddButton.prototype.stop = function(e) {
        e.stopPropagation();
    };

    /**
     * 削除ボタン
     */
    var RemoveButton = function(parent) {
        this.stage  = parent.stage;
        this.parent = parent;

        // ボタンを追加する
        this.btn = new createjs.Shape();
        this.btn.cursor = "pointer";
        this.style("#444", "#ccc");

        // イベント定義
        this.btn.on("click", this.click.bind(this));
        this.btn.on("mouseover", this.mouseover.bind(this));
        this.btn.on("mouseout", this.mouseout.bind(this));
        this.btn.on("mousedown", this.stop.bind(this));
        this.btn.on("pressmove", this.stop.bind(this));
        this.btn.on("pressup", this.stop.bind(this));
        return this.btn;
    };
    RemoveButton.prototype.style = function(line, bg) {
        this.btn.graphics
            .clear()
            .setStrokeStyle(1.6)
            .beginStroke(line)
            .beginFill(bg)
            .drawCircle(0, 0, 12)
            .setStrokeStyle(1)
            .beginStroke(line)
            .moveTo(-6, 6)
            .lineTo(6, -6)
            .moveTo(-6, -6)
            .lineTo(6, 6);
    };
    RemoveButton.prototype.click = function(e) {
        e.stopPropagation();
        this.parent.remove();
        root.vCentered();
    };
    RemoveButton.prototype.mouseover = function(e) {
        e.stopPropagation();
        this.style("#666", "#eee");
    };
    RemoveButton.prototype.mouseout = function(e) {
        e.stopPropagation();
        this.style("#444", "#ccc");
    };
    RemoveButton.prototype.stop = function(e) {
        e.stopPropagation();
    };

    return Canvas;
})();