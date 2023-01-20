import { useState } from 'react';

export const useField = (type, name) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    name,
    value,
    onChange,
    reset,
  };
};

// ToDo Make the function accepts an arbitrary number of arguments which corresponds to fields
//      to be extracted e.g. "...extract". an object to be returned at this order: original object
//      with fields extracted then the extracted fields in the same order of arguments recieved
export const useObjectExtract = (obj, extract) => {
  const extracted = obj[extract];
  delete obj[extract];
  return [obj, extracted];
};

export default {
  useField,
  useObjectExtract,
};
