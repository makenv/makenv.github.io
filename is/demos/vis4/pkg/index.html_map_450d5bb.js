require.resourceMap({
  "res": {
    "three/build/three": {
      "url": "/is/demos/vis4/node_modules/three/build/three_572a4dc.js",
      "type": "js",
      "pkg": "p0"
    },
    "lodash/lodash": {
      "url": "/is/demos/vis4/node_modules/lodash/lodash_c7ca1ac.js",
      "type": "js",
      "pkg": "p0"
    },
    "common": {
      "url": "/is/demos/vis4/js/common_22f67d0.js",
      "type": "js",
      "deps": [
        "three/build/three",
        "lodash/lodash"
      ]
    },
    "conf": {
      "url": "/is/demos/vis4/js/conf_edf3d74.js",
      "type": "js"
    },
    "apps/1": {
      "url": "/is/demos/vis4/js/apps/1_79da196.js",
      "type": "js",
      "deps": [
        "three/build/three",
        "common",
        "conf"
      ]
    }
  },
  "pkg": {
    "p0": {
      "url": "/is/demos/vis4/pkg/third_5ebaf07.js",
      "type": "js"
    }
  }
});