import {Component} from 'react'
import Cookies from 'js-cookie'

import HomeBanner from '../HomePoster'
import Header from '../Header'
import TrendingNow from '../TrendingNow'
import OriginalsMovie from '../OriginalsMovie'
import TopRated from '../TopRated'
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

class Home extends Component {
  state = {homePoster: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getHomePagePoster()
  }

  onRetry = () => {
    this.getHomePagePoster()
  }

  getHomePagePoster = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedDataLength = data.results.length
      const randomPoster =
        data.results[Math.floor(Math.random() * fetchedDataLength)]
      const homePoster = {
        backdropPath: randomPoster.backdrop_path,
        id: randomPoster.id,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
        title: randomPoster.title,
      }
      this.setState({
        homePoster: {...homePoster},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoading = () => (
    <div className="loader" testid="loader">
      <Loaders />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-home-container">
      <FailureView onRetry={this.onRetry} />
    </div>
  )

  renderHomePoster = () => {
    const {homePoster} = this.state
    return <HomeBanner key={homePoster.id} randomPoster={homePoster} />
  }

  renderHomePosterStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomePoster()
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
      <div className="home-container">
        <Header />
        {this.renderHomePosterStatus()}
        <h1 className="movie-list-headings">Trending Now</h1>
        <TrendingNow />
        <h1 className="movie-list-heading">Top Rated</h1>
        <TopRated />
        <h1 className="movie-list-heading">Originals</h1>
        <OriginalsMovie />
        <Footer />
      </div>
    )
  }
}

export default Home
