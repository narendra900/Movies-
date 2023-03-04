import {Component} from 'react'
import Cookies from 'js-cookie'

import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'

import Header from '../Header'
import MovieLists from '../MovieLists'
import Loader from '../Loader'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchMovies extends Component {
  state = {
    searchInput: '',
    searchFilterMovies: [],
    moviesPerPage: 16,
    currentPage: 1,
    apiStatus: apiStatusConstants.initial,
  }

  onClickRetry = () => {
    this.getSearchInputMovies()
  }

  getSearchInputMovies = async searchInput => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const searchFilterMovies = data.results.map(eachSearchMovies => ({
        id: eachSearchMovies.id,
        backdropPath: eachSearchMovies.backdrop_path,
        posterPath: eachSearchMovies.poster_path,
        title: eachSearchMovies.title,
      }))
      this.setState({
        searchInput,
        searchFilterMovies,
        currentPage: 1,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-movies-container">
      <div className="fail-view">
        <img
          src="https://res.cloudinary.com/ddh3lzbxs/image/upload/v1671985377/Background-Complete_alymwz.png"
          alt="failure view"
          className="fail-image"
        />
        <p className="fail-heading">Something went wrong. Please try again</p>
        <button className="retry-btn" type="button" onClick={this.onClickRetry}>
          Try Again
        </button>
      </div>
    </div>
  )

  renderSearchNotFound = () => {
    const {searchInput} = this.state
    return (
      <div className="search-not-found-container">
        <img
          src="https://res.cloudinary.com/ddh3lzbxs/image/upload/v1671980517/Group_7394_1_dd1hcb.png"
          alt="no movies"
          className="search-not-found-img"
        />
        <h1 className="not-found-desc">
          Your search for {searchInput} did not find any matches
        </h1>
      </div>
    )
  }

  onCLickPrevPage = () => {
    const {currentPage} = this.state
    return currentPage !== 1
      ? this.setState(prevState => ({currentPage: prevState.currentPage - 1}))
      : currentPage
  }

  onCLickNextPage = () => {
    const {searchFilterMovies, moviesPerPage, currentPage} = this.state
    const totalPages = Math.ceil(searchFilterMovies.length / moviesPerPage)
    return currentPage !== totalPages
      ? this.setState(prevState => ({currentPage: prevState.currentPage + 1}))
      : currentPage
  }

  renderSearchFilter = () => {
    const {searchFilterMovies, moviesPerPage, currentPage} = this.state
    const totalPage = Math.ceil(searchFilterMovies.length / moviesPerPage)
    const indexOfLastMovies = currentPage * moviesPerPage
    const indexOfFirstMovies = indexOfLastMovies - moviesPerPage
    const visibleMovies = searchFilterMovies.slice(
      indexOfFirstMovies,
      indexOfLastMovies,
    )
    const showSearchFilterView = searchFilterMovies.length > 0
    const moviePerPage =
      searchFilterMovies.length > 16 ? 'pagination' : 'no-page'

    return showSearchFilterView ? (
      <>
        <ul className="search-movies-list">
          {visibleMovies.map(each => (
            <MovieLists key={each.id} movieLists={each} />
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
    ) : (
      this.renderSearchNotFound()
    )
  }

  renderSearchMoviesStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchFilter()
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
      <div className="search-filter-container">
        <Header getSearchInputMovies={this.getSearchInputMovies} />
        {this.renderSearchMoviesStatus()}
      </div>
    )
  }
}

export default SearchMovies
