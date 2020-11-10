import React, {useContext, useEffect} from "react"
import {ImgContext} from "../context/ImgContext"
import {imgCSS} from "../css/someCss"

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

    useEffect(() => {
        var output = document.getElementById('output' + id);
        output.src = 'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png'
    }, [id])

    return (
        <>
            <input type="file"  id={id} name="img" accept="image/*" onChange={(event) => onInputHandler(event)}/>
            <label htmlFor={id}>{id} photo:</label>
            <img id={'output' + id} alt={id} style={imgCSS}></img>
            <hr style={{width:"20%"}}/>
        </>
    )
}

export default ImgLoader