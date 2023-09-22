import "./Profile.scss";
import React, { useEffect } from "react";
import { getUserConnected, updateUser } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Divider,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import PostCard from "../PostCard/PostCard";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userConnected, isLoading } = useSelector((state) => state.auth);
  //TODO:  falta pintar los eventos guardados (wishlist) y los eventos a los que te has inscrito (como si hicieras un pedido)
  const {
    avatar_url,
    avatar,
    name,
    surname,
    surname2,
    email,
    followers,
    eventIds,
    occupation,
  } = userConnected;

  useEffect(() => {
    dispatch(getUserConnected());
  }, [avatar, name, surname, surname2, email]);

  if (isLoading) {
    return <Spinner size="lg" color="red.500" />;
  }

  //TODO: Nota. No utilizar un form si vas a subir/editar fotos > hay que usar un FORM-DATA (como en postman)

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    try {
      if (event.target.avatar.files[0])
        formData.set("avatar", event.target.avatar.files[0]);
      formData.set("name", event.target.name.value);
      formData.set("surname", event.target.surname.value);
      formData.set("surname2", event.target.surname2.value);
      formData.set("email", event.target.email.value);

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
            direction={{ base: "column", sm: "row" }}
            variant="unstyled"
            size="lg"
          >
            <div className="container-img-profile">
              <div className="img-profile">
                {avatar_url ? (
                  <Image
                    className="img-profile"
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={avatar_url}
                    alt="avatar-profile-image"
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            <Stack className="profile-data" spacing="4">
              <CardBody>
                <Heading title="Profile" size="lg">
                  {name}
                </Heading>
                <div>
                  <Text py="2">{email}</Text>
                  {/* <Text py="2" >{phone}</Text> */}
                  <Text py="2">{surname}</Text>
                  <Text py="2">{surname2}</Text>
                  <Text py="2">{occupation}</Text>
                  {/* <Text py="2">
                    Followers: {followers ? followers.length : "0"}
                  </Text> */}
                </div>
              </CardBody>

              <CardFooter className="footer-card-profile">
                <div className="modal-profile">
                  <>
                    <form className="form-updateUser" onSubmit={handleSubmit}>
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
                      <input
                        type="text"
                        name="surname2"
                        placeholder={surname2}
                        defaultValue={surname2}
                      />
                      <input
                        type="text"
                        name="email"
                        placeholder={email}
                        defaultValue={email}
                      />
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
                </div>
              </CardFooter>
            </Stack>
          </Card>
        </div>

        <Divider className="divider-profile" />

        {/* //FIXME: cambiar los posts por los eventos */}
        {/* <div className="container-post-profile"> 
          {postIds?.map((post, i) => {
            return (
              <div key={i}>
                <Link to={"/profilepost/" + post._id}>
                  <PostCard
                    textTitle={post.title}
                    textLikes={post.likes?.length}
                    srcImage={post.image_url}
                  />
                </Link>
              </div>
            );
          })}
        </div> */}
      </div>
    </>
  );
};

export default Profile;
