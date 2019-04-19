const { image_search , image_search_generator } = require('../src/api')

function print(results) {

    results.forEach(element => {
        console.log(element)
    });
}


//image search completes all iterations and returns the complete results at once
image_search({ query: "naruto", moderate: true }).then(results=>print(results))

//image search genrator returns result of each iteration useful for large no of iterations
async function main(){
    for await (let resultSet of image_search_generator({ query: "naruto", moderate: true ,iterations :4})){
      print(resultSet)
    }
  }
  
main().catch(console.log);
