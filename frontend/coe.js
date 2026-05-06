// =========================
// BUTTON FUNCTIONS
// =========================
function showTab(tabId) {
  document.getElementById('coe').style.display = 'block';
}

function goAssessment() {
  window.location.href = "assessment.html";
}

function printCOE() {
  window.print();
}

function toggleMenu() {
  console.log("Menu clicked");
}


// =========================
// LOAD ADMISSION
// =========================
function loadAdmission() {
  // Consistently using Student ID 15
  fetch("http://localhost:6969/api/coestudentinfo/21")
    .then(res => res.json())
    .then(data => {

      console.log("API DATA:", data);

      // ID and Name
      document.getElementById("student_id").innerText = data.id ?? "";

      const first = data.firstName ?? data.first_name ?? "";
      const last  = data.lastName ?? data.last_name ?? "";
      document.getElementById("First_name").innerText = `${first} ${last}`.trim();

      // Program and Dept
      document.getElementById("course").innerText = data.program ?? data.course ?? "";
      document.getElementById("department").innerText = data.department ?? "";
      document.getElementById("courseYear").innerText = data.yearLevel ?? "";

      // 1. DYNAMIC DATE ENROLLED
      const dateField = document.getElementById("enrollmentDate");
      if (dateField) {
        // Matches the 'dateEnrolled' field in your Java Entity
        dateField.innerText = data.dateEnrolled ?? "Not Yet Enrolled";
      }

      // 2. DYNAMIC PERIOD (NEW)
      // This ensures the header also pulls from sem and academicyear columns
      const periodField = document.getElementById("coePeriodDisplay");
      if (periodField && data.sem && data.academicyear) {
        periodField.innerText = `${data.sem} Semester AY ${data.academicyear}`;
      }

    })
    .catch(err => console.log("ADMISSION ERROR:", err));
}


// =========================
// LOAD SCHEDULE
// =========================
function loadSchedule() {
  fetch("http://localhost:6969/api/coestudsched")
    .then(res => res.json())
    .then(data => {

      let table = document.getElementById("scheduleTable");
      if(!table) return;
      table.innerHTML = "";

      let total = 0;

      data.forEach(s => {
        table.innerHTML += `
          <tr>
            <td>${s.code}</td>
            <td>${s.subject}</td>
            <td>${s.description}</td>
            <td>${s.units}</td>
            <td>${s.schedule}</td>
            <td>${s.instructor}</td>
            <td>${s.section}</td>
          </tr>
        `;
        total += Number(s.units || 0);
      });

      document.getElementById("totalUnits").innerText = total;

    })
    .catch(err => console.log("SCHEDULE ERROR:", err));
}

// =========================
// AUTO LOAD
// =========================
window.onload = function () {
  loadAdmission();
  loadSchedule();
};
