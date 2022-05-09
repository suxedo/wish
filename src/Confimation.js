import React from 'react'
import './Confimation.css'
import CustomInput from './components/CustomInput'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import CustomButton from './components/CustomButton';

function Confimation() {
    const { name } = useParams();
    const navigate = useNavigate();
    const {control, handleSubmit, watch} = useForm({
        defaultValues: {username: name},
      });
    
      const username = watch('username');

      const onConfirmPressed = async data => {
        try {
          await Auth.confirmSignUp(data.username, data.code);
          navigate('/');
        } catch (e) {
          console.alert('Oops', e.message);
        }
      };
      const onResendPress = async () => {
        try {
          await Auth.resendSignUp(username);
          console.alert('Success', 'Code was resent to your email');
        } catch (e) {
          console.alert('Oops', e.message);
        }
      };
  return (
    <div className='confimation'>
        <div className='confimation__wrapper'>
            <div className='confimation__wrappercontent'>
            <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username code is required',
          }}
        />

        <CustomInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />
         <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

         <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />
                
            </div>
            
        </div>
        


    </div>
  )
}

export default Confimation