import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../../features/events/eventsSlice";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    /* MODIFICAR */
    doubt: "",
    topic: "",
    question: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createEvent(formData));
    /* ¿ES NECESARIO? */
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del evento"
          /* MIRAR EN EL BACK */
          name="eventName"
          onChange={handleInputChange}
        />
      </form>
    </>
  );
};

export default CreateEvent;
