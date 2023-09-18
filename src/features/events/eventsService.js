import axios from "axios";
const API_URL = "http://localhost:3001";

const createEvent = async (formData) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.post(API_URL + "/events/createEvent", formData, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

const editEvent = async (obj) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.put(
    API_URL + "/events/events/" + obj._id,
    obj.formData,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res.data;
};
const deleteEvent = async (doubtId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.delete(API_URL + "/events/events/" + eventId, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
const getAll = async () => {
    const res = await axios.get(API_URL + "/events/allEvents");
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



const eventsService = {
  createEvent,
  editEvent,
  deleteEvent,
  getAll,
  getById,
};

export default eventsService;
