import React from 'react';

import { useAuth } from '../../hooks/useAuth'

import { AuthContext } from "../../context/auth";
import { SizingContext } from "../../context/sizing";

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {
    const { login } = useAuth();
    const {logOff, user} = React.useContext(AuthContext)
    const { appBarHeight } = React.useContext(SizingContext)

    return (
        <AppBar 
            position='fixed'
            sx={{ 
                height: `${appBarHeight}px`, 
            }}
        >
            <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    Goal Awkward
                </Typography>

                <Button 
                    color="inherit"
                    onClick={user ? logOff : login}
                >
                    {user ? 'Log Off' : 'Log In'}
                </Button>

            </Toolbar>
        </AppBar>
    )
}

export { Header }