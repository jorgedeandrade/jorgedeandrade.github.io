////   funcao so pra aprender. deletar

function stringSearch() {
  var str = "Expressões regulares em JavaScript na DevMedia!";
  var n = str.search(/[s+]/i);
  alert(n);
}

let acao = "telaInicial";
let subTitulo = document.getElementById("page-subtitle");
let elementoAlerta = document.getElementById("page-alert");
let elementoDetalhe = document.getElementById("detalhe");
let elementoDetalheNome = document.getElementById("detalhe-nome");
let elementoDetalheImagem = document.getElementById("detalhe-imagem");
let elementoDetalheDescricao = document.getElementById("detalhe-descricao");
let elementolistaFilme = document.getElementById("listaFilmes");
let listaEntrada = [];

// funcao para esconder e mostrar elementos?

carregaListaEntrada(); // monta array listaEntrada só com https
montaTelaOnClick(); // monta array listaOnClick com linha HTML

function seletorAcaoOnClick(src) {
  if (acao == "telaInicial") {
    function buscaFilme() {
      return listaEntrada.filter(function (filme) {
        return filme["imagemCad"] == src;
      });
    }
    var filmeBuscado = buscaFilme();
    elementoDetalhe.style.display = "flex";
    elementoDetalheNome.innerHTML = filmeBuscado[0].nomeCad;
    elementoDetalheImagem.innerHTML =
      "<img src='" + filmeBuscado[0].imagemCad + "'>";
    elementoDetalheDescricao.innerHTML = filmeBuscado[0].descricaoCad;
    // me lasquei 8 horas por que nao coloquei o indice
  } else {
    if (acao == "remover") {
      function removeFilme(listaEntrada, prop, value) {
        return listaEntrada.filter(function (i) {
          return i[prop] !== value;
        });
      }
      var listaEntradaLimpa = removeFilme(listaEntrada, "imagemCad", src);
      listaEntrada = listaEntradaLimpa;
      montaTelaOnClick();
    }
  }
}

// tirar nome da lista onclick?
function montaTelaOnClick() {
  let nomeFilme = "";
  let imagemFilme = "";
  elementolistaFilme.innerHTML = "";
  for (i = 0; i < listaEntrada.length; i++) {
    nomeFilme = listaEntrada[i].nomeCad;
    imagemFilme =
      "<img src='" +
      listaEntrada[i].imagemCad +
      "'onclick='seletorAcaoOnClick(this.src)'>";
    elementolistaFilme.innerHTML = elementolistaFilme.innerHTML + imagemFilme;
  }
}

function escondeElementosTelaInicial() {
  if (acao != "adicionar") {
    btnAdicionar.setAttribute("style", "display: none");
  }
  // elementoAlerta.style.display = "none";
  btnRemover.style.display = "none";
  btnBuscar.style.display = "none";
  btnMostrar.style.display = "none";
  btnRemoverTodos.style.display = "none";
}

function mostraTelaInicial() {
  acao = "telaInicial";
  subTitulo.textContent = "Clique na imagem para detalhes";

  inputNome.style.display = "none";
  inputImagem.style.display = "none";
  inputDescricao.style.display = "none";
  btnAdicionar.style.display = "inline";
  btnRemover.style.display = "inline";
  btnBuscar.style.display = "inline";
  btnMostrar.style.display = "inline";
  btnRemoverTodos.style.display = "inline";
  btnVoltar.style.display = "none";
}

function mostraTelaRemover() {
  if (listaEntrada.length > 0) {
    acao = "remover";
    escondeElementosTelaInicial();
    subTitulo.textContent = "Clique na Imagem para remover o Filme";
    btnVoltar.style.display = "block";
  } else {
    alerta(
      "red",
      "Você não possui filmes cadastrados. Adicione Filme ou Recupere a lista inicial"
    );
  }
}

function adicionar() {
  if (acao != "adicionar") {
    // monta tela na primeira passagem
    acao = "adicionar";
    escondeElementosTelaInicial();
    btnVoltar.style.display = "block";
    inputNome.style.display = "inline";
    inputImagem.style.display = "inline";
    inputDescricao.style.display = "inline";
    subTitulo.textContent =
      "Insira nome, endereço de imagem e descrição do filme";
  } else {
    let inputNome = document.getElementById("inputNome").value;
    let inputImagem = document.getElementById("inputImagem").value;
    let inputDescricao = document.getElementById("inputDescricao").value;
    if (
      !inputImagem.endsWith(".jpg") &&
      !inputImagem.endsWith(".jpeg") &&
      !inputImagem.endsWith(".png")
    ) {
      alerta("red", "Endereço de imagem inválido");
    } else {
      let imagemOnClick =
        "<img src='" + inputImagem + "'onclick='seletorAcaoOnClick(this.src)'>";

      listaEntrada.push({
        nomeCad: inputNome,
        imagemCad: inputImagem,
        descricaoCad: inputDescricao
      });
      elementolistaFilme.innerHTML =
        elementolistaFilme.innerHTML + imagemOnClick;
      alerta("yellow", "Adicionado com sucesso");
    }
    document.getElementById("inputImagem").value = "";
    document.getElementById("inputNome").value = "";
  }
}

function recuperar() {
  alerta("yellow", "Lista inicial de Filmes Recuperada");
  carregaListaEntrada();
  montaTelaOnClick();
}

// testar quando nao encontrar o filme: está dando erro.
function montaTelaBuscar() {
  acao = "buscar";
  escondeElementosTelaInicial();
  inputNome.style.display = "inline";
  btnBuscar.style.display = "inline";
  btnVoltar.style.display = "block";
  subTitulo.textContent = "Insira nome do filme procurado";
}
// mudar para conferir se nome existe. dando erro
function buscar() {
  if (acao != "buscar") {
    montaTelaBuscar();
  } else {
    let inputNome = document.getElementById("inputNome").value;

    function buscaFilme() {
      return listaEntrada.filter(function (filme) {
        return filme["nomeCad"] == inputNome;
      });
    }

    var filmeBuscado = buscaFilme();
    elementoDetalhe.style.display = "flex";
    elementoDetalheImagem.innerHTML =
      "<img src='" + filmeBuscado[0].imagemCad + "'>";
    elementoDetalheNome.innerHTML = filmeBuscado[0].nomeCad; // me lasquei 8 horas por que nao coloquei o indice
    elementoDetalheDescricao.innerHTML = filmeBuscado[0].descricaoCad;
    document.getElementById("inputNome").value = "";
  }
}

function fecharDetalhe() {
  elementoDetalhe.style.display = "none";
}

function removerTodos() {
  var excluir = confirm("Tem certeza que deseja remover todos os filmes?");
  if (excluir == true) {
    elementolistaFilme.innerHTML = "";
    listaEntrada = [];
  }
}

function voltar() {
  acao = "telaInicial";
  mostraTelaInicial();
}

function alerta(cor, msg) {
  elementoAlerta.textContent = msg;
  elementoAlerta.style.display = "block";
  elementoAlerta.style.color = cor;
  setTimeout(() => {
    elementoAlerta.style.display = "none";
  }, 3000);
}

function carregaListaEntrada() {
  listaEntrada = [
    {
      nomeCad: "Two and a Half Man",
      imagemCad:
        "https://i.pinimg.com/474x/c1/19/30/c11930cb77de79598c3d4b1788af9835.jpg",
      descricaoCad:
        "Charlie Harper (Charlie Sheen), é um compositor de jingles, que mora numa bela casa na praia de Malibu, em Los Angeles. É rico, por isso tem uma enorme facilidade de conquistar as mulheres. Possui um belo carro na garagem, e sempre se envolve em confusões devido ao seu consumo de bebidas alcoólicas, com mulheres, jogos, e apostas. Seu estilo de vida muda, quando seu irmão Alan Harper (Jon Cryer), que esta no meio de um divórcio com a esposa, passa a morar com ele, junto ao o seu filho Jake Harper (Angus T. Jones). Para complicar ainda mais a vida dos dois, eles tem uma mãe, Evelyn Harper (Holland Taylor), que não liga muito para eles, e esta sempre dando o desprezo para ambos. É bem claro notar a preferência de Evelyn por Alan. Charlie ainda tem que lidar com a sua vizinha estranha, Rose (Melanie Lynskey) que esta sempre o perseguindo, e vigiando. Rose teve um breve relacionamento com Charlie, e é bem visível de se notar sua paixão por ele, apesar dele sempre tentar se afastar dela, chamando-a de louca e perseguidora. Alan também tem de aturar sua ex-esposa Judith (Marin Hinkle) que esta sempre lhe dando o fora.Apesar de Charlie ser muito diferente de seu irmão, ele o recebe em sua casa, pelo fato de não ter pra onde ir, e estar com o seu sobrinho. Embora sejam diferente um do outro, eles tem uma coisa em comum: Os dois amam Jake, e querem o melhor para o menino"
    },
    {
      nomeCad: "Encanto",
      imagemCad:
        "https://br.web.img3.acsta.net/pictures/21/09/29/18/02/2861381.jpg",
      descricaoCad:
        "Encanto da Walt Disney Animation Studios conta a história dos Madrigal, uma família extraordinária que vive escondida nas montanhas da Colômbia, em uma casa mágica, em uma cidade vibrante, em um lugar maravilhoso conhecido como um Encanto. A magia deste Encanto abençoou todos os meninos e meninas da família com um dom único, desde superforça até o poder de curar. Todos, exceto Mirabel. Mas, quando ela descobre que a magia que cerca o Encanto está em perigo, Mirabel decide que ela, a única Madrigal sem poderes mágicos, pode ser a última esperança de sua família excepcional. Data de lançamento: 25 de novembro de 2021 (Brasil). Diretores: Byron Howard, Jared Bush. Música composta por: Germaine Franco. Bilheteria: 256,8 milhões USD"
    },
    {
      nomeCad: "Avatar",
      imagemCad:
        "https://cinema10.com.br/upload/filmes/filmes_1398_avatar-2-poster-filme.jpg",
      descricaoCad:
        "No exuberante mundo alienígena de Pandora vivem os Na'vi, seres que parecem ser primitivos, mas são altamente evoluídos. Como o ambiente do planeta é tóxico, foram criados os avatares, corpos biológicos controlados pela mente humana que se movimentam livremente em Pandora. Jake Sully, um ex-fuzileiro naval paralítico, volta a andar através de um avatar e se apaixona por uma Na'vi. Esta paixão leva Jake a lutar pela sobrevivência de Pandora. Data de lançamento: 18 de dezembro de 2009 (Brasil) Mais populares. Diretor: James Cameron. Bilheteria: 2,847 bilhões USD. Roteiro: James Cameron. Música composta por: James Horner. Orçamento: 237 milhões USD (2009)"
    },
    {
      nomeCad: "A Fera do Mar",
      imagemCad:
        "https://media.fstatic.com/RNNCiWmqEYLOaOdjSKJGYiIO33s=/268x386/smart/media/movies/covers/2022/06/cats_OSsW1mT.jpg",
      descricaoCad:
        "Uma menina entra escondida no navio de um grande caçador de monstros marinhos. Juntos, eles iniciam uma jornada épica por águas desconhecidas. Data de lançamento: 1 de julho de 2022 (EUA). Diretor: Chris Williams. Idioma: Inglês. Produtoras: Netflix, Netflix Animation, Skydance Animation. Produção: Chris Williams, Jed Schlanger. Roteiro: Chris Williams, Nell Benjamin"
    },
    {
      nomeCad: "Código DaVinci",
      imagemCad: "https://filmestipo.com/img_pt/movie/thumb/ff/6871.jpg",
      descricaoCad:
        "Um assassinato no museu do Louvre em Paris e pistas enigmáticas em alguns dos quadros mais famosos de Leonardo DaVinci levam à descoberta de um mistério religioso. Por mais de dois mil anos, uma sociedade secreta guarda informações que, se descobertas, poderiam comprometer o cristianismo. Robert Langdon, um professor especialista em simbologia e história, se envolve na investigação. Data de lançamento: 19 de maio de 2006 (EUA). Diretor: Ron Howard. Continuação: Anjos e Demônios. Música composta por: Hans Zimmer. Autor: Dan Brown. Bilheteria: 760 milhões USD"
    },
    {
      nomeCad: "Interestelar",
      imagemCad:
        "https://4.bp.blogspot.com/-SlbO8WOUcZg/VOD7DzPq4II/AAAAAAAAgHk/SZPFymfWnOo/s1600/Interestelar.jpg",
      descricaoCad:
        "As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand, Jenkins e Doyle, ele seguirá em busca de um novo lar. Data de lançamento: 6 de novembro de 2014 (Brasil). Diretor: Christopher Nolan. Bilheteria: 701,7 milhões USD. Cinematografia: Hoyte van Hoytema. Música composta por: Hans Zimmer, Ann Marie Calhoun. Indicações: Oscar de Melhores Efeitos Visuais, etc."
    },
    {
      nomeCad: "Forest Gump",
      imagemCad:
        "https://br.web.img3.acsta.net/medias/nmedia/18/87/30/21/19874092.jpg",
      descricaoCad:
        "Mesmo com o raciocínio lento, Forrest Gump nunca se sentiu desfavorecido. Graças ao apoio da mãe, ele teve uma vida normal. Seja no campo de futebol como um astro do esporte, lutando no Vietnã ou como capitão de um barco de pesca de camarão, Forrest inspira a todos com seu otimismo. Mas a pessoa que Forrest mais ama pode ser a mais difícil de salvar: seu amor de infância, a doce e perturbada Jenny. Data de lançamento: 7 de dezembro de 1994 (Brasil). Diretor: Robert Zemeckis. Bilheteria: 678,2 milhões USD. Música composta por: Alan Silvestri. Prêmios: Oscar de Melhor Ator, Oscar de Melhor Filme, MAIS"
    },
    {
      nomeCad: "Indiana Jones",
      imagemCad:
        "https://br.web.img3.acsta.net/medias/nmedia/18/91/97/58/20172484.jpg",
      descricaoCad:
        "Mesmo com o raciocínio lento, Forrest Gump nunca se sentiu desfavorecido. Graças ao apoio da mãe, ele teve uma vida normal. Seja no campo de futebol como um astro do esporte, lutando no Vietnã ou como capitão de um barco de pesca de camarão, Forrest inspira a todos com seu otimismo. Mas a pessoa que Forrest mais ama pode ser a mais difícil de salvar: seu amor de infância, a doce e perturbada Jenny. Data de lançamento: 7 de dezembro de 1994 (Brasil). Diretor: Robert Zemeckis. Bilheteria: 678,2 milhões USD. Música composta por: Alan Silvestri. Prêmios: Oscar de Melhor Ator, Oscar de Melhor Filme, MAIS"
    },
    {
      nomeCad: "Luca",
      imagemCad:
        "https://bebe.abril.com.br/wp-content/uploads/2021/03/153732540_266315131528958_6346469775848774820_n.jpg",
      descricaoCad:
        "Luca vive aventuras com seu novo melhor amigo, mas a diversão é ameaçada por um segredo: seu amigo é um monstro marinho de outro mundo que fica abaixo da superfície da água. Data de lançamento: 18 de junho de 2021 (EUA). Diretor: Enrico Casarosa. Bilheteria: 49,8 milhões USD. Música composta por: Dan Romer. Prêmios: People's Choice Award: Filme Favorito de Família. Roteiro: Enrico Casarosa, Mike Jones, Jesse Andrews, Simon Stephenson"
    }
  ];
}