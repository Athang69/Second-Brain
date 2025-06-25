import { ReactElement } from "react"

export function SideBarItem({text,icon}:{
  text:string;
  icon:ReactElement;
}){
  return <div className="flex cursor-pointer hover:bg-gray-200 rounded-md max-w-48 pl-4 transition-all duration-300">
    <div className="p-2 text-gray-500 ">
      {icon}
    </div>
    <div className="p-2">  
      {text}
    </div>
  </div>
}