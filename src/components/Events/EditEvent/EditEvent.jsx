import React, { useState } from "react";
import { editEvent } from "../../../features/events/eventsSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const EditEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    price: "0",
    date: "00/00/00",
    place: "",
    capacity: "0",
    speaker: "",
    image: Image,
    category:"",
  });
  const dispatch = useDispatch();
  const { _id } = useParams();
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editEvent({ _id, formData }));
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
        {/* AÑADIR ETIQUETAS PARA ELEGIR LA CATEGORIA DEL EVENTO */}
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
        <button type="submit">Aceptar cambios</button>
      </form>
    </>
  );
};

export default EditEvent;
