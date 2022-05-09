import React from 'react'
import { Controller } from 'react-hook-form'
import './Input.css'


function CustomInput({
    control,
    name,
    rules = {},
    placeholder,
    secureTextEntry,
  }) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue=""
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
          <div className='containerinput' style={{borderColor:error ? 'red':'#e8e8e8'}}>
            <div className='container2'>
            <input className='input'   value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} secureTextEntry={secureTextEntry} />
              
            </div>
              

          </div>
          {error && (
              <p style={{color:'red', alignSelf:'stretch' }}>{error.message || 'Error'}</p>
          )}
          
          </>

      )} />
  );
};



export default CustomInput