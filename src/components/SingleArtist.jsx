import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useArtworkContext } from '../context/ArtworkContext'
import { BsArrowLeft } from "react-icons/bs";
import useCustomiser from '../hooks/useCustomiser';

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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };
    
    const singleArtistEndPoint = `${baseUrl}/artists/${id}`

    useEffect(() => {
        axios.get(singleArtistEndPoint)
        .then((res) => {
            console.log(res.data)
            setArtist(res.data)
            setLoading(false)
            scrollToTop()
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    },[])

    if(loading) {
        return (<div>Loading...</div>)
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
