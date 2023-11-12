    var sceneX = {
  preload: function() {
    game.load.image('background', 'assets/images/back-mosquito.jpg');
    game.load.spritesheet('max', 'assets/images/max.png', 300, 150, 2);
  },
  create: function() {
      game.add.sprite(0, 0, 'background');
    // Aquí puedes agregar la lógica y los elementos de la escena X
  }
};