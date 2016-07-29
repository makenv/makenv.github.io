require.resourceMap({
  "res": {
    "three/three": {
      "url": "/is/demos/vis4//node_modules/three/three_aa966c4.js",
      "type": "js",
      "pkg": "p0"
    },
    "lodash/lodash": {
      "url": "/is/demos/vis4//node_modules/lodash/lodash_c7ca1ac.js",
      "type": "js",
      "pkg": "p0"
    },
    "common": {
      "url": "/is/demos/vis4//js/common_3ca4ce0.js",
      "type": "js",
      "deps": [
        "three/three",
        "lodash/lodash"
      ]
    },
    "conf": {
      "url": "/is/demos/vis4//js/conf_8749188.js",
      "type": "js"
    },
    "apps/1": {
      "url": "/is/demos/vis4//js/apps/1_3d951b4.js",
      "type": "js",
      "deps": [
        "three/three",
        "common",
        "conf"
      ]
    }
  },
  "pkg": {
    "p0": {
      "url": "/is/demos/vis4//pkg/third_8c8434c.js",
      "type": "js"
    }
  }
});