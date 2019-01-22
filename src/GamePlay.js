
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
      var prices = game.add.sprite(100,100, 'prices');
      prices.frame = game.rnd.integerInRange(0,3);
      prices.scale.setTo(2.30 + game.rnd.frac());
      prices.anchor.setTo(0.5);
      prices.x = game.rnd.integerInRange(50, 1050);
      prices.y = game.rnd.integerInRange(50, 600);
    }
  },
  onTap:function(){
    this.flagFirstMouseDown = true;
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
  }
 }
}
var game = new Phaser.Game(900, 550, Phaser.CANVAS);

game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');
