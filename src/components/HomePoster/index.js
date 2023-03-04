import './index.css'

const HomeBanner = props => {
  const {randomPoster} = props
  const {id, title, overview, backdropPath} = randomPoster

  return (
    <div
      key={id}
      className="banner"
      style={{
        backgroundImage: `url(${backdropPath})`,
        backgroundPosition: 'center-center',
        backgroundSize: '100% 100%',
        objectFit: 'contain',
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">{title}</h1>
        <h1 className="banner-overview">{overview}</h1>
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

export default HomeBanner
