import React from 'react';

const ThemeContext = React.createContext();

const ThemeProvider = (props) => {

    return <ThemeContext.Provider value={value} {...props} />;
};



export { ThemeContext, ThemeProvider };