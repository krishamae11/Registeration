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
// NAME FORMAT HELPER
// =========================
function capitalizeWords(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
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

  fetch(`http://localhost:6969/api/coestudentinfo/${studentId}`)
    .then(res => res.json())

    .then(student => {

      console.log("COE STUDENT:", student);

      if (!student) return;

      // =========================
      // DISPLAY INFO
      // =========================

      document.getElementById("student_id").innerText =
        student.id ?? "";

      // =========================
      // FIXED NAME FORMAT
      // =========================
      const first = capitalizeWords(student.firstName ?? "");
      const last = capitalizeWords(student.lastName ?? "");

      const middleRaw =
        student.middleName ??
        student.middle_name ??
        "";

      const middleInitial =
        middleRaw.trim()
          ? middleRaw.trim().charAt(0).toUpperCase() + "."
          : "";

      document.getElementById("First_name").innerText =
        middleInitial
          ? `${last}, ${first} ${middleInitial}`
          : `${last}, ${first}`;

      // =========================
      // COURSE FIX
      // =========================
      document.getElementById("course").innerText =
        student.course ?? student.program ?? "";

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

      const semesterRaw =
        student.semester ?? student.sem ?? "";

      const academicYearRaw =
        student.academicyear ??
        student.academicYear ??
        student.academic_year ??
        "";

      if (periodField) {
        periodField.innerText =
          `${semesterRaw} AY ${academicYearRaw}`;
      }

      // =========================
      // SECTION (FIXED)
      // =========================
      const formattedSectionForDB =
        (student.section ?? "").trim();

      // =========================
      // SEMESTER (SAFE)
      // =========================
      let semester =
        (student.semester ?? "").trim();

      if (semester.toLowerCase().includes("1st")) {
        semester = "1st";
      }

      if (semester.toLowerCase().includes("2nd")) {
        semester = "2nd";
      }

      const academicYear =
        (academicYearRaw ?? "").trim();

      console.log("FORMATTED SECTION:", formattedSectionForDB);
      console.log("ACADEMIC YEAR:", academicYear);
      console.log("SEMESTER:", semester);

      // =========================
      // LOAD SCHEDULE
      // =========================
      if (
        formattedSectionForDB &&
        academicYear &&
        semester
      ) {
        loadSchedule(
          formattedSectionForDB,
          academicYear,
          semester
        );
      } else {
        console.log("Skipping schedule load (missing data)");
      }

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

      const totalUnitsEl =
        document.getElementById("totalUnits");

      if (totalUnitsEl) {
        totalUnitsEl.innerText = total;
      }

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
