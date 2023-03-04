import {Component} from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 360,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class SlickMovieCard extends Component {
  renderSlider = () => {
    const {movieLists} = this.props
    return (
      <ul>
        <Slider {...settings}>
          {movieLists.map(each => (
            <Link to={`/movies/${each.id}`} key={each.id}>
              <li key={each.id} className="slick-item">
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="slick-movie-img"
                />
              </li>
            </Link>
          ))}
        </Slider>
      </ul>
    )
  }

  render() {
    return <div className="slick-container">{this.renderSlider()}</div>
  }
}

export default SlickMovieCard
