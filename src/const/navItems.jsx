import { FaTrafficLight } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { HiClipboardDocumentCheck } from "react-icons/hi2";


import AgeCalculateContainer from "@/pages/age-calculator";
import TodoAppContgainer from "@/pages/todo-app";
import TraficSignalContainer from "@/pages/trafic-signal";
import ExpenseTrackerContainer from "@/pages/expense-tracker";
import HabitTrackerContainer from "@/pages/habit-tracker";

export const projects = [
  {
    path: "/trafic-signal",
    title: "Traffic Signal",
    component: <TraficSignalContainer />,
    icon: <FaTrafficLight/>,
  },
  {
    path: "/age-calculate",
    title: "Age Calculator",
    component: <AgeCalculateContainer />,
    icon: <MdOutlineDateRange/>,
  },
  {
    path: "/todo-app",
    title: "Todo App",
    component: <TodoAppContgainer />,
    icon: <FaListCheck/>,
  },
   {
    path: "/habit-tracker",
    title: "Habit Tracker",
    component: <HabitTrackerContainer />,
    icon: <HiClipboardDocumentCheck/>,
  },
  {
    path: "/expense-tracker",
    title: "Expense Tracker",
    component: <ExpenseTrackerContainer />,
    icon: <GiExpense/>,
  },
  
];