let listaDeNumerosSorteados = [];
let tentativas = 0;
let chute = 0;
let limiteDeNumerosSorteados = 10;
let numeroSecreto = gerarNumeroAleatorio(limiteDeNumerosSorteados);

exibirMensagemInicial();
console.log (`O numero secreto é o ${numeroSecreto}`);
let selecaoDeNumeros = document.getElementById("caixaDeNumeros");
selecaoDeNumeros.max = limiteDeNumerosSorteados;

function exibirMensagemInicial() {
    exibirTextoNaTela("h1","Jogo do número secreto");
    exibirTextoNaTela("p",`Escolha um número entre 1 e ${limiteDeNumerosSorteados}`);
}

function chutar(tag) {
    chute = document.querySelector(tag).value;
    compararChute();
}

function exibirTextoNaTela(tag,texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function gerarNumeroAleatorio() {
    let numeroAleatorio = parseInt(Math.random() * limiteDeNumerosSorteados + 1);
    if (limiteDeNumerosSorteados == listaDeNumerosSorteados.length) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroAleatorio);
        console.log(listaDeNumerosSorteados)
        return numeroAleatorio;
    }
}

function compararChute() {
    tentativas++
    limparCampo("input");
    if (chute == numeroSecreto) {
        let exibirTextoTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        exibirTextoNaTela("h1","Parabéns!");
        exibirTextoNaTela("p",`Você acertou o número secreto com ${tentativas} ${exibirTextoTentativa}`);
        document.getElementById ("reiniciar").removeAttribute("disabled");
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela("h1","Errou!");
        exibirTextoNaTela("p","Escolha um número menor!");
    } else {
        exibirTextoNaTela("h1","Errou!");
        exibirTextoNaTela("p","Escolha um número maior!");
    }
}

function limparCampo(tag) {
    campo = document.querySelector(tag);
    campo.value = "";
}

function reiniciarJogo() {
    exibirMensagemInicial();
    tentativas = 0;
    numeroSecreto = gerarNumeroAleatorio(10);
    console.log (`O numero secreto é o ${numeroSecreto}`);
    document.getElementById("reiniciar").setAttribute("disabled", true);
}