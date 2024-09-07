 // Sample data
 let callData = {
    totalCalls: 1234,
    interestedCalls: 300,
    answeredCalls: 789,
    unansweredCalls: 445,
    callBackCalls: 200,
    details: [
        { number: "7672029401", status: "Answered", notes: "Interested in 3-bedroom apartment", duration: "5:23" },
        { number: "7894561230", status: "Not Answered", notes: "No response", duration: "0:45" },
        { number: "9876543210", status: "Call Back", notes: "Requested call back later", duration: "2:12" },
        { number: "8765432109", status: "Interested", notes: "Wants more information on pricing", duration: "8:56" }
    ]
};

// Dummy data for today
const todayDummyData = {
    totalCalls: 15,
    interestedCalls: 5,
    answeredCalls: 10,
    unansweredCalls: 3,
    callBackCalls: 2,
    details: [
        { number: "5551234567", status: "Answered", notes: "Scheduled property viewing", duration: "6:30" },
        { number: "5559876543", status: "Not Answered", notes: "Voicemail left", duration: "0:30" },
        { number: "5552468135", status: "Interested", notes: "Requested more info via email", duration: "4:15" },
        { number: "5551357924", status: "Call Back", notes: "Will call back tomorrow", duration: "1:45" },
        { number: "5557891234", status: "Answered", notes: "Not interested at this time", duration: "2:50" }
    ]
};

// Update dashboard with data
function updateDashboard(data) {
    document.getElementById('totalCallsSummary').textContent = data.totalCalls.toLocaleString();
    document.getElementById('interestedCallsSummary').textContent = data.interestedCalls.toLocaleString();
    document.getElementById('answeredCallsSummary').textContent = data.answeredCalls.toLocaleString();
    document.getElementById('unansweredCallsSummary').textContent = data.unansweredCalls.toLocaleString();
    document.getElementById('callBackCallsSummary').textContent = data.callBackCalls.toLocaleString();

    const callDetailsBody = document.getElementById('callDetailsBody');
    callDetailsBody.innerHTML = '';
    data.details.forEach(call => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${call.number}</td>
            <td><span class="status status-${call.status.toLowerCase().replace(' ', '-')}">${call.status}</span></td>
            <td>${call.notes}</td>
            <td>${call.duration}</td>
        `;
        callDetailsBody.appendChild(row);
    });
}

// Wrap all your DOM-dependent code in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Update dashboard with initial data
    updateDashboard(callData);

    // Event listeners for buttons
    document.getElementById('todayBtn').addEventListener('click', function() {
        callData = { ...todayDummyData };
        updateDashboard(callData);
        openTodayDashboard();
    });
    document.getElementById('settingsBtn').addEventListener('click', function() {
        alert('Settings clicked');
    });

    const dialpadTrigger = document.getElementById('dialpadTrigger');
    if (dialpadTrigger) {
        dialpadTrigger.addEventListener('click', function() {
            window.open('dialpad.html', '_blank');
        });
    }

    const clearDataBtn = document.getElementById('clearDataBtn');
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', showClearDataConfirmation);
    }

    // Add event listeners for summary cards
    const answeredCard = document.querySelector('.summary-card.answredcalls');
    if (answeredCard) {
        answeredCard.addEventListener('click', openAnsweredCallsTab);
    }

    const unansweredCard = document.querySelector('.summary-card.unanswredcalls');
    if (unansweredCard) {
        unansweredCard.addEventListener('click', openUnansweredCallsTab);
    }

    const callBackCard = document.querySelector('.summary-card.callbackcalls');
    if (callBackCard) {
        callBackCard.addEventListener('click', openCallBackCallsTab);
    }

    const interestedCard = document.querySelector('.summary-card.intreastedcalls');
    if (interestedCard) {
        interestedCard.addEventListener('click', openInterestedCallsTab);
    } else {
        console.error("Interested calls card not found");
    }
});

// Keep your existing functions (updateDashboard, openTodayDashboard, etc.) outside the DOMContentLoaded event listener

// Update the openAnsweredCallsTab function
function openAnsweredCallsTab() {
    // Open a new tab
    const newTab = window.open('', '_blank');

    // Get today's date
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Filter answered calls
    const answeredCalls = callData.details.filter(call => call.status.toLowerCase() === 'answered');

    // Create the content for the new tab
    const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Answered Calls</title>
        <link rel="stylesheet" href="style.css">
        <style>
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            .back-button {
                background-color: #f3f4f6;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                padding: 8px 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                font-size: 14px;
                font-weight: 500;
            }
            .back-button:hover {
                background-color: #e5e7eb;
            }
            .back-icon {
                margin-right: 8px;
                width: 16px;
                height: 16px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    <h1 class="dashboard-title">Answered Calls for ${dateString}</h1>
                    <button class="back-button" id="backButton">
                        <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                        Back
                    </button>
                </div>

                <h2>Answered Calls</h2>
                <div class="table-responsive">
                    <table class="call-details-table">
                        <thead>
                            <tr>
                                <th>Contact</th>
                                <th>Notes</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody id="answeredCallsBody">
                            ${answeredCalls.map(call => `
                                <tr>
                                    <td>${call.number}</td>
                                    <td>${call.notes}</td>
                                    <td>${call.duration}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <script>
            document.getElementById('backButton').addEventListener('click', function() {
                window.close();
            });
        </script>
    </body>
    </html>
    `;

    // Write the content to the new tab
    newTab.document.write(content);
    newTab.document.close();
}

function openTodayDashboard() {
    // Open a new tab
    const newTab = window.open('', '_blank');

    // Get today's date
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Check if there are any calls for today
    const hasCalls = callData.totalCalls > 0;

    // Create the content for the new tab
    const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Today's Dashboard</title>
        <link rel="stylesheet" href="style.css">
        <style>
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            .back-button, .clear-button {
                background-color: #f3f4f6;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                padding: 8px 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                font-size: 14px;
                font-weight: 500;
                margin-left: 10px;
            }
            .back-button:hover, .clear-button:hover {
                background-color: #e5e7eb;
            }
            .back-icon {
                margin-right: 8px;
                width: 16px;
                height: 16px;
            }
            .no-calls-container {
                text-align: center;
                padding: 40px 20px;
            }
            .motivation-message {
                font-size: 24px;
                color: #333;
                margin-bottom: 20px;
            }
            .start-day-btn {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 12px 24px;
                font-size: 18px;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            .start-day-btn:hover {
                background-color: #45a049;
            }
            .button-container {
                display: flex;
                justify-content: flex-end;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    <h1 class="dashboard-title">Dashboard for ${dateString}</h1>
                    <div class="button-container">
                        <button class="clear-button" id="clearButton">Clear Data</button>
                        <button class="back-button" id="backButton">
                            <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m12 19-7-7 7-7" />
                                <path d="M19 12H5" />
                            </svg>
                            Back
                        </button>
                    </div>
                </div>

                <div id="dashboardContent">
                    ${hasCalls ? `
                        <div class="call-summary">
                            <div class="summary-row firstrow">
                                <div class="summary-card toatalcalls">
                                    <div class="number" id="totalCallsSummary">${callData.totalCalls}</div>
                                    <div>Total Calls</div>
                                </div>
                            </div>
                            <div class="summary-row secondrow">
                                <div class="summary-card answredcalls">
                                    <div class="number green" id="answeredCallsSummary">${callData.answeredCalls}</div>
                                    <div>Answered</div>
                                </div>
                                <div class="summary-card unanswredcalls">
                                    <div class="number red" id="unansweredCallsSummary">${callData.unansweredCalls}</div>
                                    <div>Unanswered</div>
                                </div>
                            </div>
                            <div class="summary-row thirdrow">
                                <div class="summary-card callbackcalls">
                                    <div class="number orange" id="callBackCallsSummary">${callData.callBackCalls}</div>
                                    <div>Call Back</div>
                                </div>
                                <div class="summary-card intreastedcalls">
                                    <div class="number blue" id="interestedCallsSummary">${callData.interestedCalls}</div>
                                    <div>Interested</div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <h2>Call Details</h2>
                            <div class="table-responsive">
                                <table class="call-details-table">
                                    <thead>
                                        <tr>
                                            <th>Contact</th>
                                            <th>Status</th>
                                            <th>Notes</th>
                                            <th>Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody id="callDetailsBody">
                                        ${callData.details.map(call => `
                                            <tr>
                                                <td>${call.number}</td>
                                                <td><span class="status status-${call.status.toLowerCase().replace(' ', '-')}">${call.status}</span></td>
                                                <td>${call.notes}</td>
                                                <td>${call.duration}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ` : `
                        <div class="no-calls-container">
                            <p class="motivation-message">Ready to make today amazing? Your success journey starts with the first call!</p>
                            <button class="start-day-btn" onclick="startDay()">Start Your Day</button>
                        </div>
                    `}
                </div>
            </div>
        </div>

        <script>
            document.getElementById('backButton').addEventListener('click', function() {
                window.close();
            });

            document.getElementById('clearButton').addEventListener('click', function() {
                if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
                    clearData();
                    updateDashboard();
                }
            });

            function clearData() {
                callData = {
                    totalCalls: 0,
                    interestedCalls: 0,
                    answeredCalls: 0,
                    unansweredCalls: 0,
                    callBackCalls: 0,
                    details: []
                };
                // You might want to send this data to the main page or server
                window.opener.postMessage({ type: 'clearData', data: callData }, '*');
            }

            function updateDashboard() {
                const dashboardContent = document.getElementById('dashboardContent');
                if (callData.totalCalls > 0) {
                    // Update with call data (you'll need to implement this part)
                } else {
                    dashboardContent.innerHTML = \`
                        <div class="no-calls-container">
                            <p class="motivation-message">Ready to make today amazing? Your success journey starts with the first call!</p>
                            <button class="start-day-btn" onclick="startDay()">Start Your Day</button>
                        </div>
                    \`;
                }
            }

            function startDay() {
                alert("Let's start making calls and have a productive day!");
                // Here you could add logic to initialize the day's activities
            }

            // Listen for messages from the opener
            window.addEventListener('message', function(event) {
                if (event.data.type === 'updateData') {
                    callData = event.data.data;
                    updateDashboard();
                }
            });
        </script>
    </body>
    </html>
    `;

    // Write the content to the new tab
    newTab.document.write(content);
    newTab.document.close();
}

function showClearDataConfirmation() {
    // Remove any existing modal
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <p>Deleted Data Cannot Be Retrieved</p>
            <div class="modal-buttons">
                <button id="confirmClear" class="btn btn-danger">OK</button>
                <button id="cancelClear" class="btn">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.style.display = 'block';

    // Use event delegation for button clicks
    modal.addEventListener('click', function(event) {
        if (event.target.id === 'confirmClear') {
            clearData();
            modal.style.display = 'none';
        } else if (event.target.id === 'cancelClear') {
            modal.style.display = 'none';
        }
    });

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

function clearData() {
    // Clear the table data
    const callDetailsBody = document.getElementById('callDetailsBody');
    callDetailsBody.innerHTML = '';

    // Reset the call data
    callData.details = [];
    callData.totalCalls = 0;
    callData.interestedCalls = 0;
    callData.answeredCalls = 0;
    callData.unansweredCalls = 0;
    callData.callBackCalls = 0;

    // Update the dashboard with the cleared data
    updateDashboard(callData);
}

function openUnansweredCallsTab() {
    // Open a new tab
    const newTab = window.open('', '_blank');

    // Get today's date
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Filter unanswered calls
    const unansweredCalls = callData.details.filter(call => call.status.toLowerCase() === 'not answered');

    // Create the content for the new tab
    const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Unanswered Calls</title>
        <link rel="stylesheet" href="style.css">
        <style>
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            .back-button {
                background-color: #f3f4f6;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                padding: 8px 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                font-size: 14px;
                font-weight: 500;
            }
            .back-button:hover {
                background-color: #e5e7eb;
            }
            .back-icon {
                margin-right: 8px;
                width: 16px;
                height: 16px;
            }
            .call-again-btn {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
            }
            .call-again-btn:hover {
                background-color: #45a049;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    <h1 class="dashboard-title">Unanswered Calls for ${dateString}</h1>
                    <button class="back-button" id="backButton">
                        <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                        Back
                    </button>
                </div>

                <h2>Unanswered Calls</h2>
                <div class="table-responsive">
                    <table class="call-details-table">
                        <thead>
                            <tr>
                                <th>Contact</th>
                                <th>Notes</th>
                                <th>Duration</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="unansweredCallsBody">
                            ${unansweredCalls.map(call => `
                                <tr>
                                    <td>${call.number}</td>
                                    <td>${call.notes}</td>
                                    <td>${call.duration}</td>
                                    <td><button class="call-again-btn" onclick="callAgain('${call.number}')">Call Again</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <script>
            function callAgain(number) {
                // Here you would implement the logic to initiate a call
                alert('Calling ' + number);
                // In a real application, you might integrate with a calling API or system
            }

            document.getElementById('backButton').addEventListener('click', function() {
                window.close();
            });
        </script>
    </body>
    </html>
    `;

    // Write the content to the new tab
    newTab.document.write(content);
    newTab.document.close();
}

function openCallBackCallsTab() {
    // Open a new tab
    const newTab = window.open('', '_blank');

    // Get today's date
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Filter call back calls
    const callBackCalls = callData.details.filter(call => call.status.toLowerCase() === 'call back');

    // Create the content for the new tab
    const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Call Back Calls</title>
        <link rel="stylesheet" href="style.css">
        <style>
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            .back-button {
                background-color: #f3f4f6;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                padding: 8px 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                font-size: 14px;
                font-weight: 500;
            }
            .back-button:hover {
                background-color: #e5e7eb;
            }
            .back-icon {
                margin-right: 8px;
                width: 16px;
                height: 16px;
            }
            .action-btn {
                padding: 5px 10px;
                margin: 2px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9em;
            }
            .call-again-btn {
                background-color: #4CAF50;
                color: white;
            }
            .whatsapp-btn {
                background-color: #25D366;
                color: white;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    <h1 class="dashboard-title">Call Back Calls for ${dateString}</h1>
                    <button class="back-button" id="backButton">
                        <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                        Back
                    </button>
                </div>

                <h2>Call Back Calls</h2>
                <div class="table-responsive">
                    <table class="call-details-table">
                        <thead>
                            <tr>
                                <th>Contact</th>
                                <th>Notes</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="callBackCallsBody">
                            ${callBackCalls.map(call => `
                                <tr>
                                    <td>${call.number}</td>
                                    <td>${call.notes}</td>
                                    <td>${call.duration}</td>
                                    <td>
                                        <button class="action-btn call-again-btn" onclick="callAgain('${call.number}')">Call Again</button>
                                        <button class="action-btn whatsapp-btn" onclick="openWhatsApp('${call.number}')">WhatsApp</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <script>
            function callAgain(number) {
                // Here you would implement the logic to initiate a call
                alert('Calling ' + number);
                // In a real application, you might integrate with a calling API or system
            }

            function openWhatsApp(number) {
                // Remove any non-digit characters from the number
                const cleanNumber = number.replace(/\D/g, '');
                // Open WhatsApp chat with this number
                window.open('https://wa.me/' + cleanNumber, '_blank');
            }

            document.getElementById('backButton').addEventListener('click', function() {
                window.close();
            });
        </script>
    </body>
    </html>
    `;

    // Write the content to the new tab
    newTab.document.write(content);
    newTab.document.close();
}

// Add this to your main script.js file
window.addEventListener('message', function(event) {
    if (event.data.type === 'clearData') {
        callData = event.data.data;
        updateDashboard(callData);
    }
});


function openInterestedCallsTab() {
    console.log("openInterestedCallsTab function called");
    // Open a new tab
    const newTab = window.open('', '_blank');

    // Get today's date
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Filter interested calls
    const interestedCalls = callData.details.filter(call => call.status.toLowerCase() === 'interested');
    console.log("Filtered interested calls:", interestedCalls);

    // Create the content for the new tab
    const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Interested Calls</title>
        <link rel="stylesheet" href="style.css">
        <style>
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            .back-button {
                background-color: #f3f4f6;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                padding: 8px 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                font-size: 14px;
                font-weight: 500;
            }
            .back-button:hover {
                background-color: #e5e7eb;
            }
            .back-icon {
                margin-right: 8px;
                width: 16px;
                height: 16px;
            }
            .action-btn {
                padding: 5px 10px;
                margin: 2px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9em;
            }
            .call-again-btn {
                background-color: #4CAF50;
                color: white;
            }
            .whatsapp-btn {
                background-color: #25D366;
                color: white;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    <h1 class="dashboard-title">Interested Calls for ${dateString}</h1>
                    <button class="back-button" id="backButton">
                        <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                        Back
                    </button>
                </div>

                <h2>Interested Calls</h2>
                <div class="table-responsive">
                    <table class="call-details-table">
                        <thead>
                            <tr>
                                <th>Contact</th>
                                <th>Notes</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="interestedCallsBody">
                            ${interestedCalls.map(call => `
                                <tr>
                                    <td>${call.number}</td>
                                    <td>${call.notes}</td>
                                    <td>${call.duration}</td>
                                    <td>
                                        <button class="action-btn call-again-btn" onclick="callAgain('${call.number}')">Call Again</button>
                                        <button class="action-btn whatsapp-btn" onclick="openWhatsApp('${call.number}')">WhatsApp</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <script>
            function callAgain(number) {
                // Here you would implement the logic to initiate a call
                alert('Calling ' + number);
                // In a real application, you might integrate with a calling API or system
            }

            function openWhatsApp(number) {
                // Remove any non-digit characters from the number
                const cleanNumber = number.replace(/\D/g, '');
                // Open WhatsApp chat with this number
                window.open('https://wa.me/' + cleanNumber, '_blank');
            }

            document.getElementById('backButton').addEventListener('click', function() {
                window.close();
            });
        </script>
    </body>
    </html>
    `;

    // Write the content to the new tab
    newTab.document.write(content);
    newTab.document.close();
}
