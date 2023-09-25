import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../../features/events/eventsSlice";
import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import LikeEvent from "../LikeEvent/LikeEvent";
import "./EventDetail.scss";

const EventDetail = () => {
  const dispatch = useDispatch();
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

  return (
    <>
      <div className="imagen-detalle">{event.image_url}</div>
      <div className="contenido-detalle">
        <div className="titulo-guardar">
          <div className="titulo-detalle">{event.title}</div>
          <div className="guardar">
            <LikeEvent />
          </div>
        </div>
        <div className="descripcion-detalle">{event.body}</div>
        <div className="info-detalle">
          <div>fecha</div>
          <div>hora</div>
          <div>sala</div>
          <div>modalidad</div>
        </div>
      </div>
      <div className="inscribirme">
        <button className="inscribirme-boton">Inscribirme</button>
      </div>
    </>
  );
};

export default EventDetail;
