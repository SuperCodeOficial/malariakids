
// GamePlayManager
GamePlayManager = {
  init: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  preload: function() {
    game.load.image('background', 'assets/images/background.jpg');
    game.load.spritesheet('max', 'assets/images/max.png', 300, 150, 2);
    game.load.spritesheet('choice', 'assets/images/choice.png', 300, 150, 2);
    game.load.spritesheet('select', 'assets/images/select.png', 300, 150, 2); // New image for the button
  },
  create: function() {
    game.add.sprite(0, 0, 'background');
    const max = this.add.sprite(200, 300, 'max');
    max.x = 300; // Horizontal position in pixels
    max.y = 390; // Vertical position in pixels
    // Calculate the dialog box size
    const dialogWidth = game.width * 0.4; // Dialog box width (40% of the screen)
    const dialogHeight = dialogWidth * 0.3; // Dialog box height (30% of the width)
    // Create a cloud-shaped dialog box
    const dialogBox = this.add.graphics();
    dialogBox.beginFill(0xffffff); // White background
    dialogBox.drawRoundedRect((game.width - dialogWidth) / 2, 20, dialogWidth, dialogHeight, 20); // Dialog box size and position
    dialogBox.endFill();
    // Create floating messages inside the dialog box
    const floatingText = this.add.text((game.width - dialogWidth) / 2 + 20, 40, '', { font: '16px Arial', fill: '#000000' }); // Brown text
    floatingText.wordWrapWidth = dialogWidth - 40; // Text width inside the dialog box
    floatingText.wordWrap = true; // Enable text wrapping
    // Array of messages
    const messages = ['La Malaria:', 'La malaria también conocida como paludismo es una enfermedad causada por un parásito Plasmodium, el cual es trasmitido por la picadura de un mosquito infectado del género anófeles.', '¡Ahora si te animas a jugar conmigo resolviendo estos retos, vamos tu puedes!!!'];
    let currentIndex = 0;
    // Change the message text every 5 seconds
    const timerEvent = game.time.events.loop(Phaser.Timer.SECOND * 1, function() {
      floatingText.setText(messages[currentIndex]);
      currentIndex = (currentIndex + 1) % messages.length;
      if (currentIndex === 0) {
        game.time.events.remove(timerEvent); // Stop the animation after the last message
        createNextButtons();
      }
    }, this);
    function createNextButtons() {
      const button1 = game.add.sprite(game.width / 3, dialogHeight + 120, 'choice'); // Use the new button image
      button1.anchor.setTo(0.5);
      button1.inputEnabled = true;
      button1.events.onInputDown.add(function() {
        game.state.start('scene3'); // Go to scene 3
      }, this);
      const text1 = game.add.text(game.width / 3, dialogHeight + 220, 'Juego #1', { font: '22px Arial', fill: '#000000' });
      text1.anchor.setTo(0.5);
      const button2 = game.add.sprite((game.width / 3) * 2, dialogHeight + 120, 'select'); // Use the new button image
      button2.anchor.setTo(0.5);
      button2.inputEnabled = true;
      button2.events.onInputDown.add(function() {
        game.state.start('scene4'); // Go to scene 4
      }, this);
      const text2 = game.add.text((game.width / 3) * 2, dialogHeight + 220, 'Juego #2', { font: '22px Arial', fill: '#000000' });
      text2.anchor.setTo(0.5);
    }
  },
  update: function() {}
};

// Scene 4
var scene4 = {
  create: function() {
    game.add.sprite(0, 0, 'background');
    const title = this.add.text(400, 300, 'Welcome to Scene 4', { font: '32px Arial', fill: '#ffffff' });
    title.anchor.setTo(0.5);
  }
};

var game = new Phaser.Game(1136, 640, Phaser.CANVAS);
game.state.add('gameplay', GamePlayManager);

// Cargar el archivo externo para Scene 3
var scriptTag = document.createElement('script');
scriptTag.src = './src/scene3.js';
scriptTag.onload = function() {
  game.state.add('scene3', scene3); // Agregar la escena 3 al estado del juego
  
  // Cargar el archivo externo para Scene 4
  var scriptTag2 = document.createElement('script');
  scriptTag2.src = './src/scene4.js';
  scriptTag2.onload = function() {
    game.state.add('scene4', scene4); // Agregar la escena 4 al estado del juego
    game.state.start('gameplay');
  };
  document.head.appendChild(scriptTag2);
};
document.head.appendChild(scriptTag);