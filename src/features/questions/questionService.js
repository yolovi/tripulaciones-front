import axios from "axios";
const API_URL = "http://localhost:3000";

const createQuestion = async (formData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.post(API_URL + "/question/create", formData, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

const questionService = {
  createQuestion,
};

export default questionService;
