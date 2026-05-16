window.onload = function () {
  const studentId = localStorage.getItem("currentStudentId");

  if (!studentId) {
    alert("No student found. Please enroll first.");
    return;
  }

  loadStudent(studentId);
};

/* =========================
   LOAD STUDENT
========================= */
function loadStudent(id) {
  fetch("http://localhost:6969/api/studentinfo")
    .then(res => res.json())
    .then(data => {
      const student = data.find(s => String(s.id) === String(id));

      if (!student) {
        console.error("Student not found");
        return;
      }

      displayStudent(student);

      // program → abbreviation
      let prog = (student.program || "").trim();
      if (prog === "BS Information Technology") prog = "BSIT";

      const yearNum = student.yearLevel ? student.yearLevel.charAt(0) : "";

      const section = `${prog}${yearNum}${student.section || ""}`.trim();

      let semester = (student.semester || "").trim();
      if (semester === "1st Semester") semester = "1st";
      if (semester === "2nd Semester") semester = "2nd";

      const academicYear = (student.academicYear || "").trim();

      loadSchedule(section, academicYear, semester);
    })
    .catch(err => console.error("LOAD STUDENT ERROR:", err));
}

/* =========================
   DISPLAY STUDENT
========================= */
function displayStudent(data) {
  setText("student_id", data.id);

  /* ---------- MIDDLE INITIAL ---------- */
  const middle =
    data.middleName ||
    data.middle_name ||
    data.middlename ||
    data.middle ||
    "";

  const middleInitial = middle
    ? middle.trim().charAt(0).toUpperCase() + "."
    : "";

  setText(
    "First_name",
    `${data.lastName || ""}, ${data.firstName || ""}${
      middleInitial ? " " + middleInitial : ""
    }`
  );

  /* ---------- COURSE - YEAR ---------- */
  let prog = (data.program || "").trim();
  if (prog === "BS Information Technology") prog = "BSIT";

  const yearNum = data.yearLevel ? data.yearLevel.charAt(0) : "";

  setText("courseYear", `${prog}-${yearNum}`); // BSIT-1

  /* ---------- DEPARTMENT SHORTENED ---------- */
  const deptMap = {
    "College of Computer Studies": "CCS",
    "Computer Studies Department": "CCS",
    "College of Business Administration": "CBA",
    "Business Administration Department": "CBA",
    "College of Engineering": "COE",
    "Engineering Department": "COE",
    "College of Education": "COED",
    "College of Arts and Sciences": "CAS"
  };

  const dept = deptMap[(data.department || "").trim()] || data.department;
  setText("department", dept);

  /* ---------- VALIDATION ---------- */
  setText("validated", data.validated ? "Yes" : "No");

  /* ---------- BUTTON ---------- */
  const btn = document.getElementById("actionBtn");

  if (btn) {
    if (data.validated) {
      btn.textContent = "COE";
      btn.className = "btn-coe";
      btn.onclick = goToCOE;
    } else {
      btn.textContent = "ENROLL";
      btn.className = "btn-enroll";
      btn.onclick = handleEnroll;
    }
  }

  /* ---------- PERIOD ---------- */
  const periodText =
    `${data.semester || ""} Semester AY ${data.academicYear || ""}`;

  const period = document.getElementById("period");
  if (period) period.innerHTML = `<option>${periodText}</option>`;
}

/* =========================
   SAFE TEXT
========================= */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerText = value ?? "";
}

/* =========================
   LOAD SCHEDULE
========================= */
function loadSchedule(section, academicYear, semester) {
  if (!section || !academicYear || !semester) return;

  const url =
    `http://localhost:6969/api/schedule/filter` +
    `?section=${encodeURIComponent(section)}` +
    `&academicYear=${encodeURIComponent(academicYear)}` +
    `&semester=${encodeURIComponent(semester)}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("scheduleTable");
      if (!table) return;

      table.innerHTML = "";
      let total = 0;

      if (!data || data.length === 0) {
        table.innerHTML =
          `<tr><td colspan="7" style="text-align:center;">No schedule found</td></tr>`;
        return;
      }

      data.forEach(s => {
        table.innerHTML += `
          <tr>
            <td>${s.code || ""}</td>
            <td>${s.subject || ""}</td>
            <td>${s.description || ""}</td>
            <td>${s.units || 0}</td>
            <td>${s.schedule || ""}</td>
            <td>${s.instructor || ""}</td>
            <td>${s.section || ""}</td>
          </tr>
        `;
        total += Number(s.units || 0);
      });

      document.getElementById("totalUnits").innerText = total;
    })
    .catch(err => console.error("SCHEDULE ERROR:", err));
}

/* =========================
   ENROLL FLOW
========================= */
function handleEnroll() {
  document.getElementById("modalOverlay")?.classList.remove("hidden");
}

function confirmEnroll() {
  const id = document.getElementById("student_id")?.innerText;
  if (!id) return;

  fetch(`http://localhost:6969/api/official-student/${id}/validate`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ validated: true })
  })
    .then(res => res.json())
    .then(() => {
      document.getElementById("validated").innerText = "Yes";
      document.getElementById("enrollMessage").innerText =
        "Student is OFFICIALLY Enrolled.";

      const btn = document.getElementById("actionBtn");
      btn.textContent = "COE";
      btn.className = "btn-coe";
      btn.onclick = goToCOE;

      document.getElementById("modalOverlay")?.classList.add("hidden");
    })
    .catch(err => {
      console.error("ENROLL ERROR:", err);
      alert("Enrollment failed.");
    });
}

/* =========================
   NAVIGATION
========================= */
function goToCOE() {
  window.location.href = "coe.html";
}

function goToEnrollmentPage() {
  window.location.href = "enrollment.html";
}

function goBack() {
  document.getElementById("modalOverlay")?.classList.add("hidden");
}

function toggleMenu() {
  alert("Menu clicked");
}
