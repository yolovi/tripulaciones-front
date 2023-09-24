import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../../features/events/eventsSlice";
import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import LikeEvent from "../LikeEvent/LikeEvent";

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
    <div key={event._id}>
      <h2>Título: {event.title}</h2>
      <h2>Cuerpo: {event.body}</h2>
      <LikeEvent/>
    </div>
  );
};

export default EventDetail;
