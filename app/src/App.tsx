import React, { ReactComponentElement, useState } from 'react';
import logo from './logo.svg';
import { Navbar } from './Components/Navbar';
import { SortVisualizer } from './Components/SortVisualizer';

const algorithmTypes: string[] = ["Sort", "Search", "Find Path"];
const visualizerTypes: ReactComponentElement<any, any>[] = [<SortVisualizer />, <div />, <div />];

function App() {
    const [algoTypeIdx, setAlgoTypeIdx] = useState(0);

    const selectAlgoTypeByIdx = (idx: number) => {
        setAlgoTypeIdx(idx);
    }

    return (
        <div className="App w-screen h-screen bg-slate-800 grid grid-flow-rows auto-rows-max">
            <Navbar options={algorithmTypes} selectedOptionIdx={algoTypeIdx} selectOptionByIdx={selectAlgoTypeByIdx} />
            {visualizerTypes[algoTypeIdx]}
        </div>
    );
}

export default App;
