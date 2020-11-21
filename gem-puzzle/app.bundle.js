(()=>{"use strict";var t={};function e(t){return t<10?"0"+t:""+t}t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var s=t.g.document;if(!e&&s&&(s.currentScript&&(e=s.currentScript.src),!e)){var i=s.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})();class s{constructor(){this.intervals=[]}update(){this.intervals[this.intervals.length-1]+=1e3,this.updateElement()}start(){this.active=!0,this.intervals.push(0),this.interval=setInterval((()=>{this.update()}),1e3)}pause(){this.active&&(clearInterval(this.interval),this.active=!1)}reset(){this.pause(),this.intervals.length=0,this.updateElement()}getTime(){const t=e(this.getHours()),s=e(this.getMinutes()),i=e(this.getSeconds());return"00"===t?`${s}:${i}`:`${t}:${s}:${i}`}getMilliseconds(){return this.intervals.reduce(((t,e)=>t+e),0)%1e3}getSeconds(){const t=this.intervals.reduce(((t,e)=>t+e),0);return Math.floor(t%6e4/1e3)}getMinutes(){const t=this.intervals.reduce(((t,e)=>t+e),0);return Math.floor(t%36e5/6e4)}getHours(){const t=this.intervals.reduce(((t,e)=>t+e),0);return Math.floor(t/36e5)}createElement(t){return this.DOMElement=document.createElement(t),this.updateElement(),this.DOMElement}updateElement(){this.DOMElement&&(this.DOMElement.textContent=this.getTime())}}const i=t.p+"assets/audio/tile-move.mp3";document.documentElement.classList.add("page"),document.body.classList.add("page__inner");const n=(new class{constructor(){this.timer=new s,this.state={size:4,tiles:[],moves:0,isSolved:!1},this.stateProxy=new Proxy(this.state,{set:(t,e,s,i)=>("moves"===e&&(this.elements.moveCounter.textContent="Moves: "+s),"size"===e?(Reflect.set(t,e,s,i),this.startNewGame(),!0):Reflect.set(t,e,s,i))}),this.eventListeners={tileOnClick:t=>{const{tiles:e,size:s}=this.state,i=e.map((t=>t.element)).indexOf(t.target),n=t.target;if(!this.state.isSolved&&!this.isTransitioning)switch(this.timer.active||this.timer.start(),!0){case e[i-1]&&-1===e[i-1].id&&i%s!=0:[e[i],e[i-1]]=[e[i-1],e[i]],this.stateProxy.moves+=1,n.style.transform="translateX(-100%) translateX(-2px)";break;case e[i+1]&&-1===e[i+1].id&&i%s!=s-1:[e[i],e[i+1]]=[e[i+1],e[i]],this.stateProxy.moves+=1,n.style.transform="translateX(100%) translateX(2px)";break;case e[i-s]&&-1===e[i-s].id:[e[i],e[i-s]]=[e[i-s],e[i]],this.stateProxy.moves+=1,n.style.transform="translateY(-100%) translateY(-2px)";break;case e[i+s]&&-1===e[i+s].id:[e[i],e[i+s]]=[e[i+s],e[i]],this.stateProxy.moves+=1,n.style.transform="translateY(100%) translateY(2px)"}},tileOnTransitionStart:t=>{"transform"===t.propertyName&&(this.isTransitioning=!0,new Audio(i).play())},tileOnTransitionEnd:t=>{"transform"===t.propertyName&&(this.renderTiles(),this.checkState())}}}init(){return this.createElements(),this.generateTiles(),this.startNewGame(),this.elements.container}startNewGame(){this.state.isSolved=!1,this.stateProxy.moves=0,this.timer.reset(),this.shuffleTiles(),this.renderTiles(),this.elements.board.style.gridTemplateColumns=`repeat(${this.state.size}, 1fr)`}generateTiles(){const t=this.state.size**2,e=[],s={id:-1,element:document.createElement("div")};for(let s=0;s<t-1;s+=1){const t={};t.id=s+1,t.element=document.createElement("div"),t.element.classList.add("gem-puzzle__tile"),t.element.textContent=t.id,e.push(t),t.element.addEventListener("click",this.eventListeners.tileOnClick),t.element.addEventListener("transitionstart",this.eventListeners.tileOnTransitionStart),t.element.addEventListener("transitionend",this.eventListeners.tileOnTransitionEnd)}e.push(s),this.state.tiles=e}renderTiles(){const{tiles:t}=this.state;t.forEach((t=>{t.element.style.transform="",this.elements.board.append(t.element),this.isTransitioning=!1}))}checkState(){const t=this.state.tiles.map((t=>t.id));for(let e=0;e+2<t.length;e+=1)if(t[e+1]!==t[e]+1)return;this.timer.pause(),this.state.isSolved=!0,setTimeout((()=>{alert(`You solved the puzzle in ${this.timer.getTime()} and made ${this.state.moves} moves.\nSorry for the alert, work in progress.`)}),0)}shuffleTiles(){const t=this.state.size**2,{tiles:e}=this.state;for(let s=0;s<t;s+=1){const i=Math.floor(Math.random()*t);[e[s],e[i]]=[e[i],e[s]]}this.isSolvable()||this.shuffleTiles()}isSolvable(){const{tiles:t,size:e}=this.state,s=t.map((t=>t.id)),i=s.indexOf(-1),n=Math.ceil((i+1)/e);let r=0;for(let t=0;t<s.length;t+=1)if(-1!==s[t])for(let e=t;e<s.length;e+=1)s[t]>s[e]&&-1!==s[e]&&(r+=1);if(e%2==1&&r%2==0)return!0;if(e%2==0){if(n%2==1&&r%2==1)return!0;if(n%2==0&&r%2==0)return!0}return!1}createElements(){const t=document.createElement("div"),e=document.createElement("div"),s=document.createElement("div"),i=document.createElement("span"),n=document.createElement("span"),r=document.createElement("button");t.classList.add("gem-puzzle"),e.classList.add("gem-puzzle__status-bar"),s.classList.add("gem-puzzle__board"),s.style.gridTemplateColumns=`repeat(${this.state.size}, 1fr)`,i.textContent="Timer: ",i.append(this.timer.createElement("time")),n.textContent="Moves: 0",r.type="button",r.classList.add("gem-puzzle__button"),r.textContent="New game",r.addEventListener("click",(()=>{this.startNewGame()})),e.append(i,r,n),t.append(e,s),this.elements={container:t,statusBar:e,board:s,timer:i,moveCounter:n}}}).init();document.body.append(n)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW0tcHV6emxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dlbS1wdXp6bGUvLi9zcmMvZ2VtLXB1enpsZS91dGlscy5qcyIsIndlYnBhY2s6Ly9nZW0tcHV6emxlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9nZW0tcHV6emxlLy4vc3JjL2dlbS1wdXp6bGUvVGltZXIuanMiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS8uL3NyYy9nZW0tcHV6emxlL2Fzc2V0cy9hdWRpby90aWxlLW1vdmUubXAzIiwid2VicGFjazovL2dlbS1wdXp6bGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS8uL3NyYy9nZW0tcHV6emxlL2dlbS1wdXp6bGUuanMiXSwibmFtZXMiOlsiX193ZWJwYWNrX3JlcXVpcmVfXyIsImFwcGVuZFplcm8iLCJudW0iLCJnIiwiZ2xvYmFsVGhpcyIsInRoaXMiLCJGdW5jdGlvbiIsImUiLCJ3aW5kb3ciLCJzY3JpcHRVcmwiLCJpbXBvcnRTY3JpcHRzIiwibG9jYXRpb24iLCJkb2N1bWVudCIsImN1cnJlbnRTY3JpcHQiLCJzcmMiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsZW5ndGgiLCJFcnJvciIsInJlcGxhY2UiLCJwIiwiVGltZXIiLCJpbnRlcnZhbHMiLCJ1cGRhdGVFbGVtZW50IiwiYWN0aXZlIiwicHVzaCIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJ1cGRhdGUiLCJjbGVhckludGVydmFsIiwicGF1c2UiLCJob3VycyIsImdldEhvdXJzIiwibWludXRlcyIsImdldE1pbnV0ZXMiLCJzZWNvbmRzIiwiZ2V0U2Vjb25kcyIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJ0aW1lUGFzc2VkIiwiTWF0aCIsImZsb29yIiwidGFnIiwiRE9NRWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImdldFRpbWUiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJib2R5IiwiZ2VtUHV6emxlRWxlbWVudCIsInRpbWVyIiwic3RhdGUiLCJzaXplIiwidGlsZXMiLCJtb3ZlcyIsImlzU29sdmVkIiwic3RhdGVQcm94eSIsIlByb3h5Iiwic2V0IiwidGFyZ2V0IiwicHJvcCIsInZhbHVlIiwicmVjZWl2ZXIiLCJlbGVtZW50cyIsIm1vdmVDb3VudGVyIiwiUmVmbGVjdCIsInN0YXJ0TmV3R2FtZSIsImV2ZW50TGlzdGVuZXJzIiwidGlsZU9uQ2xpY2siLCJldmVudCIsImluZGV4IiwibWFwIiwidGlsZSIsImVsZW1lbnQiLCJpbmRleE9mIiwiaXNUcmFuc2l0aW9uaW5nIiwic3RhcnQiLCJpZCIsInN0eWxlIiwidHJhbnNmb3JtIiwidGlsZU9uVHJhbnNpdGlvblN0YXJ0IiwicHJvcGVydHlOYW1lIiwiQXVkaW8iLCJwbGF5IiwidGlsZU9uVHJhbnNpdGlvbkVuZCIsInJlbmRlclRpbGVzIiwiY2hlY2tTdGF0ZSIsImNyZWF0ZUVsZW1lbnRzIiwiZ2VuZXJhdGVUaWxlcyIsImNvbnRhaW5lciIsInJlc2V0Iiwic2h1ZmZsZVRpbGVzIiwiYm9hcmQiLCJncmlkVGVtcGxhdGVDb2x1bW5zIiwidGlsZUFtb3VudCIsImVtcHR5VGlsZSIsImkiLCJhZGRFdmVudExpc3RlbmVyIiwiZm9yRWFjaCIsImFwcGVuZCIsInRpbGVJZHMiLCJzZXRUaW1lb3V0IiwiYWxlcnQiLCJyYW5kb21UaWxlIiwicmFuZG9tIiwiaXNTb2x2YWJsZSIsImVtcHR5VGlsZUluZGV4IiwiZW1wdHlUaWxlUm93IiwiY2VpbCIsImludmVyc2lvbnMiLCJqIiwic3RhdHVzQmFyIiwibmV3R2FtZUJ0biIsInR5cGUiLCJpbml0Il0sIm1hcHBpbmdzIjoibUJBQ0EsSUFBSUEsRUFBc0IsR0NBMUIsU0FBU0MsRUFBV0MsR0FDbEIsT0FBT0EsRUFBTSxHQUFLLElBQUlBLEVB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QUd2REYsRUFBTVAsWUFBYyxVQUNwQk8sRUFBTWlELE9BQU9qRyxLQUFLZ0QsTUFBTVIsY0FBYyxTQUd0Q3NCLEVBQVlyQixZQUFjLFdBRzFCcUUsRUFBV0MsS0FBTyxTQUNsQkQsRUFBV2xFLFVBQVVDLElBQUksc0JBQ3pCaUUsRUFBV3JFLFlBQWMsV0FDekJxRSxFQUFXZixpQkFBaUIsU0FBUyxLQUNuQy9GLEtBQUtnRSxrQkFHUDZDLEVBQVVaLE9BQU9qRCxFQUFPOEQsRUFBWWhELEdBQ3BDeUIsRUFBVVUsT0FBT1ksRUFBV25CLEdBRTVCMUYsS0FBSzZELFNBQVcsQ0FDZDBCLFlBQ0FzQixZQUNBbkIsUUFDQTFDLFFBQ0FjLGtCRDNPNkJrRCxPQUNuQ3pHLFNBQVN1QyxLQUFLbUQsT0FBT2xELEkiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5mdW5jdGlvbiBhcHBlbmRaZXJvKG51bSkge1xuICByZXR1cm4gbnVtIDwgMTAgPyBgMCR7bnVtfWAgOiBgJHtudW19YDtcbn1cblxuZXhwb3J0IHtcbiAgYXBwZW5kWmVybyxcbn07XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHsgYXBwZW5kWmVybyB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW50ZXJ2YWxzID0gW107XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5pbnRlcnZhbHNbdGhpcy5pbnRlcnZhbHMubGVuZ3RoIC0gMV0gKz0gMTAwMDtcbiAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmludGVydmFscy5wdXNoKDApO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnBhdXNlKCk7XG4gICAgdGhpcy5pbnRlcnZhbHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcbiAgfVxuXG4gIGdldFRpbWUoKSB7XG4gICAgY29uc3QgaG91cnMgPSBhcHBlbmRaZXJvKHRoaXMuZ2V0SG91cnMoKSk7XG4gICAgY29uc3QgbWludXRlcyA9IGFwcGVuZFplcm8odGhpcy5nZXRNaW51dGVzKCkpO1xuICAgIGNvbnN0IHNlY29uZHMgPSBhcHBlbmRaZXJvKHRoaXMuZ2V0U2Vjb25kcygpKTtcblxuICAgIGlmIChob3VycyA9PT0gJzAwJykge1xuICAgICAgcmV0dXJuIGAke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtob3Vyc306JHttaW51dGVzfToke3NlY29uZHN9YDtcbiAgfVxuXG4gIGdldE1pbGxpc2Vjb25kcygpIHtcbiAgICBjb25zdCB0aW1lUGFzc2VkID0gdGhpcy5pbnRlcnZhbHMucmVkdWNlKChhY2MsIGN1cnIpID0+IChhY2MgKyBjdXJyKSwgMCk7XG4gICAgY29uc3QgbWlsbGlzZWNvbmRzID0gdGltZVBhc3NlZCAlIDEwMDA7XG4gICAgcmV0dXJuIG1pbGxpc2Vjb25kcztcbiAgfVxuXG4gIGdldFNlY29uZHMoKSB7XG4gICAgY29uc3QgdGltZVBhc3NlZCA9IHRoaXMuaW50ZXJ2YWxzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoYWNjICsgY3VyciksIDApO1xuICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKCh0aW1lUGFzc2VkICUgNjAwMDApIC8gMTAwMCk7XG4gICAgcmV0dXJuIHNlY29uZHM7XG4gIH1cblxuICBnZXRNaW51dGVzKCkge1xuICAgIGNvbnN0IHRpbWVQYXNzZWQgPSB0aGlzLmludGVydmFscy5yZWR1Y2UoKGFjYywgY3VycikgPT4gKGFjYyArIGN1cnIpLCAwKTtcbiAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigodGltZVBhc3NlZCAlICg2MCAqIDYwMDAwKSkgLyA2MDAwMCk7XG4gICAgcmV0dXJuIG1pbnV0ZXM7XG4gIH1cblxuICBnZXRIb3VycygpIHtcbiAgICBjb25zdCB0aW1lUGFzc2VkID0gdGhpcy5pbnRlcnZhbHMucmVkdWNlKChhY2MsIGN1cnIpID0+IChhY2MgKyBjdXJyKSwgMCk7XG4gICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHRpbWVQYXNzZWQgLyAoNjAgKiA2MDAwMCkpO1xuICAgIHJldHVybiBob3VycztcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQodGFnKSB7XG4gICAgdGhpcy5ET01FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIHRoaXMudXBkYXRlRWxlbWVudCgpO1xuICAgIHJldHVybiB0aGlzLkRPTUVsZW1lbnQ7XG4gIH1cblxuICB1cGRhdGVFbGVtZW50KCkge1xuICAgIGlmICh0aGlzLkRPTUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuRE9NRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuZ2V0VGltZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImFzc2V0cy9hdWRpby90aWxlLW1vdmUubXAzXCI7IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgR2VtUHV6emxlIGZyb20gJy4vZ2VtLXB1enpsZS9nZW0tcHV6emxlJztcblxuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BhZ2UnKTtcbmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGFnZV9faW5uZXInKTtcblxuY29uc3QgZ2VtUHV6emxlID0gbmV3IEdlbVB1enpsZSgpO1xuY29uc3QgZ2VtUHV6emxlRWxlbWVudCA9IGdlbVB1enpsZS5pbml0KCk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChnZW1QdXp6bGVFbGVtZW50KTtcbiIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IFRpbWVyIGZyb20gJy4vVGltZXInO1xuaW1wb3J0IHRpbGVNb3ZlU291bmQgZnJvbSAnLi9hc3NldHMvYXVkaW8vdGlsZS1tb3ZlLm1wMyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbVB1enpsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGltZXIgPSBuZXcgVGltZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2l6ZTogNCxcbiAgICAgIHRpbGVzOiBbXSxcbiAgICAgIG1vdmVzOiAwLFxuICAgICAgaXNTb2x2ZWQ6IGZhbHNlLFxuICAgIH07XG5cbiAgICB0aGlzLnN0YXRlUHJveHkgPSBuZXcgUHJveHkodGhpcy5zdGF0ZSwge1xuICAgICAgc2V0OiAodGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpID0+IHtcbiAgICAgICAgaWYgKHByb3AgPT09ICdtb3ZlcycpIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnRzLm1vdmVDb3VudGVyLnRleHRDb250ZW50ID0gYE1vdmVzOiAke3ZhbHVlfWA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcCA9PT0gJ3NpemUnKSB7XG4gICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgICAgICAgIHRoaXMuc3RhcnROZXdHYW1lKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmVmbGVjdC5zZXQodGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB7XG4gICAgICB0aWxlT25DbGljazogKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgdGlsZXMsIHNpemUgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGlsZXMubWFwKCh0aWxlKSA9PiB0aWxlLmVsZW1lbnQpLmluZGV4T2YoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgY29uc3QgdGlsZSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgZ2FwU2l6ZSA9IDI7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNTb2x2ZWQgfHwgdGhpcy5pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMudGltZXIuYWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy50aW1lci5zdGFydCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgY2FzZSB0aWxlc1tpbmRleCAtIDFdICYmIHRpbGVzW2luZGV4IC0gMV0uaWQgPT09IC0xICYmIGluZGV4ICUgc2l6ZSAhPT0gMDpcbiAgICAgICAgICAgIFt0aWxlc1tpbmRleF0sIHRpbGVzW2luZGV4IC0gMV1dID0gW3RpbGVzW2luZGV4IC0gMV0sIHRpbGVzW2luZGV4XV07XG4gICAgICAgICAgICB0aGlzLnN0YXRlUHJveHkubW92ZXMgKz0gMTtcbiAgICAgICAgICAgIHRpbGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLTEwMCUpIHRyYW5zbGF0ZVgoLSR7Z2FwU2l6ZX1weClgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSB0aWxlc1tpbmRleCArIDFdICYmIHRpbGVzW2luZGV4ICsgMV0uaWQgPT09IC0xICYmIGluZGV4ICUgc2l6ZSAhPT0gc2l6ZSAtIDE6XG4gICAgICAgICAgICBbdGlsZXNbaW5kZXhdLCB0aWxlc1tpbmRleCArIDFdXSA9IFt0aWxlc1tpbmRleCArIDFdLCB0aWxlc1tpbmRleF1dO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZVByb3h5Lm1vdmVzICs9IDE7XG4gICAgICAgICAgICB0aWxlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKDEwMCUpIHRyYW5zbGF0ZVgoJHtnYXBTaXplfXB4KWA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIHRpbGVzW2luZGV4IC0gc2l6ZV0gJiYgdGlsZXNbaW5kZXggLSBzaXplXS5pZCA9PT0gLTE6XG4gICAgICAgICAgICBbdGlsZXNbaW5kZXhdLCB0aWxlc1tpbmRleCAtIHNpemVdXSA9IFt0aWxlc1tpbmRleCAtIHNpemVdLCB0aWxlc1tpbmRleF1dO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZVByb3h5Lm1vdmVzICs9IDE7XG4gICAgICAgICAgICB0aWxlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0xMDAlKSB0cmFuc2xhdGVZKC0ke2dhcFNpemV9cHgpYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdGlsZXNbaW5kZXggKyBzaXplXSAmJiB0aWxlc1tpbmRleCArIHNpemVdLmlkID09PSAtMTpcbiAgICAgICAgICAgIFt0aWxlc1tpbmRleF0sIHRpbGVzW2luZGV4ICsgc2l6ZV1dID0gW3RpbGVzW2luZGV4ICsgc2l6ZV0sIHRpbGVzW2luZGV4XV07XG4gICAgICAgICAgICB0aGlzLnN0YXRlUHJveHkubW92ZXMgKz0gMTtcbiAgICAgICAgICAgIHRpbGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoMTAwJSkgdHJhbnNsYXRlWSgke2dhcFNpemV9cHgpYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgdGlsZU9uVHJhbnNpdGlvblN0YXJ0OiAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnByb3BlcnR5TmFtZSA9PT0gJ3RyYW5zZm9ybScpIHtcbiAgICAgICAgICB0aGlzLmlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG4gICAgICAgICAgbmV3IEF1ZGlvKHRpbGVNb3ZlU291bmQpLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgdGlsZU9uVHJhbnNpdGlvbkVuZDogKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5wcm9wZXJ0eU5hbWUgPT09ICd0cmFuc2Zvcm0nKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJUaWxlcygpO1xuICAgICAgICAgIHRoaXMuY2hlY2tTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVFbGVtZW50cygpO1xuICAgIHRoaXMuZ2VuZXJhdGVUaWxlcygpO1xuICAgIHRoaXMuc3RhcnROZXdHYW1lKCk7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMuY29udGFpbmVyO1xuICB9XG5cbiAgc3RhcnROZXdHYW1lKCkge1xuICAgIHRoaXMuc3RhdGUuaXNTb2x2ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXRlUHJveHkubW92ZXMgPSAwO1xuICAgIHRoaXMudGltZXIucmVzZXQoKTtcbiAgICB0aGlzLnNodWZmbGVUaWxlcygpO1xuICAgIHRoaXMucmVuZGVyVGlsZXMoKTtcbiAgICB0aGlzLmVsZW1lbnRzLmJvYXJkLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7dGhpcy5zdGF0ZS5zaXplfSwgMWZyKWA7XG4gIH1cblxuICBnZW5lcmF0ZVRpbGVzKCkge1xuICAgIGNvbnN0IHRpbGVBbW91bnQgPSB0aGlzLnN0YXRlLnNpemUgKiogMjtcbiAgICBjb25zdCB0aWxlcyA9IFtdO1xuICAgIGNvbnN0IGVtcHR5VGlsZSA9IHtcbiAgICAgIGlkOiAtMSxcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVBbW91bnQgLSAxOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHRpbGUgPSB7IH07XG4gICAgICB0aWxlLmlkID0gaSArIDE7XG4gICAgICB0aWxlLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRpbGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdnZW0tcHV6emxlX190aWxlJyk7XG4gICAgICB0aWxlLmVsZW1lbnQudGV4dENvbnRlbnQgPSB0aWxlLmlkO1xuICAgICAgdGlsZXMucHVzaCh0aWxlKTtcblxuICAgICAgdGlsZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ldmVudExpc3RlbmVycy50aWxlT25DbGljayk7XG4gICAgICB0aWxlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbnN0YXJ0JywgdGhpcy5ldmVudExpc3RlbmVycy50aWxlT25UcmFuc2l0aW9uU3RhcnQpO1xuICAgICAgdGlsZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLmV2ZW50TGlzdGVuZXJzLnRpbGVPblRyYW5zaXRpb25FbmQpO1xuICAgIH1cblxuICAgIHRpbGVzLnB1c2goZW1wdHlUaWxlKTtcbiAgICB0aGlzLnN0YXRlLnRpbGVzID0gdGlsZXM7XG4gIH1cblxuICByZW5kZXJUaWxlcygpIHtcbiAgICBjb25zdCB7IHRpbGVzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgdGlsZS5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICcnO1xuICAgICAgdGhpcy5lbGVtZW50cy5ib2FyZC5hcHBlbmQodGlsZS5lbGVtZW50KTtcbiAgICAgIHRoaXMuaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1N0YXRlKCkge1xuICAgIGNvbnN0IHRpbGVJZHMgPSB0aGlzLnN0YXRlLnRpbGVzLm1hcCgodGlsZSkgPT4gdGlsZS5pZCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSArIDIgPCB0aWxlSWRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGlsZUlkc1tpICsgMV0gIT09IHRpbGVJZHNbaV0gKyAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRpbWVyLnBhdXNlKCk7XG4gICAgdGhpcy5zdGF0ZS5pc1NvbHZlZCA9IHRydWU7XG5cbiAgICAvLyBzZXRUaW1lb3V0IHRvIGZpcmUgYWxlcnQgb25jZSB0aGUgZXZlbnQgbG9vcCBpcyBlbXB0eVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgYWxlcnQoYFlvdSBzb2x2ZWQgdGhlIHB1enpsZSBpbiAke3RoaXMudGltZXIuZ2V0VGltZSgpfSBhbmQgbWFkZSAke3RoaXMuc3RhdGUubW92ZXN9IG1vdmVzLlxcblNvcnJ5IGZvciB0aGUgYWxlcnQsIHdvcmsgaW4gcHJvZ3Jlc3MuYCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBzaHVmZmxlVGlsZXMoKSB7XG4gICAgY29uc3QgdGlsZUFtb3VudCA9IHRoaXMuc3RhdGUuc2l6ZSAqKiAyO1xuICAgIGNvbnN0IHsgdGlsZXMgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVBbW91bnQ7IGkgKz0gMSkge1xuICAgICAgY29uc3QgcmFuZG9tVGlsZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRpbGVBbW91bnQpO1xuICAgICAgW3RpbGVzW2ldLCB0aWxlc1tyYW5kb21UaWxlXV0gPSBbdGlsZXNbcmFuZG9tVGlsZV0sIHRpbGVzW2ldXTtcbiAgICB9XG5cbiAgICAvLyBTaHVmZmxlIHVudGlsIHNvbHZhYmxlIGNvbWJpbmF0aW9uIGlzIGZvdW5kXG4gICAgaWYgKCF0aGlzLmlzU29sdmFibGUoKSkgdGhpcy5zaHVmZmxlVGlsZXMoKTtcbiAgfVxuXG4gIGlzU29sdmFibGUoKSB7XG4gICAgY29uc3QgeyB0aWxlcywgc2l6ZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB0aWxlSWRzID0gdGlsZXMubWFwKCh0aWxlKSA9PiB0aWxlLmlkKTtcbiAgICBjb25zdCBlbXB0eVRpbGVJbmRleCA9IHRpbGVJZHMuaW5kZXhPZigtMSk7XG4gICAgY29uc3QgZW1wdHlUaWxlUm93ID0gTWF0aC5jZWlsKChlbXB0eVRpbGVJbmRleCArIDEpIC8gc2l6ZSk7XG4gICAgbGV0IGludmVyc2lvbnMgPSAwO1xuXG4gICAgLy8gQ291bnQgaW52ZXJzaW9uc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGlsZUlkcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRpbGVJZHNbaV0gIT09IC0xKSB7XG4gICAgICAgIGZvciAobGV0IGogPSBpOyBqIDwgdGlsZUlkcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGlmICh0aWxlSWRzW2ldID4gdGlsZUlkc1tqXSAmJiB0aWxlSWRzW2pdICE9PSAtMSkge1xuICAgICAgICAgICAgaW52ZXJzaW9ucyArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIE4gaXMgb2RkLCB0aGVuIHB1enpsZSBpbnN0YW5jZSBpcyBzb2x2YWJsZSBpZiBudW1iZXIgb2YgaW52ZXJzaW9ucyBpcyBldmVuLlxuICAgIGlmIChzaXplICUgMiA9PT0gMSAmJiBpbnZlcnNpb25zICUgMiA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNpemUgJSAyID09PSAwKSB7XG4gICAgICBpZiAoZW1wdHlUaWxlUm93ICUgMiA9PT0gMSAmJiBpbnZlcnNpb25zICUgMiA9PT0gMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChlbXB0eVRpbGVSb3cgJSAyID09PSAwICYmIGludmVyc2lvbnMgJSAyID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnRzKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHN0YXR1c0JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdGltZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgbW92ZUNvdW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgbmV3R2FtZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgLy8gTWFpbiBlbGVtZW50cyBzZXR1cFxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdnZW0tcHV6emxlJyk7XG4gICAgc3RhdHVzQmFyLmNsYXNzTGlzdC5hZGQoJ2dlbS1wdXp6bGVfX3N0YXR1cy1iYXInKTtcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdnZW0tcHV6emxlX19ib2FyZCcpO1xuICAgIGJvYXJkLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7dGhpcy5zdGF0ZS5zaXplfSwgMWZyKWA7XG5cbiAgICAvLyBUaW1lciBzZXR1cFxuICAgIHRpbWVyLnRleHRDb250ZW50ID0gJ1RpbWVyOiAnO1xuICAgIHRpbWVyLmFwcGVuZCh0aGlzLnRpbWVyLmNyZWF0ZUVsZW1lbnQoJ3RpbWUnKSk7XG5cbiAgICAvLyBNb3ZlIGNvdW50ZXIgc2V0dXBcbiAgICBtb3ZlQ291bnRlci50ZXh0Q29udGVudCA9ICdNb3ZlczogMCc7XG5cbiAgICAvLyBOZXcgZ2FtZSBidXR0b24gc2V0dXBcbiAgICBuZXdHYW1lQnRuLnR5cGUgPSAnYnV0dG9uJztcbiAgICBuZXdHYW1lQnRuLmNsYXNzTGlzdC5hZGQoJ2dlbS1wdXp6bGVfX2J1dHRvbicpO1xuICAgIG5ld0dhbWVCdG4udGV4dENvbnRlbnQgPSAnTmV3IGdhbWUnO1xuICAgIG5ld0dhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXJ0TmV3R2FtZSgpO1xuICAgIH0pO1xuXG4gICAgc3RhdHVzQmFyLmFwcGVuZCh0aW1lciwgbmV3R2FtZUJ0biwgbW92ZUNvdW50ZXIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmQoc3RhdHVzQmFyLCBib2FyZCk7XG5cbiAgICB0aGlzLmVsZW1lbnRzID0ge1xuICAgICAgY29udGFpbmVyLFxuICAgICAgc3RhdHVzQmFyLFxuICAgICAgYm9hcmQsXG4gICAgICB0aW1lcixcbiAgICAgIG1vdmVDb3VudGVyLFxuICAgIH07XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=