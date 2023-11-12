var loadingScreen = {
  preload: function() {
    // Cargar la imagen de fondo
    game.load.image('loadingBackground', 'assets/images/background.jpg');
    // Cargar la imagen relacionada
    game.load.image('loadingImage', 'assets/images/horse.png');
    // Cargar los recursos del juego
  },
  create: function() {
    // Mostrar la imagen de fondo
    var loadingBackground = game.add.sprite(game.world.centerX, game.world.centerY, 'loadingBackground');
    loadingBackground.anchor.setTo(0.5);
    
    // Mostrar la imagen relacionada
    var loadingImage = game.add.sprite(game.world.centerX, game.world.centerY, 'loadingImage');
    loadingImage.anchor.setTo(0.5);
    
    // Crear una barra de progreso
    var progressBarBackground = game.add.graphics(game.world.centerX, game.world.centerY + 100);
    progressBarBackground.anchor.setTo(0.5);
    progressBarBackground.beginFill(0x000000, 0.5);
    progressBarBackground.drawRect(-150, -10, 300, 20);
    progressBarBackground.endFill();
    
    var progressBar = game.add.graphics(game.world.centerX, game.world.centerY + 100);
    progressBar.anchor.setTo(0.5);
    
    // Actualizar la barra de progreso durante la carga
    game.load.onFileComplete.add(function(progress) {
      progressBar.clear();
      progressBar.beginFill(0xffffff, 1);
      progressBar.drawRect(-150, -10, 300 * (progress / 100), 20);
      progressBar.endFill();
    });
    
    // Iniciar la carga
    game.load.start();
  },
  update: function() {
    // Pasar a la siguiente escena después de que la carga haya finalizado
    if (game.load.progress === 100) {
      game.state.start('gameplay');
    }
  }
};
var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('loading', loadingScreen);
game.state.start('loading');