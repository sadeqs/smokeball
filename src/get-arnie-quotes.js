const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const results = await Promise.all(
    urls.map( async url => {
      try{
        const result = await httpGet(url);
        const message = JSON.parse(result.body).message
        if(result.status === 200) {
          return {'Arnie Quote': message};
        }
        throw new Error(message);
        /** 
         * to catch every probable error when real httpGet is implemented plus errors returned from server
         * There wasn't any requirement to seperate different types of error, so, I implemented all of them as 'FAILURE'
         * */
      } catch (e){
        return {'FAILURE': e.message};
      }
    })
  )
  return results;
};

module.exports = {
  getArnieQuotes,
};
