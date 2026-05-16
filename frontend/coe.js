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

  const studentId = localStorage.getItem("currentStudentId");

  if (!studentId) {
    alert("No student found.");
    return;
  }

  fetch(`http://localhost:6969/api/studentinfo`)
    .then(res => res.json())

    .then(data => {

      const student = data.find(
        s => String(s.id) === String(studentId)
      );

      if (!student) {
        console.log("Student not found");
        return;
      }

      console.log("COE STUDENT:", student);

      // =========================
      // DISPLAY INFO
      // =========================

      document.getElementById("student_id").innerText =
        student.id ?? "";

      const first = student.firstName ?? "";
      const last  = student.lastName ?? "";

      document.getElementById("First_name").innerText =
        `${last}, ${first}`;

      document.getElementById("course").innerText =
        student.program ?? "";

      document.getElementById("department").innerText =
        student.department ?? "";

      document.getElementById("courseYear").innerText =
        student.yearLevel ?? "";

      // =========================
      // DATE ENROLLED
      // =========================

      const dateField =
        document.getElementById("enrollmentDate");

      if (dateField) {
        dateField.innerText =
          student.dateEnrolled ?? "Not Yet Enrolled";
      }

      // =========================
      // PERIOD DISPLAY
      // =========================

      const periodField =
        document.getElementById("coePeriodDisplay");

      if (periodField) {

        periodField.innerText =
          `${student.semester || ""} AY ${student.academicYear || ""}`;
      }

      // =========================
      // FORMAT SECTION
      // =========================

      let prog = (student.program || "").trim();

      if (prog === "BS Information Technology") {
        prog = "BSIT";
      }

      // Example:
      // "2nd Year" -> "2"
      const yearNum =
        student.yearLevel
          ? student.yearLevel.charAt(0)
          : "";

      // Example:
      // BSIT + 2 + A = BSIT2A
      const formattedSectionForDB =
        `${prog}${yearNum}${student.section || ""}`.trim();

      // =========================
      // FORMAT SEMESTER
      // =========================

      let semester =
        (student.semester || "").trim();

      if (semester === "1st Semester") {
        semester = "1st";
      }

      if (semester === "2nd Semester") {
        semester = "2nd";
      }

      const academicYear =
        (student.academicYear || "").trim();

      console.log("FORMATTED SECTION:", formattedSectionForDB);
      console.log("ACADEMIC YEAR:", academicYear);
      console.log("SEMESTER:", semester);

      // =========================
      // LOAD SCHEDULE
      // =========================

      loadSchedule(
        formattedSectionForDB,
        academicYear,
        semester
      );

    })

    .catch(err =>
      console.log("ADMISSION ERROR:", err)
    );
}


// =========================
// LOAD SCHEDULE
// =========================
function loadSchedule(section, academicYear, semester) {

  fetch(
    `http://localhost:6969/api/coestudsched/filter?section=${encodeURIComponent(section)}&academicYear=${encodeURIComponent(academicYear)}&semester=${encodeURIComponent(semester)}`
  )

    .then(res => res.json())

    .then(data => {

      console.log("SCHEDULE DATA:", data);

      let table =
        document.getElementById("scheduleTable");

      if (!table) return;

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

      document.getElementById("totalUnits").innerText =
        total;

    })

    .catch(err =>
      console.log("SCHEDULE ERROR:", err)
    );
}


// =========================
// AUTO LOAD
// =========================
window.onload = function () {
  loadAdmission();
};
