export default class SceneJogo extends Phaser.Scene {
  constructor() {
    super("SceneJogo");
  }

  preload() {
    this.load.image("background", "assets/imagens/mapab.png");

    this.load.atlas(
      "boneco",
      "assets/sprites/spritesheet.png",
      "assets/sprites/sprites.json"
    );

    this.load.spritesheet("npc", "assets/sprites/spritesheetb.png", {
      frameWidth: 64,
      frameHeight: 70,
    });
  }

  create() {
    this.add.image(325, 320, "background").setScale(0.8);

    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.boneco = this.physics.add.sprite(300, 200, "boneco").setScale(2);
    this.boneco.setCollideWorldBounds(true);

    this.npc = this.physics.add.sprite(500, 600, "npc");
    this.npc.setCollideWorldBounds(true);

    // ✅ Create Animations Before Using
    this.anims.create({
      key: "frente",
      frames: this.anims.generateFrameNames("boneco", {
        prefix: "frente",
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "costas",
      frames: this.anims.generateFrameNames("boneco", {
        prefix: "costas",
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "direita",
      frames: this.anims.generateFrameNames("boneco", {
        prefix: "direita",
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "esquerda",
      frames: this.anims.generateFrameNames("boneco", {
        prefix: "esquerda",
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // ✅ Check if animations exist
    console.log("Animations Loaded:");
    console.log("Frente:", this.anims.exists("frente"));
    console.log("Costas:", this.anims.exists("costas"));
    console.log("Direita:", this.anims.exists("direita"));
    console.log("Esquerda:", this.anims.exists("esquerda"));

    // ✅ Dialogue Box (White with Black Border)
    this.dialogueBox = this.add.rectangle(325, 500, 500, 100, 0xffffff, 1);
    this.dialogueBox.setStrokeStyle(2, 0x000000);
    this.dialogueBox.setVisible(false);
    this.dialogueBox.setDepth(1); // Ensure it appears above the background

    // ✅ Centered Text inside the Box
    this.dialogueText = this.add.text(325, 470, "", {
      fontSize: "18px",
      fill: "#000000",
      wordWrap: { width: 450, useAdvancedWrap: true },
      align: "center",
    });
    this.dialogueText.setOrigin(0.5);
    this.dialogueText.setVisible(false);
    this.dialogueText.setDepth(2);

    // ✅ Add pop-up container (rectangle and text)
    this.popupContainer = this.add.container(0, 0); // Container to group the rectangle and text
    this.popupRectangle = this.add.rectangle(0, 0, 150, 40, 0xffffff, 1); // White rectangle
    this.popupRectangle.setStrokeStyle(2, 0x000000); // Black border
    this.popupText = this.add.text(0, -25, "Clique em mim", {
      fontSize: "16px",
      fill: "#000000",
      fontWeight: "bold",
    });
    this.popupText.setOrigin(0.5); // Center the text
    this.popupContainer.add([this.popupRectangle, this.popupText]); // Add rectangle and text to the container
    this.popupContainer.setVisible(false); // Initially hidden
    this.popupContainer.setDepth(2); // Ensure it appears above other elements

    // ✅ Make NPC Interactive
    this.npc.setInteractive();
    this.npc.on("pointerdown", () => {
      if (this.dialogueBox.visible) {
        console.log("Dialogue closed.");
        this.dialogueBox.setVisible(false);
        this.dialogueText.setVisible(false);
      } else {
        console.log("Dialogue opened.");
        this.dialogueText.setText("Teste teste teste teste");
        this.dialogueBox.setVisible(true);
        this.dialogueText.setVisible(true);
      }

      // Hide the "Clique em mim" pop-up when NPC is clicked
      this.popupContainer.setVisible(false);
    });
  }

  update() {
    this.boneco.setVelocity(0);

    // ✅ Ensure animation exists before playing it
    const checkAndPlayAnimation = (key) => {
      if (this.anims.exists(key)) {
        this.boneco.anims.play(key, true);
      } else {
        console.error(`Animation '${key}' not found!`);
      }
    };

    if (this.cursors.left.isDown || this.a.isDown) {
      this.boneco.setVelocityX(-160);
      checkAndPlayAnimation("esquerda");
    } else if (this.cursors.right.isDown || this.d.isDown) {
      this.boneco.setVelocityX(160);
      checkAndPlayAnimation("direita");
    } else if (this.cursors.up.isDown || this.w.isDown) {
      this.boneco.setVelocityY(-160);
      checkAndPlayAnimation("costas");
    } else if (this.cursors.down.isDown || this.s.isDown) {
      this.boneco.setVelocityY(160);
      checkAndPlayAnimation("frente");
    } else {
      this.boneco.setVelocity(0);
      this.boneco.anims.stop();
    }

    // ✅ Check distance between player and NPC
    const distance = Phaser.Math.Distance.Between(
      this.boneco.x,
      this.boneco.y,
      this.npc.x,
      this.npc.y
    );

    // Mostrar o pop-up apenas se:
    // 1. O jogador estiver perto do NPC
    // 2. A caixa de diálogo NÃO estiver visível
    if (distance < 100 && !this.dialogueBox.visible) {
      this.popupContainer.setPosition(this.npc.x, this.npc.y - 50); // Position above NPC
      this.popupContainer.setVisible(true);
    } else {
      this.popupContainer.setVisible(false);
    }
  }
}