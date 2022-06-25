export default function Navbar() {
    return (
       <nav className="bg-gradient-to-r from-sky-700 to-sky-900 space-x-4 text-xl text-slate-50 grid grid-flow-col grow h-max">
        <a className="block py-4 text-center align-middle hover:border-solid hover:border-b-2 hover:border-slate-50">Sorting</a>
        <a className="block py-4 text-center align-middle hover:border-solid hover:border-b-2 hover:border-slate-50">Path Finding</a>
        <a className="block py-4 text-center align-middle hover:border-solid hover:border-b-2 hover:border-slate-50">Searching</a>
       </nav>
    );
}
