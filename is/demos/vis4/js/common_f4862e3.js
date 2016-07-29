define('common', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
  
  exports.CreateScene = CreateScene;
  exports.FetchData = FetchData;
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _three = require('three/three');
  
  var THREE = _interopRequireWildcard(_three);
  
  require('lodash/lodash');
  
  function CreateScene(app, conf) {
    var __ = app;
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
  
    var scene = new THREE.Scene();
    // scene.fog = new THREE.Fog( 0x050505, 2000, 3500);
    // scene.add(new THREE.AmbientLight(0xffffff, 1));
  
    // var dirLight = new THREE.DirectionalLight( 0xffffff );
    // dirLight.position.set( -100, 0, 100 ).normalize();
  
    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false
    });
  
    renderer.setClearColor(__.conf.clearColor, __.conf.clearOpacity);
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
  
    app.scene = scene;
    // app.camera = camera;
    app.renderer = renderer;
  
    return app;
  }
  
  function Points__Grid(__) {
    var bx = 300,
        by = 100,
        bz = 20;
    var cell = 5;
  
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array(bx * by * bz * 3);
    var off = 0;
    for (var i = 0; i < bx; i++) {
      for (var j = 0; j < by; j++) {
        for (var k = 0; k < bz; k++) {
          vertices[off] = i * cell + Math.random() * cell;
          vertices[off + 1] = j * cell + Math.random() * cell;
          vertices[off + 2] = k * cell + Math.random() * cell;
          off += 3;
        }
      }
    }
  
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
  
    geometry.computeBoundingSphere();
    var colors = new Float32Array(bx * by * bz * 3);
    off = 0;
    for (var i = 0; i < bx; i++) {
      for (var j = 0; j < by; j++) {
        for (var k = 0; k < bz; k++) {
          colors[off] = 1 - 0.7 * i / bx;
          colors[off + 1] = 1 - 0.8 * j / by;
          colors[off + 2] = 1 - 0.5 * k / bz;
          off += 3;
        }
      }
    }
  
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
  
    var material = new THREE.PointsMaterial({
      //color: 0x3399ff,
      vertexColors: THREE.VertexColors,
      size: 1.1,
      opacity: 0.2,
      sizeAttenuation: false
    });
  
    var cloud = new THREE.Points(geometry, material);
  
    return cloud;
  }
  
  Points__Grid.createCamera = function (__) {
    var renderer = __.renderer;
    var _renderer$domElement = renderer.domElement;
    var width = _renderer$domElement.width;
    var height = _renderer$domElement.height;
  
    var s = 2.5;
    var camera = new THREE.PerspectiveCamera(45, width / height, 1, 100000);
    camera.position.set(-100 * s, -100 * s, 100 * s);
    camera.lookAt(new THREE.Vector3(0 * s, 0 * s, 0 * s));
    camera.updateProjectionMatrix();
    return camera;
  };
  
  function Points__Data__Fence(box, data) {
    var lay = data.lay;
    var row = data.row;
    var col = data.col;
    var cellsize = data.cellsize;
    var cellheight = data.cellheight;
  
    var m = new THREE.MeshBasicMaterial({
      color: data.fenceColor,
      opacity: data.fenceOpacity,
      side: THREE.DoubleSide,
      transparent: true
    });
  
    var pm = new THREE.MeshLambertMaterial({
      color: 0x3399ff
    });
  
    // build fence vertices array.
  
    var vertices = new Float32Array(8 * 3);
  
    var x0 = col * cellsize / 2;
    var y0 = lay * cellheight / 2;
    var z0 = -row * cellsize / 2;
  
    var o = 0;
    for (var i = 0; i <= 1; ++i) {
      // x
      for (var j = 0; j <= 1; ++j) {
        // y
        for (var k = 0; k <= 1; ++k) {
          // z
          vertices[o] = i * col * cellsize - x0;
          vertices[o + 1] = j * lay * cellheight - y0;
          vertices[o + 2] = -k * row * cellsize - z0;
          o += 3;
        }
      }
    }
  
    var indices = Int16Array.from([2, 0, 1, 2, 1, 3, 3, 1, 5, 3, 5, 7, 7, 4, 5, 7, 6, 4, 6, 0, 2, 6, 4, 0]);
    // 0, 1, 5, 0, 5, 4]); bottom
  
    indices = Int16Array.from([0, 1, 5, 0, 5, 4]);
  
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  
    var fence = new THREE.Mesh(geometry, m);
    // fence.add(new THREE.LineSegments(geometry, pm));
    box.add(fence);
  
    /*
    let planes = [];
     for (var i = 0; i < 2; ++i) {
      planes[i] = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(
          row * cellsize, lay * cellheight, 1, 1), m);
    }
    for (var i = 2; i < 4; ++i) {
      planes[i] = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(
          col * cellsize, lay * cellheight, 1, 1), m);
    }
     for (var i = 0; i < 4; ++i) {
      box.add(planes[i]);
    }
    */
  }
  
  function Points__Data(__, data) {
    data = _.merge({}, data, __.conf);
  
    var _data = data;
    var mass = _data.mass;
    var lay = _data.lay;
    var row = _data.row;
    var col = _data.col;
    var arrlen = _data.array.length;
    var array = _data.array;
    var _data2 = data;
    var cellsize = _data2.cellsize;
    var cellheight = _data2.cellheight;
    var _data3 = data;
    var totalPoints = _data3.points;
  
    var root = new THREE.Group();
    var sum = 0;
  
    for (var i = 0; i < arrlen; ++i) {
      sum += array[i];
    }
  
    sum = sum * 1.001;
    var mratio = sum / totalPoints;
  
    var vertices = new Float32Array(totalPoints * 3);
  
    // console.log('cell', cellsize, cellheight);
  
    var x0 = -col * cellsize / 2;
    var y0 = -lay * cellheight / 2;
    var z0 = row * cellsize / 2;
  
    var c = 0,
        r = 0,
        l = 0,
        o = 0,
        m = 0,
        p = 0;
    for (var i = 0; i < row * col * lay; ++i) {
      m += array[i];
      while (m > 0) {
        vertices[o] = (c + Math.random()) * cellsize + x0;
        vertices[o + 1] = l * Math.random() * cellheight + y0;
        vertices[o + 2] = -(r + Math.random()) * cellsize + z0;
        o += 3;
        p += 1;
        m -= mratio;
      }
  
      c += 1;
      if (c >= col) {
        c = 0;
        r += 1;
        if (r >= row) {
          l += 1;
          r = 0;
        }
      }
    }
  
    var vertices0 = vertices.slice(0, p * 3);
  
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices0, 3));
    geometry.computeBoundingSphere();
  
    var material = new THREE.PointsMaterial({
      color: data.pointColor,
      // vertexColors: THREE.VertexColors,
      size: data.pointSize,
      opacity: data.opacity,
      sizeAttenuation: data.sizeAttenuation
    });
  
    var mesh = new THREE.Points(geometry, material);
    mesh.__data = data;
    root.add(mesh);
  
    /*
    let bg = new THREE.BoxGeometry(col * cellsize, lay * cellheight, - row * cellsize);
    let bm = new THREE.MeshBasicMaterial({
      color: 0xff33aa,
      wireframe: true,
      opacity: 1,
    });
     let box = new THREE.Mesh(bg, bm);
    root.add(box);
    */
    Points__Data__Fence(root, data);
    // box.position.set(col * cellsize / 2, lay * cellheight / 2, - row * cellsize / 2);
    return root;
  }
  
  Points__Data.createCamera = function (__, data) {
    data = _.merge({}, data, __.conf);
    var renderer = __.renderer;
    var _renderer$domElement2 = renderer.domElement;
    var width = _renderer$domElement2.width;
    var height = _renderer$domElement2.height;
    var _data4 = data;
    var cellsize = _data4.cellsize;
    var cellheight = _data4.cellheight;
    var row = _data4.row;
    var col = _data4.col;
    var lay = _data4.lay;
  
    var camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000000);
    camera.position.set(0, 0, row * cellsize * 2);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();
    return camera;
  };
  
  var CLOUDS = {
    grid0: Points__Grid,
    data0: Points__Data
  };
  
  exports.CLOUDS = CLOUDS;
  
  function FetchData(u1, u2) {
    var uinfo = u1;
    var udata = u2;
    if (!udata) {
      udata = uinfo.replace('.json', '.data');
    }
  
    var pinfo = fetch(uinfo).then(function (response) {
      return response.json();
    });
    var pdata = fetch(udata).then(function (response) {
      return response.arrayBuffer();
    });
  
    return Promise.all([pinfo, pdata]).then(function (parr) {
      var _parr = _slicedToArray(parr, 2);
  
      var info = _parr[0];
      var data = _parr[1];
  
      var array = new Float32Array(data);
      info.array = array;
      return info;
    });
  }
  //# sourceMappingURL=/is/demos/vis4/js/common.js.map
  

});
