
GamePlayManager = {
  init: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  preload: function(){
    game.load.image('background', 'assets/images/background.png');
    game.load.spritesheet('sukeban', 'assets/images/Sukeban.png', 74.5, 78, 2);
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
  },
  update: function(){
    //this.sukeban.angle +=1; //giro//
    var pointerX = game.input.x;
    var pointerY = game.input.y;

    var distX = pointerX - this.sukeban.x;
    var distY = pointerY - this.sukeban.y;

    if(distX>0){
      this.sukeban.scale.setTo(1,1);
    }else{
      this.sukeban.scale.setTo(-1,1);
    }
    this.sukeban.x += distX * 0.02;
    this.sukeban.y += distY * 0.02;
  }
}
var game = new Phaser.Game(900, 640, Phaser.CANVAS);

game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');
