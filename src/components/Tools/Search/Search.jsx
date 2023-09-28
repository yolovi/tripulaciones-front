import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getEventsByName } from "../../features/Events/eventsSlice";
import GetEvents from "../Events/GetEvents";

const Search = () => {
  const { title } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsByName(title));
  }, [title]);
  
  if (title == null) {
    return <div>{<GetEvents />}</div>;
  }


  return <div>{<GetEvents />}</div>;
};

export default Search;
