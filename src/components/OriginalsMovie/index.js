import {Component} from 'react'
import Cookies from 'js-cookie'

import SlickMovieCard from '../SlickMovieCard'
import FailureView from '../FailureView'
import Loaders from '../Loader'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class OriginalsMovie extends Component {
  state = {originalsMovie: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getOriginalsMovieList()
  }

  onRetry = () => {
    this.getOriginalsMovieList()
  }

  getOriginalsMovieList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const originalsMovie = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({originalsMovie, apiStatus: apiStatusConstants.success})
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
    <div className="loader" testid="loader">
      <Loaders />
    </div>
  )

  renderOriginalMovies = () => {
    const {originalsMovie} = this.state

    return (
      <div className="original-movie-container">
        <SlickMovieCard movieLists={originalsMovie} />
      </div>
    )
  }

  renderOriginalMovieStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOriginalMovies()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return this.renderOriginalMovieStatus()
  }
}

export default OriginalsMovie
