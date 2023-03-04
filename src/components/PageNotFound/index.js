import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-cont" alt="not found">
    <h1 className="heading">Lost Your Way ?</h1>
    <p className="desc">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/" className="nav-link">
      <button type="button" className="back-btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
