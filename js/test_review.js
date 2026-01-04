// Function to display the table
function displayAnswersTable() {
    const tableContainer = document.getElementById('question_container'); // Assuming you have a container with this ID
    const answersTable = JSON.parse(localStorage.getItem('answersTable')) || { "answers": [] };

    // Create the table element
    const table = document.createElement('table');

    // Create the table header
    const headerRow = table.insertRow();
    const headers = ["Site", "Step", "Selected"];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Populate the table with data
    answersTable.answers.forEach(answer => {
        const row = table.insertRow();
        Object.values(answer).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });

    // Append the table to the container
    tableContainer.innerHTML = ''; // Clear any previous content
    tableContainer.appendChild(table);
}

// Call the function to display the table when the page loads
window.onload = displayAnswersTable;

function downloadCSV() {
    const storedData = JSON.parse(localStorage.getItem('answersTable'));
    const answersTable = storedData ? storedData.answers : [];

    // Construct the CSV content, replacing '#' with '-' in the "Step" column
    const csvContent = "data:text/csv;charset=utf-8,"
        + (answersTable.length > 0 ? Object.keys(answersTable[0]).join(',') + '\n' : '')
        + answersTable.map(e => {
            // Replace '#' in the "Step" value if it exists
            const stepValue = e.Step ? e.Step.replace(/#/g, '') : '';
            return [e.Site, stepValue, e.Selected].join(','); // Join the modified values
        }).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "answers_table.csv");
    document.body.appendChild(link);

    link.click();
}
// Add event listener to the download button
document.getElementById('btn_next').addEventListener('click', downloadCSV);

document.getElementById('clearStorage').addEventListener('click', function () {
    // Temporarily store isLoggedIn
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    // Clear all items from local storage
    localStorage.clear();

    // Restore isLoggedIn
    localStorage.setItem('isLoggedIn', isLoggedIn);
    // Refresh the page
    window.location.href = "index.html";
  });