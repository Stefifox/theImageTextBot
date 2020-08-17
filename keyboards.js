module.exports = {
    start: [
            [{
                text: "Try Me",
                callback_data: "try"
            }]
        ],
        trySelection: [
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
            }, {
                text: "Red",
                callback_data: "r"
            }]
        ],
        fontSelection: [
            [{
                    text: "OpenSans",
                    callback_data: "Op0"
                },
                {
                    text: "Lemonada",
                    callback_data: "Op1"
                }
            ],
            [{
                text: "🔙 Back 🔙",
                callback_data: "backKey"
            }]
        ],
        colorSelection: [
            [{
                    text: "White",
                    callback_data: "white"
                },
                {
                    text: "Black",
                    callback_data: "black"
                }
            ],
            [{
                text: "Purple",
                callback_data: "purple"
            }],
            [{
                text: "🔙 Back 🔙",
                callback_data: "backKey"
            }]

        ],
        editKeyboard: [
            [{
                    text: "Colors",
                    callback_data: "colorKey"
                },
                {
                    text: "Fonts",
                    callback_data: "fontKey"
                }
            ],
            [{
                text: "Confirm",
                callback_data: "confirm"
            }]
        ],
        moreHelp: [
            [
                {
                    text: "StefifoxApps Channel",
                    url: "t.me/StefifoxApps"
                }
            ],
            [
                {
                    text: "Credits",
                    callback_data: "credit"
                }
            ]
        ],
        git: [
            [
                {
                    text: "GitHub",
                    url: "https://github.com/Stefifox/theImageTextBot"
                }
            ],
            [
                {
                    text: "🔙Back🔙",
                    callback_data: "backKey1"
                }
            ]
        ]
}