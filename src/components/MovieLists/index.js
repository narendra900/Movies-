import {Link} from 'react-router-dom'

import './index.css'

const MovieLists = props => {
  const {movieLists} = props

  return (
    <Link to={`/movies/${movieLists.id}`} key={movieLists.id} target="_parent">
      <li key={movieLists.id} className="movie-item">
        <img
          src={movieLists.posterPath}
          alt={movieLists.title}
          className="movie-img"
        />
      </li>
    </Link>
  )
}

export default MovieLists
