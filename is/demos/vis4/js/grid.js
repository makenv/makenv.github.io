define('grid', function(require, exports, module) {

  /// <reference path="../typings/index.d.ts" />
  var _ = require('lodash/lodash');
  var THREE = require('three/build/three');
  require('colormap/index');
  let colormap = require('colormap/index');
  class Cube extends THREE.Object3D {
      constructor(__, data) {
          super();
          this.__ = __;
          this.refs = {};
          this.data = _.merge({}, data, __.conf);
          this.createMeshes();
          if (this.__.conf.fence.enabled) {
              this.createFence();
          }
          this.updateMesh();
      }
      createMeshes() {
          let { __, data, refs } = this;
          let { lay, row, col } = data;
          let { cellsize, cellheight } = data;
          let pointNumber = lay * row * col;
          let vertices = new Float32Array(pointNumber * 3);
          let normals = new Float32Array(pointNumber * 3);
          let x0 = -col * cellsize / 2;
          let y0 = -lay * cellheight / 2;
          let z0 = -row * cellsize / 2;
          let o = 0;
          for (let li = 0; li < lay; ++li) {
              for (let ri = 0; ri < row; ++ri) {
                  for (let ci = 0; ci < col; ++ci) {
                      vertices[o] = (ci + 0.5) * cellsize + x0;
                      vertices[o + 1] = (li + 0.5) * cellheight + y0;
                      vertices[o + 2] = -((ri + 0.5) * cellsize + z0);
                      normals[o] = 0;
                      normals[o + 1] = 1;
                      normals[o + 2] = 0;
                      o += 3;
                  }
              }
          }
          let colors = new Float32Array(pointNumber * 3);
          let alphas = new Float32Array(pointNumber * 3);
          let geometry = new THREE.BufferGeometry();
          geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
          geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
          geometry.addAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
          geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
          let material = this.createMainMaterial();
          let main = new THREE.Points(geometry, material);
          refs['main'] = main;
          refs['mainGeometry'] = geometry;
          refs['mainMaterial'] = material;
          this.add(main);
          return this;
      }
      updateMesh() {
          let { data, __, refs } = this;
          let conf = __.conf;
          let { lay, row, col, array } = data;
          let { cellsize, cellheight } = data;
          let { particle } = data;
          let { number } = particle;
          let cmLevel = conf.colorLevel;
          console.log('colormap', conf.colormap, cmLevel);
          let cm = colormap({
              colormap: conf.colormap,
              nshades: cmLevel,
              format: 'rgb'
          });
          console.log("cm", cm.length);
          console.log("cm", cm);
          let max = conf.colormapMaxValue;
          let min = conf.colormapMinValue;
          let range = max - min;
          let geometry = refs['mainGeometry'];
          // let vertices = geometry.getAttribute('position').array;
          let colors = geometry.getAttribute('color').array;
          let alphas = geometry.getAttribute('alpha').array;
          let o = 0;
          let p = 0;
          let oa = 0;
          let c0 = 0;
          for (let li = 0; li < lay; ++li) {
              for (let ri = 0; ri < row; ++ri) {
                  for (let ci = 0; ci < col; ++ci) {
                      let cl = Math.floor((array[p] - min) * cmLevel / range);
                      cl += 4;
                      if (cl >= cmLevel) {
                          c0 += 1;
                          cl = cmLevel - 1;
                      }
                      else if (cl < 0) {
                          cl = 0;
                      }
                      let color = cm[cl];
                      let cr = color[0] / 255, cg = color[1] / 255, cb = color[2] / 255;
                      colors[o] = cr;
                      colors[o + 1] = cg;
                      colors[o + 2] = cb;
                      o += 3;
                      alphas[oa] = cl / cmLevel * 0.5 + (cl * cl) / (cmLevel * cmLevel) * 0.4 + 0.05;
                      // alphas[p] = cl * (cl + 4) /  (cmLevel * cmLevel )* 0.9 + 0.05;
                      oa += 1;
                      p += 1;
                  }
              }
          }
          console.log(c0);
          geometry.getAttribute('color').needsUpdate = true;
          geometry.getAttribute('alpha').needsUpdate = true;
          return this;
      }
      createMainMaterial() {
          console.log('cube4 - material');
          let points = THREE.ShaderLib.points;
          points.vertexShader = points_vert;
          points.fragmentShader = points_frag;
          let particle = this.__.conf.particle;
          let material = new THREE.PointsMaterial({
              transparent: particle.transparent,
              // blending: THREE.SubtractiveBlending,
              // blending: THREE.AdditiveBlending,
              // blending: THREE.NormalBlending,
              // blending: THREE.MultiplyBlending,
              vertexColors: THREE.VertexColors,
              // opacity: particle.opacity,
              sizeAttenuation: particle.sizeAttenuation,
              side: THREE.DoubleSide,
              // map: CircleTexture(),
              // depthTest: true,
              size: particle.size,
          });
          if (particle.alphaTest) {
              material.alphaTest = particle.alphaTest;
          }
          return material;
      }
      createFence() {
          let data = this.data;
          let { lay, row, col, cellsize, cellheight } = data;
          let m = new THREE.MeshBasicMaterial({
              color: data.fence.color,
              opacity: data.fence.opacity,
              side: THREE.DoubleSide,
              transparent: true,
          });
          if (data.fence.background) {
              m.map = new THREE.TextureLoader().load(data.fence.background);
          }
          // build fence vertices array.
          let vertices = new Float32Array(8 * 3);
          let x0 = col * cellsize / 2;
          let y0 = lay * cellheight / 2;
          let z0 = -row * cellsize / 2;
          let o = 0;
          for (var i = 0; i <= 1; ++i) {
              for (var j = 0; j <= 1; ++j) {
                  for (var k = 0; k <= 1; ++k) {
                      vertices[o] = i * col * cellsize - x0;
                      vertices[o + 1] = j * lay * cellheight - y0;
                      vertices[o + 2] = -k * row * cellsize - z0;
                      o += 3;
                  }
              }
          }
          let indices = Int16Array.from([
              2, 0, 1, 2, 1, 3,
              3, 1, 5, 3, 5, 7,
              7, 4, 5, 7, 6, 4,
              6, 0, 2, 6, 4, 0]);
          // 0, 1, 5, 0, 5, 4]); bottom
          indices = Int16Array.from([
              0, 1, 5, 0, 5, 4]);
          let normals = Float32Array.from([
              0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
              0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]);
          let uvs = Float32Array.from([
              0, 0, 0, 1, 0, 0, 0, 0,
              1, 0, 1, 1, 0, 0, 0, 0]);
          let geometry = new THREE.BufferGeometry();
          geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
          geometry.setIndex(new THREE.BufferAttribute(indices, 1));
          geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
          geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
          let fence = new THREE.Mesh(geometry, m);
          // fence.add(new THREE.LineSegments(geometry, pm));
          this.add(fence);
          this.refs['fence'] = fence;
          let boundaryGeometry = new THREE.BufferGeometry();
          return this;
      }
      createCamera() {
          let { __, data } = this;
          let renderer = __.renderer;
          let { width, height } = renderer.domElement;
          let { cellsize, cellheight, row, col, lay } = data;
          let camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000000);
          camera.position.set(0, 0, row * cellsize * 0.6);
          camera.lookAt(new THREE.Vector3(0, 0, 0));
          camera.updateProjectionMatrix();
          return camera;
      }
  }
  exports.Cube = Cube;
  let points_vert = `
  uniform float size;
  uniform float scale;
  #include <common>
  #include <color_pars_vertex>
  #include <shadowmap_pars_vertex>
  #include <logdepthbuf_pars_vertex>
  #include <clipping_planes_pars_vertex>
  
  attribute float alpha;
  varying float vAlpha;
  
  void main() {
    vAlpha = alpha;
    #include <color_vertex>
    #include <begin_vertex>
    #include <project_vertex>
    #ifdef USE_SIZEATTENUATION
      gl_PointSize = size * ( scale / - mvPosition.z );
    #else
      gl_PointSize = size;
    #endif
    float size0 = size * (scale / - mvPosition.z);
    if (size0 < 2.1) {
      size0 = 2.1;
    }  
    gl_PointSize = size0;
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>
    #include <worldpos_vertex>
    #include <shadowmap_vertex>
  }
  `;
  let points_frag = `
  uniform vec3 diffuse;
  uniform float opacity;
  #include <common>
  #include <color_pars_fragment>
  #include <map_particle_pars_fragment>
  #include <fog_pars_fragment>
  #include <shadowmap_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>
  varying float vAlpha;
  void main() {
    #include <clipping_planes_fragment>
    vec3 outgoingLight = vec3( 0.0 );
    // vec4 diffuseColor = vec4( diffuse, opacity );
    vec4 diffuseColor = vec4(diffuse, vAlpha);
    #include <logdepthbuf_fragment>
    #include <map_particle_fragment>
    #include <color_fragment>
    #include <alphatest_fragment>
    outgoingLight = diffuseColor.rgb;
    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
    #include <premultiplied_alpha_fragment>
    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
  }
  `;
  function CircleTexture() {
      let canvas = document.createElement('canvas');
      let w = 256;
      canvas.width = w;
      canvas.height = w;
      let ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = 'rgba(255, 255, 255, 0)';
      ctx.fillRect(0, 0, w, w);
      let PI2 = Math.PI * 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 255)';
      ctx.beginPath();
      ctx.arc(w / 2, w / 2, w / 2, 0, PI2, true);
      ctx.fill();
      let img = ctx.getImageData(0, 0, w, w);
      let texture = new THREE.Texture(img);
      texture.needsUpdate = true;
      return texture;
  }
  //# sourceMappingURL=/is/demos/vis4/js/grid.js.map
  

});
