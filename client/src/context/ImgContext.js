import React, {useState} from "react"

const axios = require("axios");
const ImgContext = React.createContext()

function ImgProvider(props) {
    let [dad, setDad] = useState(undefined)
    let [mom, setMom] = useState(undefined)
    let [child, setChild] = useState(undefined)
    let [onSend, setOnSend] = useState(false)
    
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

        setOnSend(true);

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

        axios.post("/api/get-mom-dad-child",formData,config) // change made for docker running
            .then((response) => {
                //alert("The file is successfully uploaded");
                console.log(response)
            
                const dad = response.data.dad;
                const mom = response.data.mom;

                if(dad === false && mom === false) {
                    document.getElementById('serverResponse').innerHTML  = "It is adopted?";
                } else {
                    if (dad) {
                        document.getElementById('serverResponse').innerHTML  = "DAD DAD DAD";
                    } else {
                        document.getElementById('serverResponse').innerHTML  = "Mommy will always win!";
                    }
                }
                setOnSend(false);
            }).catch((error) => {
                setOnSend(false);
                alert("fail to connect to server!");
        });
        
    }

    return (
        <ImgContext.Provider 
            value={{
                    newImage:newImage,
                    sendImages: sendImages,
                    onSend: onSend
                }}
        >
            {props.children}
        </ImgContext.Provider>
    )
}

export {ImgContext, ImgProvider}