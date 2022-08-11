import React, { useState } from 'react';
import SortingAlgorithms from '../Algorithms/SortingAlgorithms';

interface Props {}

export const SortVisualizer : React.FC<Props> = () => {
    const [size, setSize] = useState<number>(50);
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [array, setArray] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<string>('mergeSort');

    const startSort = () => {
        setIsSorting(true);
        const newArray: number[] = Array.from({length: size}, () => Math.random());
        setArray(newArray);
        SortingAlgorithms[algorithm](newArray, (arr: number[]) => setArray(arr));
    }

    const barWidth: number = 100 / (size === 0 ? 1 : size);

    return (
        <div className="text-slate-50 text-lg m-4 grid grid-flow-row auto-rows-max h-max">
            <div className="grid-flow-col auto-cols-max">
                <label htmlFor="n">Array Size:</label>
                <input disabled={isSorting} type="number" min="0" max="500" id="n" className="m-4 text-slate-800 rounded" value={size} onChange={(e) => setSize(Number(e.target.value))}/>
                <label htmlFor="algo">Sorting Algorithm:</label>
                <select disabled={isSorting} id="algo" onChange={(e) => setAlgorithm(e.target.value)} className="m-4 text-slate-800 rounded">
                    <option value="mergeSort">Merge Sort</option>
                    <option value="heapSort">Heap Sort</option>
                    <option value="quickSort">Quick Sort</option>
                    <option value="insertionSort">Insertion Sort</option>
                    <option value="bubbleSort">Bubble Sort</option>
                </select>
                <button disabled={isSorting} onClick={startSort} className="bg-sky-900 text-slate-50 px-6 rounded border-solid border-2 border-sky-600 hover:border-slate-50 disabled:text-slate-300 disabled:border-slate-300">Sort</button>
            </div>
            <div className="flex h-40">
                {array.map((v, i) => <div key={i} className="bg-slate-50 mx-1" style={{height: `${v*100}%`, width: `${barWidth}%`}} />)}
            </div>
        </div>
    );
}
