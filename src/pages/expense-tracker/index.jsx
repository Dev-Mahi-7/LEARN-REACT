import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import AddForm from "./components/AddExpenseForm";

const ExpenseTrackerContainer = () => {

  const [oepnAddExpensePopup,setOpenAddExpensePopup] = useState(false);

  return (
    <div className=" bg-purple-950 text-white/80 h-screen pt-4 ">
      <div className="  max-w-7xl mx-auto p-4  bg-purple-900">
        <div className="header">
        <h1 className="text-xl font-bold">Expense Tracker</h1>
        </div>
        <div className="search-and-add flex gap-4 mt-4 ">
          <div className="search flex-1">
            <Input placeholder="Search by name" className="text-white  " />
          </div>
          <div className="btn">
            <Button className="px-3 py-2 cursor-pointer " onClick={()=> setOpenAddExpensePopup(true)} >Add Expenses</Button>
          </div>
        </div>
      </div>
      {
        oepnAddExpensePopup && (
          <AddForm/>
        )
      }


    </div>
  );
};

export default ExpenseTrackerContainer;
