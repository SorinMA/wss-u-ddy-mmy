import React, {useContext} from "react"
import ImageLoader from "./ImgLoader"
import {ImgContext} from "../context/ImgContext"

function App(props) { // the main app
    const {sendImages} = useContext(ImgContext);

    return (
        <>
            
            <p>Heloce to wss-u-ddy-mmy</p>
            <label>dad:</label><ImageLoader id="dad"/>
            <label>mom:</label><ImageLoader id="mom"/>
            <label>child:</label><ImageLoader id="child"/>

            <button onClick={sendImages}>Send</button>
            <p id="serverResponse">Result here</p>
        </>
    )
}

export default App