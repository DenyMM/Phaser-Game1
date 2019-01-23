
var AMOUNT_PRICES = 10;

GamePlayManager = {
  init: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    this.flagFirstMouseDown = false;
  },
  preload: function(){
    game.load.image('background', 'assets/images/background.png');
    game.load.spritesheet('sukeban', 'assets/images/Sukeban.png', 74.5, 78, 2);
    game.load.spritesheet('prices', 'assets/images/prices.png', 50, 50, 4);
  },
  create: function(){
    game.add.sprite(1, 0, 'background');
    this.sukeban = game.add.sprite(0, 0, 'sukeban');
    this.sukeban.frame = 0;
    this.sukeban.x = game.width/2;
    this.sukeban.y = game.height/2;
    this.sukeban.anchor.setTo(0.5); //dos parametros//
    //this.sukeban.angle = 0;
    this.sukeban.scale.setTo(3);
    //this.sukeban.alpha = 0.5;//opacidad//
    game.input.onDown.add(this.onTap, this);

    this.prices = [];
    for(var i=0; i<AMOUNT_PRICES; i++){
      var price = game.add.sprite(100,100, 'prices');
      price.frame = game.rnd.integerInRange(0,3);
      price.scale.setTo(1.30 + game.rnd.frac());
      price.anchor.setTo(0.5);
      price.x = game.rnd.integerInRange(50, 900);
      price.y = game.rnd.integerInRange(50, 600);

      this.prices[i] = price;
      var rectCurrentPrice = this.getBoundsPrice(price);
      var rectSukeban = this.getBoundsPrice(this.sukeban);

      while(this.isOverlappingOtherPrice(i, rectCurrentPrice) || this.isRectanglesOverlapping(rectSukeban, rectCurrentPrice)){
        price.x = game.rnd.integerInRange(50, 900);
        price.y = game.rnd.integerInRange(50, 500);
        var rectCurrentPrice = this.getBoundsPrice(price);
      }
    }
  },
  onTap:function(){
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
    if(this.flagFirstMouseDown){
    var pointerX = game.input.x;
    var pointerY = game.input.y;

    var distX = pointerX - this.sukeban.x;
    var distY = pointerY - this.sukeban.y;

    if(distX>0){
      this.sukeban.scale.setTo(3,3,);
    }else{
      this.sukeban.scale.setTo(-3,3);
    }
    this.sukeban.x += distX * 0.03;
    this.sukeban.y += distY * 0.03;

    for(var i=0; i<AMOUNT_PRICES; i++){
      var rectSukeban =  this.getBoundsSukeban();
      var rectPrices = this.getBoundsPrice(this.prices[i]);

        if (this.prices[i].visible && this.isRectanglesOverlapping(rectSukeban, rectPrices)){
        this.prices[i].visible = false;
        }
    }
  }
 }
}
var game = new Phaser.Game(900, 550, Phaser.CANVAS);

game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');
