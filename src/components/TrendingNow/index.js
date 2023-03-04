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

class TrendingNow extends Component {
  state = {trendingNow: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingNowMovieList()
  }

  onRetry = () => {
    this.getTrendingNowMovieList()
  }

  getTrendingNowMovieList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const trendingNow = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({trendingNow, apiStatus: apiStatusConstants.success})
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

  renderTrendNowMovies = () => {
    const {trendingNow} = this.state
    return (
      <div className="trending-now-container">
        <SlickMovieCard movieLists={trendingNow} />
      </div>
    )
  }

  renderTrendNowStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendNowMovies()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return this.renderTrendNowStatus()
  }
}

export default TrendingNow
