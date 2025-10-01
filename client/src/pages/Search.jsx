import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'
import { SearchX, StarIcon } from 'lucide-react'

const Search = () => {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { image_base_url } = useAppContext()
  const navigate = useNavigate()

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmQ0NjNhZjU2NDc3ZDU3MWU1MWE5NjIyYTA4OWEzZiIsIm5iZiI6MTc1ODE5MDcwNC4zOTY5OTk4LCJzdWIiOiI2OGNiZGM3MDMwZThjYjQ0ODIwYTg1MTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.39rgF_2Nz_xgctcpXt3Qtpu4VOiIf3iB9qIYOcS4JWg'

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery)
    } else {
      setSearchResults([])
      setIsLoading(false)
    }
  }, [searchQuery])

  const performSearch = async (query) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
        {
          headers: {
            'Authorization': `Bearer ${TMDB_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()
      setSearchResults(data.results || [])
    } catch (error) {
      console.error('Error searching movies:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Release date TBA'
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

      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Search Results</h1>
        <p className='text-gray-400'>
          {searchQuery && `Showing results for "${searchQuery}"`}
        </p>
      </div>

      {searchResults.length > 0 ? (
        <>
          <p className='text-lg font-medium mb-6'>
            Found {searchResults.length} {searchResults.length === 1 ? 'movie' : 'movies'}
          </p>
          <div className='flex flex-wrap max-sm:justify-center gap-8'>
            {searchResults.map((movie) => (
              <div 
                key={movie.id} 
                className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66'
              >
                <img 
                  src={
                    movie.backdrop_path 
                      ? `${image_base_url}${movie.backdrop_path}` 
                      : movie.poster_path 
                      ? `${image_base_url}${movie.poster_path}`
                      : 'https://via.placeholder.com/500x300?text=No+Image'
                  }
                  alt={movie.title}
                  className='rounded-lg h-52 w-full object-cover'
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x300?text=No+Image'
                  }}
                />

                <p className='font-semibold mt-2 truncate'>{movie.title}</p>

                <p className='text-sm text-gray-400 mt-2'>
                  {formatDate(movie.release_date)}
                </p>

                <div className='flex items-center justify-between mt-4 pb-3'>
                  <span className='px-4 py-2 text-xs bg-gray-700 rounded-full font-medium'>
                    {movie.release_date && new Date(movie.release_date) > new Date() 
                      ? 'Coming Soon' 
                      : 'Available'}
                  </span>

                  <p className='flex items-center gap-1 text-sm text-gray-400 pr-1'>
                    <StarIcon className="w-4 h-4 text-primary fill-primary"/>
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center py-20'>
          <SearchX className='w-20 h-20 text-gray-600 mb-4'/>
          <h2 className='text-2xl font-semibold mb-2'>No movies found</h2>
          <p className='text-gray-400 mb-6 text-center max-w-md'>
            We couldn't find any movies matching "{searchQuery}". Try searching with different keywords.
          </p>
          <button 
            onClick={() => {navigate('/releases'); scrollTo(0,0)}}
            className='px-8 py-3 bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'
          >
            Browse Latest Releases
          </button>
        </div>
      )}
    </div>
  )
}

export default Search