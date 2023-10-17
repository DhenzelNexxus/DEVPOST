
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home';
import NewPost from './components/newpost/NewPost';
import Posts from './components/posts/Posts';
import Sobre from './components/sobre/Sobre';
import NavBar from './components/navbar/NavBar';
import "./App.css"

function App() {
  return (
    <div className="App">
       
      <Router>
    
      <NavBar></NavBar>
     
        <Routes >
          <Route path='/' Component={Home}/>
          <Route path='/newpost' Component={NewPost}/>
          <Route path='/posts' Component={Posts}/>
          <Route path='/sobre' Component={Sobre}/>

        </Routes>
       
      </Router>
       
    </div>
  );
}

export default App;
