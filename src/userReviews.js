
import { reports } from "./data-accounts.js";

function generateProgressBar(status) {
  const stages = ['New', 'In Progress', 'Completed'];
  const current = stages.indexOf(status);

  return `
    <div class="progress-bar">
      ${stages.map((label, i) => `
        <div class="step">
          <div class="indicator ${i <= current ? 'active' : ''}"></div>
          ${i === current ? `<div class="label">${label}</div>` : '<div class="label"></div>'}
        </div>
        ${i < stages.length - 1 ? '<div class="line"></div>' : ''}
      `).join('')}
    </div>
  `;
}

function renderMyReports() {
  const reportListDiv = document.getElementById('reportList');
  reportListDiv.innerHTML = '';

  // Only take the first 4 reports
  const limitedReports = reports.slice(0, 4);

  limitedReports.forEach((report, index) => {
    const card = document.createElement('div');
    card.className = 'report-card';
    card.innerHTML = `
      <div class="row">
        <strong>Report #${index + 1}: ${report.title}</strong>
      </div>
      <div class="report-location"><strong>Location:</strong> ${report.location}</div>
      <div class="report-description"><strong>Description:</strong> ${report.description}</div>
      ${generateProgressBar(report.status)}
    `;
    reportListDiv.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderMyReports);
