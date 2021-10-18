const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const { writeFileSync } = require('fs');
const Tesseract = require('tesseract.js');

const {
    findCPF,
    findCNPJ,
    findCompany,
    findTotal,
    findItems,
} = require('./helpers.js');

const Module = {
    onRuntimeInitialized() {
      console.log(cv.getBuildInformation())
    }
}

init();

async function init() {
    installDOM();
    await loadOpenCV();

    let image = await loadImage('./cupom.jpg');
    let src = cv.imread(image);
    let dst = new cv.Mat();

    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);

    let canvas = createCanvas(300, 300);
    cv.imshow(canvas, dst);
    writeFileSync('output.jpg', canvas.toBuffer('image/jpeg'));

    src.delete();
    dst.delete();


    const scale_percent = 500
    const width = (canvas.width * scale_percent / 100)
    const height = (canvas.height * scale_percent / 100)


    image = await loadImage('./output.jpg');
    src = cv.imread(image);
    dst = new cv.Mat();

    const dsize = new cv.Size(width, height);

    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);

    canvas = createCanvas(300, 300);
    cv.imshow(canvas, dst);
    writeFileSync('output_resize.jpg', canvas.toBuffer('image/jpeg'));

    src.delete();
    dst.delete();

    loadTesseract();
};

  
function loadOpenCV() {
    return new Promise(resolve => {
      global.Module = {
        onRuntimeInitialized: resolve
      };
      global.cv = require('opencv.js');
    });
}


// Using jsdom and node-canvas we define some global variables to emulate HTML DOM.
// Although a complete emulation can be archived, here we only define those globals used
// by cv.imread() and cv.imshow().
function installDOM() {
    const dom = new JSDOM();
    global.document = dom.window.document;
    global.Image = Image;
    global.HTMLCanvasElement = Canvas;
    global.ImageData = ImageData;
    global.HTMLImageElement = Image;
}

function loadTesseract() {

    Tesseract.recognize(
    'output_resize.jpg',
    'por',
    { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        extractInformation(text);
    })

}


const extractInformation = (text) => {
    console.log('-----------------------------')
    
    const company = findCompany(text);
    console.log('Empresa:', company)

    const cnpj = findCNPJ(text);
    console.log('CNPJ:', cnpj)

    const cpf = findCPF(text);
    console.log('CPF:', cpf)

    const total = findTotal(text);
    console.log(total)
    
    const items = findItems(text);
    console.log('ITENS:', items)
}