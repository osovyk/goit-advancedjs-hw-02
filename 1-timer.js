import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as y,i as l}from"./assets/vendor-njWUcVeN.js";const t={startBtn:document.querySelector("button[data-start]"),dayValue:document.querySelector("span[data-days]"),hourValue:document.querySelector("span[data-hours]"),minuteValue:document.querySelector("span[data-minutes]"),secondValue:document.querySelector("span[data-seconds]")};t.startBtn.disabled=!0;let n=null,c=null;function o(e){return String(e).padStart(2,"0")}const p={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){if(!e[0]){n=null,t.startBtn.disabled=!0;return}n=e[0],n<=new Date?(t.startBtn.disabled=!0,l.error({title:"Error",message:"Please choose a date in the future"})):t.startBtn.disabled=!1}};y("#datetime-picker",p);function V(e){const r=Math.floor(e/864e5),m=Math.floor(e%864e5/36e5),h=Math.floor(e%864e5%36e5/6e4),f=Math.floor(e%864e5%36e5%6e4/1e3);return{days:r,hours:m,minutes:h,seconds:f}}function i(){const a=n-new Date;if(a<=0){clearInterval(c),t.dayValue.textContent="00",t.hourValue.textContent="00",t.minuteValue.textContent="00",t.secondValue.textContent="00";return}const{days:s,hours:u,minutes:d,seconds:r}=V(a);t.dayValue.textContent=o(s),t.hourValue.textContent=o(u),t.minuteValue.textContent=o(d),t.secondValue.textContent=o(r)}t.startBtn.addEventListener("click",()=>{if(!n||n<=new Date){l.error({title:"Error",message:"Please choose a date in the future",position:"bottomCenter"});return}t.startBtn.disabled=!0,i(),c=setInterval(i,1e3)});
//# sourceMappingURL=1-timer.js.map
