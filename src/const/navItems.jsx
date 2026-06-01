import AgeCalculateContainer from "@/pages/age-calculator";
import TraficSignalContainer from "@/pages/trafic-signal";

export const projects = [
  {
    path: "/trafic-signal",
    title: "Traffic Signal",
    component: <TraficSignalContainer />,
  },
  {
    path: "/age-calculate",
    title: "Age Calculator",
    component: <AgeCalculateContainer />,
  },
 
];