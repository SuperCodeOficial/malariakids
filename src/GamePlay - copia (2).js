var game = new Phaser.Game(1136, 640, Phaser.CANVAS); 
// GamePlayManager 
var GamePlayManager = { 
  init: function() { 
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
    game.scale.pageAlignHorizontally = true; 
    game.scale.pageAlignVertically = true; 
  }, 
  preload: function() { 
    game.load.image('background', 'assets/images/background.jpg'); 
    game.load.spritesheet('max', 'assets/images/max.png', 300, 150, 2); 
    game.load.spritesheet('choice', 'assets/images/choice.png', 300, 150, 2); 
    game.load.spritesheet('select', 'assets/images/select.png', 300, 150, 2); // Nueva imagen para el botón 
    game.load.audio('reto1', 'assets/sounds/reto1.mp3'); // Carga el audio "reto1"
    game.load.audio('reto2', 'assets/sounds/reto2.mp3'); // Carga el audio "reto1"
    game.load.audio('reto3', 'assets/sounds/reto3.mp3'); // Carga el audio "reto1" 
    game.load.audio('reto4', 'assets/sounds/reto4.mp3'); // Carga el audio "reto1" 
  }, 
  create: function() { 
    game.add.sprite(0, 0, 'background'); 
    const max = this.add.sprite(200, 300, 'max'); 
    max.x = 300; // Posición horizontal en píxeles 
    max.y = 390; // Posición vertical en píxeles 
    // Calcular el tamaño del cuadro de diálogo 
    const dialogWidth = game.width * 0.4; // Ancho del cuadro de diálogo (40% de la pantalla) 
    const dialogHeight = dialogWidth * 0.3; // Alto del cuadro de diálogo (30% del ancho) 
    // Crear un cuadro de diálogo en forma de nube 
    const dialogBox = this.add.graphics(); 
    dialogBox.beginFill(0xffffff); // Fondo blanco 
    dialogBox.drawRoundedRect((game.width - dialogWidth) / 2, 20, dialogWidth, dialogHeight, 20); // Tamaño y posición del cuadro de diálogo 
    dialogBox.endFill(); 
    // Crear mensajes flotantes dentro del cuadro de diálogo 
    const floatingText = this.add.text((game.width - dialogWidth) / 2 + 20, 40, '', { font: '16px Arial', fill: '#000000' }); // Texto marrón 
    floatingText.wordWrapWidth = dialogWidth - 40; // Ancho del texto dentro del cuadro de diálogo 
    floatingText.wordWrap = true; // Habilitar el ajuste de texto 
    // Array de mensajes 
    const messages = ['La Malaria:', 'La malaria también conocida como paludismo es una enfermedad causada por un parásito Plasmodium, el cual es transmitido por la picadura de un mosquito infectado del género anófeles.', '¡Ahora si te animas a jugar conmigo resolviendo estos retos, vamos tú puedes!']; 
    let currentIndex = 0; 
    // Cambiar el texto del mensaje cada 5 segundos 
    const timerEvent = game.time.events.loop(Phaser.Timer.SECOND * 1, function() { 
      floatingText.setText(messages[currentIndex]); 
      currentIndex = (currentIndex + 1) % messages.length; 
      if (currentIndex === 0) { 
        game.time.events.remove(timerEvent); // Detener la animación después del último mensaje 
        createNextButtons(); 
      } 
    }, this); 
    function createNextButtons() { 
      const button1 = game.add.sprite(game.width / 3, dialogHeight + 120, 'choice'); // Usar la nueva imagen del botón 
      button1.anchor.setTo(0.5); 
      button1.inputEnabled = true; 
      button1.events.onInputDown.add(function() { 
        game.state.start('scene3a'); // Ir a la escena 11 
              const audioReto1 = game.sound.add('reto1'); // Crea una instancia del audio "reto1" 
    audioReto1.play(); // Reproduce el audio "reto1" 
      }, this); 
      const text1 = game.add.text(game.width / 3, dialogHeight + 220, 'Escena 1', { font: '22px Arial', fill: '#000000' }); 
      text1.anchor.setTo(0.5); 
      const button2 = game.add.sprite((game.width / 3) * 2, dialogHeight + 120, 'choice'); // Usar la nueva imagen del botón 
      button2.anchor.setTo(0.5); 
      button2.inputEnabled = true; 
      button2.events.onInputDown.add(function() { 
        game.state.start('scene2'); // Ir a la escena 12 
      }, this); 
      const text2 = game.add.text((game.width / 3) * 2, dialogHeight + 220, 'Escena 2', { font: '22px Arial', fill: '#000000' }); 
      text2.anchor.setTo(0.5); 
    } 
  }, 
  update: function() {} 
}; 
// Escena 3 
var Scene3a = {
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
      reproducirAudio1('assets/sounds/result-rp-agua.mp3');
       game.time.events.add(Phaser.Timer.SECOND * 10, function() {
        game.state.start('scene3b'); // Abrir la escena 2 después de 5 segundos
           const audioReto2 = game.sound.add('reto2'); // Crea una instancia del audio "reto1" 
    audioReto2.play(); // Reproduce el audio "reto1"
      }, this);
       game.time.events.add(Phaser.Timer.SECOND * 12, function() {
        
      }, this);
         
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
// Escena 11
var Scene3b = {
  preload: function() {
    game.load.image('background', 'assets/images/escena4-bg.jpg');
    game.load.spritesheet('max', 'assets/images/max.png', 300, 150, 2);
    game.load.spritesheet('toldillo', 'assets/images/toldillo.jpg', 300, 150, 2);
    game.load.spritesheet('pesticide', 'assets/images/pesticide.png', 300, 150, 2);
    game.load.spritesheet('traje', 'assets/images/safety-suit.png', 300, 150, 2);
    game.load.spritesheet('balde', 'assets/images/bucket.png', 300, 150, 2);
    game.load.spritesheet('mosquito', 'assets/images/mosquito.png', 300, 150, 2);
    game.load.audio('audio1a', 'assets/sounds/result-rp-dormir.mp3');
    game.load.audio('audio2', 'assets/sounds/pruebalo.mp3');
    game.load.audio('audio3', 'assets/sounds/tu-puedes.mp3');
  },
  create: function() {
    game.add.sprite(0, 0, 'background');
    const max = game.add.sprite(200, 300, 'max');
    const toldillo = game.add.sprite(350, 100, 'toldillo');
    const pesticide = game.add.sprite(225, 100, 'pesticide');
    const traje = game.add.sprite(100, 100, 'traje');
    const mosquito = game.add.sprite(350, 200, 'mosquito');
    const mosquito2 = game.add.sprite(450, 180, 'mosquito');
    const mosquito3 = game.add.sprite(550, 225, 'mosquito');
      
    max.x = 400;
    max.y = 455;
    

//    const title = game.add.text(500, 150, 'Bienvenido a Escena4', { font: '32px Arial', fill: '#ffffff' });
//    title.anchor.setTo(0.5);
    toldillo.inputEnabled = true;
    pesticide.inputEnabled = true;
    traje.inputEnabled = true;
    toldillo.events.onInputDown.add(function() {
      eliminarMensaje();
      reproducirAudio1a('assets/sounds/result-rp-dormir.mp3');
       game.time.events.add(Phaser.Timer.SECOND * 10, function() {
        game.state.start('scene3c'); // Abrir la escena 2 después de 5 segundos
           const audioReto3 = game.sound.add('reto3'); // Crea una instancia del audio "reto1" 
    audioReto3.play(); // Reproduce el audio "reto1"
      }, this);
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
    function reproducirAudio1a(ruta) {
      const audio1a = game.sound.add('audio1a');
      audio1a.play();
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

var Scene3c = {
  preload: function() {
    game.load.image('background', 'assets/images/escena5-bg.jpg');
    game.load.spritesheet('max', 'assets/images/max.png', 300, 150, 2);
    game.load.spritesheet('hospital', 'assets/images/hospital.png', 300, 150, 2);
    game.load.spritesheet('pesticide', 'assets/images/pesticide.png', 300, 150, 2);
    game.load.spritesheet('traje', 'assets/images/safety-suit.png', 300, 150, 2);
    game.load.spritesheet('balde', 'assets/images/bucket.png', 300, 150, 2);
    game.load.spritesheet('mosquito', 'assets/images/mosquito.png', 300, 150, 2);
    game.load.audio('audio1c', 'assets/sounds/result-rp-salud.mp3');
    game.load.audio('audio2', 'assets/sounds/pruebalo.mp3');
    game.load.audio('audio3', 'assets/sounds/tu-puedes.mp3');
  },
  create: function() {
    game.add.sprite(0, 0, 'background');
    const max = game.add.sprite(200, 300, 'max');
    const hospital = game.add.sprite(350, 100, 'hospital');
    const pesticide = game.add.sprite(225, 100, 'pesticide');
    const traje = game.add.sprite(100, 100, 'traje');
    const mosquito = game.add.sprite(350, 200, 'mosquito');
    const mosquito2 = game.add.sprite(450, 180, 'mosquito');
    const mosquito3 = game.add.sprite(550, 225, 'mosquito');
      
    max.x = 400;
    max.y = 455;
    

    const title = game.add.text(500, 150, 'Bienvenido a Escena5', { font: '32px Arial', fill: '#ffffff' });
//    title.anchor.setTo(0.5);
    hospital.inputEnabled = true;
    pesticide.inputEnabled = true;
    traje.inputEnabled = true;
    hospital.events.onInputDown.add(function() {
      eliminarMensaje();
      reproducirAudio1('assets/sounds/muy-bien.mp3');
       game.time.events.add(Phaser.Timer.SECOND * 10, function() {
        game.state.start('scene3d'); // Abrir la escena 2 después de 5 segundos
           const audioReto4 = game.sound.add('reto4'); // Crea una instancia del audio "reto1" 
    audioReto4.play(); // Reproduce el audio "reto1"
      }, this);
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
      const audio1c = game.sound.add('audio1c');
      audio1c.play();
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

var Scene3d = {
  preload: function() {
    game.load.image('background', 'assets/images/escena6-bg.jpg');
    game.load.spritesheet('max', 'assets/images/max.png', 300, 150, 2);
      game.load.spritesheet('pastilla', 'assets/images/pastilla.png', 300, 150, 2);
    game.load.spritesheet('pesticide', 'assets/images/pesticide.png', 300, 150, 2);
    game.load.spritesheet('traje', 'assets/images/safety-suit.png', 300, 150, 2);
    game.load.spritesheet('balde', 'assets/images/bucket.png', 300, 150, 2);
    game.load.spritesheet('mosquito', 'assets/images/mosquito.png', 300, 150, 2);
    game.load.audio('audio1d', 'assets/sounds/result-rp-fumiga.mp3');
    game.load.audio('audio2', 'assets/sounds/pruebalo.mp3');
    game.load.audio('audio3', 'assets/sounds/tu-puedes.mp3');
  },
  create: function() {
    game.add.sprite(0, 0, 'background');
    const max = game.add.sprite(200, 300, 'max');
    const pastilla = game.add.sprite(350, 100, 'pastilla');
    const pesticide = game.add.sprite(225, 100, 'pesticide');
    const traje = game.add.sprite(100, 100, 'traje');
    const mosquito = game.add.sprite(350, 200, 'mosquito');
    const mosquito2 = game.add.sprite(450, 180, 'mosquito');
    const mosquito3 = game.add.sprite(550, 225, 'mosquito');
      
    max.x = 400;
    max.y = 455;
    

    const title = game.add.text(500, 150, 'Bienvenido a Escena5', { font: '32px Arial', fill: '#ffffff' });
//    title.anchor.setTo(0.5);
    pastilla.inputEnabled = true;
    pesticide.inputEnabled = true;
    traje.inputEnabled = true;
    pesticide.events.onInputDown.add(function() {
      eliminarMensaje();
      reproducirAudio1d('assets/sounds/result-rp-fumiga.mp3');
       game.time.events.add(Phaser.Timer.SECOND * 10, function() {
        game.state.start('scene2'); // Abrir la escena 2 después de 5 segundos
      }, this);
    });
    pastilla.events.onInputDown.add(function() {
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
    function reproducirAudio1d(ruta) {
      const audio1d = game.sound.add('audio1d');
      audio1d.play();
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

var Scene2 = {
    preload: function() {
    game.load.image('background', 'assets/images/escena6-bg.jpg');
    game.load.spritesheet('max', 'assets/images/max.png', 300, 150, 2);
      game.load.spritesheet('pastilla', 'assets/images/pastilla.png', 300, 150, 2);
    game.load.spritesheet('pesticide', 'assets/images/pesticide.png', 300, 150, 2);
    game.load.spritesheet('traje', 'assets/images/safety-suit.png', 300, 150, 2);
    game.load.spritesheet('balde', 'assets/images/bucket.png', 300, 150, 2);
    game.load.spritesheet('mosquito', 'assets/images/mosquito.png', 300, 150, 2);
    game.load.audio('audio1d', 'assets/sounds/result-rp-fumiga.mp3');
    game.load.audio('audio2', 'assets/sounds/pruebalo.mp3');
    game.load.audio('audio3', 'assets/sounds/tu-puedes.mp3');
  },
  create: function() {
    var backgroundImage = this.add.image(0, 0, 'background');
    backgroundImage.setOrigin(0);

    var puzzlePieces = this.add.group();

    var pieceWidth = game.config.width / 3;
    var pieceHeight = game.config.height / 3;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var piece = this.add.sprite(i * pieceWidth, j * pieceHeight, 'background');
        piece.setOrigin(0);
        piece.setInteractive();
        piece.input.dropZone = true;
        piece.setData('index', i + j * 3);
        puzzlePieces.add(piece);
      }
    }

    this.input.on('dragstart', function(pointer, gameObject) {
      this.children.bringToTop(gameObject);
    }, this);

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('drop', function(pointer, gameObject, dropZone) {
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;
      gameObject.input.enabled = false;
      checkPuzzleComplete();
    });

    function checkPuzzleComplete() {
      var complete = true;

      puzzlePieces.getChildren().forEach(function(piece) {
        if (piece.input.enabled) {
          complete = false;
        }
      });

      if (complete) {
        console.log('¡Rompecabezas completado!');
      }
    }
  }
};

//var Scene2 = {
//  create: function() {
//    game.add.sprite(0, 0, 'background');
//    game.add.text(game.width / 2, game.height / 2, 'Estoy en la Escena 2', { font: '22px Arial', fill: '#000000' }).anchor.setTo(0.5);
//};
//var Scene2 = {
//  create: function() {
//    game.add.sprite(0, 0, 'background');
//    game.add.text(game.width / 2, game.height / 2, 'Estoy en la Escena 2', { font: '22px Arial', fill: '#000000' }).anchor.setTo(0.5);
//
//    var cardGroup = game.add.group();
//    var numbers = [1, 1, 2, 2, 3, 3];
//    Phaser.ArrayUtils.shuffle(numbers);
//
//    var startX = 100;
//    var startY = 100;
//    var spacingX = 120;
//
//    for (var i = 0; i < numbers.length; i++) {
//      var card = game.add.sprite(startX + spacingX * i, startY, 'card');
//      card.anchor.setTo(0.5);
//      card.scale.setTo(0.5);
//
//      card.number = numbers[i];
//      card.flipped = false;
//
//      card.inputEnabled = true;
//      card.events.onInputDown.add(this.flipCard, this);
//
//      cardGroup.add(card);
//    }
//
//    this.flippedCards = [];
//  },
//
//  flipCard: function(card) {
//    if (card.flipped) {
//      return;
//    }
//
//    card.flipped = true;
//    card.loadTexture('card' + card.number);
//
//    this.flippedCards.push(card);
//
//    if (this.flippedCards.length === 2) {
//      game.time.events.add(500, this.checkMatch, this);
//    }
//  },
//
//  checkMatch: function() {
//    if (this.flippedCards[0].number === this.flippedCards[1].number) {
//      this.flippedCards.forEach(function(card) {
//        card.destroy();
//      });
//    } else {
//      this.flippedCards.forEach(function(card) {
//        card.flipped = false;
//        card.loadTexture('card');
//      });
//    }
//
//    this.flippedCards = [];
//  }
//};

// Función para crear los botones que llevan a las diferentes escenas 
function createButtons() { 
  const button1 = game.add.sprite(game.width / 3, game.height / 2, 'select'); 
  button1.anchor.setTo(0.5); 
  button1.inputEnabled = true; 
  button1.events.onInputDown.add(function() { 
    game.state.start('scene1'); // Abrir la escena 11 al presionar el botón 1 
  }, this); 
  const text1 = game.add.text(game.width / 3, game.height / 2 + 50, 'Botón 1', { font: '22px Arial', fill: '#000000' }); 
  text1.anchor.setTo(0.5); 
} 
// Agregar las escenas al juego 
game.state.add('gameplay', GamePlayManager); 
game.state.add('scene3a', Scene3a);
game.state.add('scene3b', Scene3b);
game.state.add('scene3c', Scene3c); 
game.state.add('scene3d', Scene3d); 
game.state.add('scene2', Scene2); 
// Iniciar el juego con la escena principal 
game.state.start('gameplay'); 