
import React, { useState, useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextInput from '../textInput';
import Select from '../select';
import SectionTitle from '../sectionTitle';
import AuthContext from '../../context/authContext';
import { Redirect } from 'react-router-dom';
import FileInput from '../fileInput';
import useFetch from '../../hooks/useFetch';

const SignUpForm = () => {
  const { data: user, isLoaded } = useFetch('https://fathomless-ravine-92681.herokuapp.com/api/accounts/profile');
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const { updateAuth } = useContext(AuthContext);
  if (!isLoaded) return true;
  if (success) {
    return <Redirect to='/profile' />
  }
  return (
    <Formik
      initialValues={{
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        city: user.city || '',
        address: user.address || '',
        age: user.age || '',
        phone: user.phone || '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        lastName: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        city: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        address: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        age: Yup.string()
          .required('Required')
          .matches(/^[1-9][0-9]?[0-9]?$/, 'Wrong age'),
        phone: Yup.string()
          .required('Required')
          .matches(/^\+?[0-9]+$/, 'Wrong phone number format'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch('https://fathomless-ravine-92681.herokuapp.com/api/accounts/profile', {
          headers: { 
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify(values),
        })
          .then((res) => {
            if (res.status === 200) {
              setSuccess(true);
            }
            return res.json()
          })
          .then((json) => {
            if (!success) {
              const error = json.message || 'Server Error';
              setServerError(error);
            }
            setSubmitting(false); 
          })
      }}
    >
      <Form>
        <SectionTitle text='' />
        <TextInput type="text"      name="firstName"        label="First Name" />
        <TextInput type="text"      name="lastName"         label="Last Name" />
        <TextInput type="text"      name="city"             label="City" />
        <TextInput type="text"      name="address"          label="Address" />
        <TextInput type="text"      name="age"              label="Age" />
        <TextInput type="text"      name="phone"            label="Phone Number" />
        <div className='error'>{serverError}</div>
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Change Profile</button>
      </Form>
    </Formik >
  );
};

export default SignUpForm;
