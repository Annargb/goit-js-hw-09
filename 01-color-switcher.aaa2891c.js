!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body"),o=null;function a(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,setTimeout(a,0),o=setInterval(a,1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(o)}))}();
//# sourceMappingURL=01-color-switcher.aaa2891c.js.map