const slidesUl = document.querySelector('.testimonials__carousel__slides')
const botaoProx = document.querySelector('#botao-prox')
const botaoAnt = document.querySelector('#botao-ant')
let currentIndex = 1;
const slideWidth = 350;
slidesUl.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
const bolinhas = document.querySelectorAll ('.testimonials__carousel__radio__item')
const faq = document.querySelectorAll ('.questions__question__item')



slidesUl.addEventListener('transitionend', () => { // evento de transição de slides
    
    if (currentIndex === 5) {
        slidesUl.style.transition = 'none';
        currentIndex= 1;
        slidesUl.style.transform = `translateX(-${slideWidth * currentIndex}px`;
        atualizarBolinhas();
    }
    
    if (currentIndex === 0) {
        slidesUl.style.transition = 'none';
        currentIndex = 4;
        slidesUl.style.transform = `translateX(-${slideWidth * currentIndex}px)`
        atualizarBolinhas();
    } 
    
    setTimeout(() => {
        slidesUl.style.transition = 'transform 0.4s ease';
    })
})

function automatico() { // função que passa os slides automaticamente
    if (currentIndex >= 5) return;
    currentIndex++;
    slidesUl.style.transition = 'transform 0.5s ease-in-out'
    slidesUl.style.transform = `translateX(-${slideWidth * currentIndex}px)`
    atualizarBolinhas();
}

botaoProx.addEventListener('click', () => { // evento ao clicar avança o slide
    
    if (currentIndex >= 5) return;
    currentIndex++;
    slidesUl.style.transition = 'transform 0.5s ease-in-out'
    slidesUl.style.transform = `translateX(-${slideWidth * currentIndex}px)`
    atualizarBolinhas();
})

botaoAnt.addEventListener('click', () => { // evento ao clicar retrocede o slide
    
    if (currentIndex <= 0) return;
    currentIndex--;
    slidesUl.style.transition = 'transform 0.5s ease-in-out'
    slidesUl.style.transform = `translateX(-${slideWidth * currentIndex}px)`
    atualizarBolinhas();
})


setInterval(automatico, 7000) // intervalo da passada de slides da função automatico


function atualizarBolinhas() { //atualizar bolinhas ao trocar de slides
    bolinhas.forEach((bolinha, index) => {
        
        if (index === currentIndex -1 ) {
            bolinha.classList.add('testimonials__carousel__radio__item--is-active');
        } else {
            bolinha.classList.remove ('testimonials__carousel__radio__item--is-active')
        }
    })
}

bolinhas.forEach((bolinha, index) => { // evento de clicar na bolinha ir pro slide
    bolinha.addEventListener('click', () => {
        currentIndex = index +1;
        
        slidesUl.style.transition = 'transform 0.5s ease-in-out';
        slidesUl.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        
        atualizarBolinhas();
    
    })
})
