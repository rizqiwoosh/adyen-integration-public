import express from "express";
import cors from "cors";
import axios from "axios";
import { port, dbHost } from './config.js';

const app = express();
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use(express.json()); // To parse incoming JSON request bodies


let credentials = {}; // Store credentials temporarily

app.post("/api/store-credentials", (req, res) => {
    try {
        const { allowOrigin, accountHolderId, ADYEN_API_KEY, ADYEN_SESSION_URL } = req.body;

        // Validate if API Key or Account Holder ID is missing
        if (!ADYEN_API_KEY || !accountHolderId || !ADYEN_SESSION_URL) {
            return res.status(400).json({ error: "API Key, Account Holder ID, or ADYEN_SESSION_URL is missing" });
        }

        // Store credentials in memory
        credentials = { allowOrigin, accountHolderId, ADYEN_API_KEY, ADYEN_SESSION_URL };

        console.log("Credentials successfully stored:", credentials);

        res.status(200).json({ message: "Credentials stored successfully" });
    } catch (error) {
        console.error("❌ Error storing credentials:", error.message);
        res.status(500).json({ error: "Failed to store credentials" });
    }
});

app.post("/api/create-session", async (req, res) => {
    try {
        // Ensure credentials are available before making the request
        if (!credentials || !credentials.ADYEN_API_KEY || !credentials.accountHolderId || !credentials.ADYEN_SESSION_URL) {
            return res.status(400).json({ error: "Credentials not set" });
        }

        console.log("Using stored credentials:", credentials);

        // Send the request to Adyen API to create a session
        const response = await axios.post(
            credentials.ADYEN_SESSION_URL,
            {
                allowOrigin: credentials.allowOrigin,
                product: "platform",
                policy: {
                    resources: [
                        {
                            accountHolderId: credentials.accountHolderId,
                            type: "accountHolder"
                        }
                    ],
                    roles: [
                        "Transactions Overview Component: View",
                        "Transactions Overview Component: Manage Refunds"
                    ]
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": credentials.ADYEN_API_KEY
                }
            }
        );

        console.log("✅ Adyen API response:", response.data);
        res.json(response.data);  // Send Adyen response to frontend
    } catch (error) {
        console.error("❌ Error creating session:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to create session" });
    }
});

// API endpoint to create session for Payout Dashboard
app.post('/api/create-payout-session', async (req, res) => {
    try {
        // Ensure credentials are available before making the request
        if (!credentials || !credentials.ADYEN_API_KEY || !credentials.accountHolderId || !credentials.ADYEN_SESSION_URL) {
            return res.status(400).json({ error: "Credentials not set" });
        }

        console.log("Using stored credentials:", credentials);

        // Send the request to Adyen API to create a session
        const response = await axios.post(
            credentials.ADYEN_SESSION_URL,
            {
                allowOrigin: credentials.allowOrigin,
                product: "platform",
                policy: {
                    resources: [
                        {
                            accountHolderId: credentials.accountHolderId, // Use dynamic accountHolderId
                            type: "accountHolder"
                        }
                    ],
                    roles: [
                        "Payouts Overview Component: View",
                    ]
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": credentials.ADYEN_API_KEY
                }
            }
        );

        console.log("✅ Adyen API response payout:", response.data);
        res.json(response.data); // Send Adyen response to frontend
    } catch (error) {
        console.error("❌ Adyen API error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to create session" });
    }
});



// Start the server
const PORT = port;
const DATABASE_HOST = dbHost;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://${DATABASE_HOST}:${PORT}`);
});