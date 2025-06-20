import { useState } from "react";
import { useNotes } from "../Hooks/useNotes";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

const CreateNote = () => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [, setIsRateLimited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { create } = useNotes(setIsRateLimited);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) {
      toast.error("All fields are required!");
      return;
    }
    setLoading(true);
    try {
      create.mutate({ title: newTitle, content: newContent });
      setLoading(false);
      toast.success("Note Created Successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating Note : ", error);
      toast.error("Failed to create Note Please try again later!");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <NavLink to={"/"} className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </NavLink>
            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Note Title"
                      className="input input-bordered"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <textarea
                      placeholder="Type a Content for the Note"
                      className="textarea textarea-bordered h-32"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                    />
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Note"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNote;
