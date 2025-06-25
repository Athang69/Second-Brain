import { ReactElement } from "react"

interface ButtonProps{
  variant : "primary" | "secondary";
  text:string;
  startIcon?:ReactElement
  onClick?:()=>void
  fullWidth?:boolean
  loading?:boolean
}

const variantClass={
  "primary":"bg-button_primary text-white",
  "secondary":"bg-button_secondary text-text-secondary"
}

const defaultStyles="px-4 py-2 rounded-md pointer-cursor-pointer transition-colors duration-200 hover:opacity-80 flex justify-center items-center"

export function Button({variant, text, startIcon, onClick, fullWidth, loading}:ButtonProps){
  return <>
    <button onClick={onClick} className={variantClass[variant] + " " + defaultStyles + `${fullWidth? " w-full":""} ${loading? "opacity-45" : ""}`} disabled={loading}>
      <div className="p-1.5">
        {startIcon}
      </div>
      {text}
    </button>
  </>
}