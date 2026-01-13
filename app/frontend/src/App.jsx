import Home from './pages/Home';
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    async function fetchToken() {
      const existingToken = sessionStorage.getItem("token");

      if (existingToken) return;
      try{
          const res = await fetch("https://testing-1-gn0w.onrender.com/api/token",{mode:"cors"});
          if(!res.ok){
            throw new Error("token fetch failed");
          }
          const data = await res.json();
          sessionStorage.setItem("token", data.token);
      }
       catch (err) {
        console.error("Unable to get token:", err);
      }
    }


    fetchToken();
  }, []);

  return (
    <Home/>
  )
}

export default App
