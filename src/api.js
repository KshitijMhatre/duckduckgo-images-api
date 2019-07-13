const axios = require('axios');
const { url, headers, max_iter, max_retries } = require('./constants')
const { sleep, getToken } = require('./utils')


async function image_search({ query, moderate, retries, iterations }) {

    let reqUrl = url + 'i.js';
    let keywords = query
    let p = moderate ? 1 : -1;      // by default moderate false
    let attempt = 0;
    if (!retries) retries = max_retries; // default to max if none provided
    if (!iterations) iterations = max_iter; // default to max if none provided

    let results = [];

    try {

        let token = await getToken(keywords);

        let params = {
            "l": "wt-wt",
            "o": "json",
            "q": keywords,
            "vqd": token,
            "f": ",,,",
            "p": "" + (p)
        }

        let data = null;
        let itr = 0;


        while (itr < iterations) {

            while (true) {
                try {

                    let response = await axios.get(reqUrl, {
                        params,
                        headers
                    })

                    data = response.data;
                    if (!data.results) throw "No results";
                    break;

                } catch (error) {
                    console.error(error)
                    attempt += 1;
                    if (attempt > retries) {
                        return new Promise((resolve, reject) => {
                            resolve(results)
                        });
                    }
                    await sleep(5000);
                    continue;
                }

            }
            
            results = [...results, ...data.results]
            if (!data.next) {
                return new Promise((resolve, reject) => {
                    resolve(results)
                });
            }
            reqUrl = url + data["next"];
            itr += 1;
            attempt = 0;
        }

    } catch (error) {
        console.error(error);
    }
    return results;

}



async function* image_search_generator({ query, moderate, retries, iterations }) {

    let reqUrl = url + 'i.js';
    let keywords = query
    let p = moderate ? 1 : -1;      // by default moderate false
    let attempt = 0;
    if (!retries) retries = max_retries; // default to max if none provided
    if (!iterations) iterations = max_iter; // default to max if none provided

    

    try {

        let token = await getToken(keywords);

        let params = {
            "l": "wt-wt",
            "o": "json",
            "q": keywords,
            "vqd": token,
            "f": ",,,",
            "p": "" + (p)
        }
        
        let itr = 0;


        while (itr < iterations) {

            let data = null;

            while (true) {
                try {

                    let response = await axios.get(reqUrl, {
                        params,
                        headers
                    })

                    data = response.data;
                    if (!data.results) throw "No results";
                    break;

                } catch (error) {
                    console.error(error)
                    attempt += 1;
                    if (attempt > retries) {
                        
                        yield await new Promise((resolve, reject) => {                            
                            reject('attempt finished')                            
                        })

                    }
                    await sleep(5000);
                    continue;
                }

            }
            

            yield await new Promise((resolve, reject) => {                
                resolve(data.results)
            })


            reqUrl = url + data["next"];
            itr += 1;
            attempt = 0;
        }

    } catch (error) {
        console.error(error);
    }    

}



module.exports = { image_search, image_search_generator };


