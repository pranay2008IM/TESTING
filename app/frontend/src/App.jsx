import Home from './pages/Home';
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    async function fetchToken() {
      const existingToken = localStorage.getItem("token");

      if (existingToken) return;

      const res = await fetch("http://localhost:5000/api/token");
      const data = await res.json();
      localStorage.setItem("token", data.token);
    }

    fetchToken();
  }, []);

  return (
    <Home/>
  )
}

export default App
