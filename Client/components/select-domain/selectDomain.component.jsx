import React from "react";
import { Select } from "antd";

const SelectDomain = ({ setSelectedDomains, options }) => {
  const handleOnChange = (data) => {
    setSelectedDomains(data);
  };
  return (
    <>
      <p style={{ fontSize: 18, fontWeight: "500" }}>
        Select your specific domain(s)
      </p>
      <Select
        mode="multiple"
        style={{
          width: "80%",
          margin: "20px 0",
        }}
        placeholder="Select Domains"
        onChange={handleOnChange}
        options={options}
      />
    </>
  );
};

export default SelectDomain;
