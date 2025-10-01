import React, { useEffect, useState } from 'react'
import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'
import { StarIcon } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const Releases = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('now_playing') // 'now_playing' or 'upcoming'
  const { image_base_url } = useAppContext()

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmQ0NjNhZjU2NDc3ZDU3MWU1MWE5NjIyYTA4OWEzZiIsIm5iZiI6MTc1ODE5MDcwNC4zOTY5OTk4LCJzdWIiOiI2OGNiZGM3MDMwZThjYjQ0ODIwYTg1MTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.39rgF_2Nz_xgctcpXt3Qtpu4VOiIf3iB9qIYOcS4JWg'

  useEffect(() => {
    fetchMovies(activeTab)
  }, [activeTab])

  const fetchMovies = async (type) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`,
        {
          headers: {
            'Authorization': `Bearer ${TMDB_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()
      setMovies(data.results || [])
    } catch (error) {
      console.error('Error fetching movies:', error)
      setMovies([])
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top="150px" left="0px"/>
      <BlurCircle bottom="50px" right="50px"/>

      {/* Header with Tabs */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-4'>Latest Releases</h1>
        
        {/* Tab Buttons */}
        <div className='flex gap-4'>
          <button
            onClick={() => setActiveTab('now_playing')}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === 'now_playing' 
                ? 'bg-primary text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Now Playing
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === 'upcoming' 
                ? 'bg-primary text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Upcoming
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      {movies.length > 0 ? (
        <div className='flex flex-wrap max-sm:justify-center gap-8'>
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66'
            >
              <img 
                src={movie.backdrop_path ? `${image_base_url}${movie.backdrop_path}` : `${image_base_url}${movie.poster_path}`}
                alt={movie.title}
                className='rounded-lg h-52 w-full object-cover cursor-pointer'
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x300?text=No+Image'
                }}
              />

              <p className='font-semibold mt-2 truncate'>{movie.title}</p>

              <p className='text-sm text-gray-400 mt-2'>
                {movie.release_date ? formatDate(movie.release_date) : 'Release date TBA'}
              </p>

              <div className='flex items-center justify-between mt-4 pb-3'>
                <span className='px-4 py-2 text-xs bg-gray-700 rounded-full font-medium'>
                  {activeTab === 'now_playing' ? 'In Theaters' : 'Coming Soon'}
                </span>

                <p className='flex items-center gap-1 text-sm text-gray-400 pr-1'>
                  <StarIcon className="w-4 h-4 text-primary fill-primary"/>
                  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-20'>
          <h2 className='text-2xl font-semibold mb-2'>No movies found</h2>
          <p className='text-gray-400'>Unable to fetch movies at this time.</p>
        </div>
      )}
    </div>
  )
}

export default Releases