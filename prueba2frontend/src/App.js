import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/login/Login";
import AdministradorPage from "./components/administrador/administrador-page/AdministradorPage";
import SuperAdministradorPage from "./components/super-administrador/super-administrador-page/SuperAdministradorPage";
import UsuarioRegularPage from "./components/usuario-regular/usuario-reular-page/UsuarioRegularPage";
import GetAll from "./components/super-administrador/User/layouts/getAll";
import ServiciosPage from "./components/super-administrador/servicios/layout/ServiciosPage";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdministradorPage />} />
            <Route
                path="/superadmin"
                element={
                    <SuperAdministradorPage>
                        <Routes>
                            <Route path="/getalluser" element={<GetAll />} />
                            <Route path="/servicios" element={<ServiciosPage/>}/>
                        </Routes>
                    </SuperAdministradorPage>
                }
            />
            <Route path="/empleado" element={<UsuarioRegularPage />} />

        </Routes>
      </Router>
  );
}

export default App;
