import React, {useContext} from "react"
import {ImgContext} from "../context/ImgContext"

function ImgLoader(props) { // the main app
    const {newImage} = useContext(ImgContext);
    const id = props.id

    const onInputHandler = (file) => {
        var input = file.target;

        var reader = new FileReader();
        reader.onload = function(){
            var dataURL = reader.result;
            var output = document.getElementById('output' + id);
            output.src = dataURL;
            //newImage(id, output.src)
            newImage(id, input.files[0])
        };
        reader.readAsDataURL(input.files[0]);
    }

    return (
        <>
            <p>ImgLoader</p>
            <input type="file" id={id} name="img" accept="image/*" onChange={(event) => onInputHandler(event)}></input>
            <img id={'output' + id} alt={id} style={{height:100,width:100}}></img>
            <br/>
        </>
    )
}

export default ImgLoader