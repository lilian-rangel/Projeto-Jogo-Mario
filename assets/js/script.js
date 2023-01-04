const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const actions = document.querySelector(".actions");
const actionsBtn = actions.querySelector(".actions_btn");

const themeSfx = new Audio("assets/sfx/super_mario_world_overworld_theme.mp3");
const jumpSfx = new Audio("assets/sfx/super_mario_world_jump_sound_effect.mp3");
const deathSfx = new Audio("assets/sfx/super_mario_world_death.mp3");

const pipePosition = () => pipe.offsetLeft;
const cloudsPosition = () => clouds.offsetLeft;
const marioPosition = () => +window.getComputedStyle(mario).bottom.replace("px", "");

const deathPosition = () => pipePosition() <= 120 && pipePosition() > 0 && marioPosition() < 80;

const jump = () => {

    !deathPosition() && mario.classList.add("jump");
    !deathPosition() && jumpSfx.play();

    mario.src = deathPosition() ? "./assets/img/game-over.png" : "./assets/img/jump.png";

    setTimeout(() => {
        mario.classList.remove("jump");
        mario.src = deathPosition() ? "./assets/img/game-over.png" : "./assets/img/mario.gif";
    }, 500);
}

const loop = setInterval(() => {

    if (deathPosition()) {

        let marioPos = marioPosition();
        let pipePos = pipePosition();
        let cloudsPos = cloudsPosition();

        pipe.classList.remove("play");
        clouds.classList.remove("play");

        pipe.style.left = `${pipePos}px`;

        mario.style.animation = "";
        mario.style.bottom = `${marioPos}px`;

        mario.src = "./assets/img/game-over.png";
        mario.style.width = "70px";
        mario.style.marginLeft = "50px";

        // mario.classList.add("dead");

        clouds.style.left = `${cloudsPos}px`;

        themeSfx.pause();
        deathSfx.play();

        clearInterval(loop);

    }

}, 10);

const startGame = () => {
    actions.style.display = "none";
    pipe.classList.add("play");
    clouds.classList.add("play");
    themeSfx.play();
    themeSfx.volume = 0.6;
    document.removeEventListener("keydown", startGame);
    document.addEventListener("keydown", jump);
}

actionsBtn.addEventListener("click", startGame);
document.addEventListener("keydown", startGame);
