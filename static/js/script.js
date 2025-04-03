const jogo = document.getElementById('jogo');

// variaveis
let cobra = [{ x: 10, y: 10 }]; // aonde a cobra nasce
let direcao = 'direita';
let startJogo = false;
let intervalo;
let velocidadeJogo = 150;

// desenha o jogo
function desenho() 
{
    jogo.innerHTML = '';
    desenhoCobra();
}

// desenha a cobra na tela
function desenhoCobra() 
{
    cobra.forEach((segment, index) => {
        const cobraElement = createGameElement('div', 'cobra');
        setPosition(cobraElement, segment);
        jogo.appendChild(cobraElement);
    });
}


//cria os elementos do jogo
function createGameElement(tag, className)
{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//define a posição no grid
function setPosition(element, position) 
{
    element.style.gridColumnStart = position.x;
    element.style.gridRowStart = position.y;
}

// movimento da cobra
function mover() 
{
    const cabeca = { ...cobra[0] };
    switch (direcao) 
    {
        case 'cima':
            cabeca.y--;
            break;
        case 'direita':
            cabeca.x++;
            break;
        case 'esquerda':
            cabeca.x--;
            break;
        case 'baixo':
            cabeca.y++;
            break;
    }
    cobra.unshift(cabeca); //adiciona nova cabeça
    cobra.pop(); // remove o ultimo bloco de corpo
    verificarColisao();//verifica a posição sempre que mover
}

//inicia o jogo
function start() 
{
    if (!startJogo) {
        startJogo = true;
        intervalo = setInterval(() => {
            mover();
            desenho();
        }, velocidadeJogo);
    }
}

// Controle do jogo no teclado teclado
function apertar(event) 
{
    if (!startJogo && (event.code === 'Space' || event.key === ' ')) {
        start();
    } else {
        //coloquei o W A S D pq sou acostumada
        switch (event.key) {
            case 'ArrowUp': case 'w':
                if (direcao !== 'baixo') direcao = 'cima';
                break;
            case 'ArrowDown': case 's':
                if (direcao !== 'cima') direcao = 'baixo';
                break;
            case 'ArrowLeft': case 'a':
                if (direcao !== 'direita') direcao = 'esquerda';
                break;
            case 'ArrowRight': case 'd':
                if (direcao !== 'esquerda') direcao = 'direita';
                break;
        }
    }
}


document.addEventListener('keydown', apertar);
// Event Listeners testes só pra ver se ta funcionnando
document.addEventListener('keydown', function(event) {
    console.log("Tecla pressionada:", event.key);
});

// verificar colisão
function verificarColisao() {
    const cabeca = cobra[0];

    // colisão com a parede (fora do grid 20x20)
    if (cabeca.x < 1 || cabeca.x > 20 || cabeca.y < 1 || cabeca.y > 20) {
        //Se for para a posição x < 1 no grid vai sair do grid ai precisa de um game over, oo contrario acontece com o x >20 que ai ele vai muito pra direita saindo do grid
        // a mesma coisa acontece pra cima e pra baixo com o Y
        console.log("Bateu na parede, burrão KKKKKK");
        gameOver();
    }
}

//game over
function gameOver() {
    clearInterval(intervalo);
    startJogo = false;
    console.log("Acabou tu perdeu aceite... :)");
}

