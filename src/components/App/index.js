import './';
import { Route, Routes } from 'react-router-dom'

import Header from '../Header/index.js'
import Landing from '../Landing/index.js'
import Footer from '../Footer/index.js'
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';
import ForgetPassword from '../ForgetPassword';

function App() {
  return (
    <div>

        <Header />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          
        <Footer />

    </div>
  );
}

export default App;
