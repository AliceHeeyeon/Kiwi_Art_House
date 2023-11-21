import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Artists = () => {
    const [loading, setLoading] = useState(true)
    const [artists, setArtists] = useState(null)

    const artistsEndPoint = `${baseUrl}/artists?_embed`

    function scrollToTop() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
    }

    useEffect(() => {
        axios.get(artistsEndPoint)
        .then((res)=> {
            setArtists(res.data)
            setLoading(false)
            scrollToTop()
        })
        .catch((err)=> {
            console.log(err)
            setLoading(false)
        })
    },[])

    if (loading) {
        return (<div>Loading...</div>)
    }

    const ArtistLists = ({artists}) => {
        const mappedArtists = artists.map((artist, index) => {
          return (
            <div key={artist.slug + "-" + index} className='artists-list'>
              <Link to={`/artists/${artist.id}`}>
                <img src={artist.acf.artist_works1.url} alt={artist.slug}/>
                <h5>{artist.title.rendered}</h5>
              </Link>
            </div>
          )
        })
    
        return (
          <div className='artist-grid'>
               {mappedArtists}
            </div>
        )
    }

  return (
    <div id='artists-page' className='page-style'>
      <h2 className='page-title'>Artists</h2>
        <ArtistLists artists={artists} />
    </div>
  )
}

export default Artists
