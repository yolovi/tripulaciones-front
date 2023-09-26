import './Profile.scss';
import React, { useEffect } from 'react';
import { getUserConnected, updateUser } from '../../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  WrapItem,
} from '@chakra-ui/react';
import { Card, CardBody, CardFooter } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ModalRender from '../../Tools/ModalRender/ModalRender';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardSlider from '../../Tools/CardSlider/CardSlider';
// import PostCard from "../PostCard/PostCard";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userConnected, isLoading } = useSelector(state => state.auth);
  //TODO:  falta pintar los eventos guardados (wishlist) y los eventos a los que te has inscrito (como si hicieras un pedido)
  const {
    avatar_url,
    avatar,
    name,
    surname,
    email,
    interested,
    followers,
    eventIds, //solo admin users pueden crear eventos

    wishList,
    occupation,
    reviewIds,
  } = userConnected;

  console.log(userConnected);

  useEffect(() => {
    dispatch(getUserConnected());
  }, [avatar, name, surname, email]);

  if (isLoading) {
    return <Spinner size="lg" color="red.500" />;
  }

  //TODO: Nota. No utilizar un form si vas a subir/editar fotos > hay que usar un FORM-DATA (como en postman)

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    try {
      if (event.target.avatar.files[0])
        formData.set('avatar', event.target.avatar.files[0]);
      formData.set('name', event.target.name.value);
      formData.set('surname', event.target.surname.value);
      // formData.set("email", event.target.email.value);

      dispatch(updateUser(formData));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-profile">
        <div className="card-profile-data">
          <Card
            className="card-profile-data"
            direction={{ base: 'column', sm: 'row' }}
            variant="unstyled"
            size="lg"
          >
            <div className="container-img-profile">
              <div className="img-profile">
                {avatar_url ? (
                  <WrapItem>
                    <Avatar
                      size="2xl"
                      name={name}
                      src={avatar_url}
                      alt="avatar-profile-image"
                    />
                  </WrapItem>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            <Stack className="profile-data" spacing="4">
              <CardBody>
                <Heading title="Profile" size="lg">
                  {`${name} ${surname}`}
                </Heading>
                <div>
                  <Text py="2">{email}</Text>
                </div>
              </CardBody>

              <Button colorScheme="pink">Ver QR personal</Button>

              <CardBody className="footer-card-profile">
                <div className="modal-profile">
                  <ModalRender
                    modalTitle={'Edit your profile'}
                    textBtn={<FontAwesomeIcon icon={faPen} />}
                    text={
                      <>
                        <form
                          className="form-updateUser"
                          onSubmit={handleSubmit}
                        >
                          <input
                            type="text"
                            name="name"
                            placeholder={name}
                            defaultValue={name}
                          />
                          <input
                            type="text"
                            name="surname"
                            placeholder={surname}
                            defaultValue={surname}
                          />
                          {/* <input
                            type="text"
                            name="email"
                            placeholder={email}
                            defaultValue={email}
                          /> */}
                          <input
                            type="file"
                            name="avatar"
                            id="file"
                            className="input-avatar"
                          />

                          <Button
                            className="btn-card"
                            type="submit"
                            variant="solid"
                            colorScheme="blue"
                          >
                            Send
                          </Button>
                        </form>
                      </>
                    }
                  />
                </div>
              </CardBody>
            </Stack>
          </Card>

          <Card>
            <Box className="eventsUser">
              <span>Inscritos</span>
              <span>Asistidos</span>
              <span>Guardados</span>
            </Box>
            <Box className="scrollOrderEvents">
              <span>Carousel con los eventos inscritos</span>
            </Box>
            <Box className="scrollSavedEvents">
              <span>Carousel con los eventos guardados</span>
            </Box>
            <Box className="scrollPastEvents">
              <span>Carousel con los eventos asistidos</span>
            </Box>
          </Card>
        </div>

        <Divider className="divider-profile" />

        {/* //FIXME: hay que recargar la pagina, a veces da error al cargar wishlist, tambien hay problema con el warking key id en map */}
        <div className="eventos-grupo">
          {wishList.map((wishList) => {
            return (
              <CardSlider
                _id={wishList._id}
                image={wishList.image_url}
                category={wishList.category}
                date={wishList.date}
                time=""
              />
            );
          })}
        </div>

        <div className="eventos-grupo">map eventos inscritos</div>
        <div className="eventos-grupo">map eventos pasados</div>
      </div>
    </>
  );
};

export default Profile;

//TODO: verTrapping Focus within Popover para editar pefil con lapiz https://chakra-ui.com/docs/components/popover/usage
//TODO: horizontal scroll cards with animation : https://medium.com/dailyjs/horizontal-scroll-animation-fc39ae43cbe5
