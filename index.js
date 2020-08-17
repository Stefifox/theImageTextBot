const Telegrambot = require("node-telegram-bot-api")
const png = require('text2png')
//LocalModules
const imageSettings = require('./imageOptions.js')
const keyboards = require("./keyboards.js")
//jsonFiles
const locale = require("./locales.json")
const set = require("./settings.json")
//LocalConst
const langList = ["en", "it"] //LanguageList 

var Telegram = new Telegrambot(set.apiKey, {
    polling: true
})

function getLanguage(msg) {
    return new Promise((resolve, reject) => {
        let lanCode = msg.from.language_code
        if (langList.indexOf(lanCode) !== -1) {
            resolve(lanCode)
            return
        }
        resolve('en')
    })
}


Telegram.on('text', msg => {
    //console.log(msg)

    if (msg.text.search("/") !== 0) {
        Telegram.sendPhoto(msg.chat.id, png(msg.text, imageSettings.options(1, 0)), { //Option 1, 0 is the default text color and font option
            reply_markup: {
                inline_keyboard: keyboards.editKeyboard
            }
        })
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
                case "/help":
                    Telegram.sendMessage(msg.chat.id, locale[lang].help, {
                        parse_mode: "HTML",
                        reply_markup: {
                            inline_keyboard: keyboards.moreHelp
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

/*Telegram.on("callback_query", query => {
    let image

    //Color Edit Query
    switch (query.data) {
        case "white":
            color = 1
            break
        case "black":
            color = 0
            break
        case "purple":
            color = 2
            break
    }
    switch (query.data) {
        case "Op0":
            font = 0
            break
        case "Op1":
            font = 1
            break
    }

    console.log(color, font)

    if(query.data === "confirm"){
        image = png("testo", imageSettings.options(color, font))
        Telegram.editMediaMessage({
            type: 'photo',
            media: image
        },
        {
            message_id: query.message.message_id,
            chat_id: query.from.id
        })
    }
    

})
*/
Telegram.on('callback_query', query => {
    //console.log(query)
    getLanguage(query).then(lang => {
        switch (query.data) {
            case "try":
                Telegram.editMessageText(locale[lang].colorSelection, {
                    message_id: query.message.message_id,
                    chat_id: query.from.id,
                    reply_markup: {
                        inline_keyboard: keyboards.trySelection
                    }
                })
                break;
                //Try Me Cases
            case "w":
                Telegram.sendPhoto(query.from.id, png(locale[lang].texts.white, imageSettings.options(0, 0)))
                break
            case "b":
                Telegram.sendPhoto(query.from.id, png(locale[lang].texts.black, imageSettings.options(1, 0)))
                break
            case "p":
                Telegram.sendPhoto(query.from.id, png(locale[lang].texts.purple, imageSettings.options(2, 0)))
                break
            case "r":
                Telegram.sendPhoto(query.from.id, png(locale[lang].texts.red, imageSettings.options(3, 0)))
                break
                //Edit Keyboards cases
            case "colorKey":
                Telegram.editMessageReplyMarkup({
                    inline_keyboard: keyboards.colorSelection
                }, {
                    message_id: query.message.message_id,
                    chat_id: query.from.id
                })
                break
            case "fontKey":
                Telegram.editMessageReplyMarkup({
                    inline_keyboard: keyboards.fontSelection
                }, {
                    message_id: query.message.message_id,
                    chat_id: query.from.id
                })
                break
            case "backKey":
                Telegram.editMessageReplyMarkup({
                    inline_keyboard: keyboards.editKeyboard
                }, {
                    message_id: query.message.message_id,
                    chat_id: query.from.id
                })
                break
            case "backKey1":
                Telegram.editMessageText(locale[lang].help, {
                    message_id: query.message.message_id,
                    chat_id: query.from.id,
                    reply_markup: {
                        inline_keyboard: keyboards.moreHelp
                    }
                })
                break
            case "credit":
                Telegram.editMessageText(locale[lang].credits, {
                    message_id: query.message.message_id,
                    chat_id: query.from.id,
                    reply_markup: {
                        inline_keyboard: keyboards.git
                    }
                })
                break
        }
    })
})