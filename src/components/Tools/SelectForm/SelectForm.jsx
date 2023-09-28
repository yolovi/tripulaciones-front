import React from "react";
import "./SelectForm.scss";
import { Select } from "@chakra-ui/react";

const SelectForm = ({
  onChange = () => console.log(e),
  placeholder = "",
  selectedValue = "",
  options = [],
}) => {
  return (
    <div className="custom-select">
      <Select
        onChange={onChange}
        variant="unstyled"
        value={selectedValue}
        placeholder={placeholder}
      >
        {options.map((elem, i) => {
          return (
            <option key={i} value={elem}>
              {elem}
            </option>
          );
        })}
      </Select>
    </div>
  );
};

export default SelectForm;
