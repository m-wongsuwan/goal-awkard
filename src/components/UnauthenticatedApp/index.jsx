import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import { useAuth } from '../../hooks/useAuth';

import { UnauthenticatedWelcome } from '../UnauthenticatedWelcome';

// import Container from '@mui/material/Container';
// import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography';
import { Accountability } from '../Accountability';
import { BlockedPage } from '../BlockedPage';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Unstable_Grid2'

// import { recaptchaVerifier } from '../../services/firebase';


function UnauthenticatedApp() {

    return (
        <>
            <Typography>UnauthenticatedApp Component (debug text)</Typography>

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<UnauthenticatedWelcome />} />
                    <Route path='/accountability' element={<Accountability />} />
                    <Route path='/accountability/:userId/:secretId' element={<Accountability hash={true} />} />

                    <Route path='/statuspage' element={<BlockedPage  page='statuspage' />} />
                    <Route path='/chatroom' element={<BlockedPage  page='chatroom' />} />
                    <Route path='/addgoal' element={<BlockedPage page='addgoal'  />} />
                </Routes>
            </BrowserRouter>
        </>
        
    );
}

export { UnauthenticatedApp };