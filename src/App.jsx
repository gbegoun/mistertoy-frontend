import { HashRouter as Router } from 'react-router-dom';
import { Route, Routes,Navigate } from 'react-router-dom';
import { React } from 'react';
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './pages/Home.jsx';
import { ToyIndex } from './pages/ToyIndex.jsx';
import { UserMsg } from './cmps/UserMsg.jsx';
import { ToyDetails } from './cmps/ToyDetails.jsx';
function App() {

  return (
      <Router>
        <AppHeader />
        <main className="main-layout">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/toy" element={<ToyIndex/>}>
              <Route apth="/toy/:toyId" element={<ToyDetails />} />
            </Route>
          </Routes>
        </main>
        <UserMsg/>
      </Router>
  );
}

export default App;
