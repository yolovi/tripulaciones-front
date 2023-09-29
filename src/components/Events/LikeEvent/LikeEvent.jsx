import { dislike, like } from '../../../features/events/eventsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBone, faBookmark } from '@fortawesome/free-solid-svg-icons';

const LikeEvent = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const { event } = useSelector(state => state.events);
  const { userConnected } = useSelector(state => state.auth);

  const isAlreadyLiked = event.likes?.includes(userConnected?._id);

  return (
    <div className="button-container">
      {isAlreadyLiked ? (
        <FontAwesomeIcon
          icon={faBookmark}
          size="xl"
          onClick={() => dispatch(dislike(_id))}
          style={{ color: '#d7902d' }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faBookmark}
          size="xl"
          onClick={() => dispatch(like(_id))}
        />
      )}
    </div>
  );
};

export default LikeEvent;
