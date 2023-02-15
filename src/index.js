const swBuild = require("./builder");

module.exports = {
  configFunction: (eleventyConfig, options = {}) => {
    function postBuild() {
      eleventyConfig.on("eleventy.after", () => {
        const outputDir = eleventyConfig.dir.output;
        process.on("unhandledRejection", (reason) => {
          console.log("Reason: " + reason);
        });

        swBuild(options, outputDir).then((res) => console.log(res));
      });
    }
    setImmediate(postBuild);
  },
};
