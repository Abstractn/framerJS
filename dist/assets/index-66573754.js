var B=Object.defineProperty;var V=(s,e,t)=>e in s?B(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var c=(s,e,t)=>(V(s,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();class O{constructor(e){this.components={},this.componentsClassList={},this.nodeAttributeSelector=(e==null?void 0:e.nodeAttributeSelector)||O.DEFAULT_NODE_ATTRIBUTE_SELECTOR}registerComponent(e,t){this.componentsClassList[e]=t}initComponents(){try{document.querySelectorAll(`[${this.nodeAttributeSelector}]`).forEach(e=>{const t=e.getAttribute(this.nodeAttributeSelector);if(t===null)throw["[ABS] The following node's component data attribute value is null:",e];if(this.componentsClassList[t]===void 0)throw`[ABS] Component initializer error: component "${t}" is not registered`;this.components[t]===void 0&&(this.components[t]=[]);const r=this.componentsClassList[t],i=new r(e);i.init(),this.components[t].push(i)}),Object.keys(this.components).forEach(e=>{this.components[e].forEach(t=>{t.ready&&t.ready()})})}catch(e){Array.isArray(e)?console.error(...e):console.error(e)}}initComponent(e){try{const t=e.getAttribute(this.nodeAttributeSelector);if(t===null)throw["[ABS] The following node's component data attribute value is null:",e];if(this.componentsClassList[t]===void 0)throw`[ABS] Component initializer error: component "${t}" is not registered`;this.components[t]===void 0&&(this.components[t]=[]);const r=this.componentsClassList[t],i=new r(e);i.init(),this.components[t].push(i),i.ready&&i.ready()}catch(t){Array.isArray(t)?console.error(...t):console.error(t)}}getComponentByNode(e){let t=null;const r=e.getAttribute(this.nodeAttributeSelector);if(r&&this.components[r]){const i=this.components[r].find(o=>o.node===e);i&&(t=i)}return t}destroyComponent(e){Object.keys(this.components).forEach(t=>{if(this.components[t].find(i=>i===e)){e.node.querySelectorAll(`[${this.nodeAttributeSelector}]`).forEach(a=>{const d=this.getComponentByNode(a);d&&this.destroyComponent(d)}),e.destroy&&e.destroy(),e.node.remove();const o=this.components[t].indexOf(e);this.components[t].splice(o,1)}})}purgeComponentsList(){Object.keys(this.components).forEach(e=>{this.components[e].forEach(t=>{const r=t.node.getAttribute(this.nodeAttributeSelector);!!document.querySelector(`[${this.nodeAttributeSelector}="${r}"]`)||this.destroyComponent(t)})})}}O.DEFAULT_NODE_ATTRIBUTE_SELECTOR="data-abs-component";const w={gradient:{steps:[]}},R=[{colorCode:"000000",position:0},{colorCode:"FFFFFF",position:100}],C="gradientchange";class I{constructor(e){c(this,"STEPS_LIST_SELECTOR",".gradient-generator-step-list");c(this,"STEP_SELECTOR",".gradient-generator-step-list-item");c(this,"STEP_COLOR_PREVIEW_SELECTOR",".gradient-generator-step-color-preview");c(this,"STEP_COLOR_INPUT_SELECTOR",".gradient-generator-step-color-hex-input");c(this,"STEP_POSITION_INPUT_SELECTOR",".gradient-generator-step-position-input");c(this,"DELETE_STEP_BUTTON_SELECTOR",".gradient-generator-step-control-delete");c(this,"ADD_STEP_BUTTON_SELECTOR",".gradient-generator-control-add");c(this,"STEP_ITEM_TEMPLATE_SELECTOR",".template#step-item-template>*");c(this,"GRADIENT_IMPORT_VIEW_SELECTOR",".gradient-generator-view-import");c(this,"GRADIENT_IMPORT_VIEW_OPEN_BUTTON_SELECTOR",".gradient-generator-control-import");c(this,"GRADIENT_IMPORT_VIEW_CLOSE_BUTTON_SELECTOR",".gradient-generator-view-import-close");c(this,"GRADIENT_IMPORT_INPUT_SELECTOR",".gradient-generator-view-import-input");c(this,"GRADIENT_IMPORT_BUTTON_SELECTOR",".gradient-generator-view-import-action");c(this,"GRADIENT_EXPORT_VIEW_SELECTOR",".gradient-generator-view-export");c(this,"GRADIENT_EXPORT_VIEW_OPEN_BUTTON_SELECTOR",".gradient-generator-control-export");c(this,"GRADIENT_EXPORT_VIEW_CLOSE_BUTTON_SELECTOR",".gradient-generator-view-export-close");c(this,"GRADIENT_EXPORT_INPUT_SELECTOR",".gradient-generator-view-export-input");c(this,"HIDE_OVERLAY_VIEW_CLASS","not-visible");c(this,"GRADIENT_GENERATOR_DISABLED_CLASS","disabled");c(this,"GRADIENT_ANGLE_INPUT_SELECTOR",".gradient-generator-frame-angle-input");c(this,"FRAME_SIZE_INPUT_SELECTOR",".gradient-generator-frame-size-input");c(this,"STEP_MIN_VALUE",0);c(this,"STEP_MAX_VALUE",100);c(this,"LAST_GRADIENT_DATA_STORAGE_KEY","abs.framerJs.gradientGenerator.lastGeneratedData");c(this,"GRADIENT_CHANGE_EVENT_NAME",C);c(this,"isComponentInited",!1);c(this,"stepTemplateNode",null);c(this,"templateSteps",[]);c(this,"output",w);c(this,"onChange",new CustomEvent(this.GRADIENT_CHANGE_EVENT_NAME,{}));this.node=e}init(){}customInit(){if(!this.isComponentInited){this.isComponentInited=!this.isComponentInited,this.node.classList.remove(this.GRADIENT_GENERATOR_DISABLED_CLASS),this.stepTemplateNode=document.querySelector(this.STEP_ITEM_TEMPLATE_SELECTOR),this.updateStepsListFromTemplate();const e=JSON.parse(localStorage.getItem(this.LAST_GRADIENT_DATA_STORAGE_KEY));e!==null?this.reloadStoredData(e):this.generateDefaultGradient(),this.sortSteps(),this.templateSteps.forEach(t=>{this.assignEventsToStep(t)}),this.assignGlobalEvents()}}updateStepsListFromTemplate(){this.templateSteps=this.node.querySelectorAll(this.STEP_SELECTOR)}assignEventsToStep(e){const t=e.querySelector(this.STEP_COLOR_PREVIEW_SELECTOR),r=e.querySelector(this.STEP_COLOR_INPUT_SELECTOR),i=e.querySelector(this.STEP_POSITION_INPUT_SELECTOR),o=e.querySelector(this.DELETE_STEP_BUTTON_SELECTOR);r.addEventListener("input",()=>{this.updateColorPreview(r,t),this.updateOutput()}),r.addEventListener("paste",a=>{let d=(a.clipboardData||window.clipboardData).getData("text");d.indexOf("#")===0&&(d=d.split("#")[1]||d),r.value=d,this.updateColorPreview(r,t),this.updateOutput()}),i.addEventListener("change",()=>{this.sortSteps(),this.forceNumberInputLimit(i),this.updateOutput()}),o.addEventListener("click",()=>{this.deleteStep(e),this.updateOutput()})}updateColorPreview(e,t){const r=e.value||"000000";t.setAttribute("style",`background-color: #${r};`)}forceNumberInputLimit(e){const t=parseInt(e.getAttribute("min")),r=parseInt(e.getAttribute("max")),i=parseInt(e.value);e.value=i<t?`${t}`:i>r?`${r}`:`${i}`}addNewStep(e){var i,o;const t=(i=this.stepTemplateNode)==null?void 0:i.cloneNode(!0);if(this.node.querySelector(this.STEPS_LIST_SELECTOR).appendChild(t),this.assignEventsToStep(t),e){const a=t.querySelector(this.STEP_COLOR_INPUT_SELECTOR),d=t.querySelector(this.STEP_POSITION_INPUT_SELECTOR);a.value=e.colorCode,d.value=(o=e==null?void 0:e.position)==null?void 0:o.toString(),a.dispatchEvent(new Event("input")),d.dispatchEvent(new Event("change"))}return this.updateStepsListFromTemplate(),this.updateOutput(),t}deleteStep(e){e.remove(),this.updateStepsListFromTemplate(),this.updateOutput()}generateDefaultGradient(){R.forEach(e=>{this.addNewStep({colorCode:e.colorCode,position:e.position})})}sortSteps(){var o,a,d;const e=document.querySelector(this.STEPS_LIST_SELECTOR);let t,r=!0,i=!1;for(;r;){r=!1;const l=e==null?void 0:e.querySelectorAll(this.STEP_SELECTOR);for(t=0;t<l.length-1;t++){i=!1;const h=(o=l[t])==null?void 0:o.querySelector(this.STEP_POSITION_INPUT_SELECTOR),E=(a=l[t+1])==null?void 0:a.querySelector(this.STEP_POSITION_INPUT_SELECTOR),g=parseInt(h==null?void 0:h.value)+1||9999,m=parseInt(E==null?void 0:E.value)+1||9999;if(g>m){i=!0;break}}i&&((d=l[t].parentNode)==null||d.insertBefore(l[t+1],l[t]),r=!0)}}assignGlobalEvents(){const e=this.node.querySelector(this.ADD_STEP_BUTTON_SELECTOR);e.addEventListener("click",()=>this.addNewStep()),e.addEventListener("click",()=>this.updateOutput());const t=this.node.querySelector(this.GRADIENT_EXPORT_INPUT_SELECTOR);t.addEventListener("click",()=>{t.select();const l=t.value;try{navigator.clipboard.writeText(l)}catch{}});const r=this.node.querySelector(this.GRADIENT_IMPORT_BUTTON_SELECTOR),o=this.node.querySelector(this.GRADIENT_IMPORT_VIEW_SELECTOR).querySelector(this.GRADIENT_IMPORT_VIEW_CLOSE_BUTTON_SELECTOR);r==null||r.addEventListener("click",()=>{this.importGradient(),o.click()});const a=this.node.querySelector(this.FRAME_SIZE_INPUT_SELECTOR);a==null||a.addEventListener("input",()=>{this.output.size=parseInt(a.value),this.updateOutput()});const d=this.node.querySelector(this.GRADIENT_ANGLE_INPUT_SELECTOR);d==null||d.addEventListener("input",()=>{this.output.gradient&&(this.output.gradient.angle=parseInt(d.value),this.updateOutput())}),this.assignViewsVisibilityEvents()}assignViewsVisibilityEvents(){const e=this.node.querySelector(this.GRADIENT_IMPORT_VIEW_SELECTOR),t=this.node.querySelector(this.GRADIENT_IMPORT_VIEW_OPEN_BUTTON_SELECTOR),r=e.querySelector(this.GRADIENT_IMPORT_VIEW_CLOSE_BUTTON_SELECTOR),i=this.node.querySelector(this.GRADIENT_EXPORT_VIEW_SELECTOR),o=this.node.querySelector(this.GRADIENT_EXPORT_VIEW_OPEN_BUTTON_SELECTOR),a=i.querySelector(this.GRADIENT_EXPORT_VIEW_CLOSE_BUTTON_SELECTOR);t.addEventListener("click",()=>{e.classList.remove(this.HIDE_OVERLAY_VIEW_CLASS),i.classList.add(this.HIDE_OVERLAY_VIEW_CLASS)}),r.addEventListener("click",()=>{e.classList.add(this.HIDE_OVERLAY_VIEW_CLASS)}),o.addEventListener("click",()=>{i.classList.remove(this.HIDE_OVERLAY_VIEW_CLASS),e.classList.add(this.HIDE_OVERLAY_VIEW_CLASS)}),a.addEventListener("click",()=>{i.classList.add(this.HIDE_OVERLAY_VIEW_CLASS)})}reloadStoredData(e){var i,o,a,d,l,h,E;const t=this.node.querySelector(this.FRAME_SIZE_INPUT_SELECTOR),r=this.node.querySelector(this.GRADIENT_ANGLE_INPUT_SELECTOR);(e!=null&&e.size||(e==null?void 0:e.size)===0)&&(t.value=e.size.toString()),e!=null&&e.gradient&&(((i=e==null?void 0:e.gradient)!=null&&i.angle||((o=e==null?void 0:e.gradient)==null?void 0:o.angle)===0)&&(r.value=e.gradient.angle.toString()),(a=e==null?void 0:e.gradient)!=null&&a.steps&&((l=(d=e==null?void 0:e.gradient)==null?void 0:d.steps)==null?void 0:l.length)>0?(E=(h=e==null?void 0:e.gradient)==null?void 0:h.steps)==null||E.forEach(g=>{this.addNewStep(g)}):this.generateDefaultGradient())}updateOutput(){this.output=w,this.output.gradient.steps=[],this.templateSteps.forEach((r,i)=>{const o=r.querySelector(this.STEP_COLOR_INPUT_SELECTOR).value,a=parseInt(r.querySelector(this.STEP_POSITION_INPUT_SELECTOR).value);o&&a>=0&&a<=100&&this.output.gradient.steps.push({colorCode:o,position:a})});const e=this.node.querySelector(this.FRAME_SIZE_INPUT_SELECTOR),t=this.node.querySelector(this.GRADIENT_ANGLE_INPUT_SELECTOR);this.output.size=parseInt(e.value),this.output.gradient&&(this.output.gradient.angle=parseInt(t.value)),this.output.gradient.steps.sort((r,i)=>(r.position+1||9999)-(i.position+1||9999)),localStorage.setItem(this.LAST_GRADIENT_DATA_STORAGE_KEY,JSON.stringify(this.output)),this.updateExport(),this.triggerOutput()}updateExport(){const e=this.node.querySelector(this.GRADIENT_EXPORT_INPUT_SELECTOR);e.value=JSON.stringify(this.output)}importGradient(){var o,a,d;const e=this.node.querySelector(this.GRADIENT_IMPORT_INPUT_SELECTOR),t=JSON.parse(e.value);this.templateSteps.forEach(l=>this.deleteStep(l)),(a=(o=t.gradient)==null?void 0:o.steps)==null||a.forEach(l=>{const h=this.addNewStep(l);this.assignEventsToStep(h)});const r=this.node.querySelector(this.GRADIENT_ANGLE_INPUT_SELECTOR),i=this.node.querySelector(this.FRAME_SIZE_INPUT_SELECTOR);i.value=(t.size||10).toString(),r.value=(((d=t.gradient)==null?void 0:d.angle)||45).toString(),e.value="",this.sortSteps(),this.updateOutput()}triggerOutput(){this.onChange=new CustomEvent(C,{detail:{profilePictureData:this.output},bubbles:!0,cancelable:!0}),document.dispatchEvent(this.onChange)}}function f(s,e,t,r,i){return(r-t)/(e-s)*(i-s)+t}function G(s,e,t){const r=s>-1&&s<256,i=e>-1&&e<256,o=t>-1&&t<256;return r&&i&&o?(s<<16|e<<8|t).toString(16).toUpperCase():null}function b(s){return s*(Math.PI/180)}function k(s,e){var A;const t=document.querySelector("canvas"),r=t.getContext("2d"),i=t.width,o=i/2,a=f(0,100,0,i/2,s),d=o,l=o,h=o-(a-a/2);r.lineWidth=a;const g=(e.angle+90)*-1,m=Math.floor(f(-1,1,0,i,Math.sin(b(g)))),P=Math.floor(f(-1,1,0,i,Math.cos(b(g)))),M=Math.floor(f(-1,1,0,i,Math.sin(b(g+180)))),F=Math.floor(f(-1,1,0,i,Math.cos(b(g+180)))),N=r.createLinearGradient(m,P,M,F);(A=e.steps)==null||A.forEach(T=>N.addColorStop((T.position||0)/100,"#"+((T==null?void 0:T.colorCode)||"000000"))),r.strokeStyle=N,r.beginPath(),r.arc(d,l,h,0,2*Math.PI,!1),r.stroke()}class W{constructor(e){c(this,"FILE_INPUT_SELECTOR",".canvas-printer-image-input");c(this,"IMAGE_PREVIEW_SELECTOR",".canvas-printer-image-preview");c(this,"CANVAS_WRAPPER_SELECTOR",".canvas-printer-canvas-wrapper");c(this,"CANVAS_CLASS","canvas-printer-canvas");c(this,"CANVAS_SELECTOR","."+this.CANVAS_CLASS);c(this,"imageWidth",NaN);c(this,"imageHeight",NaN);c(this,"canvasSize",NaN);c(this,"_profilePictureFrameData",{});this.node=e}init(){}ready(){this.node.querySelector(this.FILE_INPUT_SELECTOR).addEventListener("change",t=>{this.getFile()})}getFile(){const e=this.node.querySelector(this.FILE_INPUT_SELECTOR),t=this.node.querySelector(this.IMAGE_PREVIEW_SELECTOR),r=e.files&&e.files[0];let i=new FileReader;i.onload=()=>{t.setAttribute("src",i.result)},t.onload=()=>{this.imageWidth=t.width,this.imageHeight=t.height,this.canvasSize=this.imageWidth<this.imageHeight?this.imageWidth:this.imageHeight,this.generateCanvas(),this.printToCanvas(this._profilePictureFrameData)},r&&i.readAsDataURL(r)}printToCanvas(e){const t=this.node.querySelector(this.IMAGE_PREVIEW_SELECTOR),r=this.node.querySelector(this.CANVAS_SELECTOR),i=this.canvasSize/2,o=r.getContext("2d"),a={angle:15,steps:R},d=(e==null?void 0:e.size)!==void 0?e==null?void 0:e.size:10,l=(e==null?void 0:e.gradient)||a;o.clearRect(0,0,this.canvasSize,this.canvasSize),o.strokeStyle="#000000",o.beginPath(),o.arc(i,i,i-1,0,Math.PI*2),o.closePath(),o.fill(),o.globalCompositeOperation="source-in";const h=this.canvasSize-this.imageWidth,E=this.canvasSize-this.imageHeight;o.drawImage(t,0,0,this.imageWidth,this.imageHeight,h/2,E/2,this.imageWidth,this.imageHeight),o.globalCompositeOperation="source-over",k(d,l),t.classList.add("hidden")}generateCanvas(){const e=this.node.querySelector(this.CANVAS_WRAPPER_SELECTOR);e.innerHTML="";const t=document.createElement("canvas");t.setAttribute("width",this.canvasSize.toString()),t.setAttribute("height",this.canvasSize.toString()),t.setAttribute("class",this.CANVAS_CLASS),e.appendChild(t),document.addEventListener(C,o=>{const a=o;this._profilePictureFrameData=a.detail.profilePictureData,this.printToCanvas(this._profilePictureFrameData)});const r=document.querySelector(`[${v.nodeAttributeSelector}="${I.name}"]`);v.getComponentByNode(r).customInit()}}class x{constructor(e){c(this,"CANVAS_NODE_SELECTOR",".canvas-printer-canvas");c(this,"CANVAS_NODE",document.querySelector(this.CANVAS_NODE_SELECTOR));c(this,"isColorPickerModeActive",!1);c(this,"pointedColor","");c(this,"selectedColor","");this.node=e}init(){}ready(){this.addColorPickerEvent(),this.addColorSelectorEvent()}addColorPickerEvent(){var e;(e=this.CANVAS_NODE)==null||e.addEventListener("mousemove",t=>{this.pointedColor=this.isColorPickerModeActive?this.getColorFromCursorPosition(t):""})}addColorSelectorEvent(){var e;(e=this.CANVAS_NODE)==null||e.addEventListener("click",t=>{this.selectedColor=this.pointedColor,console.log(this.selectedColor)})}startColorPickerEvent(){this.isColorPickerModeActive=!0}stopColorPickerEvent(){this.isColorPickerModeActive=!1}getColorFromCursorPosition(e){var g,m;const t=e.currentTarget,r=(g=this.CANVAS_NODE)==null?void 0:g.width,i=e.pageX-t.offsetLeft,o=e.pageY-t.offsetTop,a=f(0,300,0,r,i),d=f(0,300,0,r,o),h=((m=this.CANVAS_NODE)==null?void 0:m.getContext("2d")).getImageData(a,d,1,1).data;return G(h[0],h[1],h[2])||"000000"}}const q={"Amazon Silk":"amazon_silk","Android Browser":"android",Bada:"bada",BlackBerry:"blackberry",Chrome:"chrome",Chromium:"chromium",Electron:"electron",Epiphany:"epiphany",Firefox:"firefox",Focus:"focus",Generic:"generic","Google Search":"google_search",Googlebot:"googlebot","Internet Explorer":"ie","K-Meleon":"k_meleon",Maxthon:"maxthon","Microsoft Edge":"edge","MZ Browser":"mz","NAVER Whale Browser":"naver",Opera:"opera","Opera Coast":"opera_coast",PhantomJS:"phantomjs",Puffin:"puffin",QupZilla:"qupzilla",QQ:"qq",QQLite:"qqlite",Safari:"safari",Sailfish:"sailfish","Samsung Internet for Android":"samsung_internet",SeaMonkey:"seamonkey",Sleipnir:"sleipnir",Swing:"swing",Tizen:"tizen","UC Browser":"uc",Vivaldi:"vivaldi","WebOS Browser":"webos",WeChat:"wechat","Yandex Browser":"yandex",Roku:"roku"},y={amazon_silk:"Amazon Silk",android:"Android Browser",bada:"Bada",blackberry:"BlackBerry",chrome:"Chrome",chromium:"Chromium",electron:"Electron",epiphany:"Epiphany",firefox:"Firefox",focus:"Focus",generic:"Generic",googlebot:"Googlebot",google_search:"Google Search",ie:"Internet Explorer",k_meleon:"K-Meleon",maxthon:"Maxthon",edge:"Microsoft Edge",mz:"MZ Browser",naver:"NAVER Whale Browser",opera:"Opera",opera_coast:"Opera Coast",phantomjs:"PhantomJS",puffin:"Puffin",qupzilla:"QupZilla",qq:"QQ Browser",qqlite:"QQ Browser Lite",safari:"Safari",sailfish:"Sailfish",samsung_internet:"Samsung Internet for Android",seamonkey:"SeaMonkey",sleipnir:"Sleipnir",swing:"Swing",tizen:"Tizen",uc:"UC Browser",vivaldi:"Vivaldi",webos:"WebOS Browser",wechat:"WeChat",yandex:"Yandex Browser"},p={tablet:"tablet",mobile:"mobile",desktop:"desktop",tv:"tv"},S={WindowsPhone:"Windows Phone",Windows:"Windows",MacOS:"macOS",iOS:"iOS",Android:"Android",WebOS:"WebOS",BlackBerry:"BlackBerry",Bada:"Bada",Tizen:"Tizen",Linux:"Linux",ChromeOS:"Chrome OS",PlayStation4:"PlayStation 4",Roku:"Roku"},_={EdgeHTML:"EdgeHTML",Blink:"Blink",Trident:"Trident",Presto:"Presto",Gecko:"Gecko",WebKit:"WebKit"};class n{static getFirstMatch(e,t){const r=t.match(e);return r&&r.length>0&&r[1]||""}static getSecondMatch(e,t){const r=t.match(e);return r&&r.length>1&&r[2]||""}static matchAndReturnConst(e,t,r){if(e.test(t))return r}static getWindowsVersionName(e){switch(e){case"NT":return"NT";case"XP":return"XP";case"NT 5.0":return"2000";case"NT 5.1":return"XP";case"NT 5.2":return"2003";case"NT 6.0":return"Vista";case"NT 6.1":return"7";case"NT 6.2":return"8";case"NT 6.3":return"8.1";case"NT 10.0":return"10";default:return}}static getMacOSVersionName(e){const t=e.split(".").splice(0,2).map(r=>parseInt(r,10)||0);if(t.push(0),t[0]===10)switch(t[1]){case 5:return"Leopard";case 6:return"Snow Leopard";case 7:return"Lion";case 8:return"Mountain Lion";case 9:return"Mavericks";case 10:return"Yosemite";case 11:return"El Capitan";case 12:return"Sierra";case 13:return"High Sierra";case 14:return"Mojave";case 15:return"Catalina";default:return}}static getAndroidVersionName(e){const t=e.split(".").splice(0,2).map(r=>parseInt(r,10)||0);if(t.push(0),!(t[0]===1&&t[1]<5)){if(t[0]===1&&t[1]<6)return"Cupcake";if(t[0]===1&&t[1]>=6)return"Donut";if(t[0]===2&&t[1]<2)return"Eclair";if(t[0]===2&&t[1]===2)return"Froyo";if(t[0]===2&&t[1]>2)return"Gingerbread";if(t[0]===3)return"Honeycomb";if(t[0]===4&&t[1]<1)return"Ice Cream Sandwich";if(t[0]===4&&t[1]<4)return"Jelly Bean";if(t[0]===4&&t[1]>=4)return"KitKat";if(t[0]===5)return"Lollipop";if(t[0]===6)return"Marshmallow";if(t[0]===7)return"Nougat";if(t[0]===8)return"Oreo";if(t[0]===9)return"Pie"}}static getVersionPrecision(e){return e.split(".").length}static compareVersions(e,t,r=!1){const i=n.getVersionPrecision(e),o=n.getVersionPrecision(t);let a=Math.max(i,o),d=0;const l=n.map([e,t],h=>{const E=a-n.getVersionPrecision(h),g=h+new Array(E+1).join(".0");return n.map(g.split("."),m=>new Array(20-m.length).join("0")+m).reverse()});for(r&&(d=a-Math.min(i,o)),a-=1;a>=d;){if(l[0][a]>l[1][a])return 1;if(l[0][a]===l[1][a]){if(a===d)return 0;a-=1}else if(l[0][a]<l[1][a])return-1}}static map(e,t){const r=[];let i;if(Array.prototype.map)return Array.prototype.map.call(e,t);for(i=0;i<e.length;i+=1)r.push(t(e[i]));return r}static find(e,t){let r,i;if(Array.prototype.find)return Array.prototype.find.call(e,t);for(r=0,i=e.length;r<i;r+=1){const o=e[r];if(t(o,r))return o}}static assign(e,...t){const r=e;let i,o;if(Object.assign)return Object.assign(e,...t);for(i=0,o=t.length;i<o;i+=1){const a=t[i];typeof a=="object"&&a!==null&&Object.keys(a).forEach(l=>{r[l]=a[l]})}return e}static getBrowserAlias(e){return q[e]}static getBrowserTypeByAlias(e){return y[e]||""}}const u=/version\/(\d+(\.?_?\d+)+)/i,D=[{test:[/googlebot/i],describe(s){const e={name:"Googlebot"},t=n.getFirstMatch(/googlebot\/(\d+(\.\d+))/i,s)||n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/opera/i],describe(s){const e={name:"Opera"},t=n.getFirstMatch(u,s)||n.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/opr\/|opios/i],describe(s){const e={name:"Opera"},t=n.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i,s)||n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/SamsungBrowser/i],describe(s){const e={name:"Samsung Internet for Android"},t=n.getFirstMatch(u,s)||n.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/Whale/i],describe(s){const e={name:"NAVER Whale Browser"},t=n.getFirstMatch(u,s)||n.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/MZBrowser/i],describe(s){const e={name:"MZ Browser"},t=n.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i,s)||n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/focus/i],describe(s){const e={name:"Focus"},t=n.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i,s)||n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/swing/i],describe(s){const e={name:"Swing"},t=n.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i,s)||n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/coast/i],describe(s){const e={name:"Opera Coast"},t=n.getFirstMatch(u,s)||n.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/opt\/\d+(?:.?_?\d+)+/i],describe(s){const e={name:"Opera Touch"},t=n.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i,s)||n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/yabrowser/i],describe(s){const e={name:"Yandex Browser"},t=n.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i,s)||n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/ucbrowser/i],describe(s){const e={name:"UC Browser"},t=n.getFirstMatch(u,s)||n.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/Maxthon|mxios/i],describe(s){const e={name:"Maxthon"},t=n.getFirstMatch(u,s)||n.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/epiphany/i],describe(s){const e={name:"Epiphany"},t=n.getFirstMatch(u,s)||n.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/puffin/i],describe(s){const e={name:"Puffin"},t=n.getFirstMatch(u,s)||n.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/sleipnir/i],describe(s){const e={name:"Sleipnir"},t=n.getFirstMatch(u,s)||n.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/k-meleon/i],describe(s){const e={name:"K-Meleon"},t=n.getFirstMatch(u,s)||n.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/micromessenger/i],describe(s){const e={name:"WeChat"},t=n.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i,s)||n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/qqbrowser/i],describe(s){const e={name:/qqbrowserlite/i.test(s)?"QQ Browser Lite":"QQ Browser"},t=n.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i,s)||n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/msie|trident/i],describe(s){const e={name:"Internet Explorer"},t=n.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/\sedg\//i],describe(s){const e={name:"Microsoft Edge"},t=n.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/edg([ea]|ios)/i],describe(s){const e={name:"Microsoft Edge"},t=n.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/vivaldi/i],describe(s){const e={name:"Vivaldi"},t=n.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/seamonkey/i],describe(s){const e={name:"SeaMonkey"},t=n.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/sailfish/i],describe(s){const e={name:"Sailfish"},t=n.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i,s);return t&&(e.version=t),e}},{test:[/silk/i],describe(s){const e={name:"Amazon Silk"},t=n.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/phantom/i],describe(s){const e={name:"PhantomJS"},t=n.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/slimerjs/i],describe(s){const e={name:"SlimerJS"},t=n.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe(s){const e={name:"BlackBerry"},t=n.getFirstMatch(u,s)||n.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/(web|hpw)[o0]s/i],describe(s){const e={name:"WebOS Browser"},t=n.getFirstMatch(u,s)||n.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/bada/i],describe(s){const e={name:"Bada"},t=n.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/tizen/i],describe(s){const e={name:"Tizen"},t=n.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,s)||n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/qupzilla/i],describe(s){const e={name:"QupZilla"},t=n.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i,s)||n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/firefox|iceweasel|fxios/i],describe(s){const e={name:"Firefox"},t=n.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/electron/i],describe(s){const e={name:"Electron"},t=n.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/MiuiBrowser/i],describe(s){const e={name:"Miui"},t=n.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/chromium/i],describe(s){const e={name:"Chromium"},t=n.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i,s)||n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/chrome|crios|crmo/i],describe(s){const e={name:"Chrome"},t=n.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/GSA/i],describe(s){const e={name:"Google Search"},t=n.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test(s){const e=!s.test(/like android/i),t=s.test(/android/i);return e&&t},describe(s){const e={name:"Android Browser"},t=n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/playstation 4/i],describe(s){const e={name:"PlayStation 4"},t=n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/safari|applewebkit/i],describe(s){const e={name:"Safari"},t=n.getFirstMatch(u,s);return t&&(e.version=t),e}},{test:[/.*/i],describe(s){const e=/^(.*)\/(.*) /,t=/^(.*)\/(.*)[ \t]\((.*)/,i=s.search("\\(")!==-1?t:e;return{name:n.getFirstMatch(i,s),version:n.getSecondMatch(i,s)}}}],U=[{test:[/Roku\/DVP/],describe(s){const e=n.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i,s);return{name:S.Roku,version:e}}},{test:[/windows phone/i],describe(s){const e=n.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,s);return{name:S.WindowsPhone,version:e}}},{test:[/windows /i],describe(s){const e=n.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i,s),t=n.getWindowsVersionName(e);return{name:S.Windows,version:e,versionName:t}}},{test:[/Macintosh(.*?) FxiOS(.*?)\//],describe(s){const e={name:S.iOS},t=n.getSecondMatch(/(Version\/)(\d[\d.]+)/,s);return t&&(e.version=t),e}},{test:[/macintosh/i],describe(s){const e=n.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i,s).replace(/[_\s]/g,"."),t=n.getMacOSVersionName(e),r={name:S.MacOS,version:e};return t&&(r.versionName=t),r}},{test:[/(ipod|iphone|ipad)/i],describe(s){const e=n.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i,s).replace(/[_\s]/g,".");return{name:S.iOS,version:e}}},{test(s){const e=!s.test(/like android/i),t=s.test(/android/i);return e&&t},describe(s){const e=n.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i,s),t=n.getAndroidVersionName(e),r={name:S.Android,version:e};return t&&(r.versionName=t),r}},{test:[/(web|hpw)[o0]s/i],describe(s){const e=n.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,s),t={name:S.WebOS};return e&&e.length&&(t.version=e),t}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe(s){const e=n.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i,s)||n.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i,s)||n.getFirstMatch(/\bbb(\d+)/i,s);return{name:S.BlackBerry,version:e}}},{test:[/bada/i],describe(s){const e=n.getFirstMatch(/bada\/(\d+(\.\d+)*)/i,s);return{name:S.Bada,version:e}}},{test:[/tizen/i],describe(s){const e=n.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i,s);return{name:S.Tizen,version:e}}},{test:[/linux/i],describe(){return{name:S.Linux}}},{test:[/CrOS/],describe(){return{name:S.ChromeOS}}},{test:[/PlayStation 4/],describe(s){const e=n.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i,s);return{name:S.PlayStation4,version:e}}}],z=[{test:[/googlebot/i],describe(){return{type:"bot",vendor:"Google"}}},{test:[/huawei/i],describe(s){const e=n.getFirstMatch(/(can-l01)/i,s)&&"Nova",t={type:p.mobile,vendor:"Huawei"};return e&&(t.model=e),t}},{test:[/nexus\s*(?:7|8|9|10).*/i],describe(){return{type:p.tablet,vendor:"Nexus"}}},{test:[/ipad/i],describe(){return{type:p.tablet,vendor:"Apple",model:"iPad"}}},{test:[/Macintosh(.*?) FxiOS(.*?)\//],describe(){return{type:p.tablet,vendor:"Apple",model:"iPad"}}},{test:[/kftt build/i],describe(){return{type:p.tablet,vendor:"Amazon",model:"Kindle Fire HD 7"}}},{test:[/silk/i],describe(){return{type:p.tablet,vendor:"Amazon"}}},{test:[/tablet(?! pc)/i],describe(){return{type:p.tablet}}},{test(s){const e=s.test(/ipod|iphone/i),t=s.test(/like (ipod|iphone)/i);return e&&!t},describe(s){const e=n.getFirstMatch(/(ipod|iphone)/i,s);return{type:p.mobile,vendor:"Apple",model:e}}},{test:[/nexus\s*[0-6].*/i,/galaxy nexus/i],describe(){return{type:p.mobile,vendor:"Nexus"}}},{test:[/[^-]mobi/i],describe(){return{type:p.mobile}}},{test(s){return s.getBrowserName(!0)==="blackberry"},describe(){return{type:p.mobile,vendor:"BlackBerry"}}},{test(s){return s.getBrowserName(!0)==="bada"},describe(){return{type:p.mobile}}},{test(s){return s.getBrowserName()==="windows phone"},describe(){return{type:p.mobile,vendor:"Microsoft"}}},{test(s){const e=Number(String(s.getOSVersion()).split(".")[0]);return s.getOSName(!0)==="android"&&e>=3},describe(){return{type:p.tablet}}},{test(s){return s.getOSName(!0)==="android"},describe(){return{type:p.mobile}}},{test(s){return s.getOSName(!0)==="macos"},describe(){return{type:p.desktop,vendor:"Apple"}}},{test(s){return s.getOSName(!0)==="windows"},describe(){return{type:p.desktop}}},{test(s){return s.getOSName(!0)==="linux"},describe(){return{type:p.desktop}}},{test(s){return s.getOSName(!0)==="playstation 4"},describe(){return{type:p.tv}}},{test(s){return s.getOSName(!0)==="roku"},describe(){return{type:p.tv}}}],H=[{test(s){return s.getBrowserName(!0)==="microsoft edge"},describe(s){if(/\sedg\//i.test(s))return{name:_.Blink};const t=n.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i,s);return{name:_.EdgeHTML,version:t}}},{test:[/trident/i],describe(s){const e={name:_.Trident},t=n.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test(s){return s.test(/presto/i)},describe(s){const e={name:_.Presto},t=n.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test(s){const e=s.test(/gecko/i),t=s.test(/like gecko/i);return e&&!t},describe(s){const e={name:_.Gecko},t=n.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}},{test:[/(apple)?webkit\/537\.36/i],describe(){return{name:_.Blink}}},{test:[/(apple)?webkit/i],describe(s){const e={name:_.WebKit},t=n.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i,s);return t&&(e.version=t),e}}];class L{constructor(e,t=!1){if(e==null||e==="")throw new Error("UserAgent parameter can't be empty");this._ua=e,this.parsedResult={},t!==!0&&this.parse()}getUA(){return this._ua}test(e){return e.test(this._ua)}parseBrowser(){this.parsedResult.browser={};const e=n.find(D,t=>{if(typeof t.test=="function")return t.test(this);if(t.test instanceof Array)return t.test.some(r=>this.test(r));throw new Error("Browser's test function is not valid")});return e&&(this.parsedResult.browser=e.describe(this.getUA())),this.parsedResult.browser}getBrowser(){return this.parsedResult.browser?this.parsedResult.browser:this.parseBrowser()}getBrowserName(e){return e?String(this.getBrowser().name).toLowerCase()||"":this.getBrowser().name||""}getBrowserVersion(){return this.getBrowser().version}getOS(){return this.parsedResult.os?this.parsedResult.os:this.parseOS()}parseOS(){this.parsedResult.os={};const e=n.find(U,t=>{if(typeof t.test=="function")return t.test(this);if(t.test instanceof Array)return t.test.some(r=>this.test(r));throw new Error("Browser's test function is not valid")});return e&&(this.parsedResult.os=e.describe(this.getUA())),this.parsedResult.os}getOSName(e){const{name:t}=this.getOS();return e?String(t).toLowerCase()||"":t||""}getOSVersion(){return this.getOS().version}getPlatform(){return this.parsedResult.platform?this.parsedResult.platform:this.parsePlatform()}getPlatformType(e=!1){const{type:t}=this.getPlatform();return e?String(t).toLowerCase()||"":t||""}parsePlatform(){this.parsedResult.platform={};const e=n.find(z,t=>{if(typeof t.test=="function")return t.test(this);if(t.test instanceof Array)return t.test.some(r=>this.test(r));throw new Error("Browser's test function is not valid")});return e&&(this.parsedResult.platform=e.describe(this.getUA())),this.parsedResult.platform}getEngine(){return this.parsedResult.engine?this.parsedResult.engine:this.parseEngine()}getEngineName(e){return e?String(this.getEngine().name).toLowerCase()||"":this.getEngine().name||""}parseEngine(){this.parsedResult.engine={};const e=n.find(H,t=>{if(typeof t.test=="function")return t.test(this);if(t.test instanceof Array)return t.test.some(r=>this.test(r));throw new Error("Browser's test function is not valid")});return e&&(this.parsedResult.engine=e.describe(this.getUA())),this.parsedResult.engine}parse(){return this.parseBrowser(),this.parseOS(),this.parsePlatform(),this.parseEngine(),this}getResult(){return n.assign({},this.parsedResult)}satisfies(e){const t={};let r=0;const i={};let o=0;if(Object.keys(e).forEach(d=>{const l=e[d];typeof l=="string"?(i[d]=l,o+=1):typeof l=="object"&&(t[d]=l,r+=1)}),r>0){const d=Object.keys(t),l=n.find(d,E=>this.isOS(E));if(l){const E=this.satisfies(t[l]);if(E!==void 0)return E}const h=n.find(d,E=>this.isPlatform(E));if(h){const E=this.satisfies(t[h]);if(E!==void 0)return E}}if(o>0){const d=Object.keys(i),l=n.find(d,h=>this.isBrowser(h,!0));if(l!==void 0)return this.compareVersion(i[l])}}isBrowser(e,t=!1){const r=this.getBrowserName().toLowerCase();let i=e.toLowerCase();const o=n.getBrowserTypeByAlias(i);return t&&o&&(i=o.toLowerCase()),i===r}compareVersion(e){let t=[0],r=e,i=!1;const o=this.getBrowserVersion();if(typeof o=="string")return e[0]===">"||e[0]==="<"?(r=e.substr(1),e[1]==="="?(i=!0,r=e.substr(2)):t=[],e[0]===">"?t.push(1):t.push(-1)):e[0]==="="?r=e.substr(1):e[0]==="~"&&(i=!0,r=e.substr(1)),t.indexOf(n.compareVersions(o,r,i))>-1}isOS(e){return this.getOSName(!0)===String(e).toLowerCase()}isPlatform(e){return this.getPlatformType(!0)===String(e).toLowerCase()}isEngine(e){return this.getEngineName(!0)===String(e).toLowerCase()}is(e,t=!1){return this.isBrowser(e,t)||this.isOS(e)||this.isPlatform(e)}some(e=[]){return e.some(t=>this.is(t))}}/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2019
 */class Y{static getParser(e,t=!1){if(typeof e!="string")throw new Error("UserAgent should be a string");return new L(e,t)}static parse(e){return new L(e).getResult()}static get BROWSER_MAP(){return y}static get ENGINE_MAP(){return _}static get OS_MAP(){return S}static get PLATFORMS_MAP(){return p}}class j{constructor(e){c(this,"SPLASH_SCREEN_NODE_SELECTOR",".splash");c(this,"START_BUTTON_SELECTOR",".splash-button-start");c(this,"GUIDE_BUTTON_SELECTOR",".splash-button-help");c(this,"GUIDE_VIEW_NODE_SELECTOR",".splash-view-guide");c(this,"SPLASH_SCREEN_CLOSED_CLASS","closed");c(this,"SPLASH_SCREEN_HIDDEN_CLASS","hidden");c(this,"GUIDE_VIEW_VISIBLE_CLASS","visible");c(this,"SPLASH_SCREEN_VIEWED_STORAGE_KEY","abs.framerJs.splash.alreadySeen");c(this,"SPLASH_SCREEN_VIEWED_VALUE",!0);this.node=e}init(){}ready(){this.detectDevice(),this.checkforSplashInit(),this.addEventsToSplashButtons()}addEventsToSplashButtons(){const e=document.querySelector(this.SPLASH_SCREEN_NODE_SELECTOR),t=e.querySelector(this.START_BUTTON_SELECTOR),r=e.querySelector(this.GUIDE_BUTTON_SELECTOR);t==null||t.addEventListener("click",()=>{this.hideSplashScreen()}),r==null||r.addEventListener("click",()=>{this.showGuideView()})}hideSplashScreen(){document.querySelector(this.SPLASH_SCREEN_NODE_SELECTOR).classList.add(this.SPLASH_SCREEN_CLOSED_CLASS),sessionStorage.setItem(this.SPLASH_SCREEN_VIEWED_STORAGE_KEY,this.SPLASH_SCREEN_VIEWED_VALUE.toString())}forceHideSplashScreen(){document.querySelector(this.SPLASH_SCREEN_NODE_SELECTOR).classList.add(this.SPLASH_SCREEN_HIDDEN_CLASS)}showGuideView(){document.querySelector(this.SPLASH_SCREEN_NODE_SELECTOR).querySelector(this.GUIDE_VIEW_NODE_SELECTOR).classList.add(this.GUIDE_VIEW_VISIBLE_CLASS)}hideGuideView(){document.querySelector(this.SPLASH_SCREEN_NODE_SELECTOR).querySelector(this.GUIDE_VIEW_NODE_SELECTOR).classList.remove(this.GUIDE_VIEW_VISIBLE_CLASS)}checkforSplashInit(){sessionStorage.getItem(this.SPLASH_SCREEN_VIEWED_STORAGE_KEY)==="true"===this.SPLASH_SCREEN_VIEWED_VALUE&&this.forceHideSplashScreen()}detectDevice(){const e="desktop";Y.getParser(window.navigator.userAgent).getPlatformType()!==e&&document.querySelector(".unsupported-device-warning").classList.remove("hidden")}}const v=new O;[I,W,x,j].forEach(s=>{v.registerComponent(s.prototype.constructor.name,s)});v.initComponents();