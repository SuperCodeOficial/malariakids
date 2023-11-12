Scene4 = {
preload: function() {
    game.load.image('background', 'assets/images/background.jpg');
  },
  create: function() {
    game.add.sprite(0, 0, 'background');
    const title = this.add.text(400, 300, 'Welcome to Scene 4', { font: '32px Arial', fill: '#ffffff' });
    title.anchor.setTo(0.5);
  }
};