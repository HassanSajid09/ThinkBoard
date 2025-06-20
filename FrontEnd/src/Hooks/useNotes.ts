import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import axios from "../api/axios";

type NoteInput = {
  title: string;
  content: string;
};
interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const createNote = async (note: NoteInput) => {
  const res = await axios.post("/notes", note);
  return res.data;
};

const updateNote = async ({
  id,
  updated,
}: {
  id: string;
  updated: NoteInput;
}) => {
  const res = await axios.put(`/notes/${id}`, updated);
  return res.data;
};

const deleteNote = async (id: string) => {
  const res = await axios.delete(`/notes/${id}`);
  return res.data;
};

export const useNotes = (setIsRateLimited: (v: boolean) => void) => {
  const queryClient = useQueryClient();

  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      try {
        const res = await axios.get("/notes");
        return res.data;
      } catch (error: unknown) {
        if (isAxiosError(error) && error.response?.status === 429) {
          setIsRateLimited(true);
          setTimeout(() => setIsRateLimited(false), 20000);
        }

        throw Error;
      }
    },
  });

  const GetOne = (id: string) => {
    return useQuery<Note>({
      queryKey: ["oneNote", id],
      queryFn: async ({ queryKey }) => {
        const [, noteId] = queryKey;
        console.log("Fetching note ID:", noteId);
        try {
          const res = await axios.get(`/notes/${noteId}`);
          console.log("Fetched data:", res.data);
          return res.data;
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 429) {
            setIsRateLimited(true);
            setTimeout(() => setIsRateLimited(false), 20000);
          }

          throw Error;
        }
      },
    });
  };

  const create = useMutation({
    mutationFn: createNote,
    onError: (err: AxiosError) => {
      if (err.response?.status === 429) {
        setIsRateLimited(true);
        setTimeout(() => setIsRateLimited(false), 20000);
      }
    },
    onSuccess: () =>
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      }, 2000),
  });
  const update = useMutation({
    mutationFn: updateNote,
    onError: (err: AxiosError) => {
      if (err.response?.status === 429) {
        setIsRateLimited(true);
        setTimeout(() => setIsRateLimited(false), 20000);
      }
    },
    onSuccess: () =>
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      }, 2000),
  });
  const remove = useMutation({
    mutationFn: deleteNote,
    onError: (err: AxiosError) => {
      if (err.response?.status === 429) {
        setIsRateLimited(true);
        setTimeout(() => setIsRateLimited(false), 20000);
      }
    },
    onSuccess: () =>
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      }, 2000),
  });
  return { notes, isLoading, isError, create, update, remove, GetOne };
};
