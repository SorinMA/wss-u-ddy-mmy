import React from "react"
function ImgLoader(props) { // the main app
    return (
        <>
            <p>ImgLoader</p>
            <input type="file" id="img" name="img" accept="image/*" onInput={() =>{console.log('hi');}}></input>

            <br/>
        </>
    )
}

export default ImgLoader