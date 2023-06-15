const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// console.log("process.env.foo", process.env.foo);
// const production = process.env.NODE_ENV;

module.exports = {
  entry: {
    main: "./src/scripts/index.js",
  },
  output: {
    filename: "scripts/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    hot: true,
    open: true, // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // добавьте объект options
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
    // }),
  ],

  devtool: "eval-source-map",
};
