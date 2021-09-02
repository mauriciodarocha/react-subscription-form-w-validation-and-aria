import React from 'react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import arrow from './text-expand-arrow.svg';
import './App.css';

function App() {
  const { register, handleSubmit, formState: { errors }, reset, getValues, setError, clearErrors } = useForm({reValidateMode: 'onChange'});
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const getErrorMsgs = () => {
    const fields = ['firstname', 'lastname', 'email', 'organization', 'resident', 'email_type'];
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
  const validateCheckbox = () => {
    const fields = ['advances', 'alert', 'other_communications']
    const values = getValues();
    const msgStr = "Select one type of email to receive";
    if (fields.filter((key) => values[key]).length > 0) {
      clearErrors('email_type')
      return
    }
    setError('email_type', { type: 'manual', message: msgStr })
  }
  const resetForm = () => {
    document.getElementById('form-registration').reset()
    reset()
  }
  const OnSubmit = (data) => {
    if(Object.keys(errors).length) {return;}
    fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status !== 'error') {
          notifySuccess(data.message);
          resetForm();
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        notifyError(data.message);
      });
  }
  return (
    <div className='form-container' >
      <h2 aria-label='Sign up for email updates form'>Sign up for email updates</h2>
      <p className='required-field'>* Indicates Required Field</p>
        <form id='form-registration' onSubmit={handleSubmit(OnSubmit)} 
                      onChange={validateCheckbox}>
          <div className='error-msg error' aria-label='Form errors messages'>{getErrorMsgs()}</div>
          <fieldset>
            <div className='field-ctn field-text'>
              <label htmlFor='firstname'>First Name*</label>
              <input type='text' name='firstname' id='firstname' 
                aria-label='Fill out with your first name'
                {...register('firstname', { required: 'First name is required' })}
                aria-invalid={errors && errors.firstname ? "true" : "false"} />
            </div>
            <div className='field-ctn field-text'>
              <label htmlFor='lastname'>Last Name*</label>
              <input type='text' name='lastname' id='lastname' 
                aria-label='Fill out with your last name'
                {...register('lastname', { required: 'Last name is required' })}
                aria-invalid={errors && errors.lastname ? "true" : "false"} />
            </div>
            <div className='field-ctn field-text'>
              <label htmlFor='email'>Email*</label>
              <input type='email' name='email' id='email'
                aria-label='Fill out with your email address'
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
                aria-label='Fill out with your organization name' 
                {...register('organization', { required: 'Organization is required' })} 
                aria-invalid={errors && errors.organization ? "true" : "false"}/>
            </div>
            <div className='field-ctn'>
              <label htmlFor='resident'>EU resident*</label>
                <div>
                  <select name='resident' id='resident'
                    aria-label="Press Y or N to select yes or no for EU resident"
                    style={{backgroundImage: `url(${arrow})`}}
                    {...register('resident', { required: 'EU resident is required' })}
                    aria-invalid={errors && errors.resident ? "true" : "false"}>
                    <option value=''>Select one</option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </select>
                </div>
              </div>
              <hr />
              <div className={`form-checkboxes ${errors && errors.email_type ? 'checkboxes-invalid' : ''}`} aria-invalid={errors && errors.email_type ? "true" : "false"}>
                {errors && errors.email_type &&
                  <div className='at-least-one-error'>
                    Select at least one
                  </div>
                }
                <div className='field-ctn field-checkbox'>
                  <label htmlFor='advances'>Advances<span>*</span>
                    <input type='checkbox' name='advances' id='advances'
                      aria-label='Tick this box to receive email advances' 
                      {...register('advances')}
                      onClick={validateCheckbox}
                      />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className='field-ctn field-checkbox'>
                  <label htmlFor='alert'>Alert<span>*</span>
                    <input type='checkbox' name='alert' id='alert' 
                      aria-label='Tick this box to receive email alerts' 
                      {...register('alert')}
                      onClick={validateCheckbox}
                      />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className='field-ctn field-checkbox'>
                <label htmlFor='other-communications'>Other communications<span>*</span>
                  <input type='checkbox' name='other-communications' id='other-communications' 
                      aria-label='Tick this box to receive general emails'
                      {...register('other_communications')}
                    onClick={validateCheckbox}
                    />
                  <span className="checkmark"></span>
                </label>
              </div>
              </div>
              <hr />
            <div className='form-buttons'>
              <button className='btn primary' type='submit'
                aria-label={getErrorMsgs().length ? 'You still have required fields to fill out. ' + getErrorMsgs() : 'Press this button to forward your information'}
                >
                Submit
              </button>
              <button className='btn secondary' type='button' onClick={resetForm}
                aria-label='Press this button to reset this form'
              >
                Reset
              </button>
            </div>
          </fieldset>
        </form>
        <Toaster />
    </div>
  );
}

export default App;
