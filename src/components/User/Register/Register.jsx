import "./Register.scss";
import "react-phone-number-input/style.css";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
//import DatePicker from "react-date-picker";
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
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import CustomCheckbox from "../../Tools/CustomCheckbox/CustomCheckbox";
import SelectForm from "../../Tools/SelectForm/SelectForm";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import PasswordEye from "../../Tools/PasswordEye/PasswordEye";

//TODO: añadir validacines (email valido, email unico, pass1=pass2) y alerts si la petición es rechazada (ej. email unico, usuario ya existe...)
//TODO: añadir useNavigate > login

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    bday: "", //input modificable + calendario
    tel: "", //desde Api externa (ver trello)
    ecosystem: "", //radiobutton yes/no BOOLEAN true/false
    occupation: "", //desplegable (segun opcion si ha elegido si/no en ecosystem)
    password: "",
    password2: "",
    role: "user",
    acceptPolicity: false, // check box BOOLEAN true/false
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

  // const [show, setShow] = useState(false);
  // const handleClick = () => setShow(!show);

  const dispatch = useDispatch();

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

  // function PasswordInput() {
  //   const [show, setShow] = React.useState(false)
  //   const handleClick = () => setShow(!show)

  //   return (
  // <InputGroup size='md'>
  //   <Input
  //     pr='4.5rem'
  //     type={show ? 'text' : 'password'}
  //     placeholder='Enter password'
  //   />
  //   <InputRightElement width='4.5rem'>
  //     <Button h='1.75rem' size='sm' onClick={handleClick}>
  //       {show ? 'Hide' : 'Show'}
  //     </Button>
  //   </InputRightElement>
  // </InputGroup>
  //   )
  // }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log("onChange", e.target.value);
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
    //       description: "Las contraseñas no coinciden",
    //     });
    //   } else {
    //       return dispatch(register(formData));
    //   }
    // };
  };

  return (
    <div className="registro-container">
      <h2>Regístrate</h2>
      <form onSubmit={onSubmit} className="form-register">
        <div className="register-data">
          <label>
            Nombre*
            <Input
              type="text"
              name="name"
              value={name}
              placeholder="Ej: Irene"
              _placeholder={{ opacity: 1, color: "gray.400" }}
              variant="unstyled"
              onChange={onChange}
              required
            />
          </label>
          <label>
            Apellidos*
            <Input
              type="text"
              name="surname"
              value={surname}
              placeholder="Ej: Pérez Gomez"
              _placeholder={{ opacity: 1, color: "gray.400" }}
              variant="unstyled"
              onChange={onChange}
              required
            />
          </label>
          <label>
            Correo*
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="Indica tu correo electrónico"
              _placeholder={{ opacity: 1, color: "gray.400" }}
              variant="unstyled"
              onChange={onChange}
            />
          </label>
          <label>
            Fecha de nacimiento*
            <Input
              type="date"
              name="bday"
              value={bday}
              onChange={onChange}
              _placeholder={{ opacity: 1, color: "gray.400" }}
              variant="unstyled"
            />
          </label>
          <label>
            Número de teléfono*
            <PhoneInput
              placeholder="Indica tu número de teléfono"
              name="tel"
              value={tel}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  tel: e,
                });
              }}
            />
          </label>
        </div>
        <div className="select-ecosystem">
          <FormControl as="fieldset">
            <label>¿Formas parte del ecosistema MDE?*</label>
            <RadioGroup
              onChange={(e) => {
                setFormData({
                  ...formData,
                  ecosystem: e,
                });
              }}
              value={ecosystem}
            >
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

          (ecosystem === "1" || ecosystem === "2") && (
            <div className="actual-situation">
              <SelectForm
                isRequired
                className="selectForm"
                placeholder="Indica tu situación actual"
                options={ecosystem === "1" ? mdeTrue : mdeFalse}
                selectedValue={occupation}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    occupation: e.target.value,
                  });
                }}
              />
            </div>
          )
        }

        <PasswordEye
          label="Contraseña*"
          placeholder="Indica tu contraseña"
          name="password"
          value={password}
          onChange={onChange}
          isRequired
        />
        <span>
          Debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y
          1 carácter especial
        </span>

        <PasswordEye
          label="Repite tu contraseña*"
          placeholder="Repite tu contraseña"
          name="password2"
          value={password2}
          onChange={onChange}
          isRequired
        />

        <div className="stackCheck">
          <Stack pl={6} mt={1} spacing={1}>
            <CustomCheckbox
              label="acceptPolicity"
              checked={acceptPolicity}
              onChange={() =>
                setFormData({
                  ...formData,
                  acceptPolicity: !acceptPolicity,
                })
              }
              text="Acepto el Aviso Legal y la Política de Privacidad"
              isRequired
            />
            <CustomCheckbox
              checked={acceptCommunication}
              onChange={() =>
                setFormData({
                  ...formData,
                  acceptCommunication: !acceptCommunication,
                })
              }
              text="Acepto que EDEM me envíe comunicaciones electrónicas sobre los Cursos, jornadas, seminarios organizados por EDEM y aquellos vinculados con el emprendimiento, inversión y liderazgo desarrollados en MARINA DE EMPRESAS."
            />
            <div className="captcha">
              <CustomCheckbox
                //checked={captcha} //FIXME: investigar como aplicar
                // onChange={() =>
                //   setFormData({
                //     ...formData,
                //     captcha: !captcha,
                //   })
                // }
                text="No soy un robot + icono captcha"
              />
            </div>
          </Stack>
        </div>
        <div className="btn-div">
          <button
            className="btn-primary"
            disabled={ecosystem == "" || !acceptPolicity  || occupation == "" }
            type="submit"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;

//FIXME: si el botón Regisrar está disable no se distingue > además añadir warning/modal indicar los errores (completa todos los campos, email unico, acepta politica...)
