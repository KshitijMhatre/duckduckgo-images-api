const axios = require('axios');
const {url} = require('./constants') 

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

async function getToken(keywords) {

    let token = null;
    try {
        let res = await axios.get(url, {
            params: {
                q: keywords
            }
        })

        token = res.data.match(/vqd=([\d-]+)\&/)[0].substring(4)

    } catch (error) {
        console.error(error)
    }

    return new Promise((resolve, reject) => {
        if (!token)
            reject('Failed to get token')
        resolve(token)
    })

}

module.exports ={
    sleep,    
    getToken
}