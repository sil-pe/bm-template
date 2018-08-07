# HTML Templates

The purpose of the HTML Templates is to have a defined structure to be used by both seriesplayer and styleguide applications.

Seriesplayer and Styleguide template are slightly different, that's why it's needed the existence of separated files.

These files are used by HtmlWebpackPlugin to generate the final HTML that will be used in the application.

## Seriesplayer

`index_app.html` is used at `webpack.app.config.js` when defining the path of HtmlWebpackPlugin.
