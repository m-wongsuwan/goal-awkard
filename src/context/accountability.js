import React from 'react';

const AccountabilityContext = React.createContext();

const AccountabilityProvider = (props) => {
    const [secretUnlockDate, setSecretUnlockDate] = React.useState(new Date())

    const value = { secretUnlockDate, setSecretUnlockDate };


    return <AccountabilityContext.Provider value={value} {...props} />;
};



export { AccountabilityContext, AccountabilityProvider };