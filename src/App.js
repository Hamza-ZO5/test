import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import DragAndDropUser from './components/DragAndDropUser';
import Draganddrop from './components/Draganddrop';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'User': 'admin',
  'Editor': 'user',
  'Admin': 'admin'
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
         {/* public routes  */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

         {/* we want to protect these routes  */}
         <Route element={<RequireAuth allowedRoles={[ROLES.Editor,ROLES.Admin]} />}> 

          <Route path="/" element={<Home />} />
       </Route>

         <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}> 
          <Route path="DragAndDropUser" element={<DragAndDropUser />} />
         </Route> 


         <Route element={<RequireAuth allowedRoles={["admin"]} />}> 
          <Route path="Draganddrop" element={<Draganddrop />} />
         </Route> 

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

         catch all 
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;