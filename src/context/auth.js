import React from 'react';

import { logOffService } from '../services/firebase'
import { loginWithGoogle } from '../services/firebase';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const [user, setUser] = React.useState(null);

    const login = async () => {
        const user = await loginWithGoogle();

        if (!user) {
            // TODO: Handle failed login
            alert('Problem signing in. Please try again!')
        }

        setUser(user);
    };
    
    function logOff() {
        logOffService()
        setUser(null)
    }
    
    const value = { user, login, logOff };


    return <AuthContext.Provider value={value} {...props} />;
};



export { AuthContext, AuthProvider };