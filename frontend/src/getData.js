const axios = require("axios");

// Make a request for a user with a given ID

async function getData() {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:8000/api/v1/stats",
      responseType: "stream",
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default getData;
