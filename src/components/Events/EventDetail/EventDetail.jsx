import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../../features/events/eventsSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AspectRatio, Spinner } from "@chakra-ui/react";
import LikeEvent from "../LikeEvent/LikeEvent";
import "./EventDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faLocationDot,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

const EventDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { event, isLoading } = useSelector((state) => state.events);
  const { _id } = useParams();
  useEffect(() => {
    dispatch(getById(_id));
  }, [_id, dispatch]);
  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#F9CA92"
        size="xl"
      />
    );
  }
  // Función para formatear la fecha
  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
  }
  const fechaFormateada = formatearFecha(event.date);
  const handleDivClick = (eventId) => {
    navigate(`/cart/${eventId}`);
  };
  return (
    <>
      <div className="imagen-detalle">
        <img src={event.image_url} alt="imagen del evento" />
      </div>
      <div className="contenido-detalle">
        <div className="titulo-guardar">
          <div className="titulo-detalle">{event.title}</div>
          <div className="guardar-detelle">
            <LikeEvent />
          </div>
        </div>
        <div className="descripcion-detalle">
          <h2>Descripción</h2>
          <span className="descripcion">{event.body}</span>
        </div>
        <div className="info-detalle">
          <div className="info-detalle-izquierda">
            <div className="elemento-info-detalle">
              <span className="icono">
                <FontAwesomeIcon icon={faCalendar} />
              </span>
              <span className="texto">{fechaFormateada}</span>
            </div>
            <div className="elemento-info-detalle">
              <span className="icono">
                <FontAwesomeIcon icon={faClock} />
              </span>
              <span className="texto">
                {event.time} - {event.timeEnd || "Indefinido"}
              </span>
            </div>
          </div>
          <div className="info-detalle-derecha">
            <div className="elemento-info-detalle">
              <span className="icono">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
              <span className="texto">{event.organization}</span>
            </div>
            <div className="elemento-info-detalle">
              <span className="icono">
                <FontAwesomeIcon icon={faTv} />
              </span>
              <span className="texto">{event.modality || "No definido"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container-ponentes">
        <h2>Ponentes</h2>

        <div className="img-y-ponente">
          <div className="img-ponente">
            <img src={event.image_url} alt="" />
          </div>
          <div className="ponentes">{event.speaker}</div>
        </div>
      </div>
      <div className="map-container">
        <AspectRatio ratio={16 / 9}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3080.3224740740065!2d-0.33394911543156214!3d39.46204304000161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6048b3e50495e7%3A0xb747be7e5c90365!2sEDEM%20Escuela%20de%20Empresarios!5e0!3m2!1ses!2ses!4v1695652106059!5m2!1ses!2ses" />
        </AspectRatio>
      </div>
      <div className="inscribirme">
        <button className="inscribirme-boton" onClick={handleDivClick}>
          Inscríbete
        </button>
      </div>
    </>
  );
};

export default EventDetail;
