const Telegrambot = require("node-telegram-bot-api")
const png = require('text2png')
//const locale = require("./locale.json")
const set = require("./settings.json")

var Telegram = new Telegrambot(set.apiKey, {
    polling: true
})

var imageSettings = {
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
    lineSpacing: 10,
    padding: 20
}

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

Telegram.on('message', msg=>{
    console.log(msg)
    if(msg.text.search("/") !== 0){
       Telegram.sendPhoto(msg.chat.id, png(msg.text, imageSettings))
    }
})

Telegram.on('inline_query', query=>{
    //console.log(query);
    let results = []
    let img = png(query.query, imageSettings)
    results.push({
        id: '1',
        type: 'photo',
        title: 'Black',
        caption: query.query,
        photo_url: '',
        thumb_url: ''
    })
    Telegram.answerInlineQuery(query.id, results)
})