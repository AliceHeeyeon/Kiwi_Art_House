import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useArtworkContext } from '../context/ArtworkContext'
import { BsArrowLeft } from "react-icons/bs";
import useCustomiser from '../hooks/useCustomiser';
import Loading from './Loading';
import { Helmet } from 'react-helmet';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const SingleArtist = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [artist, setArtist] = useState(null)
    const [loading, setLoading] = useState(true)
    const {setCurrentArtwork} = useArtworkContext()
    const biographyRef = useRef(null)
    const artworkRef = useRef(null)
    const {sectionBgColor} = useCustomiser()


    const scrollToBiography = () => {
        biographyRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const scrollToArtwork = () => {
        artworkRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const singleArtistEndPoint = `${baseUrl}/artists/${id}`

    useEffect(() => {
        axios.get(singleArtistEndPoint)
        .then((res) => {
            setArtist(res.data)
            const timeout = setTimeout(() => setLoading(false), 1000);
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    },[])

    if (loading) {
        return (<Loading/>)
      }

    const DisplayAllArtworks = ({artist}) => {
        const artworks = []
        for (const key in artist.acf) {
            if (artist.acf.hasOwnProperty(key) && key.startsWith("artist_works")) {
                artworks.push(artist.acf[key])
            }   
        }

        const mappedArtworks = artworks.map((artwork, index) => {
            if (artwork) {
                return (
                    <div key={index} 
                    onClick={() => {
                        setCurrentArtwork(artwork)
                        navigate(`/artworks/${artwork.id}`)
                        console.log(artwork)
                        localStorage.setItem('currentArtwork', JSON.stringify(artwork))
                    }}
                    className='artwork'
                    >
                        <img src={artwork.url} alt={artwork.title}/>
                        <p>{artwork.title}</p>
                    </div>
                )
            }
            return null;
        })

        return (
            <div className='artist-works-grid'>
               {mappedArtworks}
            </div>
        )
    }

  return (
    <>
        <Helmet>
            <title>Kiwi Art House - Individual Artist</title>
            {/* Primary Meta tags */}
            <meta name='title' content='Kiwi Art House - Individual Artist page' />
            <meta name='description' content='Artist biography and artworks' />
            <meta name='keywords' content='Kiwi Art House, Wellington artists, New Zealand art,paintings, sculptures, contemporary art, fine art, gallery, art for sale, online art gallery' />
            {/* Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Kiwi Art House - Individual Artist page" />
            <meta property="og:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="og:description" content="Artist biography and artworks" />
            <meta property="og:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Kiwi Art House - Individual Artist page" />
            <meta name="twitter:url" content="https://kiwi-art-house.vercel.app/#/"></meta>
            <meta property="twitter:description" content="Artist biography and artworks" />
            <meta property="twitter:image" content="https://kiwi-art-house.vercel.app/logo-art.png" />
        </Helmet>

        <div id='single-artist-page' className='page-style'>

            <div className="button-container">
                <BsArrowLeft/>
                <button className='back-btn' onClick={() => navigate(-1)}>
                BACK
                </button>
            </div>
            <div className='top-artist-page'>
                <div className='text-area'>
                    <h2 className='page-title'>{artist.title.rendered}</h2>
                    <p className='page-description'
                        dangerouslySetInnerHTML={{ __html: artist.excerpt.rendered }}
                    />
                </div>
                
                <img className='artist-main-img' src={artist.acf.artist_works1.url} alt={artist.title.rendered} />
            </div>

            <div className='artist-menu'>
            <button onClick={scrollToArtwork}>ARTIST WORKS</button>
            <button onClick={scrollToBiography}>BIOGRAPHY</button>
            </div>

            <div ref={artworkRef} className='artist-works'>
                <h4>ARTIST WORKS</h4>
                <DisplayAllArtworks artist={artist} />
            </div>     
        </div>

        <div ref={biographyRef} style={{ backgroundColor: sectionBgColor }} className='artist-biography section-bg-color'>
            <h4>BIOGRAPHY</h4>
            <div className='biography-body' 
            dangerouslySetInnerHTML={{ __html: artist.content.rendered }} 
            />
        </div>
    </>
  )
}

export default SingleArtist
