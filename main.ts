radio.onReceivedValue(function (name, value) {
    if (name == "X") {
        X = value
    }
    if (name == "Y") {
        Y = value
    }
})
let rychlost_prave_kolo = 0
let rychlost_leve_kolo = 0
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
    if (rychlost_leve_kolo - rychlost_prave_kolo > 20) {
        for (let index = 0; index < 4; index++) {
            cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0xff8000)
            basic.pause(250)
            cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0x000000)
            basic.pause(100)
        }
    }
    if (rychlost_prave_kolo - rychlost_leve_kolo > 20) {
        for (let index = 0; index < 4; index++) {
            cuteBot.colorLight(cuteBot.RGBLights.RGB_R, 0xff8000)
            basic.pause(250)
            cuteBot.colorLight(cuteBot.RGBLights.RGB_R, 0x000000)
            basic.pause(100)
        }
    }
})
basic.forever(function () {
    rychlost_leve_kolo = Y + X
    rychlost_prave_kolo = Y - X
    cuteBot.motors(rychlost_leve_kolo, rychlost_prave_kolo)
})
