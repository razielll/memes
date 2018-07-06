'use strict';

var gCanvas;
var gCtx;
var currPic;
var gDrawState = 'top';
var gCanShadow = false;
var gFont = 'impact';
var gUp = 0;
var gLeft = 0;
// allignment key map with position values defined at initCan
var gAlign = {}


function initCan(picSrc) {
    gMeme.txts[0].bottomLine = ''
    gMeme.txts[0].topLine = ''
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = window.innerWidth / 2;
    gCanvas.height = window.innerHeight / 2;
    gAlign = {
        left: 20 + gLeft,
        center: gCanvas.width / 2 + gLeft,
        right: gCanvas.width - 20 + gLeft
    }
    gCtx = gCanvas.getContext('2d');
    currPic = picSrc;
    drawImage();
}


function drawImage() {
    gCtx.font = gMeme.txts[0].size + 'px ' + gFont;
    gCtx.textAlign = gMeme.txts[0].align;
    gCtx.fillStyle = gMeme.txts[0].color;
    (gCanShadow) ? setShadow(): removeShadow();

    var img = new Image()
    img.src = currPic;
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        (gDrawState === 'bottom') ? gMeme.txts[0].bottomLine = document.querySelector('.input-mem').value:
            gMeme.txts[0].topLine = document.querySelector('.input-mem').value

        drawTopLine(gMeme.txts[0].topLine);
        drawBotLine(gMeme.txts[0].bottomLine);
    }
}


function drawTopLine(txt) {
    gCtx.fillText(txt, gAlign[gMeme.txts[0].align] + gLeft, 60 + gUp);
}


function drawBotLine(txt) {
    gCtx.fillText(txt, gAlign[gMeme.txts[0].align] + gLeft, gCanvas.height - 60 + gUp);
}


function FontSize(symb) {
    (symb === '+') ? gMeme.txts[0].size += 2: gMeme.txts[0].size -= 2
    drawImage();
}


function pickColor() {
    gMeme.txts[0].color = document.querySelector('.color-picker').value;
    drawImage()
}


function textPos(pos) {
    document.querySelector('.input-mem').value = ``;
    (pos === 'top') ? gDrawState = 'top': gDrawState = 'bottom';
    document.querySelector('.input-mem').placeholder = `${gDrawState} line`;
}


function setAlign(val) {
    gMeme.txts[0].align = val
    drawImage();
}


function fontSelect(fontFamily) {
    gFont = fontFamily;
    drawImage();
}


function moveText(direction) {
    switch (direction) {
        case 'up':
            gUp -= 1;
            break;
        case 'down':
            gUp += 1;
            break;
        case 'left':
            gLeft -= 1
            break;
        case 'right':
            gLeft += 1;
            break;
    }
    switch (direction.key) {
        case 'ArrowUp':
            gUp -= 1;
            break;
        case 'ArrowDown':
            gUp += 1;
            break;
        case 'ArrowLeft':
            gLeft -= 1
            break;
        case 'ArrowRight':
            gLeft += 1;
            break;
    }
    drawImage();
}


function toggleShadow() {
    gCanShadow = !gCanShadow;
    drawImage();
}


function setShadow() {
    gCtx.shadowOffsetX = 3;
    gCtx.shadowOffsetY = 3;
    gCtx.shadowBlur = 4;
    gCtx.shadowColor = "rgba(0,0,0,0.3)";
}


function removeShadow() {
    gCtx.shadowOffsetX = 0;
    gCtx.shadowOffsetY = 0;
    gCtx.shadowBlur = 0;
    gCtx.shadowColor = 0;
}


function downloadCanvas(elLink) {
    console.log(elLink);
    elLink.href = gCanvas.toDataURL('image/jpeg')
    elLink.download = 'mem.jpg'
}