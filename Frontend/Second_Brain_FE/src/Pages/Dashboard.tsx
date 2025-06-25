import { useEffect, useState } from 'react'
import { Button } from '../components/button'
import { Card } from '../components/card'
import { CreateContentModel } from '../components/createContentModel'
import { PlusIcon } from '../Icons/plusicon'
import { ShareIcon } from '../Icons/shareicon'
import { Sidebar } from '../components/sidebar'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'

function Dashboard() {
  const [modelOpen, setModelOpen]=useState(false);
  const contents = useContent();
  

  return (
    <div>
      <Sidebar />
      <div className='p-2 ml-72 min-h-screen bg-content_bg'>
        <CreateContentModel open={modelOpen} onClose={()=>{
          setModelOpen(false);
        }}/> 
        <div className='flex justify-end'>
          <Button onClick={()=>setModelOpen(true)} variant="primary" text="Add Content" startIcon={<PlusIcon />}  />
          <Button onClick={async ()=>{
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
              share:true 
            },{
              headers:{
                "Authorization":localStorage.getItem("token")
              }
            });
            const shareURL = `http://localhost:5173/share/${response.data.hash}`
            alert(shareURL)
          }} 
          variant="secondary" text="Share Brain" startIcon={<ShareIcon />} />
        </div>
        <div className='flex flex-wrap justify-center gap-4'>
          {contents.map(({type, link, title})=>
            <Card type={type} link={link} title={title} />
          )}
        </div>
      </div>x``
    </div>
  )
}

export default Dashboard
