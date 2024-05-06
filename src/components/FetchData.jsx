


const fetchApi2 = async(url, query)=>{
    let options = {

        params: {
          
          
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_Video_Api1,
          'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
      };

    let Base_Url = "https://youtube-v31.p.rapidapi.com/"
    // console.log(Base_Url + url + query)

          try {
            let response = await fetch(Base_Url + url + query, options);
            let data = await response.json();
            return data;
           
          
          } catch (error) {
            return error;
          }
  }

  export default fetchApi2;