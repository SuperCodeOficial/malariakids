var scene3 = {
  preload: function() {
    game.load.image('background', 'assets/images/back-mosquito.jpg');
    game.load.spritesheet('max', 'assets/images/max.png', 300, 150, 2);
    game.load.spritesheet('pastilla', 'assets/images/pastilla.png', 300, 150, 2);
    game.load.spritesheet('pesticide', 'assets/images/pesticide.png', 300, 150, 2);
    game.load.spritesheet('traje', 'assets/images/safety-suit.png', 300, 150, 2);
    game.load.spritesheet('balde', 'assets/images/bucket.png', 300, 150, 2);
    game.load.spritesheet('mosquito', 'assets/images/mosquito.png', 300, 150, 2);
    game.load.audio('audio1', 'assets/sounds/result-rp-agua.mp3');
    game.load.audio('audio2', 'assets/sounds/pruebalo.mp3');
    game.load.audio('audio3', 'assets/sounds/tu-puedes.mp3');
  },
  create: function() {
    game.add.sprite(0, 0, 'background');
    const max = game.add.sprite(200, 300, 'max');
    const pastilla = game.add.sprite(200, 300, 'pastilla');
    const pesticide = game.add.sprite(200, 300, 'pesticide');
    const traje = game.add.sprite(200, 300, 'traje');
    const balde = game.add.sprite(200, 300, 'balde');
    const mosquito = game.add.sprite(200, 300, 'mosquito');
    const mosquito2 = game.add.sprite(200, 300, 'mosquito');
    const mosquito3 = game.add.sprite(200, 300, 'mosquito');
    max.x = 400;
    max.y = 455;
    pastilla.x = 400;
    pastilla.y = 355;
    pesticide.x = 550;
    pesticide.y = 355;
    traje.x = 700;
    traje.y = 355;
    balde.x = 700;
    balde.y = 525;
    mosquito.x = 740;
    mosquito.y = 510;
    mosquito2.x = 770;
    mosquito2.y = 530;
    mosquito3.x = 720;
    mosquito3.y = 530;
    const title = game.add.text(500, 150, 'Selecciona la opción correcta', { font: '32px Arial', fill: '#ffffff' });
    title.anchor.setTo(0.5);
    pastilla.inputEnabled = true;
    pesticide.inputEnabled = true;
    traje.inputEnabled = true;
    pastilla.events.onInputDown.add(function() {
      eliminarMensaje();
      reproducirAudio1('assets/sounds/muy-bien.mp3');
      if (game && game.scene && game.scene.start) {
        game.scene.start('dormir');
      }
    });
    pesticide.events.onInputDown.add(function() {
      eliminarMensaje();
      reproducirAudio2('assets/sounds/pruebalo.mp3');
    });
    traje.events.onInputDown.add(function() {
      eliminarMensaje();
      reproducirAudio3('assets/sounds/tu-puedes.mp3');
    });
    function mostrarMensaje(mensaje) {
      const mensajeText = game.add.text(500, 550, mensaje, { font: '24px Arial', fill: '#ffffff' });
      mensajeText.anchor.setTo(0.5);
      mensajeText.name = 'mensaje';
    }
    function eliminarMensaje() {
      const mensajeText = game.children ? game.children.find(child => child.name === 'mensaje') : null;
      if (mensajeText) {
        mensajeText.destroy();
      }
    }
    function reproducirAudio1(ruta) {
      const audio1 = game.sound.add('audio1');
      audio1.play();
    }
    function reproducirAudio2(ruta) {
      const audio2 = game.sound.add('audio2');
      audio2.play();
    }
    function reproducirAudio3(ruta) {
      const audio3 = game.sound.add('audio3');
      audio3.play();
    }
    max.events.onInputDown.add(function() {
      if (game && game.scene && game.scene.start) {
        game.scene.start('nombreDeLaNuevaEscena');
      }
    });
  }
};