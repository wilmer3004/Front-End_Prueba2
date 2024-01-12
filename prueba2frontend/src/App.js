import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/login/Login";
import AdministradorPage from "./components/administrador/administrador-page/AdministradorPage";
import SuperAdministradorPage from "./components/super-administrador/super-administrador-page/SuperAdministradorPage";
import UsuarioRegularPage from "./components/usuario-regular/usuario-reular-page/UsuarioRegularPage";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdministradorPage />} />
            <Route path="/superadmin" element={<SuperAdministradorPage />} />
            <Route path="/userregular" element={<UsuarioRegularPage />} />

        </Routes>
      </Router>
  );
}

export default App;
