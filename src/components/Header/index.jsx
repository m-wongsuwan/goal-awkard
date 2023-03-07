import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { AuthContext } from "../../context/auth";
import { SizingContext } from "../../context/sizing";

function Header() {
    const navigate = useNavigate()
    const { login } = useAuth();
    const {logOff, user} = React.useContext(AuthContext)
    const { appBarHeight } = React.useContext(SizingContext)

    function handleLogin() {
        login()
        navigate('/')
    }

    return (
        <AppBar 
            position='fixed'
            sx={{height: `${appBarHeight}px`}}
        >
            <Toolbar>
                <Typography variant="h4" component="div" sx={{textAlign: 'left', flexGrow: 1}} >
                    <Link to='/' style={{textDecoration: 'none',  color: 'white'}}>
                        Goal Awkward
                    </Link>
                </Typography>
                    

                <Button 
                    color="inherit"
                    onClick={user ? logOff : handleLogin}
                >
                    {user ? 'Log Off' : 'Log In / Sign Up'}
                </Button>

            </Toolbar>
        </AppBar>
    )
}

export { Header }