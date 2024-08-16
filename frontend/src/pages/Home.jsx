// import { GraphTab } from "../components/Graphtab"
import { TotalExpense } from "../components/TotalExpense"
import { BillAnalyser } from "../components/BillAnalyser"
import { ExpensesTab } from "../components/ExpensesTab"

export const Home = () => {
    const handleFileUpload = (e) => {
      const file = e.target.files[0]
      if (file) {
        console.log(file)
      }
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
      </div>
    </div>
  )
}