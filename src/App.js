import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddEditUser from './components/AddEditUser';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route index path='/' element={<HomePage />} />
          <Route path='/add-user' element={<AddEditUser />} />
          <Route path='/edit-user/:userId' element={<AddEditUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
