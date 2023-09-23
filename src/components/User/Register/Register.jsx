import React, { useEffect, useState } from "react";
import "./Register.scss";
import { register } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
  Button,
  Stack,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import CustomCheckbox from "../../Tools/CustomCheckbox/CustomCheckbox";
import SelectForm from "../../Tools/SelectForm/SelectForm";

//TODO: añadir validacines (email valido, email unico, pass1=pass2) y alerts si la petición es rechazada (ej. email unico, usuario ya existe...)
//TODO: añadir useNavigate > login

const Register = () => {

 
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    bday: "", //input modificable + calendario
    tel: "", //desde Api externa (ver trello)
    ecosystem : "", //radiobutton yes/no BOOLEAN true/false
    occupation: "", //desplegable (segun opcion si ha elegido si/no en ecosystem)
    password: "",
    password2: "",
    role: "user",
    acceptPolicity: false , // check box BOOLEAN true/false
    acceptCommunication: false, // check box BOOLEAN true/false
  });

  
  const {
    name,
    surname,
    email,
    bday,
    tel,
    ecosystem,
    password,
    password2,
    occupation,
    acceptPolicity,
    acceptCommunication,
  } = formData;
 
  const dispatch = useDispatch();
  console.log("P", acceptPolicity)
  console.log("C", acceptCommunication)


  const mdeTrue = [
    "Empleado de EDEM",
    "Estudiante de EDEM",
    "Empleado de LANZADERA",
    "Inversor Angels",
  ];
  const mdeFalse = [
    "Propietario/a o dirección general",
    "Director/a de departamento",
    "Profesional senior",
    "Profesional junior",
    "Desempleado/a",
    "Estudiante",
  ];



  const onChange = (e) => {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log("onChange", e.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (acceptPolicity) {
      console.log("formData", formData);
      return dispatch(register(formData));
    }

    //   if (password !== password2) {
    //     return notification.error({
    //       message: "Error",
    //       description: "Passwords do not match",
    //     });
    //   } else {
    //       return dispatch(register(formData));
    //   }
    // };
  };

  return (
    <div className="registro-container">
      <h3>Register</h3>
      <form onSubmit={onSubmit} className="form-register">
        <div className="register-data">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Insert your name*"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="surname"
            value={surname}
            placeholder="Insert your surname*"
            onChange={onChange}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Insert your email*"
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Insert your password*"
            onChange={onChange}
          />
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Repeat your password*"
            onChange={onChange}
          />
        </div>
        <div className="select-ecosystem">
          <FormControl as="fieldset">
            <FormLabel as="legend">
              ¿Formas parte del ecosistema MDE?*
            </FormLabel>
            <RadioGroup onChange={(e)=> {
              setFormData({
                ...formData,
                ecosystem: e
              })} 

            }
            value={ecosystem}>
              <HStack spacing="24px">
                <Radio colorScheme="facebook" value="1">
                  Sí
                </Radio>
                <Radio colorScheme="facebook" value="2">
                  No
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </div>
        {
          //con el && me ahorro hacer un ternario y tener que poner : null en el else

          (ecosystem === "1" || ecosystem === "2") &&

          <div className="actual-situation">
            <SelectForm
              className="selectForm"
              placeholder = "Seleccione una Opcion"
              options={ecosystem === "1" ? mdeTrue : mdeFalse}
              selectedValue= {occupation}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  occupation: e.target.value,
                });
              }}
            />
          </div>
        }

        <Stack pl={6} mt={1} spacing={1}>
          <CustomCheckbox
            label="acceptPolicity"
            checked={acceptPolicity}
            onChange={ () => setFormData({
                ...formData,
                acceptPolicity: !acceptPolicity
              })
            }
            text="Acepto el Aviso Legal y la Política de Privacidad"
          />
          <CustomCheckbox
          checked = {acceptCommunication}
          onChange={() => setFormData({
              ...formData,
              acceptCommunication: !acceptCommunication
            })
          }
            text="acepto comunicacion"
          />
        </Stack>
        <Button disabled={ ecosystem !== "" ||!acceptPolicity} type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};
export default Register;
