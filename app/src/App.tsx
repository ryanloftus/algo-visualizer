import React, { useState } from 'react';
import logo from './logo.svg';
import { Navbar } from './Components/Navbar';

const algorithmTypes = ["Sort", "Search", "Find Path"];

function App() {
    const [algoTypeIdx, setAlgoTypeIdx] = useState(0);

    const selectAlgoTypeByIdx = (idx: number) => {
        setAlgoTypeIdx(idx);
    }

    return (
        <div className="App w-screen h-screen bg-slate-800 flex">
            <Navbar options={algorithmTypes} selectedOptionIdx={algoTypeIdx} selectOptionByIdx={selectAlgoTypeByIdx} />
        </div>
    );
}

export default App;
