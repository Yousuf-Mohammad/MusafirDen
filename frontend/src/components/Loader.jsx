import React from 'react'
import loadingGif from "../assets/Logos/giphy (1).gif"

const Loader = () => {
    return (
    <div style={{display:'flex', justifyContent:'center'}}>
<img style={{width:'20vw', height:'30vh'}} src={loadingGif} alt=""  srcset="" />

    </div>
    )
}

export default Loader