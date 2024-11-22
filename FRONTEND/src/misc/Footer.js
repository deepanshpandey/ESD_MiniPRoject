import BackendStatus from "./BackendStatus.js";

function Footer() {
    return ( 
        <div className="footer bg-dark text-white text-center py-3 fixed-bottom d-flex align-items-center justify-content-between" style={{ height: '50px', paddingLeft: '20px', paddingRight: '20px' }}>
            <div className="d-flex align-items-center">
                <p className="mb-0">Made By MT2024038 with 💝</p>
            </div>
            <div className="d-flex align-items-center">
                <p className="mb-0">Backend Service: <BackendStatus /></p>
            </div>
        </div>
    );
}

export default Footer;
