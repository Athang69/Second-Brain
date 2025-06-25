import {BrainIcon} from "../Icons/brainIcon";
import { TwitterIcon } from "../Icons/twittericon";
import { YoutubeIcon } from "../Icons/youtubeicon";
import { SideBarItem } from "./sidebar_item";

export function Sidebar(){
  return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-4">
    <div className="flex text-2xl p-3">
      <div className="flex justify-center items-center mr-4 text-blue-700">
        <BrainIcon />
      </div>
      Second Brain
    </div>
    <div className="p-4">
      <SideBarItem text="Twitter" icon={<TwitterIcon /> } />
    <div className="mt-4 ">
      <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
    </div>
    </div>
  </div>
}