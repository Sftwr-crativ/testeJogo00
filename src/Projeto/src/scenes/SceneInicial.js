export default class SceneInicial extends Phaser.Scene {
  constructor() {
    // Chama o construtor da classe Phaser.Scene e define o nome da cena como "SceneInicial"
    super("SceneInicial");
  }

  preload() {
    // Carrega as imagens que serão usadas na cena
    this.load.image("botao", "assets/imagens/botao.png");
    this.load.image("fundo", "assets/imagens/imagesb (2).png");
    this.load.image("logo", "assets/imagens/logo.png");
  }

  create() {
    // Adiciona a imagem de fundo na posição (350, 300) e reduz seu tamanho
    this.add.image(350, 300, "fundo").setScale(0.6);

    // Adiciona a logo na posição (350, 80) e reduz seu tamanho
    this.add.image(350, 80, "logo").setScale(0.4);

    // Adiciona o botão na posição (350, 500) e reduz seu tamanho
    let botao = this.add.image(350, 500, "botao").setScale(0.5);
    
    // Torna o botão interativo para capturar eventos do mouse
    botao.setInteractive();

    // Evento quando o mouse passa sobre o botão
    botao.on("pointerover", () => {
      console.log("Mouse sobre o botão");
    });

    // Evento quando o mouse sai do botão
    botao.on("pointerout", () => {
      console.log("Mouse saiu do botão");
    });

    // Evento quando o botão é clicado
    botao.on("pointerdown", () => {
      console.log("Botão clicado! Carregando cena do jogo...");
      // Troca para a cena do jogo
      this.scene.start("SceneJogo");
    });
  }
}