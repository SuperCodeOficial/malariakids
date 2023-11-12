var scene3 = { 
  preload: function() { 
    this.load.image('background', 'assets/images/back-mosquito.jpg'); 
    this.load.spritesheet('max', 'assets/images/max.png', 300, 150, 2); 
    this.load.spritesheet('pastilla', 'assets/images/pastilla.png', 300, 150, 2); 
    this.load.spritesheet('pesticide', 'assets/images/pesticide.png', 300, 150, 2); 
    this.load.spritesheet('traje', 'assets/images/safety-suit.png', 300, 150, 2); 
    this.load.spritesheet('balde', 'assets/images/bucket.png', 300, 150, 2); 
    this.load.spritesheet('mosquito', 'assets/images/mosquito.png', 300, 150, 2); 
    this.load.audio('audio1', 'assets/sounds/result-rp-agua.mp3'); 
    this.load.audio('audio2', 'assets/sounds/pruebalo.mp3'); 
    this.load.audio('audio3', 'assets/sounds/tu-puedes.mp3'); 
    this.load.audio('reto1', 'assets/sounds/reto1.mp3'); // Carga el audio "reto1" 
  }, 
  create: function() { 
    this.add.sprite(0, 0, 'background'); 
    const max = this.add.sprite(200, 300, 'max'); 
    const balde = this.add.sprite(200, 300, 'balde'); 
    const mosquito = this.add.sprite(200, 300, 'mosquito'); 
    const mosquito2 = this.add.sprite(200, 300, 'mosquito'); 
    const mosquito3 = this.add.sprite(200, 300, 'mosquito'); 
    const pastilla = this.add.sprite(100, 100, 'pastilla'); 
    const pesticide = this.add.sprite(200, 100, 'pesticide'); 
    const traje = this.add.sprite(300, 100, 'traje'); 
    max.x = 400; 
    max.y = 455; 
    balde.x = 700; 
    balde.y = 525; 
    mosquito.x = 740; 
    mosquito.y = 510; 
    mosquito2.x = 770; 
    mosquito2.y = 530; 
    mosquito3.x = 720; 
    mosquito3.y = 530; 
    pastilla.inputEnabled = true; 
    pesticide.inputEnabled = true; 
    traje.inputEnabled = true; 
pastilla.events.onInputDown.add(function() { 
  const audio1 = this.sound.add('audio1'); 
  audio1.play(); 
  this.scene.start('sceneX'); 
}, this); 
    const audioReto1 = this.sound.add('reto1'); // Crea una instancia del audio "reto1" 
    audioReto1.play(); // Reproduce el audio "reto1" 
  }, 
}; 
var sceneX = { 
  preload: function() { 
    this.load.image('background', 'assets/images/back-mosquito.jpg'); 
    this.load.spritesheet('max', 'assets/images/max.png', 300, 150, 2); 
  }, 
  create: function() { 
    this.add.sprite(0, 0, 'background'); 
    // Aquí puedes agregar la lógica y los elementos de la escena X 
  }, 
};