import {format} from 'date-fns'

import './index.css'

const MovieItemBanner = props => {
  const {movieItemData} = props
  const {
    id,
    backdropPath,
    title,
    overview,
    adult,
    runtime,
    releaseDate,
  } = movieItemData
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const releaseYear = format(new Date(releaseDate), 'yyyy')

  return (
    <div
      key={id}
      className="banner-item"
      style={{
        backgroundImage: `url(${backdropPath})`,
        backgroundPosition: 'center-center',
        backgroundSize: '100% 100%',
        objectFit: 'contain',
      }}
    >
      <div className="left-fade">
        <></>
      </div>
      <div className="banner-item-content">
        <h1 className="banner-item-title">{title}</h1>
        <div className="content-details">
          <p className="runtime">{`${hours}h ${minutes}m`}</p>
          <p className="adult">{adult ? 'A' : 'U/A'}</p>
          <p className="years">{releaseYear}</p>
        </div>
        <p className="banner-item-overview">{overview}</p>
        <button type="button" className="banner-button">
          Play
        </button>
      </div>
      <div className="banner-bottom-fade">
        <></>
      </div>
    </div>
  )
}

export default MovieItemBanner
