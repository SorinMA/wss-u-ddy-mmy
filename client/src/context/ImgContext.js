import React, {useState} from "react"

const axios = require("axios");
const ImgContext = React.createContext()

function ImgProvider(props) {
    let [dad, setDad] = useState(undefined)
    let [mom, setMom] = useState(undefined)
    let [child, setChild] = useState(undefined)
    
    const newImage = (id, path) => {
        if (id === 'dad') {
            setDad(path);
            return;
        }

        if (id === 'mom') {
            setMom(path);
            return;
        }

        if (id === 'child') {
            setChild(path);
            return;
        }

        console.log("wrong id!");
    }

    const sendImages = () => {
        if (dad === undefined || mom === undefined || child === undefined) {
            alert("Plese upload all the images!")
            return;
        }

        // thx to: https://medium.com/@mahesh_joshi/reactjs-nodejs-upload-image-how-to-upload-image-using-reactjs-and-nodejs-multer-918dc66d304c
        const formData = new FormData();
        formData.append('dad', dad);
        formData.append('mom', mom);
        formData.append('child',child);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:5000/get-mom-dad-child",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
                console.log(response)
                document.getElementById('serverResponse').innerHTML  = JSON.stringify(response.data);
            }).catch((error) => {
        });
    }

    return (
        <ImgContext.Provider 
            value={{
                    newImage:newImage,
                    sendImages: sendImages
                }}
        >
            {props.children}
        </ImgContext.Provider>
    )
}

export {ImgContext, ImgProvider}