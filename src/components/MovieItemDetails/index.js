import {Component} from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'

import Header from '../Header'
import MovieItemBanner from '../MovieItemBanner'
import MovieLists from '../MovieLists'
import Footer from '../Footer'
import Loaders from '../Loader'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItems extends Component {
  state = {
    movieItemData: {},
    genres: [],
    spokenLanguages: [],
    similarMovies: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieItems()
  }

  onRetry = () => {
    this.getMovieItems()
  }

  getMovieItems = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const movieItemData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      const genres = data.movie_details.genres.map(eachGenres => ({
        id: eachGenres.id,
        name: eachGenres.name,
      }))
      const spokenLanguages = data.movie_details.spoken_languages.map(
        eachLanguage => ({
          id: eachLanguage.id,
          englishName: eachLanguage.english_name,
        }),
      )
      const similarMovies = data.movie_details.similar_movies.map(
        eachMovies => ({
          id: eachMovies.id,
          backdropPath: eachMovies.backdrop_path,
          posterPath: eachMovies.poster_path,
          title: eachMovies.title,
        }),
      )
      this.setState({
        movieItemData,
        genres,
        spokenLanguages,
        similarMovies,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-movies-container">
      <FailureView onRetry={this.onRetry} />
    </div>
  )

  renderLoading = () => (
    <div className="loader" testid="loader">
      <Loaders />
    </div>
  )

  renderMovieItemDetails = () => {
    const {movieItemData, genres, spokenLanguages, similarMovies} = this.state
    const releaseDateFormat = format(
      new Date(movieItemData.releaseDate),
      'do MMMM yyyy',
    )

    return (
      <div>
        <MovieItemBanner key={movieItemData.id} movieItemData={movieItemData} />
        <div className="movie-content-details">
          <div className="items-cont">
            <h1 className="item-heading">Genres</h1>
            <ul className="item-content-list">
              {genres.map(eachGenre => (
                <li key={eachGenre.id} className="item-desc">
                  <p>{eachGenre.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="items-cont">
            <h1 className="item-heading">Audio Available</h1>
            <ul className="item-content-list">
              {spokenLanguages.map(eachLanguage => (
                <li key={eachLanguage.id} className="item-desc">
                  <p>{eachLanguage.englishName}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rating-cont">
            <h1 className="item-heading">Rating Count</h1>
            <p className="item-desc">{movieItemData.voteCount}</p>
            <h1 className="item-heading">Rating Average</h1>
            <p className="item-desc">{movieItemData.voteAverage}</p>
          </div>

          <div className="budget-date-cont">
            <h1 className="item-heading">Budget</h1>
            <p className="item-desc">{movieItemData.budget}</p>
            <h1 className="item-heading">Release Date</h1>
            <p className="item-desc">{releaseDateFormat}</p>
          </div>
        </div>
        <div className="similar-movies-cont">
          <h1 className="similar-movies-heading">More Like this</h1>
          <ul className="similar-movie-list">
            {similarMovies.map(eachMovie => (
              <MovieLists key={eachMovie.id} movieLists={eachMovie} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderMovieItemDetailsStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-item-container">
        <Header />
        {this.renderMovieItemDetailsStatus()}
        <Footer />
      </div>
    )
  }
}

export default MovieItems
