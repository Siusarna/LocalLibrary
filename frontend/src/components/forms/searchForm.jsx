import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import api from '../../config/api.jsx';

const SearchForm = (props) => {
  const [serverError, setServerError] = useState('');
  const [result, setResult] = useState(null);
  if (result) {
    props.onResult(result);
  }

  let success = false;

  return (
    <>
      <Formik
        initialValues={{ query: '' }}
        validationSchema={Yup.object({
          query: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setServerError('');
          fetch(api.search(values.query), {
            credentials: 'include',
          })
            .then((res) => {
              if (res.status === 200) {
                success = true;
              }
              return res.json();
            })
            .then((json) => {
              if (!success) {
                const error = json.message || 'Server Error';
                setServerError(error);
              } else {
                setResult(json);
              }
              setSubmitting(false);
            });
        }}
      >
        <Form className='searchForm'>
          <div className='BookSearch'>
            <Field name='query' type='text' className='searchInput' />
            <button type='submit' className='search'><img src='/search.png' alt='search'/></button>
          </div>
          <div className='error'>{serverError}</div>
        </Form>
      </Formik >
    </>
  );
};

export default SearchForm;
