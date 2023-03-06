import React from "react";
import { Link } from "react-router-dom";

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

import { SizingContext } from "../../context/sizing";

import { useTheme } from '@mui/material/styles'

function DrawerComponent() {
    const theme = useTheme()
    const { drawerWidth, appBarHeight } = React.useContext(SizingContext)

    const sidebarItemsData = [
        {
            text: "Home",
            link: "/",
            icon: <HomeIcon />
        },
        {
            text: "Add Goal",
            link: "/addgoal",
            icon: <EmojiEventsIcon />
        },
        {
            text: "Chat",
            link: "/chatroom",
            icon: <ChatIcon />
        },
        {
            text: "SMART Goals",
            link: "/smartgoals",
            icon: <PsychologyAltIcon />
        },
        {
            text: "About",
            link: "/about",
            icon: <InfoIcon />
        }
    ]

    const sidebarItems = sidebarItemsData.map(item => {
        return (
            <Link 
                    to={item.link}
                    style={{ 
                        textDecoration: 'none',
                        color: theme.palette.text.primary
                    }}
                    key={item.text}
                >
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>

                </Link>
        )
    })

    return (
        <Drawer
            variant='permanent'
            anchor='left'
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                mt: `${appBarHeight}px`,
                boxSizing: 'border-box',
            }
            }}
        >
            <List sx={{flex: 1}}>
                {sidebarItems}
            </List>

            <Box
                sx={{
                    flex: 1,
                    p: 2,
                    position: 'fixed',
                    bottom: '0px',
                    width: drawerWidth
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