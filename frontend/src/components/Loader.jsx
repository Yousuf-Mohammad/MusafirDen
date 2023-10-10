import React from 'react'
import loadingGif from "../assets/Logos/adventure-compass.gif"

const Loader = () => {
    return (
    <div style={{display:'flex', justifyContent:'center', marginTop:'5vh'}}>
<img style={{width:'30vw'}} src={loadingGif} alt=""   />

    </div>
    )
}

export default Loader