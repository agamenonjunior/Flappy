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

const b = new parDeBarreiras(700,200,400)
document.querySelector('[ws-flappy]').appendChild(b.elemento)