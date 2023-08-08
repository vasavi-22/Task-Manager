import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Tasks from './components/Tasks';
import ViewCard from './components/ViewCard';
import Temp from './components/Temp';

function App() {
  return (
    <div className="App">
      {/* <Temp /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tasks/>} />
          <Route path="/viewcard" element={<ViewCard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
