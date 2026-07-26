import { useEffect, useState } from "react";
import "./App.css";

const STORAGE_KEY = "notes-project-notes";

function App() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [task, setTask] = useState(() => {
    const savedTask = localStorage.getItem(STORAGE_KEY);
    return savedTask ? JSON.parse(savedTask) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(task));
  }, [task]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !detail.trim()) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1800);
      return;
    }

    const copyTask = [...task];

    copyTask.push({ title, detail });
    setTask(copyTask);

    // console.log(title, detail);
    setTitle("");
    setDetail("");
  };

  const deleteHandler = (idx) => {
    const copyTask = [...task];
    copyTask.splice(idx, 1);
    setTask(copyTask);
  };
  return (
    <>
      <div className="h-screen lg:flex bg-black text-white">
        {showPopup && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold shadow-lg animate-pulse">
            Please fill both fields before adding a note.
          </div>
        )}
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex gap-4 flex-col items-start p-10 lg:w-1/2 "
        >
          <h1 className="text-xl text-3xl align-center gap-2 flex font-bold">
            Add Notes{" "}
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
          </h1>
          <input
            type="text"
            placeholder="Enter Notes Heading"
            className="px-5 w-full py-2 border-2 font-medium outline-none rounded-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Write Notes"
            className="px-5 w-full py-2 border-2 font-medium outline-none h-31 rounded-lg"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
          <button
            title="Delete Note"
            className="cursor-pointer font-medium outline-none w-full bg-white hover:bg-gray-100 active:bg-gray-400 active:scale-95 text-black py-2 px-4 rounded-lg"
          >
            Add Notes
          </button>
        </form>
        <div className="flex py-5 flex-col lg:border-l-2 lg:w-1/2 gap-5 bg-black px-5">
          <h1 className="text-xl text-3xl align-center gap-2 flex font-bold">
            Your Notes!{" "}
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
          </h1>
          <div className="flex p-2 items-start justify-start overflow-auto h-[90%] justify-evenly gap-5 align-start flex-wrap">
            {task.map(function (elem, idx) {
              return (
                <div
                  key={idx}
                  className="h-[250px] w-[200px] relative text-black p-3 rounded-2xl overflow-hidden bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')] bg-cover bg-center bg-no-repeat"
                >
                  <button
                    onClick={() => {
                      deleteHandler(idx);
                    }}
                    className="absolute bg-[#00349E] active:bg-[#002a80] active:scale-95 p-1 rounded-full top-2 right-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-x-icon lucide-x"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                  <h3
                    title={elem.title}
                    className="text-xl leading-tight font-bold break-words overflow-hidden"
                  >
                    {elem.title}
                  </h3>
                  <p
                    title={elem.detail}
                    className="mt-1 font-medium text-gray-600 leading-tight break-words overflow-hidden"
                  >
                    {elem.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
