define("points/index",function(e,t){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(){var e=document.createElement("canvas"),t=256;e.width=t,e.height=t;var r=e.getContext("2d");r.imageSmoothingEnabled=!1,r.fillStyle="rgba(255, 255, 255, 0)",r.fillRect(0,0,t,t);var n=2*Math.PI;r.fillStyle="rgba(255, 255, 255, 255)",r.beginPath(),r.arc(t/2,t/2,t/2,0,n,!0),r.fill();var a=r.getImageData(0,0,t,t),o=new s.Texture(a);return o.needsUpdate=!0,o}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=function(e,t,r){for(var n=!0;n;){var a=e,o=t,i=r;n=!1,null===a&&(a=Function.prototype);var l=Object.getOwnPropertyDescriptor(a,o);if(void 0!==l){if("value"in l)return l.value;var u=l.get;return void 0===u?void 0:u.call(i)}var c=Object.getPrototypeOf(a);if(null===c)return void 0;e=c,t=o,r=i,n=!0,l=c=void 0}},c=e("three/build/three"),s=n(c),f=e("colormap/index"),d=r(f),p=e("lodash/lodash"),h=function(e){function t(e,r){a(this,t),u(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,r),console.log("My Points")}return o(t,e),t}(s.Points),m=function(e){function t(e,r){a(this,t),u(Object.getPrototypeOf(t.prototype),"constructor",this).call(this),this.root=e,this.data=Object.assign({},r,e.conf),this.refs={},e.conf.fence.enabled&&this.createFence(),this.createMeshes(),this.updateMeshes()}return o(t,e),l(t,[{key:"buildCloudMaterial",value:function(){var e=this.root.conf.particle,t=null;return t=new s.PointsMaterial({alphaTest:e.alphaTest,transparent:e.transparent,vertexColors:s.VertexColors,opacity:e.opacity,sizeAttenuation:e.sizeAttenuation,side:s.DoubleSide,map:i(),depthTest:!0,size:e.size})}},{key:"createMeshes",value:function(){for(var e=this.refs,t=this.data,r=(this.root,this.root.conf,t.particle),n=r.number,a=new Float32Array(3*n),o=new Float32Array(3*n),i=0;3*n>i;++i)a[i]=-99999999;var l=new s.BufferGeometry;l.addAttribute("position",new s.BufferAttribute(a,3)),l.addAttribute("color",new s.BufferAttribute(o,3));var u=this.buildCloudMaterial();return e.mainGeometry=l,e.mainMaterial=u,e.main=new h(l,u),this.add(e.main),this}},{key:"updateMeshes",value:function(){for(var e=this.data,t=this.root,r=this.refs,n=t.conf,a=(e.mass,e.lay),o=e.row,i=e.col,l=e.array,u=l.length,c=e.cellsize,s=e.cellheight,f=e.particle,p=f.number,h=n.colorLevel,m=d["default"]({colormap:n.colormap,nshades:h,format:"rgb"}),v=0,g=0,b=0,y=0,_=0,A=0;u>A;++A)v+=l[A],l[A]>0&&(g+=l[A],b+=1),l[A]>y&&(y=l[A]);v=1.001*v;var w=v/f.number;w=n.mass/f.number,y=n.colormapMaxValue,_=n.colormapMinValue;for(var M=y-_,x=r.mainGeometry,P=x.getAttribute("position").array,O=x.getAttribute("color").array,C=-i*c/2,z=-a*s/2,j=o*c/2,B=0,S=0,T=0,k=0,F=0,E=0,A=0;o*i*a>A;++A){F+=l[A];var U=Math.floor((l[A]-_)/M*h);U>=h&&(U=h-1),0>U&&(U=0);for(var G=m[U],I=G[0]/255,L=G[1]/255,V=G[2]/255;F>w;)P[k]=(B+Math.random())*c+C,P[k+1]=(T+Math.random())*s+z,P[k+1]=(T+.75*Math.random()+.25)*s+z,P[k+2]=-(S+Math.random())*c+j,O[k]=I,O[k+1]=L,O[k+2]=V,k+=3,E+=1,F-=w;B+=1,B>=i&&(B=0,S+=1,S>=o&&(T+=1,S=0))}for(console.log("P0",E,f.number);3*p>k;k++)P[k]=-99999999,P[k+1]=-99999999,P[k+2]=-99999999,k+=3;return x.getAttribute("position").needsUpdate=!0,x.getAttribute("color").needsUpdate=!0,x.computeBoundingSphere(),this}},{key:"createFence",value:function(){var e=this.data,t=e.lay,r=e.row,n=e.col,a=e.cellsize,o=e.cellheight,i=new s.MeshBasicMaterial({color:e.fence.color,opacity:e.fence.opacity,side:s.DoubleSide,transparent:!0});e.fence.background&&(i.map=(new s.TextureLoader).load(e.fence.background));for(var l=new Float32Array(24),u=n*a/2,c=t*o/2,f=-r*a/2,d=0,p=0;1>=p;++p)for(var h=0;1>=h;++h)for(var m=0;1>=m;++m)l[d]=p*n*a-u,l[d+1]=h*t*o-c,l[d+2]=-m*r*a-f,d+=3;var v=Int16Array.from([2,0,1,2,1,3,3,1,5,3,5,7,7,4,5,7,6,4,6,0,2,6,4,0]);v=Int16Array.from([0,1,5,0,5,4]);var g=Float32Array.from([0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]),b=Float32Array.from([0,0,0,1,0,0,0,0,1,0,1,1,0,0,0,0]),y=new s.BufferGeometry;y.addAttribute("position",new s.BufferAttribute(l,3)),y.setIndex(new s.BufferAttribute(v,1)),y.addAttribute("uv",new s.BufferAttribute(b,2)),y.addAttribute("normal",new s.BufferAttribute(g,3));var _=new s.Mesh(y,i);return this.add(_),this.refs.fence=_,this}},{key:"createCamera",value:function(){var e=this.root,t=this.data,r=e.renderer,n=r.domElement,a=n.width,o=n.height,i=t.cellsize,l=(t.cellheight,t.row),u=(t.col,t.lay,new s.PerspectiveCamera(30,a/o,1,1e7));return u.position.set(0,0,l*i*3),u.lookAt(new s.Vector3(0,0,0)),u.updateProjectionMatrix(),u}},{key:"update",value:function(e){return this.data=p._.merge({},e,this.root.conf),this.updateMeshes()}}]),t}(s.Object3D),v="\nuniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nattribute float alpha;\nvarying float vAlpha;\n\nvoid main() {\n  vAlpha = alpha;\n  #include <color_vertex>\n  #include <begin_vertex>\n  #include <project_vertex>\n  #ifdef USE_SIZEATTENUATION\n    gl_PointSize = size * ( scale / - mvPosition.z );\n  #else\n    gl_PointSize = size;\n  #endif\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n  #include <worldpos_vertex>\n  #include <shadowmap_vertex>\n}\n",g="\nuniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying float vAlpha;\nvoid main() {\n  #include <clipping_planes_fragment>\n  vec3 outgoingLight = vec3( 0.0 );\n  // vec4 diffuseColor = vec4( diffuse, opacity );\n  vec4 diffuseColor = vec4(diffuse, vAlpha);\n  #include <logdepthbuf_fragment>\n  #include <map_particle_fragment>\n  #include <color_fragment>\n  #include <alphatest_fragment>\n  outgoingLight = diffuseColor.rgb;\n  gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n  #include <premultiplied_alpha_fragment>\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n}\n",b=function(e){function t(){a(this,t),u(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return o(t,e),l(t,[{key:"buildCloudMaterial",value:function(){console.log("cube4 - material");var e=s.ShaderLib.points;console.log(e),e.vertexShader=v,e.fragmentShader=g;var t=this.root.conf.particle,r=null;return r=new s.PointsMaterial({transparent:t.transparent,vertexColors:s.VertexColors,opacity:t.opacity,sizeAttenuation:t.sizeAttenuation,depthTest:!0,size:t.size}),t.alphaTest&&(r.alphaTest=t.alphaTest),r}},{key:"createMeshes",value:function(){for(var e=this.refs,t=this.data,r=(this.root,this.root.conf,t.particle),n=r.number,a=new Float32Array(3*n),o=new Float32Array(3*n),i=new Float32Array(n),l=0;3*n>l;++l)a[l]=-99999999;var u=new s.BufferGeometry;u.addAttribute("position",new s.BufferAttribute(a,3)),u.addAttribute("color",new s.BufferAttribute(o,3)),u.addAttribute("alpha",new s.BufferAttribute(i,1));var c=this.buildCloudMaterial();return e.mainGeometry=u,e.mainMaterial=c,e.main=new h(u,c),this.add(e.main),this}},{key:"updateMeshes",value:function(){for(var e=this.data,t=this.root,r=this.refs,n=t.conf,a=(e.mass,e.lay),o=e.row,i=e.col,l=e.array,u=l.length,c=e.cellsize,s=e.cellheight,f=e.particle,p=f.number,h=n.colorLevel,m=d["default"]({colormap:n.colormap,nshades:h,format:"rgb"}),v=0,g=0,b=0,y=0,_=0,A=0;u>A;++A)v+=l[A],l[A]>0&&(g+=l[A],b+=1),l[A]>y&&(y=l[A]);v=1.001*v;var w=v/f.number;w=n.mass/f.number,y=n.colormapMaxValue,_=n.colormapMinValue;for(var M=y-_,x=r.mainGeometry,P=x.getAttribute("position").array,O=x.getAttribute("color").array,C=x.getAttribute("alpha").array,z=-i*c/2,j=-a*s/2,B=o*c/2,S=0,T=0,k=0,F=0,E=0,U=0,A=0;o*i*a>A;++A){E+=l[A];var G=Math.floor((l[A]-_)/M*h);G>=h&&(G=h-1),0>G&&(G=0);for(var I=m[G],L=I[0]/255,V=I[1]/255,D=I[2]/255;E>w;)P[F]=(S+Math.random())*c+z,P[F+1]=(k+Math.random())*s+j,P[F+1]=(k+.925*Math.random()+.05)*s+j,P[F+2]=-(T+Math.random())*c+B,O[F]=L,O[F+1]=V,O[F+2]=D,C[U]=G/h*.8+.1,F+=3,U+=1,E-=w;S+=1,S>=i&&(S=0,T+=1,T>=o&&(k+=1,T=0))}for(console.log("P0",U,f.number);3*p>F;F++)P[F]=-99999999,P[F+1]=-99999999,P[F+2]=-99999999,F+=3;return x.getAttribute("position").needsUpdate=!0,x.getAttribute("color").needsUpdate=!0,x.getAttribute("alpha").needsUpdate=!0,x.computeBoundingSphere(),this}}]),t}(m);t.Cube=m,t.Cube4=b});