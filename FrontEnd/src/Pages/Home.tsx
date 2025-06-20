import { useState } from "react";
import { useNotes } from "../Hooks/useNotes";
import NavBar from "../Components/NavBar";
import RateLimit from "../Components/RateLimit";
import NoteCard from "../Components/NoteCard";
import NotesNotFoun from "../Components/NotesNotFound";

const Home = () => {
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);

  const { notes, isLoading} =
    useNotes(setIsRateLimited);

  console.log("Notes", notes);

  return (
    <>
      <div className="min-h-screen">
        <NavBar />
        {isRateLimited && <RateLimit />}
        <div className="max-4-7xl mx-auto p-4 mt-6">
          {isLoading && (
            <p className="text-primary text-center py-10">Loading...</p>
          )}
          {notes?.length === 0 && !isRateLimited && <NotesNotFoun />}
          {notes?.length > 0 && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map(
                (note: {
                  _id: string;
                  title: string;
                  content: string;
                  createdAt: Date;
                }) => (
                  <NoteCard key={notes._id} note={note} />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
