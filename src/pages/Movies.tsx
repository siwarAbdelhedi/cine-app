import React, { useEffect, useState } from 'react';
import { Movie, MoviesResponse } from '../dtos/movie.types';


const TMDB_API_KEY = '09173c50a8bbe98db36a2c9c4b5353e3'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie]= useState<Movie| null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}`
        );
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des films');
        }
        
        const data: MoviesResponse = await response.json();
        setMovies(prevMovies => 
          page === 1 ? data.results : [...prevMovies, ...data.results]
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Films Populaires</h1>

        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 ">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              onClick={() => setSelectedMovie(movie)}
            >
              <div className="relative aspect-[2/3]">
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-lg font-bold">
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">
                  {movie.title}
                </h2>
                {/* <p className="text-gray-300 text-sm line-clamp-5">
                  {movie.overview}
                </p> */}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="text-red-500 bg-red-100 p-4 rounded mt-4">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Charger plus de films
            </button>
          </div>
        )}

        {loading && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <>
        {/* Overlay */}
        <div 
        onClick={() => setSelectedMovie(null)} className='fixed h-screen w-screen bg-black top-0 right-0 bg-opacity-50'
        ></div>

      {/* Modal Content */}
      <div className='fixed h-96 w-96 top-24 right-1/2 bg-gray-800'>
          <img 
          src={`${IMAGE_BASE_URL}${selectedMovie?.poster_path}`} 
          className='h-full' 
          alt="selectedMovie.title" />
          <div className='absolute bottom-0 left-0 bg-gradient-to-t from-black w-full p-4'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              {selectedMovie.title}
            </h2>
            <p className='text-gray-400 text-sm mb-2'>
              {new Date(selectedMovie.release_date).toLocaleDateString(
                      'fr-FR'
              )}
            </p>
          </div>
          <div className='p-4 text-white'>
            <p className='mb-4'>{selectedMovie.overview}</p>
            <div className='flex justify-between items-left'>
              <div className='flex items-left text-gray-300 space-x-2'>
                <span>{selectedMovie.vote_average.toFixed(1)}</span>
                <span>{selectedMovie.poster_path}</span>
              </div>
            </div>
          </div>

      </div>
      </>
    )}
    </div>
  );
};

export default Movies;
