import React, {useContext, useEffect} from "react"
import ImageLoader from "./ImgLoader"
import {ImgContext} from "../context/ImgContext"
import {containerCSS} from "../css/someCss"

function App(props) { // the main app
    const {sendImages, onSend} = useContext(ImgContext);

    useEffect(() => {
        let sendButton = document.getElementById("sendButton");
        sendButton.disabled = onSend;

        if (onSend === true) {
            sendButton.innerText = "Wait the response!";
        } else {
            sendButton.innerText = "Send";
        }

    }, [onSend])

    return (
        <div style={containerCSS}>
            <p id="serverResponse">Results will appear here</p>

            <ImageLoader id="dad"/>
            <ImageLoader id="mom"/>
            <ImageLoader id="child"/>

            <button onClick={sendImages} id="sendButton">Send</button>

            <br/>
            <br/>
            <br/>
            
            <h6>HWD v0.0.1</h6>

        </div>
    )
}

export default App