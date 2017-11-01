module.exports = {
  "globDirectory": "./app",
  "globPatterns": [
    "./assets/*.{xml,iml,js,wav,css,mp3,flac,html,png,json}",
    "./strow.bundle.js",
    "./index.html"
  ],
  "swDest": "./app/sw.js",
  "globIgnores": [
    "workbox-cli-config.js"
  ]
};
