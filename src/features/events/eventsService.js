import axios from "axios";
const API_URL = "http://localhost:3000";

const createEvent = async (formData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.post(API_URL + "/events/create", formData, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

const editEvent = async (obj) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.put(API_URL + "/events/id/" + obj._id, obj.formData, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
const deleteEvent = async (eventId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.delete(API_URL + "/events/delete/" + eventId, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
const getAll = async () => {
  const res = await axios.get(API_URL + "/events/getall");
  return res.data;
};

const getById = async (_id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(API_URL + "/events/id/" + _id, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
const like = async (_id) => {
  const token = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/events/like/" + _id,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
};

const eventsService = {
  createEvent,
  editEvent,
  deleteEvent,
  getAll,
  getById,
  like,
};

export default eventsService;
