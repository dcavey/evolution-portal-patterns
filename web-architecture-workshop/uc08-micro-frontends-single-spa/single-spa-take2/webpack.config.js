const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "my-org";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    
    module: {
      rules: [
        // Ensure Babel handles .ts and .tsx files
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript"
              ],
            },
          },
        },
        // Rule for HTML files
        {
          test: /\.html$/,
          use: "raw-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs"
      })
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    }
  });
};
