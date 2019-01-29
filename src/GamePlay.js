
var AMOUNT_PRICES = 25;

GamePlayManager = {
  init: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    this.flagFirstMouseDown = false;
    this.amountPricesCaught = 0;
    this.endGame = false;

    this.countSmile = -1;
  },
  preload: function(){
    game.load.image('background', 'assets/images/Backgroundd.jpg');
    game.load.spritesheet('sukeban', 'assets/images/ssukeban.png', 135, 178, 2);
    game.load.spritesheet('prices', 'assets/images/prices.png', 50, 50, 4);
    game.load.spritesheet('xplode', 'assets/images/xplode.png');

    game.load.image('gakuran', 'assets/images/gakuran2.png');
  },
  create: function(){
    this.background = game.add.sprite(1, 0, 'background');
    this.background.alpha = 0.7;
      this.gakuran = game.add.sprite(950, 620, 'gakuran');
      this.gakuran.scale.setTo(1.30);
      this.gakuran.alpha = 0.9;
    this.sukeban = game.add.sprite(0, 0, 'sukeban');
    this.sukeban.frame = 0;
    this.sukeban.x = game.width/2;
    this.sukeban.y = game.height/2;
    this.sukeban.anchor.setTo(0.5); //dos parametros//
    //this.sukeban.angle = 0;
    this.sukeban.scale.setTo(2);
    //this.sukeban.alpha = 0.5;//opacidad//
    game.input.onDown.add(this.onTap, this);

    this.prices = [];
    for(var i=0; i<AMOUNT_PRICES; i++){
      var price = game.add.sprite(100,100, 'prices');
      price.frame = game.rnd.integerInRange(0,3);
      price.scale.setTo(2.30 + game.rnd.frac());
      price.anchor.setTo(0.5);
      price.x = game.rnd.integerInRange(50, 1800);
      price.y = game.rnd.integerInRange(50, 400);

      this.prices[i] = price;
      var rectCurrentPrice = this.getBoundsPrice(price);
      var rectSukeban = this.getBoundsPrice(this.sukeban);

      while(this.isOverlappingOtherPrice(i, rectCurrentPrice) || this.isRectanglesOverlapping(rectSukeban, rectCurrentPrice)){
        price.x = game.rnd.integerInRange(50, 900);
        price.y = game.rnd.integerInRange(50, 900);
        var rectCurrentPrice = this.getBoundsPrice(price);
      }
    }

    this.xplodeGroup = game.add.group();

    for(var i=0; i<10; i++){
    this.xplode = this.xplodeGroup.create(100,100, 'xplode');
    this.xplode.tweenScale = game.add.tween(this.xplode.scale).to({
                       x: [0.4, 0.8, 0.4],
                       y: [0.4, 0.8, 0.4]
}, 600, Phaser.Easing.Exponential.Out, false, 0, 0, false);
    //var tween = game.add.tween(this.xplode);
    //tween.to({x:500, y:100}, 1500, Phaser.Easing.Elastic.InOut);
    //tween.start();
    this.xplode.tweenAlpha = game.add.tween(this.xplode).to({
                      alpha: [1, 0.6, 0]
    }, 600, Phaser.Easing.Exponential.Out, false, 0, 0, false);

    this.xplode.anchor.setTo(0.5);
    this.xplode.kill();
  }

  this.currentScore = 0;
  var style = {
    font: 'bold 30pt Arial',
    fill: '#FFFFFF',
    align: 'center'
  }
  this.scoreText = game.add.text(game.width/2, 40, '0', style);
  this.scoreText.anchor.setTo(0.5);

  this.totalTime = 15;
  this.timerText = game.add.text(1500, 40, this.totalTime + '', style);
  this.timerText.anchor.setTo(0.5);

  this.timerGameOver = game.time.events.loop(Phaser.Timer.SECOND, function(){
       if(this.flagFirstMouseDown){
          this.totalTime--;
          this.timerText.text = this.totalTime+'';
          if(this.totalTime<=0){
            game.time.events.remove(this.timerGameOver);
            this.endGame = true;
            this.showFinalMessage('GAME OVER :C');
          }
       }
  },this);

  },
  increaseScore: function(){
    this.countSmile = 0;
    this.sukeban.frame = 1;

    this.currentScore+=100;
    this.scoreText.text = this.currentScore;

    this.amountPricesCaught += 1;
    if(this.amountPricesCaught >= AMOUNT_PRICES){
       game.time.events.remove(this.timerGameOver);
       this.endGame = true;
       this.showFinalMessage('Congratulations!!');
    }
    },
    showFinalMessage: function(msg){
      this.tweenGakuran.stop();

      var bgAlpha = game.add.bitmapData(game.width, game.height);
      bgAlpha.ctx.fillStyle = '#000000'
      bgAlpha.ctx.fillRect(0,0, game.width, game.height);

      var bg = game.add.sprite(0,0, bgAlpha);
      bg.alpha = 0.5;

      var style = {
        font: 'bold 60pt Arial',
        fill: '#FFFFFF',
        align: 'center'
      }

      this.textFieldFinalMsg = game.add.text(game.width/2, game.height/2, msg, style);
      this.textFieldFinalMsg.anchor.setTo(0.5);
    },
  onTap:function(){
    if(!this.flagFirstMouseDown){
      this.tweenGakuran = game.add.tween(this.gakuran.position).to( {x: -0.001},
      8800, Phaser.Easing.Cubic.InOut, true, 0, 1000, true).loop(true);
    }
    this.flagFirstMouseDown = true;
  },
  getBoundsPrice:function(currentPrice){
    return new Phaser.Rectangle(currentPrice.left, currentPrice.top, currentPrice.width, currentPrice.height);
  },
  isRectanglesOverlapping: function(rect1, rect2) {
    if (rect1.x> rect2.x+rect2.width || rect2.x> rect1.x+rect1.width){
      return false;
    }
    if (rect1.y> rect2.y+rect2.height || rect2.y> rect1.y+rect1.height){
      return false;
    }
    return true;
  },
  isOverlappingOtherPrice:function(index, rect2){
    for(var i=0; i<index; i++){
      var rect1 = this.getBoundsPrice(this.prices[i]);
      if(this.isRectanglesOverlapping(rect1, rect2)){
        return true;
      }
    }
    return false;
  },
  getBoundsSukeban: function(){
    var x0 = this.sukeban.x - Math.abs(this.sukeban.width)/4;
    var width = Math.abs(this.sukeban.width)/2;
    var y0 = this.sukeban.y -  this.sukeban.height/2;
    var height = this.sukeban.height;

    return new Phaser.Rectangle(x0, y0, width, height);
  },
  render: function(){ //rectangulos separados//
    //game.debug.spriteBounds(this.sukeban);
    for(var i=0; i<AMOUNT_PRICES; i++){
      //game.debug.spriteBounds(this.prices[i]);
    }
  },
  update: function(){
    //this.sukeban.angle +=1; //giro//
    if(this.flagFirstMouseDown && !this.endGame){

      //this.gakuran.x--;
      //if(this.gakuran.x<-300){
        //this.gakuran.x = 1300;
      //}
     if(this.countSmile>=0){
       this.countSmile++;
       if(this.countSmile>50){
         this.countSmile = -1;
         this.sukeban.frame = 0;
       }
     }

    var pointerX = game.input.x;
    var pointerY = game.input.y;

    var distX = pointerX - this.sukeban.x;
    var distY = pointerY - this.sukeban.y;

    if(distX>0){
      this.sukeban.scale.setTo(2,2,);
    }else{
      this.sukeban.scale.setTo(-2,2);
    }
    this.sukeban.x += distX * 0.03;
    this.sukeban.y += distY * 0.03;

    for(var i=0; i<AMOUNT_PRICES; i++){
      var rectSukeban =  this.getBoundsSukeban();
      var rectPrices = this.getBoundsPrice(this.prices[i]);

        if (this.prices[i].visible && this.isRectanglesOverlapping(rectSukeban, rectPrices)){
        this.increaseScore();
        this.prices[i].visible = false;

        var xplode = this.xplodeGroup.getFirstDead();
        if(xplode!=null){
        xplode.reset(this.prices[i].x, this.prices[i].y);
        xplode.tweenScale.start();
        xplode.tweenAlpha.start();

        xplode.tweenAlpha.onComplete.add(function (currentTarget, currentTween){
          currentTarget.kill();
        }, this);
       }
      }
    }
  }
 }
}
var game = new Phaser.Game(1805, 904, Phaser.CANVAS);

game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');
