import { useEffect, useState } from "react";
import NotesBg from "./assets/Notes-bg.webp";
import "./App.css";

const STORAGE_KEY = "notes-project-notes";

function App() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [task, setTask] = useState(() => {
    if (typeof window === "undefined") return [];

    try {
      const savedTask = window.localStorage.getItem(STORAGE_KEY);
      return savedTask ? JSON.parse(savedTask) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    if (!showPopup) return;

    const timer = window.setTimeout(() => setShowPopup(false), 1800);
    return () => window.clearTimeout(timer);
  }, [showPopup]);

  const submitHandler = (e) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    const cleanDetail = detail.trim();

    if (!cleanTitle || !cleanDetail) {
      setShowPopup(true);
      return;
    }

    setTask((prevTask) => [
      ...prevTask,
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        title: cleanTitle,
        detail: cleanDetail,
      },
    ]);

    setTitle("");
    setDetail("");
  };

  const deleteHandler = (id) => {
    setTask((prevTask) => prevTask.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_40%),_linear-gradient(135deg,_#020617_0%,_#111827_60%,_#000000_100%)] text-white">
      {showPopup && (
        <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold shadow-lg animate-pulse">
          Please fill both fields before adding a note.
        </div>
      )}

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row">
        <form
          onSubmit={submitHandler}
          className="flex w-full flex-col items-start gap-4 border-b border-white/10 p-6 sm:p-8 lg:w-1/2 lg:border-b-0 lg:border-r lg:p-10"
        >
          <div className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
            <span>Add Notes</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus-icon lucide-plus"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>

          <label className="w-full text-sm font-medium text-slate-300">
            Title
            <input
              type="text"
              placeholder="Enter Notes Heading"
              className="mt-2 w-full rounded-xl border border-white/15 bg-black-400/70 px-5 py-3 text-base font-medium text-white outline-none transition focus:border-cyan-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="w-full text-sm font-medium text-slate-300">
            Details
            <textarea
              placeholder="Write Notes"
              className="mt-2 h-36 w-full rounded-xl border border-white/15 bg-black-400/70 px-5 py-3 text-base font-medium text-white outline-none transition focus:border-cyan-400"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-black 
            cursor-pointer transition hover:bg-slate-100 active:scale-95"
          >
            Add Note
          </button>
        </form>

        <section className="flex w-full flex-1 flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
              <span>Your Notes</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-notebook-pen-icon lucide-notebook-pen"
              >
                <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                <path d="M2 6h4" />
                <path d="M2 10h4" />
                <path d="M2 14h4" />
                <path d="M2 18h4" />
                <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
              </svg>
            </div>
            <span className="w-fit rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-medium text-slate-200">
              {task.length} {task.length === 1 ? "note" : "notes"}
            </span>
          </div>

          {task.length === 0 ? (
            <div className="flex flex-1 items-center justify-center rounded-3xl border border-dashed border-white/20 bg-black-400/40 p-6 text-center text-slate-300">
              No notes yet. Add your first note to get started.
            </div>
          ) : (
            <div className="grid flex-1 grid-cols-1 gap-4 overflow-auto pb-2 sm:grid-cols-2 xl:grid-cols-3">
              {task.map((elem) => (
                <div
                  key={elem.id}
                  className="relative h-52 w-40 overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat p-4 text-black shadow-xl"
                  style={{ backgroundImage: `url(${NotesBg})` }}
                >
                  <button
                    type="button"
                    onClick={() => deleteHandler(elem.id)}
                    className="absolute right-1.5 
                    cursor-pointer top-0.5 rounded-full bg-[#00349E] p-1.5 text-white transition hover:bg-[#002a80] active:scale-95"
                    aria-label={`Delete ${elem.title}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x-icon lucide-x"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>

                  <div className="flex h-full flex-col pr-8">
                    <h3
                      title={elem.title}
                      className="text-xl font-bold leading-tight break-words"
                    >
                      {elem.title}
                    </h3>
                    <p
                      title={elem.detail}
                      className="mt-2 flex-1 overflow-y-auto font-medium leading-tight text-gray-700 break-words scrollbar-hide"
                    >
                      {elem.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
