import React, { useState, useEffect, useRef, cloneElement } from "react";
import '../home/Home.css'
import firestore from "../firebase/Firestore";
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { motion } from 'framer-motion'


function Home() {
  const [info, setInfo] = useState([]);
  const [showModal, setShowModal] = useState()
  const [selectedImage, setSelectedImage] = useState(null);
  const [idImage, setIdImage] = useState("")
  const carousel = useRef()
  const [width, setWidth] = useState(0)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setWidth(carousel.current?.scrollWidth * 0.60)
  }, [])


  const openModal = (image) =>{
    setShowModal(true)
    setSelectedImage(image)
    const index = info.find(item => item.Imagem === image)
    console.log(index.id)
  }

  const closeModal = () =>{
    setShowModal(false)
    setSelectedImage(null)
  }


  async function handleDelete() {
    try {
      // Encontre o documento pelo campo 'Imagem' na sua coleção
      const querySnapshot = await getDocs(collection(firestore, 'Posts'));
     
   
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.Imagem === selectedImage) {
          // Apague o documento com o ID encontrado
          deleteDoc(doc(firestore, 'Posts', docSnap.id));
          console.log('Documento apagado com sucesso!');
        }
        
        });
        
        setTimeout(() => {
          setShowModal(false)
          window.location.reload()
        }, 1000)
        
    } catch (error) {
      console.error('Erro ao apagar o documento:', error);
    }
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

  return (
    <div className="home">

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      <div className="pub">
        POSTS RECENTES
      </div>
    

    <div className="slider">
      <motion.div ref={carousel} className="carousel" whileTap={{cursor: "grabbing"}}>
        <motion.div 
        className="inner"
        drag="x"
        dragConstraints={{right:0, left: -width}}
        >

        {info.length >= 7 ? info.slice(info.length - 7).reverse().map((item) => (
         <motion.div className="Item" key={item}>
           <CardPost key={item.id} imagem={item.Imagem} legenda={item.legenda} />
         </motion.div>
        )): info.map((item) => (
          <motion.div className="Item" key={item}>
           <CardPost key={item.id} imagem={item.Imagem} legenda={item.legenda} />
           </motion.div>
        ))}

        </motion.div>
      </motion.div>
    </div>
    
   
    {showModal && (
      <div className="modal">
        <div className="modal-content">
        <button className="deleteButton" onClick={handleDelete}>
        ExcluirPost
        </button>
          <span className="close" onClick={closeModal} >
            &times;
      
          </span>
          {selectedImage && (
            <img src={selectedImage} alt="Imagem modal" className="modal-image" />
          )}
        </div>
      </div>
    )}
    </div>
  );
}

export default Home;
