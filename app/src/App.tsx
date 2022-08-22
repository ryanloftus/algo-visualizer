import React, { ReactComponentElement, useState } from 'react';
import { Navbar } from './Components/Navbar';
import { SortVisualizer } from './Components/SortVisualizer';

const algorithmTypes: string[] = ["Sort", "Find Path"];
const visualizerTypes: ReactComponentElement<any, any>[] = [<SortVisualizer />, <div><p className="text-center text-xl text-slate-50 m-8">Coming soon</p></div>];

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
