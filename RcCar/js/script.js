function sendCommand(cmd) {
    fetch("/cmd?move=" + cmd);
}

const left = "l";
const right = "r";
const forward = "f";
const back = "b";
const stop_ = "s";
const togglelights = "x";


window.addEventListener('keydown', (event) => {
  if (event.repeat) return;
  
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(event.key)) {
    event.preventDefault();
  }

  
  if (event.key.toLowerCase() === 'a' || event.key === 'ArrowLeft'){
    document.getElementById("left").classList.add('active');
    sendCommand(left);
  }
  if (event.key.toLowerCase() === 's' || event.key === 'ArrowDown'){
    document.getElementById("back").classList.add('active');
    sendCommand(back);
  }
  if (event.key.toLowerCase() === 'd' || event.key === 'ArrowRight'){
    document.getElementById("right").classList.add('active');
    sendCommand(right);
  }
  if (event.key.toLowerCase() === 'w' || event.key === 'ArrowUp'){
    document.getElementById("forward").classList.add('active');
    sendCommand(forward);
  }
  if (event.key == ' '){
    document.getElementById("stop").classList.add('active');
    sendCommand(stop_);
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key.toLowerCase() === 'a' || event.key === 'ArrowLeft'){
    document.getElementById("left").classList.remove('active');
    sendCommand(stop_);
  }
  if (event.key.toLowerCase() === 's' || event.key === 'ArrowDown'){
    document.getElementById("back").classList.remove('active');
    sendCommand(stop_);
  }
  if (event.key.toLowerCase() === 'd' || event.key === 'ArrowRight'){
    document.getElementById("right").classList.remove('active');
    sendCommand(stop_);
  }
  if (event.key.toLowerCase() === 'w' || event.key === 'ArrowUp'){
    document.getElementById("forward").classList.remove('active');
    sendCommand(stop_);
  }
  if (event.key == ' '){
    document.getElementById("stop").classList.remove('active');
  }
  if (event.key.toLowerCase() == 'l'){
    light.classList.toggle('lights-on');
    sendCommand(togglelights);
  }
});



const buttons = document.querySelectorAll('.button');

buttons.forEach(btn => {
    const command = btn.dataset.cmd;

    btn.addEventListener('pointerdown', e => {
        e.preventDefault();
        btn.setPointerCapture(e.pointerId);

        btn.classList.add('active');

        if (btn.id === "lights") {
            btn.classList.toggle('lights-on');
            sendCommand('x');
            return;
        }

        if (command) {
            sendCommand(command);
        }
    });

    btn.addEventListener('pointerup', e => {
        e.preventDefault();
        btn.releasePointerCapture(e.pointerId);
        btn.classList.remove('active');

        if (btn.id !== "lights" && btn.id !== "stop") {
            sendCommand('s');
        }
    });

    btn.addEventListener('pointercancel', () => {
        btn.classList.remove('active');
        if (btn.id !== "lights" && btn.id !== "stop") {
            sendCommand('s');
        }
    });

    btn.addEventListener('contextmenu', e => e.preventDefault());
});

document.addEventListener('contextmenu', e => e.preventDefault());









