import { FaTrafficLight } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";

import AgeCalculateContainer from "@/pages/age-calculator";
import TodoAppContgainer from "@/pages/todo-app";
import TraficSignalContainer from "@/pages/trafic-signal";

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
  
];