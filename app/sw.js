importScripts('workbox-sw.prod.v2.1.0.js');
const swVersion = 1;

const fileManifest = [
  {
    "url": "assets/blip1.wav",
    "revision": "38029e5a3f7d71b40b6e367a14816117"
  },
  {
    "url": "assets/blue-sprite-r20-blink.png",
    "revision": "5720804b3b3e402bcc718571f62a3c50"
  },
  {
    "url": "assets/blue-sprite-r20.png",
    "revision": "474361832c194cd995f22cf8e3ba5b0a"
  },
  {
    "url": "assets/common-styles.css",
    "revision": "1cf652782b40ab43c77ebbd7723462c"
  },
  {
    "url": "assets/created2.wav",
    "revision": "224aac254337a8ff7033098ea2511c39"
  },
  {
    "url": "assets/delete2.flac",
    "revision": "43b1c7411efdeb7c13d9f68ece0b6df3"
  },
  {
    "url": "assets/gray-sprite-r20-blink.png",
    "revision": "42ed64bd5edef5f278f56d88067075e3"
  },
  {
    "url": "assets/gray-sprite-r20.png",
    "revision": "4560c6267f3a917035e388119a34419a"
  },
  {
    "url": "assets/green-sprite-r20-blink.png",
    "revision": "c2f7fe1344ce893f2e199d57de09b122"
  },
  {
    "url": "assets/green-sprite-r20.png",
    "revision": "4f175d05224880828cb99cf3c083a0a1"
  },
  {
    "url": "assets/orange-sprite-r20-blink.png",
    "revision": "fee0adb3c2dccd705b38d0067c2784b2"
  },
  {
    "url": "assets/orange-sprite-r20.png",
    "revision": "260aa89dbd24d4960ba0c552a79774e2"
  },
  {
    "url": "assets/orange-sprite.png",
    "revision": "e66ae8c5d5a3efecbe6a6fc4b4ac20c2"
  },
  {
    "url": "assets/pink-sprite-r20-blink.png",
    "revision": "c5a348f0c96b0c5ea10f097038b114b0"
  },
  {
    "url": "assets/pink-sprite-r20.png",
    "revision": "959dc99361124abe8ec0750b1857675a"
  },
  {
    "url": "assets/purple-sprite-r20-blink.png",
    "revision": "3e79e75a0e619935624694fc1245c242"
  },
  {
    "url": "assets/purple-sprite-r20.png",
    "revision": "c64bbeb873b7d078bbad5922e15b2c63"
  },
  {
    "url": "assets/red-sprite-r20-blink.png",
    "revision": "97eb2a336b3c99d8cfa91496e1d4b115"
  },
  {
    "url": "assets/red-sprite-r20.png",
    "revision": "254e64ee82fa1c684a231c544efaa6e4"
  },
  {
    "url": "assets/selection1.wav",
    "revision": "8a475a3335c2ec35211ee850dd234f6f"
  },
  {
    "url": "assets/strow-icon-192.png",
    "revision": "7f807c1f91558657e23a2a17db65c7a3"
  },
  {
    "url": "assets/strow-logo.png",
    "revision": "229cd02d50d2ea79fe389439fae56e61"
  },
  {
    "url": "assets/strow.css",
    "revision": "82146c05e39555faec7a61699f711c72"
  },
  {
    "url": "assets/teal-sprite-r20-blink.png",
    "revision": "c015972434ea0f1c991b864852bdd10b"
  },
  {
    "url": "assets/teal-sprite-r20.png",
    "revision": "dc1200606fd9a3b701b869ff5676dfcb"
  },
  {
    "url": "assets/yellow-sprite-r20-blink.png",
    "revision": "fbf1990e3249a5fda85c44d9e96ff2de"
  },
  {
    "url": "assets/yellow-sprite-r20.png",
    "revision": "a7c2cc49a905d43485978d9475985e43"
  },
  {
    "url": "strow.bundle.js",
    "revision": "5"
  },
  {
    "url": "/habit-ui/habit-details.css",
    "revision": "a5cbf7990a75e68926d33a3d16c3aa09"
  },
  {
    "url": "/habit-ui/create-habit.css",
    "revision": "a5cbf7990a75e68926d33a3d16c3aa09"
  },
  {
    "url": "/ui/card.css",
    "revision": "a5cbf7990a75e68926d33a3d16c3aa09"
  },
  {
    "url": "/",
    "revision": "7e587e52c6c2ef1989ab75e07444de33"
  },
  {
    "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0",
    "revision": "7e587e52c6c2ef1989ab75e07444de3f"
  },
  {
    "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
    "revision": "7e587e52c6c2ef1989ab75e07444de3f"
  },
  {
    "url": "/manifest.json",
    "revision": "7e587e52c6c2ef1989ab75e07444de3sf"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
