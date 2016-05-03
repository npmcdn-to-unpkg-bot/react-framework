//http://javascript.info/tutorial/coordinates#element-coordinates-by-offsetparent
function getDocumentOffset(elem: HTMLElement): ClientRect {
  let getIEClientShift = () => { //The document (`html` or `body`) can be shifted from left-upper corner in IE. Get the shift.
    let body = document.body; let docElem = document.documentElement;
    return { clientTop: docElem.clientTop || body.clientTop || 0, clientLeft: docElem.clientLeft || body.clientLeft || 0 };
  }
  let box = elem.getBoundingClientRect(); 
  let scroll = getScroll(); let clientShift = getIEClientShift();
  let top = Math.round(box.top + scroll.scrollTop - clientShift.clientTop); let left = Math.round(box.left + scroll.scrollLeft - clientShift.clientLeft);
  return { top: top, left: left, width: box.width, height: box.height, bottom: top + box.height, right: left + box.width };
}

function getScroll(): { scrollTop: number; scrollLeft: number; } {
  //http://www.w3schools.com/jsref/prop_win_pagexoffset.asp
  //let body = document.body; let docElem = document.documentElement;
  //return {scrollTop : window.pageYOffset || docElem.scrollTop || body.scrollTop, scrollLeft : window.pageXOffset || docElem.scrollLeft || body.scrollLeft};
  return { scrollTop: window.pageYOffset, scrollLeft: window.pageXOffset };
}

//http://www.w3schools.com/jsref/prop_win_innerheight.asp
function getWindowSize(): { width: number; height: number; } {
  //return {width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight};
  return { width: window.innerWidth, height: window.innerHeight };
}

//http://www.jakpsatweb.cz/css/position.html: position absolute - pozice vzhledem k BODY
