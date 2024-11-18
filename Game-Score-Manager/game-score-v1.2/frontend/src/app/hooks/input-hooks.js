import { useState } from "react";

export const useInputHook = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      onChange: (e) => {
        /* console.log("value: ", e.target.value) */
        setValue(e.target.value);
      },
    },
  };
};
