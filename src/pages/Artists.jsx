import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Artists = () => {
    const [loading, setLoading] = useState(true)
    const [artists, setArtists] = useState(null)

    const artistsEndPoint = `${baseUrl}/artists?_embed`

    useEffect(() => {
        axios.get(artistsEndPoint)
        .then((res)=> {
            setArtists(res.data)
            const timeout = setTimeout(() => setLoading(false), 1000);
        })
        .catch((err)=> {
            console.log(err)
            setLoading(false)
        })

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
    },[])

    if (loading) {
      return (<Loading/>)
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
