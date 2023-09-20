import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../../features/events/eventsSlice";
import "./CreateEvent.scss";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    price: "0",
    date: "00/00/00",
    place: "",
    capacity: "0",
    speaker: "",
    image: "",
    category:"",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    try {
      const imageFile = event.target.elements.image.files[0];
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("title", event.target.elements.title.value);
      formData.append("body", event.target.elements.body.value);
      formData.append("price", event.target.elements.price.value);
      formData.append("date", event.target.elements.date.value);
      formData.append("place", event.target.elements.place.value);
      formData.append("capacity", event.target.elements.capacity.value);
      formData.append("speaker", event.target.elements.speaker.value);
      formData.append("category", event.target.elements.category.value);

      await dispatch(createEvent(formData));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* HAY QUE METER LAS ALERTAS */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del evento"
          name="title"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Descripción del evento"
          name="body"
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Precio de la entrada"
          name="price"
          onChange={handleInputChange}
        />
        <input
          type="date"
          placeholder="Fecha"
          name="date"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Lugar"
          name="place"
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Asistentes"
          name="capacity"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Ponente"
          name="speaker"
          onChange={handleInputChange}
        />
        {/* NO SE SI ES NECESARIO EL HANDLE INPUT */}
        <select name="category" onChange={handleInputChange}>
          <optgroup label="Categoría">
            <option value="Finanzas e inversión">Finanzas e inversión</option>
            <option value="Gestión empresarial">Gestión empresarial</option>
            <option value="Habilidades directivas">
              Habilidades directivas
            </option>
            <option value="Marketing">Marketing</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Emprendimiento">Emprendimiento</option>
            <option value="Sociedad">Sociedad</option>
          </optgroup>
        </select>

        <input type="file" name="image" id="file" />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default CreateEvent