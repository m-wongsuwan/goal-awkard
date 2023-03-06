import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { About } from '../About';
import { AddGoalForm } from '../AddGoalForm';
import { BlockedPage } from '../BlockedPage';
import { ChatRoom } from '../Chatroom';
import { DrawerComponent } from '../DrawerComponent';
import { Header } from '../Header';
import { SMARTGoals } from '../SMARTGoals';
import { StatusPage } from '../StatusPage'

import Box from '@mui/material/Box';

import { SizingContext } from '../../context/sizing';

function AuthenticatedApp() {
    const { appBarHeight, drawerWidth } = React.useContext(SizingContext)

    return (
        <Box
            sx={{ mt: `${appBarHeight + 20}px`, ml: `${drawerWidth}px` }}>
            <BrowserRouter>
                <Header />
                <DrawerComponent />
                
                    <Routes>
                        <Route path="/addgoal" element={<AddGoalForm />} />
                        <Route path='/' element={<StatusPage />} />
                        <Route path='/statuspage' element={<StatusPage />} />
                        <Route path='/chatroom' element={<ChatRoom />} />
                        <Route path='/smartgoals' element={<SMARTGoals />} />
                        <Route path='/about' element={<About authenticated={true} />} />
                        <Route path='*' element={<BlockedPage authenticated={true} />} />

                    </Routes>

            </BrowserRouter>
        </Box>
    );
}

export { AuthenticatedApp };
