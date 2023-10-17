import React, {useState} from "react";
import '../newpost/NewPost.css'

import firestore from "../firebase/Firestore";
import { collection, addDoc } from "firebase/firestore";


function NewPost(){
    const [focus, setFocus] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [legenda, setLegenda] = useState("")
    const [idAtual, setIdAtual] = useState(0)

    
    
    
    const userCollectionRef = collection(firestore, "Posts")

    async function AdicionarPost(){

      if (selectedImage){
        try{
      const Post = await addDoc(userCollectionRef,
        {
          Imagem: selectedImage,
          legenda: legenda
        })

        setIdAtual(idAtual + 1)
       setTimeout(() => {
        window.location.href = "/"
       }, 500)
        console.log(idAtual)
        }catch{
          alert("O peso da imagem ultrapassou o Limite!")
        }
      }else{
        alert("Escolha alguma imagem")
      }
    }
      
  
 

  function ImageUpload() {
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const base64Image = e.target.result;
          setSelectedImage(base64Image);
        };
  
        reader.readAsDataURL(file);
      }
    };
      
        return (
          <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {selectedImage && (
              <img src={selectedImage} alt="Imagem selecionada" style={{ maxWidth: '100px' }} />
            )}
          </div>
        );
      }
      

    return(
        <div className="NewPost">
            <div className="TitleNewPost">
                NEWPOST
            </div>
            <div className="Input-Image">
            <h1>Escolha uma imagem</h1>
                <ImageUpload />
            </div>
            <div className="Addlegenda">
                <h2>Legenda</h2>
                <input 
                className={focus ? "InputLegendaFocus" : "InputLegenda"  }
                placeholder="legenda" 
                maxLength={40} 
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(text) => setLegenda(text.target.value)}
                >
                
                </input>
            </div>
            <div className="ButtonSubmitDiv">
            <button className="ButtonSubmit" onClick={AdicionarPost}>Publicar</button>

            </div>
        </div>
    )
}

export default NewPost