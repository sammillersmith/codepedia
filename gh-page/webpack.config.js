const path = require("path");
const middleware = require("webpack-dev-middleware");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "index"),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },

  module: {
    rules: [
      //  use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      // css & style loader for css
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      // also handle scss files
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      // font loader
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [],

  devServer: {
    contentBase: [path.join(__dirname, "../"), path.join(__dirname, "../..")],
    publicPath: "/codepedia/gh-page/dist/",
    compress: true,
    port: 5050,
    historyApiFallback: true,
  },
};
