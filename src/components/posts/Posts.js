import React, {useState, useEffect} from "react";
import firestore from "../firebase/Firestore";
import { collection, getDocs } from 'firebase/firestore';
import '../posts/Posts.css'

function Posts(){

    const [info, setInfo] = useState([]);
    const [showModal, setShowModal] = useState()
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true)

  const openModal = (image) =>{
    setShowModal(true)
    setSelectedImage(image)
  }

  const closeModal = () =>{
    setShowModal(false)
    setSelectedImage(null)
  }

     
  useEffect(() => {
    fetchDataFromCollection();
  }, []); // Use o useEffect para buscar os dados quando o componente for montado.

  const fetchDataFromCollection = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'Posts'));

      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setLoading(false)
      setInfo(data);
      console.log(data)
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
    }
  };


  function CardPost(props) {
    return (
      
      <div className="CardPost" onClick={() => openModal(props.imagem)}>
        <div>
          <img src={props.imagem} alt={props.legenda} className="Imagem" />
        </div>
        <div className="legenda">
          {props.legenda}
        </div>
      </div>
      
    );
  }


    return(
        <div>

          {loading && (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )}
            
            <div className="pub_3">POSTS</div>
            <div className="ItensCards">
      
      {info.map((item) => (
        <CardPost key={item.id} imagem={item.Imagem} legenda={item.legenda} />
      ))}


      
    </div> 

    {showModal && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          {selectedImage && (
            <img src={selectedImage} alt="Imagem modal" className="modal-image" />
          )}
        </div>
      </div>
    )}
        </div>
        
    )
}

export default Posts