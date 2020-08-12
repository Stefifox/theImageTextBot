var fontList = ['40px OpenSans', '40px OpenSans']
var fontListPosition = ['resources/OpenSans.ttf', 'resources/Lemonada.ttf']
var fontListName = ['OpenSans','Lemonada']
var colorList = ['white', 'black', '#8A00FF', '#FF2424']
var bgColorList = ['black', 'white', 'white', 'white']

module.exports = {
    options: function (color, font) {
        return {
            color: colorList[color],
            backgroundColor: bgColorList[color],
            textAlign: 'center',
            lineSpacing: 10,
            padding: 20,
            font: fontList[font],
            localFontPath: fontListPosition[font],
            localFontName: fontListName[font]
        }
    }
}