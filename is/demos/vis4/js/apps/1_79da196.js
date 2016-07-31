define('apps/1', function(require, exports, module) {

  'use strict';
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _three = require('three/build/three');
  
  var THREE = _interopRequireWildcard(_three);
  
  var _common = require('common');
  
  var _conf = require('conf');
  
  var __ = {};
  
  __.conf = _conf.conf__1;
  console.log(_conf.conf__1);
  
  (0, _common.CreateScene)(__, {});
  
  function render() {
    requestAnimationFrame(render);
    /*
    if (__.mesh) {
      __.mesh.rotation.x += 0.0005;
      __.mesh.rotation.y += 0.0025;
    }
    */
    __.renderer.render(__.scene, __.camera);
  }
  
  (0, _common.FetchData)('data/2015223-23.json').then(function (data) {
    var emis = _common.CLOUDS.data0(__, data);
    __.mesh = emis;
    __.mesh.rotation.x = 0.5;
    __.scene.add(emis);
  
    __.camera = _common.CLOUDS.data0.createCamera(__, data);
  
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousewheel', onDocumentMouseWheel, false);
    render();
  });
  
  function onDocumentMouseMove(event) {
    if (__.mouse && __.mesh) {
      var x0 = event.clientX;
      var y0 = event.clientY;
  
      __.mesh.rotation.y += 0.005 * (x0 - __.mouse.x);
      __.mesh.rotation.x += 0.005 * (y0 - __.mouse.y);
      __.mouse.x = x0;
      __.mouse.y = y0;
    }
  }
  
  function onDocumentMouseDown(event) {
    __.mouse = {
      x: event.clientX,
      y: event.clientY
    };
  }
  
  function onDocumentMouseUp(event) {
    __.mouse = undefined;
  }
  
  function onDocumentMouseWheel(event) {
    console.log('wheel', event);
    if (__.camera) {
      __.camera.position.z *= 1000 / (1000.0 + event.deltaY);
    }
  }
  //# sourceMappingURL=/is/demos/vis4/js/apps/1.js.map
  

});
