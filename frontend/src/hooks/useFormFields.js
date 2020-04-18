import { useState } from "react";

const useFormFields = (initialState) => {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function(event, data) {
      setValues({
        ...fields,
        [data.id]: data.value
      });
    }
  ];
};

export default useFormFields;
