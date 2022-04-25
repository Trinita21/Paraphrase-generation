import "./App.css";
import {useState} from "react"




function App() {

  const [user_input,setUser_input]=useState("");
  const [output,setOutput]=useState("");
  const [loading,setLoading]=useState(false)

  function handleChange(event){
    setUser_input(event.target.value);
    
  }
  function handleSubmit(event){
    event.preventDefault()
    query({"inputs": user_input}).then((response) => {
      setOutput(JSON.stringify(response[0].generated_text));
      console.log(JSON.stringify(response[0].generated_text))
    });
  }

  async function query(data) {
    setLoading(true)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/tuner007/pegasus_paraphrase",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    setLoading(false)
    return result;
  }
  
  

  return (
    <div className="App">
      <h1>Paraphrase</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter your text here" onChange={handleChange} />
      <button type="reset">Clear</button>
      <button>Example Text</button>
      <button type="submit">Submit</button>
      </form>
      {loading?"loading.....":""}
      {output.slice(1, -1)}
    </div>
  );
}

export default App;
