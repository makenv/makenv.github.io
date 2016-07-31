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
    "common": {
      "url": "/is/demos/vis4/js/common_cfa7fd3.js",
      "type": "js",
      "deps": [
        "three/build/three",
        "lodash/lodash"
      ]
    },
    "conf": {
      "url": "/is/demos/vis4/js/conf_4799fb6.js",
      "type": "js"
    },
    "apps/1": {
      "url": "/is/demos/vis4/js/apps/1_f979531.js",
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
      "url": "/is/demos/vis4/pkg/third_7ad193f.js",
      "type": "js"
    }
  }
});