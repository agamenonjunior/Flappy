function NovoElemento(tagName, className){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Barreira(reversa = false){
    this.elemento = NovoElemento('div','barreira')
    const borda = NovoElemento('div','borda')
    const corpo = NovoElemento('div','corpo')

    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    //definindo o tamanho da barreira
    this.setAltura = altura => corpo.style.height = `${altura}px`
}
    //Criando o Par de Barreiras
function parDeBarreiras(altura, abertura, posicao_x){
    this.elemento = NovoElemento('div', 'barreiras')
    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)
    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)
    
    //Realizando o sorte da altura das barreiras
    this.sortearAbertura = ()=>{
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }
    //pegando a posicao X
    this.getPosicaoX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setPosicaoX = posicao_x => this.elemento.style.left = `${posicao_x}px`
    this.getLargura = () => this.elemento.clientWidth

    //Gerando Valores
    this.sortearAbertura()
    this.setPosicaoX(posicao_x)

}

//const b = new parDeBarreiras(700,200,800)
//document.querySelector('[ws-flappy]').appendChild(b.elemento)

function ContruirBarreiras(altura,largura, abertura, espaco, notificarPonto){
    this.pares = [
        //momento inicial
        new parDeBarreiras(altura,abertura,largura),
        new parDeBarreiras(altura,abertura,largura + espaco),
        new parDeBarreiras(altura,abertura,largura + espaco * 2),
        new parDeBarreiras(altura,abertura,largura + espaco * 3)

    ]
    const deslocamento = 3
    //animacao
    this.animar = () =>{
        this.pares.forEach( par =>{
            par.setPosicaoX(par.getPosicaoX() - deslocamento)

            //quando o elemento sair da tela principal
            if (par.getPosicaoX() < -par.getLargura()) {
                //mundando de posicao
                par.setPosicaoX(par.getPosicaoX() + espaco * this.pares.length)
                //sorteando as barreiras
                par.sortearAbertura()
            }

            const meio = largura/2
            const cruzarOMeio = par.getPosicaoX()+ deslocamento >=meio && par.getPosicaoX() < meio
            if (cruzarOMeio) {
                notificarPonto()
            }    

        })
    }
}

function Personagem(AlturaJogo) {
    let voando = false

    this.elemento = NovoElemento('img','personagem')
    this.elemento.src = 'img/freedinosprite/png/Idle (1).png'
    this.getPosicaoY = () =>parseInt(this.elemento.style.bottom.split('px')[0])
    this.setPosicaoY = Posicao_Y =>this.elemento.style.bottom = `${Posicao_Y}px`

    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false

    this.animar =()=>{
        const novoY = this.getPosicaoY() + (voando ? 8 : -5 )
        const alturaMaxima = AlturaJogo - this.elemento.clientHeight

        if (novoY <= 0) {
            this.setPosicaoY(0)
        } else if(novoY >= alturaMaxima){
            this.setPosicaoY(alturaMaxima)
        }else{
            this.setPosicaoY(novoY)
        }
    }

    this.setPosicaoY(AlturaJogo / 2)

}





/*
setInterval(() => {
    barreiras.animar()
    personagem.animar()
}, 20);
*/

function Progresso() {

    this.elemento = NovoElemento('span','progresso')
    this.atualizarPontos = pontos =>{
        // colocando os pontos
        this.elemento.innerHTML = pontos

    }
    this.atualizarPontos(0)
    
}

function Jogo() {
   let pontos = 0

   const AreadoJogo = document.querySelector('[ws-flappy]')
   const altura = AreadoJogo.clientHeight
   const largura = AreadoJogo.clientWidth
   const progresso = new Progresso()
   const barreiras = new ContruirBarreiras(altura,largura, 200, 600, ()=> progresso.atualizarPontos(++pontos))
   const personagem = new Personagem(altura)

   AreadoJogo.appendChild(progresso.elemento)
   AreadoJogo.appendChild(personagem.elemento)
   barreiras.pares.forEach(par => AreadoJogo.appendChild(par.elemento))
    
   //iniciando o jogo
   this.start = ()=>{
        //loop do jogo
        const temporizador = setInterval(() => {
           barreiras.animar() 
           personagem.animar() 
        }, 20);
   }
}

//PLAY do JOGO
new Jogo().start()


/**
const barreiras = new ContruirBarreiras(700,1200,200, 600)
const personagem = new Personagem(700)
const AreadoJogo = document.querySelector('[ws-flappy]')
AreadoJogo.appendChild(personagem.elemento)
AreadoJogo.appendChild(new Progresso().elemento)
barreiras.pares.forEach(par => AreadoJogo.appendChild(par.elemento))

setInterval(() => {
    barreiras.animar()
    personagem.animar()
}, 20);
 */