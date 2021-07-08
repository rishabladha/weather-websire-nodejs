



const request = require('request')

const forcast = (longitude, latitude, callback) => {


    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=9ff874c7957a7ede53c39454a68123b0'

    request({ url, json: true }, (error, {body}) => {

        const { current } = body
        if (error) {
            callback('unable to connect to location services', undefined)
        }
        else if (body.cod) {
            callback('place error!', undefined)
        }
        else {
            const temp = current.temp

            const humidity = current["humidity"]
            const condition = current.weather[0].description

            data = {
                temp,
                humidity,
                condition
            }
            callback(error, data)
        }

    }





    )

}



module.exports = forcast;
