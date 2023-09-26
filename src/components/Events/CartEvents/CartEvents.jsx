import React, { useEffect } from "react";
import "./CartEvents.scss";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../../features/events/eventsSlice";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../../utils/utils";
const CartEvents = () => {
  const { event, isLoading } = useSelector((state) => state.events);
  const { _id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getById(_id));
  }, [_id, dispatch]);

  return (
    <>
      <h2 className="carrito-h2">
        Carrito{" "}
        <span className="flecha-izq">
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
      </h2>
      <div key={_id}>
        <div className="tarjeta-evento-carrito">
          <div className="evento-carrito">
            <div className="contenido-evento-carrito">
              <div className="img-evento-carrito">
                <img src={event.image_url} alt="imagen del evento" />
              </div>
              <div className="info-evento-carrito">
                <h3>{event.title}</h3>
                <div className="datos-evento-carrito">
                  <div>{event.organization}</div>
                  <div>{formatDate(event.date)}</div>
                  <div>
                    {event.time}-{event.timeEnd}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="aviso-evento-carrito">
            <p>Solo quedan 2 entradas</p>
          </div>
        </div>
      </div>
      <div className="entradas">
        <h2>Entradas</h2>
        <div className="cantidad">
          <span className="numero">x1</span>{" "}
          <span className="titulo">"{event.title}"</span>
        </div>
      </div>
      <div className="confirmar">
        <hr />
        <p className="total">Total a pagar</p>
        <div className="boton-confirmar">Confirmar</div>
      </div>
    </>
  );
};

export default CartEvents;
