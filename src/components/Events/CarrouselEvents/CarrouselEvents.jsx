import React, { useEffect } from 'react';
import './CarrouselEvents.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../features/events/eventsSlice';
import { Spinner } from '@chakra-ui/react';
import LikeEvent from '../LikeEvent/LikeEvent';

const CarrouselEvents = () => {
  const navigate = useNavigate();
  const { events, isLoading } = useSelector(state => state.events);
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
  const handleDivClick = event => {
    navigate(`/eventdetail/${event._id}`);
  };
  const formatDate = isoDateString => {
    const options = { day: 'numeric', month: 'long' };
    return new Date(isoDateString).toLocaleDateString('es-ES', options);
  };
  return (
    <div className="scroll">
      {events.map(event => {
        return (
          <div
            key={event._id}
            className="evento-individual-scroll"
            onClick={() => {
              handleDivClick(event);
            }}
          >
            <div className="img-profile-scroll">
              <img src={event.image_url} alt="imagen del evento" />
            </div>
            <div className="contenido-individual-scroll">
              <div className="container-contenido">
                <div className="contenido-categoria">{event.category}</div>
                <div className="contenido-fecha">
                  <span className="fecha">{formatDate(event.date)}</span>:{' '}
                  <span className="hora">{event.time}</span>
                </div>
              </div>
              <div className="like">
                <LikeEvent />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CarrouselEvents;
