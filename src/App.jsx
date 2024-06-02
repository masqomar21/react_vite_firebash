import {
    Login,
    Register,
    Home
} from './pages';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import './lib/MqttClient'
import {  AuthProvider } from './provider/atuhProvider';
import { useAuth } from './hook/auth';
import PropTypes from 'prop-types';

export function PrivateRoute({ element}) {
  const { currentUser } = useAuth();
  return currentUser ? element  : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};


function App() {
    return (
    <AuthProvider>
      <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute element={<Home/>} />} />
      </Routes>
    </AuthProvider>
);
}

export default App