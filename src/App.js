import React,{useState} from 'react'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

const App = () => {

  const [description,setDescription] = useState(null);
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // for onchange event
  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');

  // for submit event
  const [viewPdf, setViewPdf]=useState(null);

  //getting description from text box
  function getData(val)
    {
       setDescription(val.target.value)
    }

  // onchange event
  const fileType=['application/pdf'];
  const handlePdfFileChange=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);
              setPdfFileError('');
            }
      }
      else{
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else{
      console.log('select your file');
    }
  }

  // form submit
  const handlePdfFileSubmit=(e)=>{
    e.preventDefault();
    if(pdfFile!==null){
      setViewPdf(pdfFile);
      console.log(description)
    }
    else{
      setViewPdf(null);
    }
  }

  return (
    <div className='container'>
    <h1> PDF VIEWER BY MUHAMMAD HASSAN SAHFIQ</h1>
    <br></br> <br/>
    
      <form className='form-group' onSubmit={handlePdfFileSubmit}>
        <input type="text" name='description' placeholder="Enter File Description" className="place" onChange={getData}/>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange} 
        />
        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
        <br></br> 
        <button type="submit" className='backbtn'>
          UPLOAD
        </button>
      </form>
      <br></br> <br/>
      <h3>View PDF:{description}</h3>
      <div className='pdf-container'>
        {/* show pdf conditionally (if we have one)  */}
        {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPdf}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!viewPdf&&<>No pdf file selected</>}
      </div>

    </div>
  )
}

export default App;