import { useRef, useState } from "react";
import { CrossIcon } from "../Icons/crossIcon";
import { Button } from "./button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType{
  Youtube="youtube",
  Twitter="twitter"
}

export function CreateContentModel({ open, onClose }) {
  const titleRef=useRef <HTMLInputElement>();
  const linkRef=useRef <HTMLInputElement>();
  const [type,setType]=useState(ContentType.Youtube)
  async function addContent(){
    const title=titleRef.current?.value;
    const link=linkRef.current?.value;
    await axios.post(`${BACKEND_URL}/api/v1/content`,{
      link:link,
      type:type,
      title:title
    },{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })
    onClose();
  }
  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-slate-800/50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <h2 className="text-white text-2xl font-semibold mb-4 tracking-wide">Add the content</h2>
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-end mb-4">
              <div onClick={onClose} className="cursor-pointer">
                <CrossIcon />
              </div>
            </div>
            <div className="space-y-4">
              <Input ref = {titleRef} placeholder={"Title"} />
              <Input ref={linkRef} placeholder={"Link"} />
              <br></br>
            </div>
            <h1>Select type of Content</h1>
            <div className="flex gap-4">
              <Button text="Youtube" variant={type===ContentType.Youtube? "primary" : "secondary"} onClick={()=>{
                  setType(ContentType.Youtube)
                }
              } />
              <Button text="Twitter" variant={type===ContentType.Twitter? "primary" : "secondary"} onClick={()=>{
                setType(ContentType.Twitter)
              }}/>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="primary" text="Submit" onClick={addContent}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
