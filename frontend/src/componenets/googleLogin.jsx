import { useLocation } from 'react-router-dom';
import { useGoogleLogin } from '../hooks/useGoogleLogin';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
    const {googleLogin, gError } = useGoogleLogin();
    const location = useLocation();

    const handleGoogleLogin = async (data) => {
        await googleLogin(data)
      }

      return (
        
        <GoogleLogin 
          onSuccess={ credentialResponse => {
            handleGoogleLogin(credentialResponse)
          
          }}
          {
            ...location.pathname === '/signup' ?
            {type:'icon',
            shape:'circle'}
            :
            {text:'continue_with',
            shape:'circle'}
        }
            
          onError={() => {
            {gError && <Typography>{gError}</Typography>}
          }}
        />
      )

}

export default GoogleLoginButton;