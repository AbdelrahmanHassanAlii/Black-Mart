import axios from "axios";

const GetAllReviews = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/review");
    console.log(response.data.reviews);
    return response.data.reviews;  
  } catch (error) {
    console.error("Error fetching reviews:", error);
    
    return null;
  }
}

export default GetAllReviews;
