import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../../../features/events/eventsSlice";
import "./CreateEvent.scss";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    /* if (isError) {
      return;
    } */
    const formData = new FormData();
    try {
      if (event.target.image.files[0])
        formData.set("image", event.target.image.files[0]);
      formData.set("title", event.target.title.value);
      formData.set("body", event.target.body.value);
      formData.set("price", event.target.price.value);
      formData.set("date", event.target.date.value);
      formData.set("place", event.target.place.value);
      formData.set("capacity", event.target.capacity.value);
      formData.set("speaker", event.target.speaker.value);
      formData.set("category", event.target.category.value);
      formData.set("organization", event.target.organization.value);
      formData.set("time", event.target.time.value);

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
          required
        />
        <input
          type="text"
          placeholder="Descripción del evento"
          name="body"
          required
        />
        <input
          type="number"
          placeholder="Precio de la entrada"
          name="price"
          required
        />
        <input type="date" placeholder="Fecha" name="date" required />
        <input type="text" placeholder="Lugar" name="place" required />
        <input
          type="number"
          placeholder="Asistentes"
          name="capacity"
          required
        />
        <input type="text" placeholder="Ponente" name="speaker" required />
        <select name="category">
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
        <select name="organization">
          <option value="Edem">Edem</option>
          <option value="Lanzadera">Lanzadera</option>
          <option value="MDE">MDE</option>
          <option value="Otro">Otro</option>
        </select>
        <input type="time" name="time"/>
        <input type="file" name="image" id="file" />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default CreateEvent;
