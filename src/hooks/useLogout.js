import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../context/AuthContext';

function useLogout() {
    const [state, dispatch ] = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // try {
        //     const res = await fetch('https://hmsbackend-4388.onrender.com/user/logout', {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         credentials: 'include',
        //     });

        //     const data = await res.json();

        //     if (!res.ok) {
        //         console.log({ message: data });
        //     } else {
                dispatch({ type: 'LOGOUT', payload: null });
                localStorage.removeItem('user');
                navigate('/auth/login');
    //         }
    //     } catch (error) {
    //         console.log({ message: error.message });
    //     }
    
     };

    return logout;
}

export default useLogout;
