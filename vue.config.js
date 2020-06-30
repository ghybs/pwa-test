module.exports = {
  outputDir: "docs",
  // ...other vue-cli plugin options...
  pwa: {
    name: "My App",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      //swSrc: "dev/sw.js",
      swSrc: "src/service-worker.js",
      // ...other Workbox options...
    },
  },
};
