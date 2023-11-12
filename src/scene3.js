var scene3 = {
  preload: function() {
    this.load.image('background', 'assets/images/back-mosquito.jpg');
    this.load.spritesheet('max', 'assets/images/max.png', 300, 150, 2);
    this.load.spritesheet('balde', 'assets/images/bucket.png', 300, 150, 2);
    this.load.spritesheet('mosquito', 'assets/images/mosquito.png', 300, 150, 2);
    this.load.audio('audio1', 'assets/sounds/result-rp-agua.mp3');
    this.load.audio('audio2', 'assets/sounds/pruebalo.mp3');
    this.load.audio('audio3', 'assets/sounds/tu-puedes.mp3');
    this.load.audio('reto1', 'assets/sounds/reto1.mp3'); // Carga el audio "reto1"
    this.load.spritesheet('button1', 'assets/images/pastilla.png', 300, 150, 2); 
      this.load.spritesheet('button2', 'assets/images/pesticide.png', 300, 150, 2); 
//      this.load.spritesheet('button3', 'assets/images/pastilla.png', 300, 150, 2); 
  },
  create: function() {
    this.add.sprite(0, 0, 'background');
    const max = this.add.sprite(200, 300, 'max');
    const balde = this.add.sprite(200, 300, 'balde');
    const mosquito = this.add.sprite(200, 300, 'mosquito');
    const mosquito2 = this.add.sprite(200, 300, 'mosquito');
    const mosquito3 = this.add.sprite(200, 300, 'mosquito');
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
    // Crear el botón 1
    const button1 = this.add.sprite(100, 100, 'button1').setInteractive();
    const button2 = this.add.sprite(100, 100, 'button2').setInteractive();
//    const button3 = this.add.sprite(100, 100, 'button3').setInteractive();


  }
};