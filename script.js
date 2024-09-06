 // Sample data
 const callData = {
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
    document.getElementById('todayBtn').addEventListener('click', openTodayDashboard);
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
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 class="dashboard-title">Answered Calls for ${dateString}</h1>
            </div>

            <div class="card">
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

    // Create the content for the new tab
    const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Today's Dashboard</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 class="dashboard-title">Dashboard for ${dateString}</h1>
            </div>

            <div class="card">
                <h2>Call Summary</h2>
                <div class="call-summary">
                    <div class="summary-row">
                        <div class="summary-card">
                            <div class="number" id="totalCallsSummary">0</div>
                            <div>Total Calls</div>
                        </div>
                        <div class="summary-card">
                            <div class="number blue" id="interestedCallsSummary">0</div>
                            <div>Interested</div>
                        </div>
                    </div>
                    <div class="summary-row">
                        <div class="summary-card">
                            <div class="number green" id="answeredCallsSummary">0</div>
                            <div>Answered</div>
                        </div>
                        <div class="summary-card">
                            <div class="number red" id="unansweredCallsSummary">0</div>
                            <div>Unanswered</div>
                        </div>
                        <div class="summary-card">
                            <div class="number orange" id="callBackCallsSummary">0</div>
                            <div>Call Back</div>
                        </div>
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
                            <!-- Call details will be populated here by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <script>
            // Fetch and display today's data
            function fetchTodayData() {
                // This is where you would typically fetch data from your backend
                // For this example, we'll use dummy data
                const todayData = {
                    totalCalls: 50,
                    interestedCalls: 20,
                    answeredCalls: 30,
                    unansweredCalls: 15,
                    callBackCalls: 5,
                    details: [
                        { number: "1234567890", status: "Answered", notes: "Interested in property", duration: "5:30" },
                        { number: "9876543210", status: "Not Answered", notes: "No response", duration: "0:45" },
                        { number: "5555555555", status: "Call Back", notes: "Requested call back", duration: "2:15" }
                    ]
                };

                // Update the dashboard with today's data
                document.getElementById('totalCallsSummary').textContent = todayData.totalCalls;
                document.getElementById('interestedCallsSummary').textContent = todayData.interestedCalls;
                document.getElementById('answeredCallsSummary').textContent = todayData.answeredCalls;
                document.getElementById('unansweredCallsSummary').textContent = todayData.unansweredCalls;
                document.getElementById('callBackCallsSummary').textContent = todayData.callBackCalls;

                const callDetailsBody = document.getElementById('callDetailsBody');
                callDetailsBody.innerHTML = '';
                todayData.details.forEach(call => {
                    const row = document.createElement('tr');
                    row.innerHTML = \`
                        <td>\${call.number}</td>
                        <td><span class="status status-\${call.status.toLowerCase().replace(' ', '-')}">\${call.status}</span></td>
                        <td>\${call.notes}</td>
                        <td>\${call.duration}</td>
                    \`;
                    callDetailsBody.appendChild(row);
                });
            }

            // Call the function to fetch and display today's data
            fetchTodayData();
        </script>
    </body>
    </html>
    `;

    // Write the content to the new tab
    newTab.document.write(content);
    newTab.document.close();
}

function showClearDataConfirmation() {
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

    document.getElementById('confirmClear').addEventListener('click', function() {
        clearData();
        modal.style.display = 'none';
    });

    document.getElementById('cancelClear').addEventListener('click', function() {
        modal.style.display = 'none';
    });

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
            <div class="header">
                <h1 class="dashboard-title">Unanswered Calls for ${dateString}</h1>
            </div>

            <div class="card">
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
            <div class="header">
                <h1 class="dashboard-title">Call Back Calls for ${dateString}</h1>
            </div>

            <div class="card">
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
        </script>
    </body>
    </html>
    `;

    // Write the content to the new tab
    newTab.document.write(content);
    newTab.document.close();
}

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
            <div class="header">
                <h1 class="dashboard-title">Interested Calls for ${dateString}</h1>
            </div>

            <div class="card">
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
        </script>
    </body>
    </html>
    `;

    // Write the content to the new tab
    newTab.document.write(content);
    newTab.document.close();
}