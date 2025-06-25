import { NotebookIcon } from "../Icons/notebook";
import { ShareIcon } from "../Icons/shareicon";
import { TrashIcon } from "../Icons/trash";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  return (
    <div className="bg-white rounded-md shadow-md outline-slate-200 p-4 max-w-sm w-full border border-slate-100 self-start">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="mr-2 text-gray-500">
            <NotebookIcon />
          </div>
          {title}
        </div>
        <div className="flex items-center">
          <a href={link} target="_blank" className="p-2 mr-2 text-gray-500">
            <ShareIcon />
          </a>
          <div className="p-2 text-gray-500">
            <TrashIcon />
          </div>
        </div>
      </div>

      <div className="pt-4">
        {type === "youtube" && (
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full rounded"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
