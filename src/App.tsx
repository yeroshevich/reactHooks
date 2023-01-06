import React from "react";
import "./styles.css";
import useDebounce from "./useDebounce";

export default function App() {
  const fetching = (str: string) => {
    console.log(str);
  };
  const debounce = useDebounce(fetching);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(e.target.value);
  };
  return (
    <div className="App">
      <input type="text" onChange={handleChange} />
    </div>
  );
}
