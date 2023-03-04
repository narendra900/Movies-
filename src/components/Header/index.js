import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

class Header extends Component {
  state = {showMenuOptions: false, searchInput: ''}

  onClickShowMenuOptions = () => {
    this.setState({showMenuOptions: true})
  }

  onClickToCLoseMenu = () => {
    this.setState({showMenuOptions: false})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchMovies = () => {
    const {searchInput} = this.state
    const {getSearchInputMovies} = this.props
    if (searchInput !== '') {
      getSearchInputMovies(searchInput)
    }
  }

  render() {
    const {showMenuOptions, searchInput} = this.state

    const {match} = this.props
    const {path} = match
    const moviesPath = path.split('/:')
    const movies = moviesPath[0]
    const menuHome = movies === '/' ? 'home' : ''
    const menuPopular = movies === '/popular' ? 'popular' : ''
    const menuAccount = movies === '/account' ? 'account' : ''
    const moviesItem = movies === '/movies' ? 'movies' : ''
    const moviesSearch = movies === '/search'

    return (
      <nav className={`nav-container bg-${menuHome} bg-${moviesItem}`}>
        <div className="nav-header-container">
          <div className="desktop-nav-company">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/ddh3lzbxs/image/upload/v1671714961/Group_7399_qfscnk.png"
                alt="website logo"
                className="logo"
              />
            </Link>
            <ul className="desktop-menu-list">
              <Link to="/" className="nav-link">
                <li className={`desktop-menu-item ${menuHome}`}>Home</li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className={`desktop-menu-item ${menuPopular}`}>Popular</li>
              </Link>
            </ul>
          </div>
          <ul className="nav-elements-list">
            <li>
              {moviesSearch && (
                <div className="search-input-cont">
                  <input
                    type="search"
                    placeholder="Search"
                    value={searchInput}
                    className="search-input"
                    onChange={this.onChangeSearchInput}
                  />
                  <button
                    type="button"
                    className="search-nav-btn"
                    onClick={this.onClickSearchMovies}
                    testid="searchButton"
                  >
                    <HiOutlineSearch className="search-input-icon" />
                  </button>
                </div>
              )}
              {!moviesSearch && (
                <Link to="/search">
                  <button
                    type="button"
                    className="nav-btn"
                    onClick={this.onClickShowSearchBar}
                    testid="searchButton"
                  >
                    <HiOutlineSearch className="search-icon" />
                  </button>
                </Link>
              )}
            </li>
            <li>
              <button
                type="button"
                className="mobile-menu-btn"
                onClick={this.onClickShowMenuOptions}
              >
                <img
                  src="https://res.cloudinary.com/ddh3lzbxs/image/upload/v1671733377/add-to-queue_1_maqlau.png"
                  alt="menu"
                  className="mobile-hamburger-menu"
                />
              </button>
              <Link to="/account" className="nav-link">
                <img
                  src="https://res.cloudinary.com/ddh3lzbxs/image/upload/v1671743310/Avatar_kdvwod.png"
                  alt="profile"
                  className="desktop-avatar"
                />
              </Link>
            </li>
          </ul>
        </div>
        {showMenuOptions && (
          <div className="mobile-menu-options-cont">
            <ul className="mobile-menu-options-list">
              <Link to="/" className="nav-link">
                <li className={`mobile-menu-options-item ${menuHome}`}>Home</li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className={`mobile-menu-options-item ${menuPopular}`}>
                  Popular
                </li>
              </Link>
              <Link to="/account" className="nav-link">
                <li className={`mobile-menu-options-item ${menuAccount}`}>
                  Account
                </li>
              </Link>
            </ul>
            <button
              type="button"
              className="mobile-cross-nav-btn"
              onClick={this.onClickToCLoseMenu}
            >
              <img
                src="https://res.cloudinary.com/ddh3lzbxs/image/upload/v1671737691/Shape_wmvgfk.png"
                alt="cross"
                className="mobile-cross"
              />
            </button>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
