import React from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import { SizingContext } from "../../context/sizing";

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

import ChatIcon from '@mui/icons-material/Chat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

function DrawerComponent() {
    const { drawerWidth, appBarHeight } = React.useContext(SizingContext)

    return (
        <Drawer
            variant='permanent'
            anchor='left'
            sx={{
                // alignItems: 'left',
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    mt: `${appBarHeight}px`,
                    boxSizing: 'border-box',
                },
                }}
        >
            <List
                sx={{
                    flex: 1
                }}
            >
                <Link 
                    to='/'
                    style={{ 
                        textDecoration: 'none',
                        color: '#404040'
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>

                </Link>

                <Link 
                    to='/addgoal'
                    style={{ 
                        textDecoration: 'none',
                        color: '#404040'
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <EmojiEventsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Goal" />
                        </ListItemButton>
                    </ListItem>

                </Link>

                <Link 
                    to='/chatroom'
                    style={{ 
                        textDecoration: 'none',
                        color: '#404040'
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chat" />
                        </ListItemButton>
                    </ListItem>

                </Link>

                <Link 
                    to='/smartgoals'
                    style={{ 
                        textDecoration: 'none',
                        color: '#404040'
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <PsychologyAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="SMART Goals" />
                        </ListItemButton>
                    </ListItem>

                </Link>

                <Link 
                    to='/about'
                    style={{ 
                        textDecoration: 'none',
                        color: '#404040'
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItemButton>
                    </ListItem>

                </Link>
            </List>

            <Box
                sx={{
                    flex: 1,
                    p: 1,
                    position: 'fixed',
                    bottom: '0px'
                }}
            >
                <Typography variant='caption'>
                    Copyright Morgan Wongsuwan 2023
                </Typography>
            </Box>
        </Drawer>
    )
}

export { DrawerComponent }