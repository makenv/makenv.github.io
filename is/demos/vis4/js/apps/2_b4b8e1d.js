define("apps/2",function(e){"use strict";function n(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n["default"]=e,n}function t(){requestAnimationFrame(t),d.renderer.render(d.scene,d.camera)}function o(e){if(d.mouse&&d.mesh){var n=e.clientX,t=e.clientY;d.mesh.rotation.y+=.005*(n-d.mouse.x),d.mesh.rotation.x+=.005*(t-d.mouse.y),d.mouse.x=n,d.mouse.y=t}}function r(e){d.mouse={x:e.clientX,y:e.clientY}}function a(){d.mouse=void 0}function i(e){d.camera&&(d.camera.position.z*=1e3/(1e3+e.deltaY))}var u=e("common"),c=e("conf"),s=e("points/index"),m=e("three/build/three"),d=(n(m),{});d.conf=c.conf__2,u.CreateScene(d,{}),u.FetchData("data/2015223-23.json").then(function(e){var n=new s.Cube(d,e);d.mesh=n,d.mesh.rotation.x=.5,d.scene.add(n),d.camera=n.createCamera(),document.addEventListener("mousemove",o,!1),document.addEventListener("mouseup",a,!1),document.addEventListener("mousedown",r,!1),document.addEventListener("mousewheel",i,!1),t()})});