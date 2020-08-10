const Telegrambot = require("node-telegram-bot-api")
const png = require('text2png')
const locale = require("./locales.json")
const set = require("./settings.json")

var Telegram = new Telegrambot(set.apiKey, {
    polling: true
})

// ImageSettings
var imageSettings = [{
        color: 'black',
        backgroundColor: 'white',
        textAlign: 'center',
        lineSpacing: 10,
        padding: 20,
        font: '40px Lemonada',
        localFontPath: 'resources/Lemonada.ttf',
        localFontName: 'Lemonada'
    },
    {
        color: 'white',
        backgroundColor: 'black',
        textAlign: 'center',
        lineSpacing: 10,
        padding: 20,
        font: '40px Lemonada',
        localFontPath: 'resources/Lemonada.ttf',
        localFontName: 'Lemonada'
    }
]

//var startKeyboard = 

function getLanguage(msg) {
    return new Promise((resolve, reject) => {
        let lanCode = msg.from.language_code
        if (lanCode === 'en' || lanCode === 'it') {
            resolve(lanCode)
            return
        }
        resolve('en')
    })
}

Telegram.on('message', msg => {
    console.log(msg)
    if (msg.text.search("/") !== 0) {
        Telegram.sendPhoto(msg.chat.id, png(msg.text, imageSettings[0]))
    } else {
        getLanguage(msg).then(lang => {
            switch (msg.text) {
                case "/start":
                    Telegram.sendMessage(msg.chat.id, locale[lang].welcome)
                    break
                default:
                    Telegram.sendMessage(msg.chat.id, locale[lang].null)
                    break
            }
        })
    }
})

Telegram.on('inline_query', query => {
    //console.log(query);
    let results = []
    let img = [png(query.query, imageSettings[0]), png(query.query, imageSettings[1])]
    results.push({
        id: 'black',
        type: 'photo',
        title: 'Black',
        caption: query.query,
        photo_file_id: 'resources/black.png',
        //thumb: './resources/black.png'
   })
  /* results.push({
        id: 'white',
        type: 'photo',
        title: 'White',
        caption: query.query,
        //photo_url: './resources/white.png',
        //thumb_url: './resources/white.png'
    })*/
    Telegram.answerInlineQuery(query.id, results)
})