import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../../../utils/utils";

const CardSlider = ({ 
  _id = "",
  image = "",
  category = "",
  date = "",
  time = "",
  likes = []
}) => {
  
  const navigate = useNavigate();

  /* REDIRECCION AL PINCHAR EN LA TARJETA */
 const handleDivClick = (eventId) => {
    navigate(`/eventdetail/${eventId}`);
  };
  
  return (
    <>
        <div
            className="evento-individual"
            onClick={() => {
              handleDivClick(_id);
            }}
          >
        <div className="container-img-profile">
          <div className="img-profile">
            <img src={image} alt="" />
          </div>
        </div>
      <div className="info-evento">
        <div className="category">
          <div className="texto">{category}</div>
          <div className="flecha">
            <span>
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        </div>
        <div className="fecha">
          {formatDate(date)} <span className="hora">{time}</span>
        </div>
            <div className="likes">
              {
                likes?.map(elem => elem.likes)
              }
            </div>
      </div>
      </div>
    </>
  );
};

export default CardSlider;

