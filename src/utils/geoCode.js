const request = require('request')


const geocode = (address, callback) => {


    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmlzaGFibGFkaGEiLCJhIjoiY2txcnV3YnlyMGQxczJvbzNqb3doazN0NyJ9.bHRBMvuvVawy1A-vZ07mFw'

    // console.log(url);
    request({ url: url, json: true }, (error, { body }) => {


        const { features } = body
        if (error) {
            callback('unable to connect to location services', undefined)
        }
        else if (body.features.length === 0) {
            callback('place error!', undefined)
        }
        else {
            const latitude = features[0].center[0]
            const longitude = features[0].center[1]
            data = {
                latitude,
                longitude
            }
            callback(error, data)
        }


    }

    )
}


module.exports = geocode;
