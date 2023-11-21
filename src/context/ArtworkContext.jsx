import { createContext, useState, useContext } from "react";

const ArtworkContext = createContext()

export const useArtworkContext = () => useContext(ArtworkContext)

export const ArtworkProvider = ({children}) => {
    const [currentArtwork, setCurrentArtwork] = useState(null)

    return (
        <ArtworkContext.Provider value={{currentArtwork, setCurrentArtwork}}>
            {children}
        </ArtworkContext.Provider>
    )
}