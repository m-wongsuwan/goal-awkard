import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Accountability } from '../Accountability';
import { BlockedPage } from '../BlockedPage';
import { NoLinkAccountability } from '../NoLinkAccountability';
import { UnauthenticatedWelcome } from '../UnauthenticatedWelcome';

import Box from '@mui/material/Box';



function UnauthenticatedApp() {

    return (
        <Box>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<UnauthenticatedWelcome />} />
                    <Route path='/accountability' element={<NoLinkAccountability />} />
                    <Route path='/accountability/:userId/:secretId' element={<Accountability hash={true} />} />

                    <Route path='/statuspage' element={<BlockedPage  page='statuspage' />} />
                    <Route path='/chatroom' element={<BlockedPage  page='chatroom' />} />
                    <Route path='/addgoal' element={<BlockedPage page='addgoal'  />} />
                    <Route path='/account' element={<BlockedPage page='your account'  />} />

                    <Route path='*' element={<BlockedPage page="doesn't exist" />} />
                </Routes>
            </BrowserRouter>
        </Box>
        
    );
}

export { UnauthenticatedApp };