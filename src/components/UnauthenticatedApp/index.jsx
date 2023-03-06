import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SizingContext } from '../../context/sizing';

import { Accountability } from '../Accountability';
import { BlockedPage } from '../BlockedPage';
import { UnauthenticatedWelcome } from '../UnauthenticatedWelcome';

import { Header } from '../Header';

import Box from '@mui/material/Box';
import { SMARTGoals } from '../SMARTGoals';



function UnauthenticatedApp() {
    const {appBarHeight} = React.useContext(SizingContext)

    return (
        <Box
            sx={{
                mt: `${appBarHeight + 20}px`
            }}
        >
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<UnauthenticatedWelcome />} />
                    <Route path='/accountability' element={<BlockedPage accountability={true} />} />
                    <Route path='/accountability/:userId/:secretId' element={<Accountability hash={true} />} />

                    <Route path='/chatroom' element={<BlockedPage  page='see chat' />} />
                    <Route path='/addgoal' element={<BlockedPage page='add a goal'  />} />
                    <Route path='/smartgoals' element={<SMARTGoals />} />

                    <Route path='*' element={<BlockedPage page="doesn't exist" />} />
                </Routes>
            </BrowserRouter>
        </Box>
        
    );
}

export { UnauthenticatedApp };