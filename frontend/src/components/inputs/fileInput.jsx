import React from 'react';
import { useField, useFormikContext } from 'formik';
import toBase64 from '../../helpers/toBase64.jsx';


const FileInput = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input name={props.name} type='file' {...props} onChange={(event) => {
        const file = event.currentTarget.files[0];
        toBase64(file, (url) => {
          setFieldValue(props.name, url);
        });
      }} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};

export default FileInput;
