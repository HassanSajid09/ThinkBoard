import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { formatDate } from "../lib/utils";
import { useNotes } from "../Hooks/useNotes";
import { useState } from "react";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const NoteCard = ({ note }: { note: Note }) => {
  const [, setIsRateLimited] = useState<boolean>(false);
  const { remove } = useNotes(setIsRateLimited);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (confirm("Delete this Note?")) {
      remove.mutate(id);
    }
  };

  return (
    <>
      <NavLink
        to={`/note/${note._id}`}
        key={note._id}
        className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
      >
        <div className="card-body ">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default NoteCard;
