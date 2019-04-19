module.exports = {
    url : 'https://duckduckgo.com/',
    headers : {
        'dnt': '1',
        'accept-encoding': 'gzip, deflate, sdch, br',
        'x-requested-with': 'XMLHttpRequest',
        'accept-language': 'en-GB,en-US;q=0.8,en;q=0.6,ms;q=0.4',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'referer': 'https://duckduckgo.com/',
        'authority': 'duckduckgo.com',
    },
    max_iter : 2,
    max_retries : 2,
    params_template :{
        l: "wt-wt",
        o: "json",
        q: null,
        vqd: null,
        f: ",,,",
        p: null
    }
}