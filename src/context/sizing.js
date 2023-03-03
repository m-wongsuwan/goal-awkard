import React from 'react';

const SizingContext = React.createContext();

const SizingProvider = (props) => {
    const drawerWidth = 225
    const appBarHeight = 66

    const value = { drawerWidth, appBarHeight };


    return <SizingContext.Provider value={value} {...props} />;
};



export { SizingContext, SizingProvider };