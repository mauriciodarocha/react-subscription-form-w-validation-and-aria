import React from 'react';
import { useForm } from "react-hook-form";
import './App.css';

function App() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const getErrorMsgs = () => {
    const fields = ['firstname', 'lastname', 'email', 'organization', 'resident'];
    const msgs = []
    fields.forEach((field) => {
      if (errors && errors[field]) {
        msgs.push(errors[field].message)
      }
    })
    let msgStr = msgs.join(', ')
    if (msgStr.length>0) {
      msgStr += '.'
    }
    return msgStr
  }
  const resetForm = () => {
    document.getElementById('form-registration').reset()
    reset()
  }
  const OnSubmit = (data) => {
    fetch('http://localhost:3001/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <div className='form-container' >
      <h2>Sign up for email updates</h2>
      <p className='required-field'>* Indicates Required Field</p>
        <form id='form-registration' onSubmit={handleSubmit(OnSubmit)}>
          <div className='error-msg error'>{getErrorMsgs()}</div>
          <fieldset>
            <div className='field-ctn field-text'>
              <label htmlFor='firstname'>First Name*</label>
              <input type='text' name='firstname' id='firstname' 
                {...register('firstname', { required: 'First name is required' })}
                aria-invalid={errors && errors.firstname ? "true" : "false"} />
            </div>
            <div className='field-ctn field-text'>
              <label htmlFor='lastname'>Last Name*</label>
              <input type='text' name='lastname' id='lastname' 
               {...register('lastname', { required: 'Last name is required' })}
               aria-invalid={errors && errors.lastname ? "true" : "false"} />
            </div>
            <div className='field-ctn field-text'>
              <label htmlFor='email'>Email*</label>
              <input type='email' name='email' id='email'
                {...register('email',
                  {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Email invalid'
                    },
                  }
                )}
                aria-invalid={errors && errors.email ? "true" : "false"}/>
            </div>
            <div className='field-ctn field-text'>
              <label htmlFor='organization'>Organization*</label>
              <input type='text' name='organization' id='organization' 
                {...register('organization', { required: 'Organization is required' })} 
                aria-invalid={errors && errors.organization ? "true" : "false"}/>
            </div>
            <div className='field-ctn'>
              <label htmlFor='resident'>EU resident*</label>
              <select name='resident' id='resident'
                {...register('resident', { required: 'EU resident is required' })}
                aria-invalid={errors.resident ? "true" : "false"}>
                <option value=''>Select one</option>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
              </select>
              </div>
              <hr />
              <div className='form-checkboxes'>
              <div className='field-ctn field-checkbox'>
                <label htmlFor='advances'>Advances
                  <input type='checkbox' name='advances' id='advances' 
                    {...register('advances')} />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className='field-ctn field-checkbox'>
                <label htmlFor='alert'>Alert
                  <input type='checkbox' name='alert' id='alert' 
                    {...register('alert')} />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className='field-ctn field-checkbox'>
                <label htmlFor='other-communications'>Other communications
                  <input type='checkbox' name='other-communications' id='other-communications' 
                    {...register('other_communications')} />
                  <span className="checkmark"></span>
                </label>
              </div>
              </div>
              <hr />
            <div className='form-buttons'>
              <button className='btn primary' type='submit'>Submit</button>
              <button className='btn secondary' type='button' onClick={resetForm}>Reset</button>
            </div>
          </fieldset>
        </form>
    </div>
  );
}

export default App;
