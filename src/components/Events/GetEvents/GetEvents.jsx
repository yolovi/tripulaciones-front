import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvent,
  getAll,
} from "../../../features/events/eventsSlice";
import { Link } from "react-router-dom";
import { Image, Spinner } from "@chakra-ui/react";


const GetEvents = () => {
  const { user } = useSelector((state) => state.auth);
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
  return (
    <div>
      {events.map((event) => {
        return (
          <div key={event._id}>
            <h2>Título: {event.title}</h2>
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
            <button>
              <Link to={"/eventdetail/" + event._id}>Vista detalle</Link>
            </button>
            <button>
              <Link to={"/editevent/" + event._id}>Editar</Link>
            </button>
            <button onClick={() => dispatch(deleteEvent(event._id))}>
              Borrar
            </button>
          </div>
        );
      })}
      <h2>Eventos</h2>
    </div>
  );
};

export default GetEvents;
