import {Component} from 'react'
import Cookies from 'js-cookie'

import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'

import Header from '../Header'
import MovieLists from '../MovieLists'
import Footer from '../Footer'
import FailureView from '../FailureView'
import Loaders from '../Loader'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularMovies extends Component {
  state = {
    popularMovies: [],
    moviesPerPage: 16,
    currentPage: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovieList()
  }

  onRetry = () => {
    this.getPopularMovieList()
  }

  getPopularMovieList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const popularMovies = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({popularMovies, apiStatus: apiStatusConstants.success})
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

  onCLickPrevPage = () => {
    const {currentPage} = this.state
    return currentPage !== 1
      ? this.setState(prevState => ({currentPage: prevState.currentPage - 1}))
      : currentPage
  }

  onCLickNextPage = () => {
    const {popularMovies, moviesPerPage, currentPage} = this.state
    const totalPages = Math.ceil(popularMovies.length / moviesPerPage)
    return currentPage !== totalPages
      ? this.setState(prevState => ({currentPage: prevState.currentPage + 1}))
      : currentPage
  }

  renderPopularMovies = () => {
    const {popularMovies, moviesPerPage, currentPage} = this.state
    const totalPage = Math.ceil(popularMovies.length / moviesPerPage)
    const indexOfLastMovies = currentPage * moviesPerPage
    const indexOfFirstMovies = indexOfLastMovies - moviesPerPage
    const visibleMovies = popularMovies.slice(
      indexOfFirstMovies,
      indexOfLastMovies,
    )
    const moviePerPage = popularMovies.length > 16 ? 'pagination' : 'no-page'
    return (
      <>
        <ul className="pop-mov-lists">
          {visibleMovies.map(eachMovie => (
            <MovieLists key={eachMovie.id} movieLists={eachMovie} />
          ))}
        </ul>
        <div className={moviePerPage}>
          <button
            type="button"
            className="page-btn"
            onClick={this.onCLickPrevPage}
          >
            <FaAngleLeft />
          </button>

          <p className="pagination">
            {currentPage}of{totalPage}
          </p>
          <button
            type="button"
            className="page-btn"
            onClick={this.onCLickNextPage}
          >
            <FaAngleRight />
          </button>
        </div>
      </>
    )
  }

  renderPopularMovieStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularMovies()
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
      <div className="popular-movie-container">
        <Header />
        {this.renderPopularMovieStatus()}
        <Footer />
      </div>
    )
  }
}

export default PopularMovies
