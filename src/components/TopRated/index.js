import {Component} from 'react'
import Cookies from 'js-cookie'

import SlickMovieCard from '../SlickMovieCard'
import Loaders from '../Loader'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRated extends Component {
  state = {topRatedMovies: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRatedMovies()
  }

  onRetry = () => {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const topRatedMovies = data.results.map(eachTopRated => ({
        id: eachTopRated.id,
        backdropPath: eachTopRated.backdrop_path,
        posterPath: eachTopRated.poster_path,
        title: eachTopRated.title,
        overview: eachTopRated.overview,
      }))
      this.setState({topRatedMovies, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <FailureView onRetry={this.onRetry} />
    </div>
  )

  renderLoading = () => (
    <div className="loader">
      <Loaders />
    </div>
  )

  renderTopRatedMovieList = () => {
    const {topRatedMovies} = this.state

    return (
      <div className="top-rated-slick-container">
        <SlickMovieCard movieLists={topRatedMovies} />
      </div>
    )
  }

  renderTopRatedStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTopRatedMovieList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return this.renderTopRatedStatus()
  }
}

export default TopRated
