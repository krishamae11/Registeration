// =========================
// BUTTON FUNCTIONS
// =========================
function showTab(tabId) {
  document.getElementById('coe').style.display = 'block';
}

function goAssessment() {
  window.location.href = "index.html";
}

function printCOE() {
  window.print();
}

function toggleMenu() {
  console.log("Menu clicked"); // you can expand later
}


// =========================
// LOAD ADMISSION
// =========================
function loadAdmission() {
  fetch("http://localhost:6969/api/admission/2")
    .then(res => res.json())
    .then(data => {

      console.log("API DATA:", data);

      document.getElementById("student_id").innerText =
        data.id ?? "";

      const first = data.first_name ?? data.firstName ?? "";
      const last  = data.last_name ?? data.lastName ?? "";

      document.getElementById("First_name").innerText =
        `${first} ${last}`.trim();

      document.getElementById("course").innerText =
        data.course ?? data.program ?? "";

      document.getElementById("department").innerText =
        data.department ?? "";

    })
    .catch(err => console.log("ADMISSION ERROR:", err));
}


// =========================
// LOAD SCHEDULE
// =========================
function loadSchedule() {
  fetch("http://localhost:6969/api/schedule")
    .then(res => res.json())
    .then(data => {

      let table = document.getElementById("scheduleTable");
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

