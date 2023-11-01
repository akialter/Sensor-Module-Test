// this function select with channel to write to and read from
function tcaselect (channel: number) {
// Select the channel by writing the channel mask to the multiplexer
    pins.i2cWriteNumber(
        TCAADDR,
        1 << channel,
        NumberFormat.UInt8BE,
        false
    )
}
// this function select the I2C address of the multiplexer
// A0 A1 A2     I2C
// 0  0  0      0x70
// 1  0  0      0x71
// 0  1  0      0x72
// 1  1  0      0x73
// 0  0  1      0x74
// 1  0  1      0x75
// 0  1  1      0x76
// 1  1  1      0x77
// function setGPIOPins (A0Value: number, A1Value: number, A2Value: number) {
//     // Set the GPIO pins according to the provided values
//     pins.digitalWritePin(DigitalPin.P0, A0Value)
//     pins.digitalWritePin(DigitalPin.P1, A1Value)
//     pins.digitalWritePin(DigitalPin.P2, A2Value)
// }
// Replace with your multiplexer's I2C address
let TCAADDR = 0x73
// setGPIOPins(0, 1, 0)
// tests go here; this will not be compiled when this package is used as a library
Rangefinder.init()
console.log("Init successfully!");
basic.forever(function () {
    // select 1st sensor connecting to port 0
    tcaselect(0)
    Rangefinder.init()
    let distance1 = Rangefinder.distance()
    serial.writeString("Sensor 1 Distance: " + distance1)
    serial.writeString("\r\n")

    pause(50)

    // select 2nd sensor connecting to port 2
    tcaselect(2)
    Rangefinder.init()
    let distance2 = Rangefinder.distance()
    serial.writeString("Sensor 2 Distance: " + distance2)
    serial.writeString("\r\n")

    if (distance1 >= 30 && distance1 <= 40 && (distance2 < 30 || distance2 > 40)) {
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else if (distance2 >= 30 && distance2 <= 40 && (distance1 < 30 || distance1 > 40)) {
        music.playTone(294, music.beat(BeatFraction.Whole))
    }
    
    pause(50)

})


// basic.forever(function () {
//     // select 1st sensor connecting to port 0
//     // tcaselect(0)
//     serial.writeString("Sensor 1 Distance:                        " + Rangefinder.distance());
//     serial.writeString("\r\n")
//     pause(50)
//     // // // select 1st sensor connecting to port 1
//     // tcaselect(2)
//     // serial.writeString("Sensor 2 Distance: " + Rangefinder.distance());
//     // serial.writeString("\r\n")
//     // pause(50)
// })
