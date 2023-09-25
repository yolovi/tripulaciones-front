import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../../features/events/eventsSlice";
import { Image, Spinner } from "@chakra-ui/react";
import "./GetEvents.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const GetEvents = () => {
  const navigate = useNavigate();
  const { events, isLoading } = useSelector((state) => state.events); 
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
  const formatDate = (isoDateString) => {
    const options = { day: "numeric", month: "long" };
    return new Date(isoDateString).toLocaleDateString("es-ES", options);
  };

  const handleDivClick = (event) => {
    navigate(`/eventdetail/${event._id}`);
  };
  return (
    <div className="eventos-grupo">
      {events.map((event) => {
        return (
          <div
            key={event._id}
            className="evento-individual"
            onClick={() => {
              handleDivClick(event);
            }}
          >
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
                  {event.category} - <span id="edem">{event.organization}</span>
                </div>
                <div className="flecha">
                  <span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </div>
              </div>
              <div className="fecha">
                {formatDate(event.date)}{" "}
                <span className="hora">{event.time}</span>
              </div>
            </div>
          </div>
        );
      })}
      <h2>Eventos</h2>
    </div>
  );
};

export default GetEvents;
