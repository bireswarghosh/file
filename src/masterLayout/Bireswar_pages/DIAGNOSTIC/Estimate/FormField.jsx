import React from 'react';

const FormField = ({ label, type = "text", ...props }) => {
  return (
    <div className="form-floating">
      <input 
        type={type} 
        className="form-control glass-input" 
        id={label.replace(/\s+/g, '')} 
        placeholder={label}
        {...props}
      />
      <label htmlFor={label.replace(/\s+/g, '')}>{label}</label>
    </div>
  );
};

export default FormField;