import { useState } from "react";
import "./App.css";
import { Current } from "./components/Current";

function App() {
  return (
    <>
      <main className="bg-gradient-to-r from-blue-300 to-indigo-500 w-full min-h-screen">
        <h1 className="text-slate-100 w-full text-left p-2 text-xl">
          Weather App
        </h1>
        <Current />
      </main>
    </>
  );
}

export default App;
