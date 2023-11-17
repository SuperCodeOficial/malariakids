var config = {
  width: 1136,
  height: 640,
  type: Phaser.CANVAS,
};

var game = new Phaser.Game(config);
// Escena Carga del juego
var LoadScene = {
  init: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  preload: function() {
    // Cargar los assets necesarios para la escena de carga, como el background, la imagen y el sonido si es necesario
    game.load.image('background', 'assets/images/no-mosquito.jpg');
    game.load.audio('sound', 'assets/sounds/pum.mp3');
    game.load.audio('malaria1', 'assets/sounds/malaria1.mp3'); 
    game.load.audio('malaria2', 'assets/sounds/malaria2.mp3');
    game.load.audio('malaria3', 'assets/sounds/malaria3.mp3');
    game.load.audio('malaria4', 'assets/sounds/malaria4.mp3');
    game.load.audio('malaria5', 'assets/sounds/malaria5.mp3');
    game.load.audio('malaria6', 'assets/sounds/malaria6.mp3');
  },
create: function() {
    // Mostrar el background
    game.add.sprite(0, 0, 'background');
    // Crear el botón
    var button = game.add.button(game.world.centerX, game.world.centerY, '', this.buttonOnClick, this, 1, 0, 2);
    button.anchor.setTo(0, 0.5);
    button.x = game.width / 4;
    button.y = game.world.centerY;
    // Agregar el texto al botón
    var buttonText = game.add.text(0, 0, 'Comenzar', { font: '60px Arial', fill: '#ffffff' });
    buttonText.anchor.setTo(0.5);
    button.addChild(buttonText);
  },
  buttonOnClick: function() {
    // Reproducir el audio
    const audio = game.sound.add('sound');
    audio.play();
    // Ocultar el botón
    var button = game.world.children[1];
    button.visible = false;
    // Mostrar el texto "Cargando"
    var loadingText = game.add.text(game.width / 4, game.world.centerY, 'Cargando...', { font: '50px Arial', fill: '#ffffff' });
    loadingText.anchor.setTo(0, 0.5);
    // Animar el texto
    var loadingTween = game.add.tween(loadingText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, -1);
    loadingTween.yoyo(true);
    // Esperar un tiempo y luego iniciar la siguiente escena
    game.time.events.add(Phaser.Timer.SECOND * 5, function() {
      game.state.start('gameplay'); // Reemplaza 'MainScene' con el nombre de tu escena principal
      this.playAudios(['malaria1', 'malaria2', 'malaria3','malaria4', 'malaria5', 'malaria6']);
    }, this);
  },
  playAudios: function(audioNames) {
    let currentIndex = 0;
    const playNextAudio = function() {
      if (currentIndex < audioNames.length) {
        const audio = game.sound.add(audioNames[currentIndex]);
        audio.play();
        currentIndex++;
        audio.onStop.add(playNextAudio);
      }
    };
    playNextAudio();
  }
};
// Escena Principal
var GamePlayManager = { 
    preload: function() { 
    game.load.image('background', 'assets/images/background.jpg'); 
    game.load.spritesheet('choice', 'assets/images/choice.png', 300, 150, 2); 
    game.load.spritesheet('select', 'assets/images/select.png', 300, 150, 2); 
    game.load.audio('reto1', 'assets/sounds/reto1.mp3'); // Carga el audio "reto1" 
    }, 
    create: function() {
        game.add.sprite(0, 0, 'background');

        const dialogWidth = game.width * 0.4;
        const dialogHeight = dialogWidth * 0.3;

        const dialogBox = this.add.graphics();
        dialogBox.beginFill(0xffffff);
        dialogBox.drawRoundedRect((game.width - dialogWidth) / 2, 20, dialogWidth, dialogHeight, 20);
        dialogBox.endFill();

        const floatingText = this.add.text((game.width - dialogWidth) / 2 + 20, 40, '', { font: '16px Arial', fill: '#000000' });
        floatingText.wordWrapWidth = dialogWidth - 40;
        floatingText.wordWrap = true;

        const messages = ['La Malaria: La malaria también conocida como paludismo es una enfermedad causada por un parásito Plasmodium, el cual es transmitido por la picadura de un mosquito infectado del género anófeles.','Sus principales síntomas son:  fiebre, sudoración, escalofríos, dolor de cabeza y dolor muscular. Esta enfermedad puede llegar a ser potencialmente mortal si no es tratada a tiempo, por eso', 'es muy importante acudir lo más pronto posible a los centros de salud cuando presentemos estos síntomas. Existen unas medidas que podemos poner en práctica para evitar enfermarnos por malaria:', 'estas son el uso de mosquiteros impregnados con insecticida para dormir, fumigar las casas con insecticidas, aplicarse repelente de insectos en la piel, evitar la formación de aguas estancadas,', 'si se tiene tanques o cunetas en la casa desinfectarlos utilizando pastillas de cloro. Y recuerden amiguitos en caso de presentar estos síntomas no debemos automedicarnos, debemos acudir de inmediato', 'al punto de diagnóstico más cercano, tomar todo el medicamento formulado sin suspender dosis y completar los días establecidos para el tratamiento.¡Ahora te animas a jugar conmigo resolviendo estos retos? vamos tu puedes!'];
        let currentIndex = 0;

        const showNextMessage = function() {
            floatingText.setText(messages[currentIndex]);
            currentIndex++;
            if (currentIndex < messages.length) {
                game.time.events.add(Phaser.Timer.SECOND * 12, showNextMessage, this);
            } else {
                createNextButtons();
            }
        };

        showNextMessage();

    function createNextButtons() {
        const button1 = game.add.sprite(game.width / 3, dialogHeight + 120, 'choice');
        button1.anchor.setTo(0.5);
        button1.inputEnabled = true;
        button1.events.onInputDown.add(function() {
            game.state.start('scene3a');
             const audioReto1 = game.sound.add('reto1'); // Crea una instancia del audio "reto1" 
        audioReto1.play(); // Reproduce el audio "reto1"
        }, this);
        const text1 = game.add.text(game.width / 3, dialogHeight + 220, 'Escena 1', { font: '22px Arial', fill: '#000000' });
        text1.anchor.setTo(0.5);

        const button2 = game.add.sprite((game.width / 3) * 2, dialogHeight + 120, 'select');
        button2.anchor.setTo(0.5);
        button2.inputEnabled = true;
        button2.events.onInputDown.add(function() {
            // Aquí se muestra el mensaje flotante
            const message = game.add.text(game.width / 2, game.height / 2, 'Primero Escena 1', { font: '25px Arial', fill: '#013220' });
            message.anchor.setTo(.5);
            // Para ocultar el mensaje después de un tiempo determinado, puedes usar un temporizador
            game.time.events.add(Phaser.Timer.SECOND * 2, function() {
                message.destroy(); // Elimina el mensaje flotante después de 3 segundos
            }, this);
        }, this);
        const text2 = game.add.text((game.width / 3) * 2, dialogHeight + 220, 'Escena 2', { font: '22px Arial', fill: '#000000' });
        text2.anchor.setTo(0.5);
    }

    },
    update: function() {} 
}; 
// Escena Reto1
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
    game.load.audio('reto2', 'assets/sounds/reto2.mp3'); // Carga el audio "reto1" 
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
    pastilla.x = 300;
    pastilla.y = 355;
    pesticide.x = 500;
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
    const title = game.add.text(500, 200, 'Elige la opción correcta', { font: '32px Arial', fill: '#013220' });
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
  }
};
// Escena Reto2
var Scene3b = {
  preload: function() {
    game.load.image('background', 'assets/images/escena4-bg.jpg');
    game.load.spritesheet('alexa', 'assets/images/alexa.png', 300, 150, 2);
    game.load.spritesheet('toldillo', 'assets/images/toldillo.jpg', 300, 150, 2);
    game.load.spritesheet('pesticide', 'assets/images/pesticide.png', 300, 150, 2);
    game.load.spritesheet('traje', 'assets/images/safety-suit.png', 300, 150, 2);
    game.load.spritesheet('balde', 'assets/images/bucket.png', 300, 150, 2);
    game.load.spritesheet('mosquito', 'assets/images/mosquito.png', 300, 150, 2);
    game.load.audio('audio1a', 'assets/sounds/result-rp-dormir.mp3');
    game.load.audio('audio2', 'assets/sounds/pruebalo.mp3');
    game.load.audio('audio3', 'assets/sounds/tu-puedes.mp3');
    game.load.audio('reto3', 'assets/sounds/reto3.mp3'); 
  },
  create: function() {
    game.add.sprite(0, 0, 'background');
    const alexa = game.add.sprite(200, 300, 'alexa');
    const toldillo = game.add.sprite(500, 100, 'toldillo');
    const pesticide = game.add.sprite(300, 100, 'pesticide');
    const traje = game.add.sprite(100, 100, 'traje');
    const mosquito = game.add.sprite(350, 200, 'mosquito');
    const mosquito2 = game.add.sprite(450, 180, 'mosquito');
    const mosquito3 = game.add.sprite(550, 225, 'mosquito');
    alexa.x = 250;
    alexa.y = 355;
    
    const title = game.add.text(500, 50, 'Elige la opción correcta', { font: '32px Arial', fill: '#013220' });
    title.anchor.setTo(0.5);
    toldillo.inputEnabled = true;
    pesticide.inputEnabled = true;
    traje.inputEnabled = true;
    toldillo.events.onInputDown.add(function() {
      eliminarMensaje();
      reproducirAudio1a('assets/sounds/result-rp-dormir.mp3');
       game.time.events.add(Phaser.Timer.SECOND * 12, function() {
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
  }
}; 
// Escena Reto3
var Scene3c = {
  preload: function() {
    game.load.image('background', 'assets/images/escena5-bg.jpg');
    game.load.spritesheet('alejo', 'assets/images/boy.png', 300, 150, 2);
    game.load.spritesheet('hospital', 'assets/images/hospital.png', 300, 150, 2);
    game.load.spritesheet('pesticide', 'assets/images/pesticide.png', 300, 150, 2);
    game.load.spritesheet('traje', 'assets/images/safety-suit.png', 300, 150, 2);
    game.load.spritesheet('pastilla', 'assets/images/pastilla.png', 300, 150, 2);
    game.load.spritesheet('mosquito', 'assets/images/mosquito.png', 300, 150, 2);
    game.load.audio('audio1c', 'assets/sounds/result-rp-salud.mp3');
    game.load.audio('audio2', 'assets/sounds/pruebalo.mp3');
    game.load.audio('audio3', 'assets/sounds/tu-puedes.mp3');
    game.load.audio('reto4', 'assets/sounds/reto4.mp3');
  },
  create: function() {
    game.add.sprite(0, 0, 'background');
    const alejo = game.add.sprite(550, 400, 'alejo');
    const hospital = game.add.sprite(500, 100, 'hospital');
    const pesticide = game.add.sprite(300, 100, 'pesticide');
    const pastilla = game.add.sprite(100, 100, 'pastilla');
      const title = game.add.text(500, 50, 'Elige la opción correcta', { font: '32px Arial', fill: '#ffffff' });
    title.anchor.setTo(0.5);
    hospital.inputEnabled = true;
    pesticide.inputEnabled = true;
    pastilla.inputEnabled = true;
    hospital.events.onInputDown.add(function() {
      eliminarMensaje();
      reproducirAudio1('assets/sounds/muy-bien.mp3');
       game.time.events.add(Phaser.Timer.SECOND * 12, function() {
        game.state.start('scene3d'); // Abrir la escena 2 después de 5 segundos
           const audioReto4 = game.sound.add('reto4'); // Crea una instancia del audio "reto1" 
    audioReto4.play(); // Reproduce el audio "reto1"
      }, this);
    });
    pesticide.events.onInputDown.add(function() {
      eliminarMensaje();
      reproducirAudio2('assets/sounds/pruebalo.mp3');
    });
    pastilla.events.onInputDown.add(function() {
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
// Escena Reto4
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
    const pastilla = game.add.sprite(700, 100, 'pastilla');
    const pesticide = game.add.sprite(400, 100, 'pesticide');
    const traje = game.add.sprite(150, 100, 'traje');
    const mosquito = game.add.sprite(650, 400, 'mosquito');
    const mosquito2 = game.add.sprite(750, 400, 'mosquito');
    const mosquito3 = game.add.sprite(850, 405, 'mosquito');
    const mosquito4 = game.add.sprite(650, 500, 'mosquito');
    const mosquito5 = game.add.sprite(750, 500, 'mosquito');
    const mosquito6 = game.add.sprite(850, 505, 'mosquito');
    const mosquito7 = game.add.sprite(650, 200, 'mosquito');
    const mosquito8 = game.add.sprite(550, 400, 'mosquito');
    const mosquito9 = game.add.sprite(750, 305, 'mosquito');
    max.x = 400;
    max.y = 455;
      const title = game.add.text(500, 50, 'Elige la opción correcta', { font: '32px Arial', fill: '#000000' });
    title.anchor.setTo(0.5);
    pastilla.inputEnabled = true;
    pesticide.inputEnabled = true;
    traje.inputEnabled = true;
    pesticide.events.onInputDown.add(function() {
      eliminarMensaje();
      reproducirAudio1d('assets/sounds/result-rp-fumiga.mp3');
       game.time.events.add(Phaser.Timer.SECOND * 13, function() {
        game.state.start('lastscene'); // Abrir la escena 2 después de 5 segundos
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
  }
}; 
// Escena Reto Escena 2
var Scene2 = {
  preload: function() {
    this.load.image('background', 'assets/images/background.jpg');
    this.load.image('carta1', 'assets/images/pastilla2.png');
    this.load.image('carta2', 'assets/images/sick.png');
    this.load.image('carta3', 'assets/images/balde.png');
    this.load.image('carta4', 'assets/images/sleep.png');
    this.load.image('carta5', 'assets/images/hospital2.png');
    this.load.image('carta6', 'assets/images/zancu.png');
    this.load.image('carta7', 'assets/images/toldillo2.png');
    this.load.image('carta8', 'assets/images/pesticide2.png');
    this.load.audio('perder', 'assets/sounds/perder.mp3');
    this.load.audio('brillante', 'assets/sounds/brillante.mp3');
      this.load.audio('final', 'assets/sounds/final.mp3');
    this.load.image('mosquiton', 'assets/images/mosquiton.jpg');
    this.load.image('button1', 'assets/images/repeat.png');
    this.load.image('button2', 'assets/images/logout.png');
    game.load.audio('malaria1', 'assets/sounds/malaria1.mp3'); // Carga el audio "reto1" 
    game.load.audio('malaria2', 'assets/sounds/malaria2.mp3'); // Carga el audio "reto1"
    game.load.audio('malaria3', 'assets/sounds/malaria3.mp3'); // Carga el audio "reto1"
    game.load.audio('malaria4', 'assets/sounds/malaria4.mp3'); // Carga el audio "reto1" 
    game.load.audio('malaria5', 'assets/sounds/malaria5.mp3'); // Carga el audio "reto1"
    game.load.audio('malaria6', 'assets/sounds/malaria6.mp3'); // Carga el audio "reto1"
  },
  create: function() {
    this.add.image(0, 0, 'background');
    var boxX = this.game.world.centerX;
    var boxY = this.game.world.centerY;
    var boxWidth = 1000;
    var boxHeight = 600;
    var box = this.add.graphics(boxX, boxY);
    box.lineStyle(4, 0x2d572c);
    box.beginFill(0xffffff, 0.3);
    box.drawRect(-boxWidth/2, -boxHeight/2, boxWidth, boxHeight);
    box.anchor.setTo(2.5);
    var cartaX = boxX - boxWidth/2 + 125;
    var cartaY = boxY - boxHeight/2 + 150;
    var cartaKeys = ['carta1', 'carta2', 'carta3', 'carta4', 'carta5', 'carta6', 'carta7', 'carta8'];
    cartaKeys = this.shuffleArray(cartaKeys);
    var clickedCards = [];
    this.game.customParams = {}; // Inicializa el objeto customParams
    for (var i = 0; i < 8; i++) {
      var cartaKey = cartaKeys[i];
      var carta = this.add.button(cartaX, cartaY, cartaKey, this.buttonClicked, this, 1, 0, 2);
      carta.anchor.setTo(0.5);
      cartaX += 250;
      carta.customParams = { key: cartaKey, matched: false }; // Agrega un parámetro personalizado para identificar la carta y si está emparejada
      if (i === 3) {
        cartaX = boxX - boxWidth/2 + 125;
        cartaY += 300;
      }
    }
  },
  buttonClicked: function(button) {
    var clickedCards = this.game.customParams.clickedCards || [];
    clickedCards.push(button.customParams.key);
    if (clickedCards.length === 2) {
      switch(clickedCards.join('-')) {
        case 'carta1-carta3':
        case 'carta3-carta1':
          this.markCardsAsMatched(clickedCards);
          this.playSound('brillante');
          break;
        case 'carta5-carta2':
        case 'carta2-carta5':
          this.markCardsAsMatched(clickedCards);
          this.playSound('brillante');
          break;
        case 'carta7-carta4':
        case 'carta4-carta7':
          this.markCardsAsMatched(clickedCards);
          this.playSound('brillante');
          break;
        case 'carta8-carta6':
        case 'carta6-carta8':
          this.markCardsAsMatched(clickedCards);
          this.playSound('brillante');
          break;
        default:
          this.playSound('perder');
          break;
      }
      clickedCards = [];
    }
    this.game.customParams.clickedCards = clickedCards;
  },
  markCardsAsMatched: function(clickedCards) {
    var cards = this.game.world.children.filter(function(child) {
      return child instanceof Phaser.Button;
    });
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (clickedCards.includes(card.customParams.key)) {
        card.customParams.matched = true;
      }
    }
    this.removeMatchedCards();
  },
  removeMatchedCards: function() {
    var cards = this.game.world.children.filter(function(child) {
      return child instanceof Phaser.Button && child.customParams.matched === true;
    });
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      card.destroy();
    }
    var remainingCards = this.game.world.children.filter(function(child) {
      return child instanceof Phaser.Button;
    });
    if (remainingCards.length === 0) {
      this.createMosquitonImage();
      this.showEndMessage();
      this.createButtons();
    }
  },
  createMosquitonImage: function() {
    var boxX = this.game.world.centerX;
    var boxY = this.game.world.centerY;
    var mosquiton = this.add.image(boxX, boxY, 'mosquiton');
    mosquiton.anchor.setTo(0.5);
  },
  showEndMessage: function() {
    var boxX = this.game.world.centerX;
    var boxY = this.game.world.centerY;
    var screenWidth = this.game.width;
    var text = this.add.text(boxX, boxY - 200, '¡“Entre todos podemos contribuir en el control de la malaria en nuestro hermoso Departamento Chocó”.!', { font: '25px Arial', fill: '#2d572c', wordWrap: true, wordWrapWidth: screenWidth * 0.5 });
    text.anchor.setTo(0.5);
  },

createButtons: function() {
  var boxX = this.game.world.centerX;
  var boxY = this.game.world.centerY;
  
  var button1 = this.add.button(boxX - 150, boxY + 200, 'button1', this.button1Clicked, this, 1, 0, 2);
  button1.anchor.setTo(0.5);
  var text1 = this.add.text(button1.x, button1.y + button1.height / 2 + 10, 'Jugar de nuevo', { font: '20px Arial', fill: '#ffffff' });
  text1.anchor.setTo(0.5);
  
  var button2 = this.add.button(boxX + 150, boxY + 200, 'button2', this.button2Clicked, this, 1, 0, 2);
  button2.anchor.setTo(0.5);
  var text2 = this.add.text(button2.x, button2.y + button2.height / 2 + 10, 'Abandonar el juego', { font: '20px Arial', fill: '#ffffff' });
  text2.anchor.setTo(0.5);
},
  button1Clicked: function() {
    game.state.start('gameplay');
this.playAudios(['malaria1', 'malaria2', 'malaria3','malaria4', 'malaria5', 'malaria6']);
  },
  button2Clicked: function() {
    this.playSound('final');
      setTimeout(function() {
    game.state.start('LoadScene');
  }, 7000); 
  },
      playAudios: function(audioNames) {
    let currentIndex = 0;
    const playNextAudio = function() {
      if (currentIndex < audioNames.length) {
        const audio = game.sound.add(audioNames[currentIndex]);
        audio.play();
        currentIndex++;
        audio.onStop.add(playNextAudio);
      }
    };
    playNextAudio();
  },
  shuffleArray: function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  },
  shuffleCards: function() {
    var boxX = this.game.world.centerX;
    var boxY = this.game.world.centerY;
    var boxWidth = 1000;
    var boxHeight = 600;
    var box = this.add.graphics(boxX, boxY);
    box.lineStyle(4, 0xff0000);
    box.beginFill(0xffffff, 0);
    box.drawRect(-boxWidth/2, -boxHeight/2, boxWidth, boxHeight);
    box.anchor.setTo(.5);
    var cartaKeys = ['carta1', 'carta2', 'carta3', 'carta4', 'carta5', 'carta6', 'carta7', 'carta8'];
    cartaKeys = this.shuffleArray(cartaKeys);
    var cartaX = boxX - boxWidth/2 + 125;
    var cartaY = boxY - boxHeight/2 + 150;
    var index = 0;
    this.game.customParams.clickedCards = [];
    this.game.world.removeAll();
    var background = this.add.image(0, 0, 'background');
    background.anchor.setTo(0.5);
    for (var i = 0; i < 8; i++) {
      var cartaKey = cartaKeys[i];
      var carta = this.add.button(cartaX, cartaY, cartaKey, this.buttonClicked, this, 1, 0, 2);
      carta.anchor.setTo(0.5);
      cartaX += 250;
      carta.customParams = { key: cartaKey, matched: false };
      if (i === 3) {
        cartaX = boxX - boxWidth/2 + 125;
        cartaY += 300;
      }
    }
  },
  playSound: function(soundKey) {
    var sound = this.game.add.audio(soundKey);
    sound.play();
  }
};
// Escena Final1
var LastEscene = {
  preload: function() { 
    game.load.image('background', 'assets/images/last-escena.jpg'); 
    game.load.spritesheet('choice', 'assets/images/house.png', 300, 150, 2); 
    game.load.spritesheet('select', 'assets/images/select.png', 300, 150, 2); // Nueva imagen para el botón 
    game.load.audio('malaria1', 'assets/sounds/malaria1.mp3'); // Carga el audio "reto1" 
    game.load.audio('malaria2', 'assets/sounds/malaria2.mp3'); // Carga el audio "reto1"
    game.load.audio('malaria3', 'assets/sounds/malaria3.mp3'); // Carga el audio "reto1"
    game.load.audio('malaria4', 'assets/sounds/malaria4.mp3'); // Carga el audio "reto1" 
    game.load.audio('malaria5', 'assets/sounds/malaria5.mp3'); // Carga el audio "reto1"
    game.load.audio('malaria6', 'assets/sounds/malaria6.mp3'); // Carga el audio "reto1"
    game.load.audio('practice', 'assets/sounds/practice.mp3'); // Carga el audio "reto1"
  }, 
  create: function() {
    game.add.sprite(0, 0, 'background');
    // Crea el primer botón
    var button1 = game.add.button(game.world.centerX - 250, game.world.centerY, 'choice', function() {
      game.state.start('gameplay'); // Reemplaza 'MainScene' con el nombre de tu escena principal
      this.playAudios(['malaria1', 'malaria2', 'malaria3','malaria4', 'malaria5', 'malaria6']);
    }, this, 1, 0, 2);
    button1.anchor.setTo(0.5);
    // Crea el texto para el primer botón
    var text1 = game.add.text(game.world.centerX - 250, game.world.centerY + 80, 'Menu Principal', { font: '24px Arial', fill: '#000000' });
    text1.anchor.setTo(0.5);
    // Crea el segundo botón
    var button2 = game.add.button(game.world.centerX + 250, game.world.centerY, 'select', function() {
      game.state.start('scene2');
      this.playSound('practice'); // Reproduce el audio "practice" después de pasar a la escena 2
    }, this, 1, 0, 2);
    button2.anchor.setTo(0.5);
    // Crea el texto para el segundo botón
    var text2 = game.add.text(game.world.centerX + 250, game.world.centerY + 80, 'Siguiente Escena', { font: '24px Arial', fill: '#000000' });
    text2.anchor.setTo(0.5);
  },
  playAudios: function(audioNames) {
    let currentIndex = 0;
    const playNextAudio = function() {
      if (currentIndex < audioNames.length) {
        const audio = game.sound.add(audioNames[currentIndex]);
        audio.play();
        currentIndex++;
        audio.onStop.add(playNextAudio);
      }
    };
    playNextAudio();
  },
  playSound: function(soundKey) {
    var sound = game.sound.add(soundKey);
    sound.play();
  },
  update: function() {} 
};
// Agregar las escenas al juego 
game.state.add('gameplay', GamePlayManager); 
game.state.add('scene3a', Scene3a);
game.state.add('scene3b', Scene3b);
game.state.add('scene3c', Scene3c); 
game.state.add('scene3d', Scene3d);
game.state.add('lastscene', LastEscene);
game.state.add('scene2', Scene2); 
game.state.add('LoadScene', LoadScene);
// Iniciar el juego con la escena de carga
game.state.start('LoadScene');