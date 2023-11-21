import { useState, useEffect } from 'react'
import axios from 'axios'

const useCustomiser = () => {
    const [bgColor, setBgColor] = useState('')
    const [mainColor, setMainColor] = useState('')
    const [sectionBgColor, setSectionBgColor] = useState('')
    const [font, setFont] = useState('')
    
    const baseUrl = import.meta.env.VITE_WP_BASEURL

    useEffect(() => {
        axios.get(`${baseUrl}wp-json/custom-theme/v1/customizer-settings`)
        .then((res) => {
            const {backgroundColor, mainColor ,sectionBgColor, fontFamily} = res.data
            setBgColor(backgroundColor)
            setMainColor(mainColor)
            setSectionBgColor(sectionBgColor)
            setFont(fontFamily)
        })
        .catch((err) => console.error('Error fetching customizer setting:',err))
    }, [baseUrl])

  return (
    {bgColor, mainColor ,sectionBgColor, font}
  )
}

export default useCustomiser
