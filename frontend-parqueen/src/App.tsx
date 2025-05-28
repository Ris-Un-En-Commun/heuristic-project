import './App.css'

function App() {

    return (
        <>
            <h1>Vite is running in {import.meta.env.MODE}</h1>
            <p>Using data from {import.meta.env.VITE_BACKEND_URL}</p>        </>
    )
}

export default App
