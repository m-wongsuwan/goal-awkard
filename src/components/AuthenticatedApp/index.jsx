import React from 'react';

import { AuthContext } from "../../context/auth";
import { SizingContext } from "../../context/sizing";

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { AddGoalForm } from '../AddGoalForm';
import { StatusPage } from '../StatusPage'
import { ChatRoom } from '../Chatroom';
import { Account } from '../Account';

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function AuthenticatedApp() {
    const {logOff} = React.useContext(AuthContext)
    const { drawerWidth, appBarHeight } = React.useContext(SizingContext)
    const [open, setOpen] = React.useState(false)

    return (
        <Box 
            // sx={{display: 'flex'}}
        >
            <CssBaseline />
            <BrowserRouter>
                <AppBar 
                    position='fixed'
                    sx={{ 
                        height: `${appBarHeight}px`, 
                        // width: `calc(100% - ${drawerWidth}px)`, 
                        // ml: `${drawerWidth}px`
                    }}
                >
                    <Toolbar>
                        <IconButton 
                            size='large'
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2}}
                            onClick={()=>setOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Goal Awkward
                        </Typography>

                        <Button 
                            color="inherit"
                            onClick={logOff}
                        >
                            Log Off
                        </Button>

                    </Toolbar>
                </AppBar>

                <Drawer
                    variant='permanent'
                    anchor='left'
                    open={open}
                    sx={{
                        width: drawerWidth,
                        mt: `76px`,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                          width: drawerWidth,
                          mt: `76px`,
                          boxSizing: 'border-box',
                        },
                      }}
                    // onClose={()=>setOpen(false)}
                >
                    <Link to='/'
                    onClick={()=>setOpen(false)}
                    >
                        <Typography variant='h6'>
                            Home
                        </Typography>
                    </Link>
                    <Link to='/addgoal'
                    onClick={()=>setOpen(false)}
                    >
                        <Typography variant='h6'>
                            Add Goal Form
                        </Typography>
                    </Link>
                    <Link to='/chatroom'
                        onClick={()=>setOpen(false)}
                    >
                        <Typography variant='h6'>
                            Chatroom
                        </Typography>
                    </Link>
                    <Link to='/account'
                    onClick={()=>setOpen(false)}
                    >
                        <Typography variant='h6'>
                            Account
                        </Typography>
                    </Link>
                </Drawer>

                <Box
                    sx={{
                        mt: `${appBarHeight}px`
                    }}
                >

                        <Routes>
                            <Route path="/addgoal" element={<AddGoalForm />} />
                            <Route path='/' element={<StatusPage />} />
                            <Route path='/statuspage' element={<StatusPage />} />
                            <Route path='/chatroom' element={<ChatRoom />} />
                            <Route path='/account' element={<Account />} />
                        </Routes>


                </Box>
            </BrowserRouter>
        </Box>
    );
}

export { AuthenticatedApp };
