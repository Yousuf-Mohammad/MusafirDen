import React from 'react'
import loadingGif from "../assets/Logos/adventure-compass.gif"

const Loader = () => {
    return (
    <div style={{display:'flex', justifyContent:'center', marginTop:'20vh'}}>
<img style={{width:'20vw', height:'40vh'}} src={loadingGif} alt=""   />

    </div>
    )
}

export default Loader