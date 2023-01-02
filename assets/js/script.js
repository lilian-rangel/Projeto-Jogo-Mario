const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const audio = document.querySelector(".audio");

const themeSfx = () => new Audio("assets/sfx/super_mario_world_overworld_theme.mp3");
const jumpSfx = () => new Audio("assets/sfx/super_mario_world_jump_sound_effect.mp3");
const deathSfx = () => new Audio("assets/sfx/super_mario_world_death.mp3");

const jump = () => {
    mario.classList.add("jump");
    mario.src = "./assets/img/jump.png";

    setTimeout(() => {
        mario.classList.remove("jump");
        mario.src = "./assets/img/mario.gif";
    }, 500);

    jumpSfx().play();
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
    const cloudsPosition = clouds.offsetLeft;

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = "none";
        mario.style.bottom = `${marioPosition}px`;

        mario.src = "./assets/img/game-over.png";
        mario.style.width = "70px";
        mario.style.marginLeft = "50px";

        clouds.style.animation = "none";
        clouds.style.left = `${cloudsPosition}px`;

        deathSfx().play();

        clearInterval(loop);

    }

}, 10);

document.addEventListener("keydown", jump);
playAudio();