import { HashRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { React } from 'react';
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './pages/Home.jsx';
import { ToyIndex } from './pages/ToyIndex.jsx';
import { UserMsg } from './cmps/UserMsg.jsx';
function App() {

  return (
      <Router>
        <AppHeader />
        <main className="main-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/toy" element={<ToyIndex />} />
          </Routes>
        </main>
        <UserMsg/>
      </Router>
  );
}

export default App;
