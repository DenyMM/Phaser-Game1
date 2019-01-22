
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
    this.sukeban.anchor.setTo(0.5, 0.5);
    this.sukeban.angle = 0;
  },
  update: function(){
    this.sukeban.angle +=1;
  }
}
var game = new Phaser.Game(900, 640, Phaser.CANVAS);

game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');
