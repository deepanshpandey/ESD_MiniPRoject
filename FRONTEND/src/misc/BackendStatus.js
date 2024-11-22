import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from 'react';

function useBackendStatus() {
    const [backendStatus, setBackendStatus] = useState("Checking...");

    useEffect(() => {
        const checkBackendStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8081/login/status');
                if (response.status === 200) {
                    setBackendStatus("Online");
                } else {
                    setBackendStatus("Offline");
                }
            } catch (error) {
                setBackendStatus("Offline");
            }
        };

        checkBackendStatus();
        const intervalId = setInterval(checkBackendStatus, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return backendStatus;
}

export default function BackendStatus() {
    const status = useBackendStatus();
    const statusColor = status === "Online" ? "green" : "red";

    return <span style={{ color: statusColor }}>{status}</span>;
}