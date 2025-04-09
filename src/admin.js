import { getReports, saveReports, addNotification } from "./data-accounts.js";

let deleteIndex = null;

function renderMyReports() {
  const reports = getReports();
  const reportListDiv = document.getElementById('reportList');
  reportListDiv.innerHTML = '';

  reports.forEach((report) => {
    const card = document.createElement('div');
    card.className = 'report-card';
    card.innerHTML = `
      <div class="report-card-content">
        <div class="report-container">
          <div class="row">
            <strong>Report #${report.id}: ${report.title}    Current Status: ${report.status} </strong>
          </div>
          <div class="report-location"><strong>Location:</strong> ${report.location}</div>
          <div class="report-description"><strong>Description:</strong> ${report.description}</div>
        </div>

        <div class="status-container">
          <button class="set-status" data-id="${report.id}">Set Status</button>
          <select id="status-${report.id}">
            <option value="Approved">Approve</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
          <button class="delete-btn" data-id="${report.id}">Delete</button>
        </div>
      </div>
    `;
    reportListDiv.appendChild(card);
  });

  // Delete buttons
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      deleteIndex = e.target.getAttribute('data-id');
      document.getElementById('report-form-container').style.display = 'flex';
    });
  });

  // Set Status buttons
  document.querySelectorAll('.set-status').forEach(button => {
    button.addEventListener('click', (e) => {
      const reportId = e.target.getAttribute('data-id');
      const selectedValue = document.getElementById(`status-${reportId}`).value;

      const reports = getReports();
      const report = reports.find(r => r.id === reportId);  // Find the report by ID
      if (report) {
        report.status = selectedValue;

        // Add notification for status update
        addNotification(report.title, `${selectedValue}`);

        saveReports();
        renderMyReports(); // Optional: refresh to update UI
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderMyReports();

  const reportForm = document.getElementById('report-form');
  reportForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (deleteIndex !== null) {
      const reports = getReports();
      const reportIndex = reports.findIndex(r => r.id === deleteIndex); // Find the report by ID

      if (reportIndex !== -1) {
        const report = reports[reportIndex];
        
        // Get selected reasons from checkboxes
        const reasons = [];
        document.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
          reasons.push(checkbox.value);
        });

        // If there are selected reasons, call addNotification with the report title and selected reasons
        if (reasons.length > 0) {
          addNotification(report.title, reasons.join(', '));
        }

        // Delete the report from the array
        reports.splice(reportIndex, 1);
      }

      saveReports();
      deleteIndex = null;
      renderMyReports();
    }
    document.getElementById('report-form-container').style.display = 'none';
  });

  reportForm.querySelector('button[type="cancel"]').addEventListener('click', (e) => {
    e.preventDefault();
    deleteIndex = null;
    document.getElementById('report-form-container').style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    const popup = document.getElementById('report-form-container');
    if (e.target === popup) {
      popup.style.display = 'none';
      deleteIndex = null;
    }
  });
});
