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
      "url": "/is/demos/vis4/js/conf_714780c.js",
      "type": "js",
      "deps": [
        "lodash/lodash"
      ]
    },
    "points/index": {
      "url": "/is/demos/vis4/js/points/index_0d6982f.js",
      "type": "js",
      "deps": [
        "three/build/three",
        "colormap/index",
        "lodash/lodash"
      ]
    },
    "apps/4": {
      "url": "/is/demos/vis4/js/apps/4_af63ef5.js",
      "type": "js",
      "deps": [
        "common",
        "conf",
        "points/index",
        "three/build/three"
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