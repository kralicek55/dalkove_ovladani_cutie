radio.onReceivedValue(function (name, value) {
    if (name == "X") {
        X = value
    }
    if (name == "Y") {
        Y = value
    }
})
let Y = 0
let X = 0
radio.setGroup(90)
basic.showLeds(`
    . . # # .
    . . # # .
    # # # # .
    # # # # .
    . # . # .
    `)
basic.forever(function () {
    cuteBot.motors(Y + X, Y - X)
})
