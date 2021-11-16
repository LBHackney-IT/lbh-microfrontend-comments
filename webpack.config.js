const path = require("path");

const { ImportMapWebpackPlugin } = require("@hackney/webpack-import-map-plugin");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { merge } = require("webpack-merge");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mtfh",
    projectName: "comments",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    entry: {
      comments: defaultConfig.entry,
    },
    output: {
      filename: "[name].[contenthash].js",
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            "style-loader",
            { loader: "css-loader", options: { sourceMap: false } },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    cssnano({
                      autoprefixer: false,
                      discardComments: {
                        removeAll: true,
                      },
                    }),
                    autoprefixer({ remove: false }),
                  ],
                },
                sourceMap: false,
              },
            },
            {
              loader: "sass-loader",
              options: { sourceMap: false },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@services": path.resolve(__dirname, "src/services"),
        "@utilities": path.resolve(__dirname, "src/utils"),
      },
      extensions: [".ts", ".tsx", ".js"],
    },
    externals: ["@mtfh/common", "react-router-dom", "formik", "yup"],
    plugins: [
      new ImportMapWebpackPlugin({
        namespace: "@mtfh",
        basePath: process.env.APP_CDN || "http://localhost:8050",
      }),
    ],
  });
};
