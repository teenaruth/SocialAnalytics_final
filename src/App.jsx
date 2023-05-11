import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useState } from "react";
import { data } from "./data";
import Sidebar from "./Sidebar";



function App() {
  const [streamContent, setStreamContent] = useState([]);

  

  useEffect(() => {
    setStreamContent(data);
  }, []);
  return (
    <main>
      <Navbar />
      <Sidebar streamContent={streamContent} />
      <ToastContainer position='top-center' />
    </main>
  );
}

export default App;
