define("apps/3",function(e){"use strict";function t(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(){requestAnimationFrame(a),l.renderer.render(l.scene,l.camera)}function o(e){if(l.mouse&&l.mesh){var t=e.clientX,n=e.clientY;l.mesh.rotation.y+=.005*(t-l.mouse.x),l.mesh.rotation.x+=.005*(n-l.mouse.y),l.mouse.x=t,l.mouse.y=n}}function i(e){l.mouse={x:e.clientX,y:e.clientY}}function r(){l.mouse=void 0}function u(e){l.camera&&(l.camera.position.z*=1e3/(1e3+e.deltaY))}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),c=e("common"),d=e("conf"),h=e("points/index"),m=e("three/build/three"),f=(t(m),function(){function e(t){n(this,e),this.__=t,this.hour=0,this.day=220,this.interval=t.conf.interval,this.timer=null,this.infourl="data/2015223-23.json"}return s(e,[{key:"next",value:function(){function e(e,t){var n="000000000"+e;return n.substr(n.length-t)}var t="data/2015"+e(this.day,3)+"-"+e(this.hour,2)+".data";c.FetchData(this.infourl,t).then(this.update.bind(this))}},{key:"update",value:function(e){var t=this.__;t.mesh?t.mesh.update(e):this.createCube(e),this.hour+=1,24==this.hour&&(this.day+=1,this.hour=0,this.day>229&&(this.day=220)),setTimeout(this.next.bind(this),this.interval)}},{key:"createCube",value:function(e){var t=new h.Cube4(l,e);l.mesh=t,l.mesh.rotation.x=.5,l.scene.add(t),l.camera=t.createCamera(),document.addEventListener("mousemove",o,!1),document.addEventListener("mouseup",r,!1),document.addEventListener("mousedown",i,!1),document.addEventListener("mousewheel",u,!1),a()}}]),e}());c.FetchData("data/2015223-23.json").then(function(e){var t=new h.Cube4(l,e);l.mesh=t,l.mesh.rotation.x=.5,l.scene.add(t),l.camera=t.createCamera(),document.addEventListener("mousemove",o,!1),document.addEventListener("mouseup",r,!1),document.addEventListener("mousedown",i,!1),document.addEventListener("mousewheel",u,!1),a()});var l={};l.conf=d.conf__3,c.CreateScene(l,{}),l.datas=new f(l),l.datas.next()});