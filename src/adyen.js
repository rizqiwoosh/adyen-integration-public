import { AdyenPlatformExperience, TransactionsOverview, PayoutsOverview, ReportsOverview } from '@adyen/adyen-platform-experience-web';
import '@adyen/adyen-platform-experience-web/adyen-platform-experience-web.css';
import axios from "axios";
import { API_BASE_URL } from "../config.js";

// Function to fetch the session token from Adyen dynamically when needed
async function handleSessionCreate() {
    try {
        console.log("🔄 Fetching Adyen session from backend...");

        const response = await fetch(`${API_BASE_URL}/api/create-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        if (!response.ok) {
            console.error("❌ Error:", data.error || "Unknown error");
            return null;
        }

        console.log("✅ Session Created:", data);
        return data;
    } catch (error) {
        console.error("❌ Failed to create session:", error);
        return null;
    }
}

async function handleSessionCreatePayout() {
    try {
        console.log("🔄 Fetching Adyen payout session from backend...");

        const response = await fetch(`${API_BASE_URL}/api/create-payout-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ Error:", data.error || "Unknown error");
            return null;
        }

        console.log("✅ Payout Session Created:", data);
        return data;
    } catch (error) {
        console.error("❌ Failed to create payout session:", error);
        return null;
    }
}

async function handleSessionCreateReport() {
    try {
        console.log("🔄 Fetching Adyen payout session from backend...");

        const response = await fetch(`${API_BASE_URL}/api/create-report-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ Error:", data.error || "Unknown error");
            return null;
        }

        console.log("✅ Report Session Created:", data);
        return data;
    } catch (error) {
        console.error("❌ Failed to create report session:", error);
        return null;
    }
}

async function initializeTransactionsOverview() {
    try {
        const core = await AdyenPlatformExperience({
            session: {},
            onSessionCreate: handleSessionCreate
        });
        const transactionsOverview = new TransactionsOverview({ core });
        transactionsOverview.mount('#transactions-overview-container');

        // Ensure that the content is visible
        document.getElementById('transactions-overview-container').classList.add('active');
        document.getElementById('payouts-overview-container').classList.remove('active');
    } catch (error) {
        console.error('Error initializing Transactions Overview:', error);
    }
};

async function initializePayoutDashboard() {
    try {
        const core = await AdyenPlatformExperience({
            session: {},
            onSessionCreate: handleSessionCreatePayout
        });
        const payoutsOverview = new PayoutsOverview({ core });
        payoutsOverview.mount('#payouts-overview-container');

        document.getElementById('transactions-overview-container').classList.remove('active');
        document.getElementById('payouts-overview-container').classList.add('active');
    } catch (error) {
        console.error('Error initializing Payout Dashboard:', error);
    }
}

async function initializeReportDashboard() {
    try {
        const core = await AdyenPlatformExperience({
            session: {},
            onSessionCreate: handleSessionCreateReport
        });
        const reportsOverview = new ReportsOverview({ core });
        reportsOverview.mount('#reports-overview-container');

        document.getElementById('transactions-overview-container').classList.remove('active');
        document.getElementById('payouts-overview-container').classList.remove('active');
        document.getElementById('reports-overview-container').classList.add('active');
    } catch (error) {
        console.error('Error initializing Report Dashboard:', error);
    }
}

document.getElementById('transaction-overview-tab').addEventListener('click', function() {
    initializeTransactionsOverview();
});

document.getElementById('payout-dashboard-tab').addEventListener('click', function() {
    initializePayoutDashboard();
});

document.getElementById('report-dashboard-tab').addEventListener('click', function() {
    initializeReportDashboard();
});

// Initialize the default view (Transactions Overview)
window.addEventListener('load', function() {
    initializeTransactionsOverview(); // Ensure this is triggered on page load
});