import { useEffect, useState } from 'react'
import './App.css'
import { getGame } from './api/GameService';

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const getAllGames = async(page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getGame(page, size);
      setData(data);
      console.log(data);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  )
}

export default App
