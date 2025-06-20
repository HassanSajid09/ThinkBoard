import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../Hooks/useNotes";
import toast, { LoaderIcon } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";

const Details = () => {
  const [saving, setSaving] = useState<boolean>(false);
  const [, setIsRateLimited] = useState<boolean>(false);
  const [changedTitle, setChangedTitle] = useState<string>("");
  const [changedContent, setChangedContent] = useState<string>("");
  const [noteId, setNoteId] = useState<string>("");

  const { GetOne } = useNotes(setIsRateLimited);

  const navigate = useNavigate();
  const { id } = useParams();
  const { remove, update } = useNotes(setIsRateLimited);
  const { data: note, isLoading, isError } = GetOne(id!);

  useEffect(() => {
    if (note) {
      setChangedTitle(note.title);
      setChangedContent(note.content);
      setNoteId(note._id);
    }
  }, [note, id]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  if (isError || !note)
    return (
      <p className="text-red-900 text-center py-10">Failed to load note.</p>
    );
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (confirm("Delete this Note?")) {
      remove.mutate(id);
    }
    navigate("/")
  };
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!changedTitle || !changedContent) {
      toast.error("All fields are Required!");
      return;
    }
    setSaving(true);
    try {
      update.mutate({
        id: noteId,
        updated: { title: changedTitle, content: changedContent },
      });
      toast.success("Note Updated Successfully!");
      setSaving(false);
      navigate("/");
    } catch (error) {
      toast.error("An Error happpened Please try again later!");
      console.log("Error while Saving the Note : ", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <NavLink to="/" className="btn btn-ghost">
                <ArrowLeftIcon className="size-5" />
                Back to Notes
              </NavLink>
              <button
                className="btn btn-error btn-outline"
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className="size-5" />
                Delete Note
              </button>
            </div>
            <div className="card bg-base-100">
              <div className="card-body">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Note Title"
                    value={changedTitle}
                    onChange={(e) => setChangedTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32"
                    placeholder="Note Title"
                    value={changedContent}
                    onChange={(e) => setChangedContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
