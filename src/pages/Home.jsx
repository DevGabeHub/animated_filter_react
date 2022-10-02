import { useState } from 'react'
import { useEffect } from 'react'
import Filter from '../components/Filter'
import Movie from '../components/Movie'
import { AnimatePresence, motion } from 'framer-motion'

const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`

const Home = () => {
  const [popular, setPopular] = useState([])
  const [activeGenre, setActiveGenre] = useState(0)
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    const getPopular = async () => {
      const res = await fetch(url)
      const data = await res.json()
      setPopular(data.results)
      setFiltered(data.results)
    }
    getPopular()
  }, [])

  return (
    <div>
      <Filter
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
        setFiltered={setFiltered}
        popular={popular}
      />
      <motion.div layout className='popular-movies'>
        <AnimatePresence>
          {filtered.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Home
