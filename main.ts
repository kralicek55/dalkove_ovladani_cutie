radio.onReceivedString(function (receivedString) {
    if (receivedString == "ZmenMuzesJet") {
        zmen_muzes_jet()
    }
    if (receivedString == "ZmenVystrazne") {
        zmen_vystrazne_svetla()
    }
})
function zmen_vystrazne_svetla () {
    if (blikej_vystrazne == 0) {
        blikej_vystrazne = 1
    } else {
        blikej_vystrazne = 0
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "X") {
        X = value
    }
    if (name == "Y") {
        Y = value
    }
})
function zmen_muzes_jet () {
    if (muzu_jet == 0) {
        muzu_jet = 1
    } else {
        muzu_jet = 0
    }
    if (muzu_jet == 1) {
        basic.showLeds(`
            . . # . .
            . . . # .
            . # # # .
            . # . # .
            . # # # .
            `)
    } else {
        basic.showLeds(`
            . . # . .
            . # . # .
            . # # # .
            . # . # .
            . # # # .
            `)
    }
}
// Zastavit když je před překážkou.
// Zatrub na tlačítko C
// BONUS: udělat něco na všechny tlačítka! :)
let rychlost_prave_kolo = 0
let rychlost_leve_kolo = 0
let Y = 0
let X = 0
let blikej_vystrazne = 0
let muzu_jet = 0
radio.setGroup(90)
basic.showLeds(`
    . . # # .
    . . # # .
    # # # # .
    # # # # .
    . # . # .
    `)
muzu_jet = 0
blikej_vystrazne = 0
let led_pasek = neopixel.create(DigitalPin.P15, 2, NeoPixelMode.RGB)
let leva_led = led_pasek.range(0, 1)
let prava_led = led_pasek.range(1, 1)
let obe_led = led_pasek.range(0, 2)
// Rychlost kol
// 
basic.forever(function () {
    rychlost_leve_kolo = Y + X
    rychlost_prave_kolo = Y - X
    if (muzu_jet == 1) {
        cuteBot.motors(rychlost_leve_kolo, rychlost_prave_kolo)
    } else {
        cuteBot.stopcar()
    }
})
basic.forever(function () {
    if (input.lightLevel() == 10) {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xffffff)
    } else {
        cuteBot.closeheadlights()
    }
    basic.pause(1000)
})
// výstražné světla
basic.forever(function () {
    if (blikej_vystrazne == 1) {
        obe_led.showColor(neopixel.colors(NeoPixelColors.Orange))
        basic.pause(500)
        obe_led.showColor(neopixel.colors(NeoPixelColors.Black))
        basic.pause(200)
    }
})
// Směrovky
basic.forever(function () {
    if (rychlost_leve_kolo > 0 && rychlost_prave_kolo > 0) {
        if (rychlost_leve_kolo - rychlost_prave_kolo > 20) {
            for (let index = 0; index < 4; index++) {
                prava_led.showColor(neopixel.colors(NeoPixelColors.Orange))
                basic.pause(250)
                prava_led.showColor(neopixel.colors(NeoPixelColors.Black))
                basic.pause(100)
            }
        }
        if (rychlost_prave_kolo - rychlost_leve_kolo > 20) {
            for (let index = 0; index < 4; index++) {
                leva_led.showColor(neopixel.colors(NeoPixelColors.Orange))
                basic.pause(250)
                leva_led.showColor(neopixel.colors(NeoPixelColors.Black))
                basic.pause(100)
            }
        }
    }
})
