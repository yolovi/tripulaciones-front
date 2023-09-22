import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getAll } from "../../../features/events/eventsSlice";
import { Link } from "react-router-dom";
import { Image, LinkOverlay, Spinner } from "@chakra-ui/react";
import "./GetEvents.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
const GetEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events); // Accede a la lista de eventos desde el estado de Redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
  }, []);
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
  /* FORMATEO FECHA */
  const formatDate = (isoDateString) => {
    const options = { day: "numeric", month: "long" };
    return new Date(isoDateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="eventos-grupo">
      {events.map((event) => {
        return (
          <div key={event._id} className="evento-individual">
            <LinkOverlay href={`/eventdetail/${event._id}`}>
              <div className="container-img-profile">
                <div className="img-profile">
                  {event.image ? (
                    <Image
                      className="img-profile"
                      objectFit="cover"
                      maxW={{ base: "100%", sm: "200px" }}
                      src={event.image_url}
                      alt="avatar-profile-image"
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="info-evento">
                <div className="category">
                  <div className="texto">
                    {event.category} - <span id="edem">EDEM</span>
                  </div>
                  <div className="flecha">
                    <span>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                  </div>
                </div>
                <div className="fecha">
                  {formatDate(event.date)}{" "}
                  <span className="hora">17:00- 19:30</span>
                </div>
              </div>
              {/* BOTONES COMENTADOS */}
              {/* <button>
              <Link to={"/eventdetail/" + event._id}>Vista detalle</Link>
            </button>
            <button>
              <Link to={"/editevent/" + event._id}>Editar</Link>
            </button>
            <button onClick={() => dispatch(deleteEvent(event._id))}>
              Borrar
            </button> */}
            </LinkOverlay>
          </div>
        );
      })}
      <h2>Eventos</h2>
    </div>
  );
};

export default GetEvents;
