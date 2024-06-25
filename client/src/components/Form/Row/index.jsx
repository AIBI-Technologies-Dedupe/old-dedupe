import React from "react";

const FormRow = ({ children }) => {
  return <div className="flex flex-col gap-4 md:flex-row">{children}</div>;
};

export default FormRow;
