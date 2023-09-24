import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordEye = ({
  label = "Password",
  placeholder = "Your password",
  name = "password",
  value = "",
  onChange = () => {},
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label>{label}</label>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          _placeholder={{ opacity: 1, color: "gray.400" }}
          variant="unstyled"
          onChange={onChange}
          name={name}
          value={value}
        />
        <InputRightElement width="4.5rem">
          <Button
            className="eyePassBtn"
            variant="unstyled"
            h="1.75rem"
            size="sm"
            onClick={handleClick}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};

export default PasswordEye;