import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AddGoalForm } from '../AddGoalForm';
import { StatusPage } from '../StatusPage'
import { ChatRoom } from '../Chatroom';
// import { Landing } from '../Landing';
// import { ChatRoom } from '../ChatRoom';

function AuthenticatedApp() {
    return (
        <>
            <h1>Authenticated</h1>
            <BrowserRouter>
                <Link to='/'>Status Page</Link>
                <Link to='/addgoal'>Add Goal Form</Link>
                <Link to='/chatroom'>Chatroom</Link>
                <Routes>
                    <Route path="/addgoal" element={<AddGoalForm />} />
                    <Route path='/' element={<StatusPage />} />
                    <Route path='/chatroom' element={<ChatRoom />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export { AuthenticatedApp };
