'use strict';


function init() {
  resetLiveFilter();
  renderImgs();
  drawFilter();
}


function renderImgs() {
  var memes = [];
  var renderMems = document.querySelector('.container');

  (gLiveFilter) ? memes = gLiveFilter : memes = setMemFilter();

  var injectMemImgs = `<ul id="categories" class="clr anim-slide-from-left">`;
  memes.forEach(function (img) {
    injectMemImgs += `
                <li><div>
                  <img src="${img.url}" class="mem" onclick="onPicClick(this);onToggleVisibility();" alt="mem" />
                </div></li>`;
  });
  injectMemImgs += `</ul>`;
  setTimeout(function () {
    document.querySelector('#categories').classList.remove('anim-slide-from-left');
  }, 1);
  renderMems.innerHTML = injectMemImgs;
}


function openModal() {
  var aboutMe = document.querySelector('.modal');
  aboutMe.classList.toggle('open');
}

function onToggleMenu() {
  toggleMenu();
}


function onToggleVisibility() {
  toggleVisibility();
}


function onSendContact() {
  sendContact();
}

function onMoreActions() {
  moreActions();
}


function resetView() {
  document.querySelector('.arrow-down').classList.remove('hide');
  document.querySelector('.top-search-filter').classList.remove('hide')
  document.querySelector('.search-filter').classList.remove('hide');
  document.querySelector('.get-in-touch').classList.remove('hide');
  var borderHide = document.querySelectorAll('.border')
  borderHide.forEach(function (border) {
    border.classList.remove('hide')
  })
}

function resetLiveFilter(){
  gLiveFilter = null;
  document.querySelector('.top-search-filter').value = '';
}