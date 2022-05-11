import "./App.css";
import { useState } from "react";

function App() {
  const [user_input, setUser_input] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setUser_input(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    query({ inputs: user_input }).then((response) => {
      setOutput(JSON.stringify(response[0].generated_text));
      console.log(JSON.stringify(response[0].generated_text));
    });
  }

  function handle_exampleInput() {
    setUser_input(
      "The ultimate test of your knowledge is your capacity to convey it to another."
    );
  }

  async function query(data) {
    setLoading(true);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/tuner007/pegasus_paraphrase",
      {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}` },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    setLoading(false);
    setUser_input("");
    return result;
  }

  function add_text() {}

  return (
    <div className="min-h-screen bg-violet-300">
      <nav>
        <div class="container mx-auto bg-slate-300">
          <div class="flex items-center justify-between px-4 py-3">
            <div class="flex items-center">
              <a href="/" class="text-gray-900">
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="/" class="text-gray-900">
                <h1 class="text-2xl font-bold">Paraphrase</h1>
              </a>
            </div>
            <div class="flex items-center">
              <a
                href="https://github.com/Trinita21/Paraphrase-generation"
                class="text-gray-900 text-lg px-1 mx-1 font-bold"
              >
                Github
              </a>
              <a
                href="https://trinita21.github.io/"
                class="text-gray-900 text-lg px-1 mx-1 font-bold"
              >
                About Me
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="my-4">
          <h1 className="text-5xl text-center font-semibold">Parapharse</h1>
        </div>
        <div className="flex flex-wrap md:flex-nowrap justify-center space-x-2 space-y-2 md:space-y-0 w-3/4 mx-auto py-4 ">
          <div className="w-full md:w-1/2">
            <form
              className=" bg-slate-300 drop-shadow-xl "
              onSubmit={handleSubmit}
            >
              <textarea
                className="border border-gray-500 border-2 px-1 py-2  h-96 w-full"
                type="text"
                placeholder="Enter your text here"
                required="required"
                value={user_input}
                onChange={handleChange}
              />
              <div className="flex space-x-4">
                <button
                  className="border border-slate-300 rounded bg-slate-500 px-3 py-2 m-1 text-white  hover:bg-slate-400"
                  type="reset"
                  onClick={() => setUser_input("")}
                >
                  Reset
                </button>
                <button
                  className="border border-slate-300 border-2 rounded bg-violet-200 px-4 py-2 m-1  text-black  hover:bg-violet-300 hover:text-white"
                  type="button"
                  onClick={handle_exampleInput}
                >
                  Example Text
                </button>
                <button
                  className="border border-slate-300 rounded bg-slate-500 px-3 py-2 m-1 text-white  hover:bg-slate-400"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/2  bg-slate-300 drop-shadow-xl">
            <div className=" drop-shadow-xl">
              <p className="border border-gray-500 border-2 px-1 py-2 h-96 w-full bg-white">
                {loading ? "loading....." : output.slice(1, -1)}
              </p>
              <div className="flex space-x-4">
                <button
                  className="border border-slate-300 rounded bg-slate-500 px-3 py-2 mt-2 mb-1 mx-1 text-white  hover:bg-slate-400"
                  type="reset"
                  onClick={() =>
                    navigator.clipboard.writeText(output.slice(1, -1))
                  }
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
