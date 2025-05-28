import './App.css'

function App() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    return (
        <>
            <h1>Vite is running in {import.meta.env.MODE}</h1>
            <p>Using data from {backendUrl}</p>
        </>
    )
}

export default App
