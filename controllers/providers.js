const axios = require("axios");


const getLocation = async (req, res) => {
  const { lat, lng } = req.body;
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_KEY}`
    );
    const data = await response.json(); 
    console.log(data)
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
};




const findProviders = async (req, res) => {
     const { query } = req.body;
     let data = JSON.stringify({
       q: query,
       num: 30,
     });
    
    let config = {
      method: "post",
      url: "https://google.serper.dev/search",
      headers: {
        "X-API-KEY": process.env.SERP_KEY,
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const getProviders = await axios(config)
      res.json(getProviders.data)
      console.log(getProviders.data)
    } catch (error){
      console.error(error)
    }
}

module.exports = { findProviders, getLocation };