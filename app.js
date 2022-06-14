const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');
const clearBtn = document.getElementById('jsClear');
const randomColor = document.getElementsByClassName('jsColorRandom');
const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let isFilling = false;

const stopPainting = () => {
  painting = false;
};
const startPainting = () => {
  painting = true;
};
const handleColorClick = (event) => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};
const handleRangeChange = (event) => {
  const rangeValue = event.target.value;
  console.log(rangeValue);
  ctx.lineWidth = rangeValue;
};
const handleModeClick = () => {
  if (isFilling === true) {
    isFilling = false;
    mode.innerText = 'Fill';
  } else {
    isFilling = true;
    mode.innerText = 'paint';
  }
};
const handleCanvasClick = () => {
  if (isFilling) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
};
const handleSaveClick = () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS[Export]';
  link.click();
};
const handleClearClick = () => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.beginPath();
};

const handleCM = (event) => {
  event.preventDefault();
};

const handleRandomClick = () => {
  const index = Math.floor(Math.random() * colors.length);
  const color = Array.from(colors)[index].style.backgroundColor;
  console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

if (canvas) {
  canvas.addEventListener('mousemove', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  });
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', (event) => handleColorClick(event))
);
if (range) {
  range.addEventListener('input', (event) => handleRangeChange(event));
}
if (mode) {
  mode.addEventListener('click', handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}
if (clearBtn) {
  clearBtn.addEventListener('click', handleClearClick);
}
if (randomColor) {
  Array.from(randomColor).forEach((color) =>
    color.addEventListener('click', handleRandomClick)
  );
}
