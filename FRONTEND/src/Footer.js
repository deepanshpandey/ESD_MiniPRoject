function Footer() {
    return ( 
        <div className="footer bg-dark text-white text-center py-3 fixed-bottom d-flex align-items-center justify-content-center" style={{ height: '50px' }}>
            <p className="mb-0">Made By MT2024038 with 💝</p>
        </div>
    );
}

function App() {
    return (
        <div>
            <main className="content" style={{ marginBottom: '50px' }}>
            </main>
            <Footer />
        </div>
    );
}

export default App;