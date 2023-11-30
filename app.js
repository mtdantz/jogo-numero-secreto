// var nome = prompt('Qual seu nome?');
let listaDeNumeros = []
let numeroLimite = 10
let numAleatorio = numeroAleatorio()
let titulo = `Me ajude a encontrar o numero secreto`;
let paragrafo = "Escolha um numero entre 1 e 10";
let tentativas = 1;



function escreverNoElemento(tag, texto) {
    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function exibirMensagemInicial() {
    escreverNoElemento('h1', titulo);
    escreverNoElemento('p', paragrafo);

}
exibirMensagemInicial()

function verificarChute() {
    // Função responsável por verificar se o chute é igual ao numero aleatorio
    let chute = document.querySelector('input').value; // o .value é usado para captar apenas o valor da tag input, e armazenar na variavel chute
    if (chute == numAleatorio) {
        escreverNoElemento('h1', 'Muito Bom!!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let textoTentativa = `Você acertou o numero com ${tentativas} ${palavraTentativa}!`;
        escreverNoElemento('p', textoTentativa);
        mudarImagemRobo(estadoImagem.acertou)
        let novoJogo = document.getElementById('reiniciar').removeAttribute('disabled')
        let chutar = document.querySelector('button').setAttribute('disabled', true)



    } else {
        if (chute > numAleatorio) {
            escreverNoElemento('p', 'O numero é menor');

        } else {
            escreverNoElemento('p', 'O numero é maior');
        }
        tentativas++;
        limparCampo();
    }
}

const estadoImagem = {
    perguntando: "perguntando",
    acertou: "acertou",    
}

function mudarImagemRobo(estado) {
    const imagemRobo = document.querySelector('img')

    if (estado === estadoImagem.perguntando) {
        imagemRobo.src = './img/robozinhoQ.png'
    } 
    if (estado === estadoImagem.acertou) {
        imagemRobo.src = './img/robozinhoS.png'
    }
}

function numeroAleatorio() {

    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1)
    let quantidadeNumerosSorteados = listaDeNumeros.length;
    if (quantidadeNumerosSorteados == numeroLimite) {
        listaDeNumeros = []
    }
    if (listaDeNumeros.includes(numeroEscolhido)) {
        return numeroAleatorio();
    } else {
        listaDeNumeros.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input')
    chute.value = ''

}
function reiniciarJogo() {
    numAleatorio = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    chutar = document.querySelector('button').removeAttribute('disabled');
    novoJogo = document.getElementById('reiniciar').setAttribute('disabled', true)
    mudarImagemRobo(estadoImagem.perguntando)
}