require.resourceMap({
  "res": {
    "three/build/three": {
      "url": "/is/demos/vis4/node_modules/three/build/three_31a430a.js",
      "type": "js",
      "pkg": "p0"
    },
    "lodash/lodash": {
      "url": "/is/demos/vis4/node_modules/lodash/lodash_6522054.js",
      "type": "js",
      "pkg": "p0"
    },
    "arraytools/index": {
      "url": "/is/demos/vis4/node_modules/arraytools/index_8ecbf2d.js",
      "type": "js",
      "pkg": "p0"
    },
    "clone/clone": {
      "url": "/is/demos/vis4/node_modules/clone/clone_c55859c.js",
      "type": "js",
      "pkg": "p0"
    },
    "colormap/colorScales": {
      "url": "/is/demos/vis4/node_modules/colormap/colorScales_4cd24ce.js",
      "type": "js",
      "pkg": "p0"
    },
    "colormap/index": {
      "url": "/is/demos/vis4/node_modules/colormap/index_b8e545f.js",
      "type": "js",
      "deps": [
        "arraytools/index",
        "clone/clone",
        "colormap/colorScales"
      ],
      "pkg": "p0"
    },
    "common": {
      "url": "/is/demos/vis4/js/common_683be2c.js",
      "type": "js",
      "deps": [
        "three/build/three",
        "lodash/lodash"
      ]
    },
    "conf": {
      "url": "/is/demos/vis4/js/conf_b6a0804.js",
      "type": "js",
      "deps": [
        "lodash/lodash"
      ]
    },
    "apps/1": {
      "url": "/is/demos/vis4/js/apps/1_33e9e68.js",
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
      "url": "/is/demos/vis4/pkg/third_5312271.js",
      "type": "js"
    }
  }
});