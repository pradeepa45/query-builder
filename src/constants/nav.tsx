import { MdPieChart } from "react-icons/md";
import { RiSettingsFill } from "react-icons/ri";

const list = [
  {
    id: "1",
    name: "Thematic Analysis",
    url: "/",
    icon: <MdPieChart size={20} />,
  },
  {
    id: "2",
    name: "Nascent Themes",
    url: "/",
    icon: <MdPieChart size={20} className="text-grey" />,
  },
  {
    id: "3",
    name: "Settings",
    url: "/",
    icon: <RiSettingsFill size={20} className="text-grey" />,
  },
];

export default list;
