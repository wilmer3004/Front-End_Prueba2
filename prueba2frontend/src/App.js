import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/login/Login";
import AdministradorPage from "./components/administrador/administrador-page/AdministradorPage";
import SuperAdministradorPage from "./components/super-administrador/super-administrador-page/SuperAdministradorPage";
import UsuarioRegularPage from "./components/usuario-regular/usuario-reular-page/UsuarioRegularPage";
import GetAll from "./components/super-administrador/User/getAll";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdministradorPage />} />
            <Route path="/superadmin" element={<SuperAdministradorPage />} />
            <Route path="/empleado" element={<UsuarioRegularPage />} />
            <Route path="/getalluser" element={<GetAll />} />
        </Routes>
      </Router>
  );
}

export default App;
