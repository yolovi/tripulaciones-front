import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../features/events/eventsSlice';
import { Spinner } from '@chakra-ui/react';
import './GetEvents.scss';
import CardSlider from '../../Tools/CardSlider/CardSlider';

const GetEvents = () => {
  const { events, isLoading } = useSelector(state => state.events);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
  }, []);

  if (isLoading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#F9CA92"
        size="xl"
      />
    );

  return (
    <div className="eventos-grupo">
      {events.map((event, i) => {
        return (
          <CardSlider
            key={i}
            _id={event._id}
            image={event.image_url}
            category={event.category}
            date={event.date}
            time=""
          />
        );
      })}
    </div>
  );
};

export default GetEvents;
