import { dislike, like } from "../../../features/events/eventsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone } from "@fortawesome/free-solid-svg-icons";

const LikeEvent = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const { event } = useSelector((state) => state.events); // Accede a la lista de eventos desde el estado de Redux
  const { userConnected } = useSelector((state) => state.auth);

  const isAlreadyLiked = event.likes?.includes(userConnected._id);

  return (
    <div className="button-container">
      {isAlreadyLiked ? (
        <FontAwesomeIcon
          icon={faBone}
          size="xl"
          onClick={() => dispatch(dislike(_id))}
          style={{ color: "#d7902d" }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faBone}
          size="xl"
          onClick={() => dispatch(like(_id))}
        />
      )}
    </div>
  );
};

export default LikeEvent;
