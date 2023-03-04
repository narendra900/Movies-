import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="account-container">
      <Header />
      <div className="user-details-cont">
        <h1 className="account-heading">Account</h1>
        <hr className="hr-line" />
        <div className="membership-cont">
          <p className="membership-heading">Member ship</p>
          <div className="membership-details">
            <p className="username">p.m.manikndn@gmail.com</p>
            <p className="password">Password: **********</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="plan-details-cont">
          <p className="plan-details-heading">Plan details</p>
          <p className="premium">
            Premium <span className="hd">Ultra HD</span>
          </p>
        </div>
        <hr className="hr-line" />
        <button type="button" className="log-out-btn" onClick={onClickLogout}>
          LogOut
        </button>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default Account
