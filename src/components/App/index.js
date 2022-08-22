import './';
import Header from '../Header/index.js'
import Landing from '../Landing/index.js'
import Footer from '../Footer/index.js'
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';

function App() {
  return (
    <div>
      <Header />

      <Welcome />
      <Landing />
      <Login />
      <Signup />
      <ErrorPage />
      
      <Footer />
    </div>
  );
}

export default App;
