import React from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { SizingContext } from '../../context/sizing';

import { AddGoalForm } from '../AddGoalForm';
import { ChatRoom } from '../Chatroom';
import { DrawerComponent } from '../DrawerComponent';
import { SMARTGoals } from '../SMARTGoals';
import { StatusPage } from '../StatusPage'


import Box from '@mui/material/Box';

function AuthenticatedApp() {
    const { appBarHeight, drawerWidth } = React.useContext(SizingContext)

    return (
        <Box
            sx={{
                // change to context reference
                mt: `${appBarHeight + 20}px`,
                ml: `${drawerWidth}px`

            }}
        >
            <BrowserRouter>

                <DrawerComponent />
                
                    <Routes>
                        <Route path="/addgoal" element={<AddGoalForm />} />
                        <Route path='/' element={<StatusPage />} />
                        <Route path='/statuspage' element={<StatusPage />} />
                        <Route path='/chatroom' element={<ChatRoom />} />
                        <Route path='/smartgoals' element={<SMARTGoals />} />
                    </Routes>

            </BrowserRouter>
        </Box>
    );
}

export { AuthenticatedApp };
