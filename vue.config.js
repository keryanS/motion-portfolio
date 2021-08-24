module.exports = {
  css: {
    loaderOptions: {
      sass: {
          additionalData: `
          @import "@/css/style.scss";
          `
      }
    }
  }
};