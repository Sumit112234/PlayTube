import axios from 'axios';

// '059283218emsh9721a4cfa743d50p17207djsn6fe5bbfcc63e'



const options = {

  params: {
    // regionCode: 'IN',
    maxResults: '5',
    
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_Video_Api1,
    'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
  }
};

// try {
//   const response = await axios.get(`${}`,options);
//   console.log(response.data.items);
// } catch (error) {
//   console.error(error);
// }



const fetchApi = async(url,query, version)=>{

      let Base_Url = 'https://youtube-v2.p.rapidapi.com/';



    // console.log(Base_Url + url + query)
          try {
            const response = await axios.get(Base_Url + url + query, options);  // query : /search?part=snippet&q=chess
            return response;
            return response.data.items;
           
          
          } catch (error) {
            return error;
          }
  }

  export default fetchApi;