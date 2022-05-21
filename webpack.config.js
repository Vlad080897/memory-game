module.exports = {
  module: {
    rules: [
      {
        test: /\.png|jpg|jpeg$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
    ],
  },
};
