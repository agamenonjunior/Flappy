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