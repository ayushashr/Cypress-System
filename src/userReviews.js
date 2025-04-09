
import { reports, getReports, getNotifications } from "./data-accounts.js";

function renderNotifications() {
  const notifications = getNotifications();
  const notificationList = document.getElementById('notification-list');
  notificationList.innerHTML = '';

  notifications.forEach(notification => {
    const li = document.createElement('li');
    li.textContent = `${notification.title}: ${notification.description}`;
    notificationList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Add click event to open the notifications popup
  const notificationsBtn = document.getElementById('notifications-btn');
  const closePopupBtn = document.getElementById('close-popup-btn');
  const notificationsPopup = document.getElementById('notifications-popup');

  notificationsBtn.addEventListener('click', () => {
    notificationsPopup.style.display = 'block';
    renderNotifications();  // Populate the notification popup with notifications
  });

  closePopupBtn.addEventListener('click', () => {
    notificationsPopup.style.display = 'none';
  });
});

function generateProgressBar(status) {
  const stages = ['Pending', 'In Progress', 'Completed'];
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

  const reports = getReports();

  // Filter reports where user is 'citizen'
  const filteredReports = reports.filter(report => report.user === 'citizen');

  filteredReports.forEach((report, index) => {
    const card = document.createElement('div');
    card.className = 'report-card';
    card.innerHTML = `
      <div class="row">
        <strong>Report #${report.id}: ${report.title}</strong>
      </div>
      <div class="report-location"><strong>Location:</strong> ${report.location}</div>
      <div class="report-description"><strong>Description:</strong> ${report.description}</div>
      ${generateProgressBar(report.status)}
    `;
    reportListDiv.appendChild(card);
  });
}


document.addEventListener('DOMContentLoaded', renderMyReports);
