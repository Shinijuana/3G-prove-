// android_animation.js

// Inizializzazione degli elementi
const model = document.getElementById('sens');
const animateButton = document.getElementById('animate-button'); // Correzione qui per ottenere il pulsante

let animationState = 'initial'; 
const pauseAtFrame1 = 120;
const pauseAtFrame2 = 237; 
const fps = 24;
const pauseTime1 = pauseAtFrame1 / fps; 
const pauseTime2 = pauseAtFrame2 / fps;
let isAnimating = false;
let isInAR = false;

// Funzione di gestione del click sul pulsante
const handleClick = () => {
  console.log(`Click bottone rilevato, stato corrente: ${animationState}`);

  if (animationState === 'initial') {
    console.log('Stato: initial. Avvio animazione fino al frame 120.');
    model.currentTime = 0; 
    model.play();
    isAnimating = true; 
    animationState = 'playingTo120';

    const checkFrame = () => {
      console.log(`Verifica frame (playingTo120): currentTime = ${model.currentTime.toFixed(2)}, pauseTime = ${pauseTime1.toFixed(2)}`);
      model.updateFraming();

      if (animationState === 'playingTo120' && model.currentTime >= pauseTime1) {
        model.pause();
        console.log('Animazione messa in pausa al frame 120.');
        animationState = 'pausedAt120'; 
        isAnimating = false; 
      } else if (animationState === 'playingTo120') {
        requestAnimationFrame(checkFrame); 
      }
    };
    
    requestAnimationFrame(checkFrame);
  } else if (animationState === 'pausedAt120') {
    console.log('Stato: pausedAt120. Riprendo animazione fino al frame 239.');
    model.currentTime = pauseTime1;
    model.play();
    isAnimating = true;

    const checkEnd = () => {
      console.log(`Verifica fine (playingToEnd): currentTime = ${model.currentTime.toFixed(2)}, pauseTime = ${pauseTime2.toFixed(2)}`);
      model.updateFraming();
      
      if (model.currentTime >= pauseTime2) {
        model.pause();
        console.log('Animazione finita e messa in pausa al frame 239.');
        animationState = 'pausedAt239'; 
        isAnimating = false; 
      } else {
        requestAnimationFrame(checkEnd); 
      }
    };

    requestAnimationFrame(checkEnd);
  } else if (animationState === 'pausedAt239') {
    console.log('Stato: pausedAt239. Riprendo animazione dall\'inizio.');
    model.currentTime = 0; 
    model.play();
    isAnimating = true;

    const checkStart = () => {
      console.log(`Verifica inizio (playingTo120): currentTime = ${model.currentTime.toFixed(2)}, pauseTime = ${pauseTime1.toFixed(2)}`);
      model.updateFraming();
      
      if (model.currentTime >= pauseTime1) {
        model.pause();
        console.log('Animazione messa in pausa al frame 120.');
        animationState = 'pausedAt120'; 
        isAnimating = false; 
      } else {
        requestAnimationFrame(checkStart); 
      }
    };

    requestAnimationFrame(checkStart);
  }
};

// Aggiungi il listener al pulsante per l'animazione
animateButton.addEventListener('click', () => {
  if (!isAnimating) {
    handleClick();
  }
});

// Funzione per abbassare il modello 3D di 2.41828 metri
model.addEventListener('ar-status', (event) => {
  if (event.detail.status === 'session-started') {
    console.log('Entrato in modalità AR.');
    isInAR = true;
    model.pause();
    isAnimating = false; 
    
    // Abbassa il modello di 2.41828 metri
    const heightOffset = -2.41828; // Offset negativo per abbassare il modello
    model.position.y += heightOffset; // Modifica la posizione Y
  } else if (event.detail.status === 'not-presenting') {
    console.log('Uscito dalla modalità AR.');
    isInAR = false;
  }
});

// Evento di fine animazione
model.addEventListener('finished', () => {
  model.pause(); 
  console.log('Animazione finita e messa in pausa (evento finished).');
  animationState = 'pausedAt120';
  isAnimating = false;
});
