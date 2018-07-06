'use strict';

var gFilter = 'All';
var gLiveFilter = null;

var gImgs = [
	{ id: 1, url: './meme-imgs/2.jpg', keywords: ['happy'] },
	{ id: 2, url: './meme-imgs/003.jpg', keywords: ['funny'] },
	{ id: 3, url: './meme-imgs/004.jpg', keywords: ['funny'] },
	{ id: 4, url: './meme-imgs/005.jpg', keywords: ['happy'] },
	{ id: 5, url: './meme-imgs/5.jpg', keywords: ['happy'] },
	{ id: 6, url: './meme-imgs/006.jpg', keywords: ['funny'] },
	{ id: 7, url: './meme-imgs/8.jpg', keywords: ['happy'] },
	{ id: 8, url: './meme-imgs/9.jpg', keywords: ['happy'] },
	{ id: 9, url: './meme-imgs/12.jpg', keywords: ['happy'] },
	{ id: 10, url: './meme-imgs/19.jpg', keywords: ['happy'] },
	{ id: 11, url: './meme-imgs/Ancient-Aliens.jpg', keywords: ['happy'] },
	{ id: 12, url: './meme-imgs/drevil.jpg', keywords: ['happy'] },
	{ id: 13, url: './meme-imgs/img2.jpg', keywords: ['happy'] },
	{ id: 14, url: './meme-imgs/img4.jpg', keywords: ['happy'] },
	{ id: 15, url: './meme-imgs/img5.jpg', keywords: ['happy'] },
	{ id: 16, url: './meme-imgs/img6.jpg', keywords: ['happy'] },
	{ id: 17, url: './meme-imgs/img11.jpg', keywords: ['happy'] },
	{ id: 18, url: './meme-imgs/img12.jpg', keywords: ['happy'] },
	{ id: 19, url: './meme-imgs/leo.jpg', keywords: ['happy'] },
	{ id: 20, url: './meme-imgs/meme1.jpg', keywords: ['happy'] },
	{ id: 21, url: './meme-imgs/One-Does-Not-Simply.jpg', keywords: ['happy'] },
	{ id: 22, url: './meme-imgs/Oprah-You-Get-A.jpg', keywords: ['happy'] },
	{ id: 23, url: './meme-imgs/patrick.jpg', keywords: ['happy'] },
	{ id: 24, url: './meme-imgs/putin.jpg', keywords: ['happy'] },
	{ id: 25, url: './meme-imgs/X-Everywhere.jpg', keywords: ['happy'] }
];

var gMeme = {
	selectedImgId: 5,
	txts: [
		{
			bottomLine: '',
			topLine: '',
			size: 20,
			align: 'left',
			color: 'red'
		}
	]
};

function onPicClick(elImg) {
	renderEditor();
	initCan(elImg.src);
}

function renderEditor() {
	var elEditor = document.querySelector('.container');
	var editorBody = `
    <div class="editor anim-slide-from-right" onkeydown="moveText(event)">
    <h2 class="text-center">Mem Maker</h2>
      <div class="flex space-even row-reverse">
        <div class="canv-func-area flex-col space-even">
          <input type="text" class="input-mem text-center" oninput="drawImage()" placeholder="${gDrawState} line"/> 
          <div class="render-functions text-center"></div>
        </div>
        <div class="flex-col align-center">
          <canvas id="canvas"></canvas>
          <a class="dl-link" onclick="downloadCanvas(this)">Download</a>
          <button onclick="init();toggleVisibility();">Back</button>
        </div>
      </div>
    </div>
    `;
	elEditor.innerHTML = editorBody;
	renderEditorOptions();
	setTimeout(function () {
		document.querySelector('.editor').classList.remove('anim-slide-from-right');
	}, 0);
}

function renderEditorOptions() {
	var renderEditorFuncs = document.querySelector('.render-functions');
	renderEditorFuncs.innerHTML = `
        <button onclick="FontSize('+')">+</button>
        <button onclick="FontSize('-')">-</button>
        <button onclick="textPos('top')">Top line</button>
        <button onclick="textPos('bot')">Bottom line</button>
        <br/>
        <input class="color-picker" type="color" value="#ff0000" onchange="pickColor();">
        <select onChange="fontSelect(this.value)">
            <option value="Impact">Impact</option>
            <option value="Arial">Arial</>
            <option value="Courier New">Courier new</option>
        </select>
        <br/>
        <button class="more-actions-btn" onclick="onMoreActions();">more</button>
        <div class="more-actions opac">
          <button onclick="setAlign('left')">&Lang;</button>
          <button onclick="setAlign('center')">&equiv;</button>
          <button onclick="setAlign('right')">&Rang;</button>
          <button onclick="toggleShadow()">&Sscr;</button>
        <br/>            
          <button onclick="moveText('up')">↑</button>
          <button onclick="moveText('down')">↓</button>
          <button onclick="moveText('right')">→</button>
          <button onclick="moveText('left')">←</button>
        </div>
    `;
}

function filterMap() {
	var filter = gImgs.reduce(function (acc, item) {
		acc[item.keywords.join()] ? acc[item.keywords.join()]++ : (acc[item.keywords.join()] = 1);
		return acc;
	}, {});
	return filter;
}

function drawFilter() {
	var elFilter = document.querySelector('.search-filter');
	var filterStr = '';
	var tags = filterMap();
	Object.keys(tags).forEach(function (val) {
		filterStr += `<a onclick="setMemFilter(this);resetLiveFilter();renderImgs();" style="font-size:${tags[
			val
		] * 4}px">${val}</a>`;
	});
	filterStr += `<a onclick="setMemFilter(this);resetLiveFilter();renderImgs();" style="font-size:16px">All</a>`;

	elFilter.innerHTML = filterStr;
}

function setMemFilter(tagEl) {
	var memes = [];
	if (tagEl) gFilter = tagEl.innerText;
	memes = gImgs.filter(function (meme) {
		if (gFilter === 'All') return (memes = gImgs);
		else return meme.keywords.join() === gFilter;
	});
	return memes;
}

function liveFilter(elFilterWord) {
	var liveMeme = [];
	liveMeme = gImgs.filter(function (item) {
		var filter = elFilterWord.toLowerCase();
		var keyword = item.keywords.join().toLowerCase();
		if (keyword.includes(filter)) {
			return item;
		}
	});
	return (gLiveFilter = liveMeme);
}

function resetLiveFilter() {
	gLiveFilter = null;
	document.querySelector('.top-search-filter').value = '';
}

function toggleVisibility() {
	document.querySelector('.arrow-down').classList.toggle('hide');
	document.querySelector('.search-filter').classList.toggle('hide');
	document.querySelector('.get-in-touch').classList.toggle('hide');
	document.querySelector('.top-search-filter').classList.toggle('hide');
	var borderHide = document.querySelectorAll('.border')
	borderHide.forEach(function (border) {
		border.classList.toggle('hide')
	})
}

function toggleMenu() {
	document.querySelector('.nav-bar').classList.toggle('open');
	var menuIcon = document.querySelector('.menu-btn');
	menuIcon.innerText === '☰' ? (menuIcon.innerHTML = '&times;') : (menuIcon.innerText = '☰');
}

function sendContact() {
	var to = 'asto1387@gmail.com';
	var senderName = document.querySelector('.sender-name').value;
	var senderSubj = document.querySelector('.sender-subject').value;
	var senderTxt = document.querySelector('.sender-text').value;
	var senderMail = document.querySelector('.sender-mail').value;
	var msg = `Sender: ${senderName} %0D%0Aemail: ${senderMail} %0D%0Awrote: ${senderTxt}`;
	console.log(msg);
	window.open(
		`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${senderSubj}&body=${msg}`,
		`_blank`
	);
}

function moreActions() {
	document.querySelector('.more-actions').classList.toggle('opac');
}
