// import { GraphTab } from "../components/Graphtab"
import { TotalExpense } from "../components/TotalExpense"
import { BillAnalyser } from "../components/BillAnalyser"
import { ExpensesTab } from "../components/ExpensesTab"
import axios from 'axios'
import { useState } from "react"

export const Home = () => {
  const [file,setFile] = useState (null)
    const handleFileUpload = (e) => {
      const file = e.target.files[0]
      if (file) {
        setFile(file)
      }
  }
   const handleSubmit = async () => {
    const response = await axios.post ("backend_url_to_be_updated",file , {
      headers: {
        'Content-Type': 'image',
      },
    });
    console.log('File uploaded successfully:', response.data);
  }

  
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 text-white text-center ">
        {/* <GraphTab /> */}
        <TotalExpense />
        <BillAnalyser />
      </div>
      <div className="m-4">
        <ExpensesTab />
      </div>
      <div>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <button onClick={handleSubmit}>Submit</button>
        {console.log(file)}
      </div>
    </div>
  )
}