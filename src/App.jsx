import Main from "./components/Main.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import {useState, useEffect} from 'react';
 
function App() {

  const[data,setData]=useState(null); 
  const[loading,setLoading]=useState(false);

  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;


  useEffect(()=>{
      async function fetchAPIData(){ 
        const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
        const today =  (new Date()).toDateString();
        const localKey = `NASA-${today}`;
        if(localStorage.getItem(localKey)){//Checking if the data is not already in local memory.
          const aData = JSON.parse(localStorage.getItem(localKey))
          setData(aData);
          console.log(`Data Fetched from local memory.`);//allow us to not use the api if not necessary to not run through our limited api calls.
          return;
        }
        localStorage.clear();
        try{
        const res = await fetch(url);
        const aData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(aData))
        setData(aData); 
        console.log(`Data Fetched from API.`);
        } 
        catch(e){
          console.error(e);
        }

      }
      fetchAPIData();
 
  },[]);
 
  const[showModal, setShowModal] = useState(false);

  function handleToggleModal(){
    setShowModal(!showModal); 
     
  }

  return (
    <>
    {data?(<Main data={data}/>):(<div className="loadingState">
      <i className="fa-solid fa-gear"></i>
      <i className="fa-solid fa-gear" id="num2"></i>   
    </div>)}
    {showModal?(<Sidebar handleToggleModal={handleToggleModal} data={data}/>):(null)}
    {data?(<Footer handleToggleModal={handleToggleModal} data={data}/>) :(<></>)}
    </>
  )
}

export default App
 