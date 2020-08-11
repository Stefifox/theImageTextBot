const Telegrambot = require("node-telegram-bot-api")
const png = require('text2png')
const imageSettings = require('./imageOptions.js')
const locale = require("./locales.json")
const set = require("./settings.json")

var Telegram = new Telegrambot(set.apiKey, {
    polling: true
})

var keyboards = {
    start: [
        [{
            text: "Try Me",
            callback_data: "try"
        }]
    ],
    colorSelection: [
        [{
            text: "White",
            callback_data: "w"
        }, {
            text: "Black",
            callback_data: "b"
        }],
        [{
            text: "Purple",
            callback_data: "p"
        }]

    ],
}

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
    //console.log(msg)
    if (msg.text.search("/") !== 0) {
        Telegram.sendPhoto(msg.chat.id, png(msg.text, imageSettings.purple))
    } else {
        getLanguage(msg).then(lang => {
            switch (msg.text) {
                case "/start":
                    Telegram.sendMessage(msg.chat.id, locale[lang].welcome, {
                        reply_markup: {
                            inline_keyboard: keyboards.start
                        }
                    })
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
    //Telegram.answerInlineQuery(query.id, results)
})

Telegram.on('callback_query', query => {

    //console.log(query)
    getLanguage(query).then(lang => {
        switch (query.data) {
            case "try":
                Telegram.editMessageText(locale[lang].colorSelection, {
                    message_id: query.message.message_id,
                    chat_id: query.from.id,
                    reply_markup: {
                        inline_keyboard: keyboards.colorSelection
                    }
                })
                break;
            case "w":
                Telegram.sendPhoto(query.from.id, png(locale[lang].texts.white, imageSettings.white))
                break
            case "b":
                Telegram.sendPhoto(query.from.id, png(locale[lang].texts.black, imageSettings.black))
                break
            case "p":
                Telegram.sendPhoto(query.from.id, png(locale[lang].texts.purple, imageSettings.purple))
                break
        }
    })
})