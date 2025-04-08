document.addEventListener("DOMContentLoaded", () => {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const pendingReports = reports.filter(r => r.status === "pending");
    const list = document.getElementById("reportList");
    list.innerHTML = "";
  
    pendingReports.forEach((report, index) => {
      const div = document.createElement("div");
      div.className = "report-card";
      div.innerHTML = `
        <div class="row">
          <strong>Report #${index + 1}</strong>
          <span>Status: Pending</span>
        </div>
        <div class="report-location"><strong>Location:</strong> ${report.location}</div>
        <div class="report-description"><strong>Description:</strong> ${report.description}</div>
        <div class="buttons">
          <button class="approve-btn">Approve</button>
          <button class="decline-btn">Decline</button>
        </div>
      `;
  
      div.querySelector(".approve-btn").onclick = () => {
        report.status = "approved";
        localStorage.setItem("reports", JSON.stringify(reports));
        location.reload();
      };
      div.querySelector(".decline-btn").onclick = () => {
        report.status = "declined";
        localStorage.setItem("reports", JSON.stringify(reports));
        location.reload();
      };
  
      list.appendChild(div);
    });
  });
  
