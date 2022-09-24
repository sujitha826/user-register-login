import React from "react";

export default function Input({ title, type, value, onChange, placeholder, name, disabled}) {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", marginTop: "10px"}}>
      <label>{title}</label>
      <input
        name={name}
        type={type}
        style={{
          padding: "8px",
          border: "0",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "5px"
        }}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}
