'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const nav = document.querySelector('.nav')
const h1 = document.querySelector('h1')























// ============== Page Navigation ============== 

document.querySelector('.nav__links').addEventListener('click', (e) => {
  e.preventDefault()
  if(!e.target.classList.contains('btn--show-modal')){
    const targetLink = e.target.getAttribute("href")
    const scrollTo = document.querySelector(targetLink)
    scrollTo.scrollIntoView({ behavior: 'smooth'})
  }
})



















// ============== LEARN MORE BTN ============== 

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth'})
})


















// ============== MODAL ==============

// 📫 Open Modal 
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnsOpenModal.forEach(item => item.addEventListener('click', openModal))


// 📪 Close Modal Actions
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Close modal, button
btnCloseModal.addEventListener('click', closeModal);

// Close modal, overlay
overlay.addEventListener('click', closeModal);

// Close modal, ESC
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
























// ============== TABS ==============
document.querySelector('.operations__tab-container').addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab')
  if(!clicked) return

  document.querySelectorAll('.operations__tab').forEach(item => item.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')
  
  document.querySelectorAll('.operations__content').forEach(item => item.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})
















// ============== Header Hover ==============

const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(item => {
      if(item != link) {
        item.style.opacity = this
        logo.style.opacity = this
      }
    })
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))























// ============== Sticky Navigation ==============

const header = document.querySelector('.header')
const headerHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries){
  const [entry] = entries 
  entry.isIntersecting ? nav.classList.add('sticky') : nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`
})
headerObserver.observe(header)




























// ============== Reveal Sections ==============

const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer){
  const [entry] = entries

  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})

allSections.forEach(item => {
  sectionObserver.observe(item)
  item.classList.add('section--hidden')
})














// ============== Lazy Load ==============
const imgTargets = document.querySelectorAll('img[data-src]')

const loadImgs = function(entries, observer){
  const [entry] = entries

  if(!entry.isIntersecting) return

  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImgs, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
})

imgTargets.forEach(item => imgObserver.observe(item))






















// ============== Slider ==============

const slider = () => {
  const slides = document.querySelectorAll('.slide')
  const slider = document.querySelector('.slider')
  const btnLeft = slider.querySelector('.slider__btn--left')
  const btnRight = slider.querySelector('.slider__btn--right')
  let curSlide = 0
  const maxSlide = slides.length
  const dotContainer = document.querySelector('.dots')
  
  // functions
  const goToSlide = slide => {
    slides.forEach((item, i) => {
      item.style.transform = `translateX(${100*(i - slide)}%)`
    })
  }
  
  
  const nextSlide = () => {
    curSlide++  
    if(curSlide == maxSlide) curSlide = 0
    goToSlide(curSlide)
    activateDot(curSlide)
  }
  
  const prevSlide = () => {
    if(curSlide == 0) curSlide = maxSlide - 1
    else curSlide--
    
    goToSlide(curSlide)
    activateDot(curSlide)
  }
  
  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        `beforeend`, `
        <button class="dots__dot" data-slide="${i}"></button> 
      `)
    })
  }
  
  
  const activateDot = (slide) => {
    dotContainer.querySelectorAll('.dots__dot').forEach(item => item.classList.remove('dots__dot--active'))
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  }
  
  const init = () =>{
    goToSlide(0)
    createDots()
    activateDot(0)
  }
  
  init()
  
  
  // Event Handlers
  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)
  
  document.addEventListener('keydown', function(e){
    e.key == 'ArrowRight' && nextSlide()
    e.key == 'ArrowLeft' && prevSlide()
  })
  
  
  dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')){
      const {slide} = e.target.dataset
      goToSlide(slide)
    }
  })
}

slider()



document.addEventListener('DOMContentLoaded', function(){
  console.log('s')
})