import { useState } from 'react';

const useValidationHook = () => {
  const [errors, setErrors] = useState({});

  const validate = (fields) => {
    const newErrors = {};
    if (fields.username && fields.username.length < 4) {
      newErrors.username = 'El usuario debe contener mas de 4 caracteres';
    }
    if (fields.password && fields.password.length < 8) {
      newErrors.password = 'La contraseña debe tener mas de 8 caracteres';
    }
    if (fields.password && fields.confirmPassword && fields.password !== fields.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useValidationHook;
