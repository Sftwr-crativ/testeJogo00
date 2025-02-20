var boneco;
function preload() {
  this.load.image("player", "assets/boneco.png");
  this.load.image("background", "assets/fundo.jpg");
  this.load.atlas("boneco", "assets/spritesheet.png", "assets/sprites.json");
}

function create() {
  this.add.image(350, 250, "background").setScale(2.5);

  // Captura de teclas
  this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  this.cursors = this.input.keyboard.createCursorKeys();

  // Criando animações
  this.anims.create({
    key: "frente",
    frames: this.anims.generateFrameNames("boneco", {
      prefix: "frente",
      end: 4,
      zeroPad: 4,
    }),
    repeat: -1,
  });

  this.anims.create({
    key: "lado",
    frames: this.anims.generateFrameNames("boneco", {
      prefix: "lado",
      end: 4,
      zeroPad: 4,
    }),
    repeat: -1,
  });

  this.anims.create({
    key: "outrolado",
    frames: this.anims.generateFrameNames("boneco", {
      prefix: "outrolado",
      end: 4,
      zeroPad: 4,
    }),
    repeat: -1,
  });

  this.anims.create({
    key: "costas",
    frames: this.anims.generateFrameNames("boneco", {
      prefix: "costas",
      end: 4,
      zeroPad: 4,
    }),
    repeat: -1,
  });

  // Criando o boneco com física
  this.boneco = this.physics.add.sprite(config.width / 2, config.height / 2, "boneco");
  this.boneco.setCollideWorldBounds(true);
}

function update() {
  // Zerar velocidade antes de aplicar novas movimentações
  this.boneco.setVelocity(0);

  // Movimentação horizontal
  if (this.cursors.left.isDown || this.a.isDown) {
    this.boneco.setVelocityX(-160);
    this.boneco.anims.play("lado", true);
  } 
  else if (this.cursors.right.isDown || this.d.isDown) {
    this.boneco.setVelocityX(160);
    this.boneco.anims.play("outrolado", true);
  }

  // Movimentação vertical
  if (this.cursors.up.isDown || this.w.isDown) {
    this.boneco.setVelocityY(-160);
    this.boneco.anims.play("costas", true);
  } 
  else if (this.cursors.down.isDown || this.s.isDown) {
    this.boneco.setVelocityY(160);
    this.boneco.anims.play("frente", true);
  }

  // Parar a animação se nenhuma tecla for pressionada
  if (!this.cursors.left.isDown && !this.a.isDown &&
      !this.cursors.right.isDown && !this.d.isDown &&
      !this.cursors.up.isDown && !this.w.isDown &&
      !this.cursors.down.isDown && !this.s.isDown) {
    this.boneco.setVelocity(0);
    this.boneco.anims.stop();
  }
}

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 400,
  backgroundColor: "#f9f9f9",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);