import React from 'react';

interface Props {
    options: string[],
    selectedOptionIdx: number,
    selectOptionByIdx: (idx: number) => void,
}

const unselectedStyle: string = "block py-4 text-center align-middle hover:border-solid hover:border-b-2 hover:border-slate-50";
const selectedStyle: string = unselectedStyle + " border-solid border-b-2 border-slate-300 text-slate-300";

export const Navbar : React.FC<Props> = (props: Props) => {
    return (
        <nav className="bg-gradient-to-r from-sky-700 to-sky-900 space-x-4 text-xl text-slate-50 grid grid-flow-col grow h-max">
            {props.options.map((v, i) => 
                <a key={i} onClick={() => props.selectOptionByIdx(i)} className={i === props.selectedOptionIdx ? selectedStyle : unselectedStyle}>{v}</a>
            )}
        </nav>
    );
}
