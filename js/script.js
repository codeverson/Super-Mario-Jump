const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const jumpSound = new Audio('./audio/smw_jump.wav'); // criando objeto Audio para o som de pulo
const backgroundMusic = new Audio('./audio/music.wav')

let isGameRunning = true;

backgroundMusic.loop = true;
backgroundMusic.play();

const jump = () => {
    if (isGameRunning) {
        mario.classList.add('jump');
        jumpSound.play();
        setTimeout(() => {
          mario.classList.remove('jump');
        }, 500)
    }
}

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
  
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    const gameOverSound = new Audio('./audio/smw_lost_a_life.wav'); // criando objeto Audio para o som de game over
    gameOverSound.play(); // reproduzindo o som de game over
    backgroundMusic.pause();
    pipe.style.animation = 'none'; 
    pipe.style.left = `${pipePosition}px`;
    mario.style.animation = 'none';  
    mario.style.bottom = `${marioPosition}px`;
    mario.src = './images/game-over.png'
    mario.style.width = '75px'
    mario.style.marginLeft = "50px"
    clearInterval(loop);
    isGameRunning = false;
    document.querySelector('.container').style.display = 'block'; // mostra o botão de reiniciar
  }
}, 10);

document.querySelector('.restartbutton').addEventListener('click', () => {
  window.location.reload(); // recarrega a página para reiniciar o jogo
});

document.addEventListener('keydown', jump);