import React from 'react';

const SizingContext = React.createContext();

const SizingProvider = (props) => {
    const drawerWidth = 180
    const appBarHeight = 76

    const value = { drawerWidth, appBarHeight };


    return <SizingContext.Provider value={value} {...props} />;
};



export { SizingContext, SizingProvider };