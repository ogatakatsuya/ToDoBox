import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Suspense, useState, useEffect, lazy } from "react";
import Example from './Todo/Example';

const STORAGE_KEY = "rcg-current-lec-index";

function App() {
  return (
    <>
      <Example />
    </>
  )
}

export default App
