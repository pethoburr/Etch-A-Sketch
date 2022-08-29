const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const blackBtn = document.getElementById('black');
const rainbowBtn = document.getElementById('rainbow');
const pencilBtn = document.getElementById('pencil');
const eraserBtn = document.getElementById('eraser');
const gridSize = document.querySelector('[data-div-size]');
colorPicker.oninput = (e) => changeColor(e.target.value); 
let color = 'black';
let click = true;

function createBoard(size) {
    let board = document.querySelector('.pad');
    let squares = board.querySelectorAll('div');
    squares.forEach((div) => div.remove());
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows  = `repeat(${size}, 1fr)`;
    gridSize.textContent = `Current Grid Size: ${size} x ${size}`;
    let amount = size * size;
    for (let i = 0; i < amount; i++) {
        let square = document.createElement('div');
        square.addEventListener('mouseover', colorSquare)
        square.style.backgroundColor = 'white';
        board.insertAdjacentElement('beforeend', square);
    }
}

createBoard(16);

function changeSize(input) {
    if (input >=2 && input <= 100) {
        document.querySelector('.error').style.display = 'none';
        createBoard(input);
    } else {
        document.querySelector('.error').style.display = 'flex';
    }
}

function colorSquare() {
    if (click) {
        if (color === 'random') {
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else if (color === 'input') {
            this.style.backgroundColor = document.getElementById('colorPicker').value;
        } else if (color === 'pencil') {
            let currentGrayScaleLevel = colorValues(this.style.backgroundColor)[0];
                    currentGrayScaleLevel-= currentGrayScaleLevel === 7 ? 7 : 64;
                    this.style.backgroundColor = `rgb(${currentGrayScaleLevel},${currentGrayScaleLevel},${currentGrayScaleLevel})`;
        }
        else {
            
            this.style.backgroundColor = color;
        }
    }
}

function changeColor(choice) {
    color = choice;
    switch (color) {
        case 'black':
            blackMode();
            break;
        case 'random':
            rainbowMode();
            break;
        case 'white':
            eraserMode();
            break;
        case 'input':
            inputMode();
            break;
        case 'pencil':
            pencilMode();
            break;
            default:
                defaultMode();
    }
}

function resetBoard() {
    let board = document.querySelector('.pad');
    let squares = board.querySelectorAll('div');
    squares.forEach((div) => (div.style.backgroundColor = 'white'));
}

document.querySelector('body').addEventListener('click', (e) => {
    if (e.target.tagName != 'BUTTON' && e.target.tagName != 'INPUT') {
        click = !click;
        if (click) {
            document.querySelector('.mode').textContent = 'Mode: coloring';
        } else {
            document.querySelector('.mode').textContent = 'Mode: not coloring';
        }
    }
});

function colorValues(color)
{
    if (color === '')
        return;
    if (color.toLowerCase() === 'transparent')
        return [0, 0, 0, 0];
    if (color[0] === '#')
    {
        if (color.length < 7)
        {
            // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
            color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
        }
        return [parseInt(color.substr(1, 2), 16),
            parseInt(color.substr(3, 2), 16),
            parseInt(color.substr(5, 2), 16),
            color.length > 7 ? parseInt(color.substr(7, 2), 16)/255 : 1];
    }
    if (color.indexOf('rgb') === -1)
    {
        // convert named colors
        var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
        var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
        temp_elem.style.color = flag;
        if (temp_elem.style.color !== flag)
            return; // color set failed - some monstrous css rule is probably taking over the color of our object
        temp_elem.style.color = color;
        if (temp_elem.style.color === flag || temp_elem.style.color === '')
            return; // color parse failed
        color = getComputedStyle(temp_elem).color;
        document.body.removeChild(temp_elem);
    }
    if (color.indexOf('rgb') === 0)
    {
        if (color.indexOf('rgba') === -1)
            color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
        return color.match(/[\.\d]+/g).map(function (a)
        {
            return +a
        });
    }
}

function blackMode () {
    blackBtn.classList.add('active');
    rainbowBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    pencilBtn.classList.remove('active');
    colorBtn.classList.remove('active');
}

function rainbowMode () {
    blackBtn.classList.remove('active');
    rainbowBtn.classList.add('active');
    eraserBtn.classList.remove('active');
    pencilBtn.classList.remove('active');
    colorBtn.classList.remove('active');
}

function eraserMode () {
    blackBtn.classList.remove('active');
    rainbowBtn.classList.remove('active');
    eraserBtn.classList.add('active');
    pencilBtn.classList.remove('active');
    colorBtn.classList.remove('active');
}

function pencilMode () {
    blackBtn.classList.remove('active');
    rainbowBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    pencilBtn.classList.add('active');
    colorBtn.classList.remove('active');
}

function inputMode() {
    blackBtn.classList.remove('active');
    rainbowBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    pencilBtn.classList.remove('active');
    colorBtn.classList.add('active');
}

function defaultMode () {
    blackBtn.classList.remove('active');
    rainbowBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    pencilBtn.classList.remove('active');
    colorBtn.classList.remove('active');
}

