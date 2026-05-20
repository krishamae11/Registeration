/* =========================
   INIT (ON LOAD)
========================= */
document.addEventListener("DOMContentLoaded", function () {

  const studentId = localStorage.getItem("currentStudentId");

  // ONLY LOAD STUDENT IF INSIDE ASSESSMENT PAGE
  if (studentId && studentId !== "undefined") {
    loadStudent(studentId);
  }
});


/* =========================
   LOAD STUDENT
========================= */
function loadStudent(id) {

  fetch(`http://localhost:6969/api/admission/${id}`)

    .then(res => {

      if (!res.ok) {
        throw new Error("Student not found");
      }

      return res.json();
    })

    .then(student => {

      if (!student) return;

      console.log("STUDENT DATA:", student);

      displayStudent(student);

      const section = student.section || "";

      const academicYear =
        (
          student.academicyear ||
          student.academicYear ||
          student.academic_year ||
          ""
        ).trim();

      let semester =
        (
          student.semester ||
          student.sem ||
          ""
        ).trim();

      if (semester === "1st" || semester === "1st Semester") {
        semester = "1st Sem";
      }

      if (semester === "2nd" || semester === "2nd Semester") {
        semester = "2nd Sem";
      }

      loadSchedule(section, academicYear, semester);
    })

    .catch(err => {
      console.error("LOAD STUDENT ERROR:", err);
    });
}


/* =========================
   DISPLAY STUDENT
========================= */
function displayStudent(data) {

  const sectionInput =
    document.getElementById("generatedSection");

  if (sectionInput) {
    sectionInput.value =
      data.section || "Not Assigned";
  }

  setText("student_id", data.id);

  const middle =
    data.middleName ||
    data.middle_name ||
    "";

  const middleInitial =
    middle
      ? middle.trim().charAt(0).toUpperCase() + "."
      : "";

  setText(
    "student_name",
    `${data.lastName || ""}, ${data.firstName || ""}${middleInitial ? " " + middleInitial : ""}`
  );

  let prog =
    (data.program || "").trim();

  if (prog === "BS Information Technology") {
    prog = "BSIT";
  }

  if (prog === "BS Computer Science") {
    prog = "BSCS";
  }

  const yearNum =
    data.yearLevel
      ? data.yearLevel.charAt(0)
      : "";

  setText("courseYear", `${prog}-${yearNum}`);

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

  const dept =
    deptMap[(data.department || "").trim()]
    || data.department;

  setText("department", dept);

  setText(
    "validated",
    data.validated ? "Yes" : "No"
  );

  const btn =
    document.getElementById("actionBtn");

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
}


/* =========================
   SAFE TEXT
========================= */
function setText(id, value) {

  const el =
    document.getElementById(id);

  if (el) {
    el.innerText = value ?? "";
  }
}


/* =========================
   LOAD SCHEDULE
========================= */
function loadSchedule(section, academicYear, semester) {

  if (!section || !academicYear || !semester) {
    return;
  }

  const url =
    `http://localhost:6969/api/schedule/filter` +
    `?section=${encodeURIComponent(section)}` +
    `&academicYear=${encodeURIComponent(academicYear)}` +
    `&semester=${encodeURIComponent(semester)}`;

  fetch(url)

    .then(res => {

      if (!res.ok) {
        throw new Error("Schedule not found");
      }

      return res.json();
    })

    .then(data => {

      const table =
        document.getElementById("scheduleTable");

      if (!table) return;

      table.innerHTML = "";

      let total = 0;

      if (!data || data.length === 0) {

        table.innerHTML =
          `<tr>
            <td colspan="7" style="text-align:center;">
              No schedule found
            </td>
          </tr>`;

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

      const totalUnitsEl =
        document.getElementById("totalUnits");

      if (totalUnitsEl) {
        totalUnitsEl.innerText = total;
      }
    })

    .catch(err => {
      console.error("SCHEDULE ERROR:", err);
    });
}


/* =========================
   ENROLL MODAL
========================= */
function handleEnroll() {

  document
    .getElementById("modalOverlay")
    ?.classList.remove("hidden");
}

function goBack() {

  document
    .getElementById("modalOverlay")
    ?.classList.add("hidden");
}


/* =========================
   CONFIRM ENROLL
========================= */
function confirmEnroll() {

  const id =
    document.getElementById("student_id")
      ?.innerText;

  if (!id) {
    console.error("Student ID not found");
    return;
  }

  fetch(`http://localhost:6969/api/admission/${id}/validate`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    }
  })

    .then(async res => {

      if (res.status === 409) {
        alert("Student already enrolled.");
        return null;
      }

      if (!res.ok) {
        throw new Error("Enrollment failed");
      }

      return res.json();
    })

    .then(data => {

      if (!data) return;

      setText("validated", "Yes");

      const btn =
        document.getElementById("actionBtn");

      if (btn) {
        btn.textContent = "COE";
        btn.className = "btn-coe";
        btn.onclick = goToCOE;
      }

      document
        .getElementById("modalOverlay")
        ?.classList.add("hidden");

      console.log("ENROLL SUCCESS");
    })

    .catch(err => {
      console.error("ENROLL ERROR:", err);
    });
}


/* =========================
   NAVIGATION
========================= */
function goToCOE() {
  window.location.href = "coe.html";
}

function toggleMenu() {
  alert("Menu clicked");
}

function goToEnrollmentPage() {

  localStorage.removeItem("currentStudentId");

  window.location.href = "enrollment.html";
}


/* =========================
   REVIEW MODAL
========================= */
document.addEventListener("DOMContentLoaded", function () {

  const form =
    document.getElementById("enrollmentForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    document
      .getElementById("reviewModal")
      ?.classList.remove("hidden");
  });
});


function reviewData() {

  document
    .getElementById("reviewModal")
    ?.classList.add("hidden");

  document
    .getElementById("enrollmentForm")
    ?.scrollIntoView({
      behavior: "smooth"
    });
}


/* =========================
   SAVE ENROLLMENT
========================= */
function proceedAssessment() {

  const program = document.getElementById("program")?.value;
  const yearLevel = document.getElementById("yearLevel")?.value;

  let prog = program || "";
  let year = yearLevel || "";

  if (prog === "BS Information Technology") prog = "BSIT";
  if (prog === "BS Computer Science") prog = "BSCS";

  let yearNum = "";
  if (year.includes("1")) yearNum = "1";
  else if (year.includes("2")) yearNum = "2";
  else if (year.includes("3")) yearNum = "3";
  else if (year.includes("4")) yearNum = "4";

  const section =
    (prog && yearNum)
      ? `${prog}${yearNum}A`
      : "UNASSIGNED";

  const studentData = {

    firstName:
      document.getElementById("firstName")?.value,

    middleName:
      document.getElementById("middleName")?.value,

    lastName:
      document.getElementById("lastName")?.value,

    department:
      document.getElementById("departmentSelect")?.value,

    program: program,
    yearLevel: yearLevel,
    semester: document.getElementById("semester")?.value,
    academicyear: document.getElementById("academicYear")?.value,

    section: section
  };

  // =========================
  // NEW DUPLICATE CHECK (ADDED ONLY)
  // =========================
  checkDuplicateStudent(studentData);
}


/* =========================
   DUPLICATE CHECK (NEW)
========================= */
let pendingStudentData = null;

function checkDuplicateStudent(studentData) {

  fetch("http://localhost:6969/api/admission/check-duplicate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(studentData)
  })

    .then(res => res.json())

    .then(result => {

      if (result.status === "VALIDATED") {
        alert(result.message);
        goToCOE(); // directly show COE
        return;
      }

      if (result.status === "EXISTS") {
        alert(result.message);
        goToEnrollmentPage(); // or show modal
        return;
      }

      // ONLY NEW STUDENT → allow insert
      submitNewEnrollment(studentData);
    })

    .catch(err => {
      console.error(err);
      submitNewEnrollment(studentData); // fallback
    });
}


/* =========================
   ACTUAL SUBMIT (NEW WRAPPER)
========================= */
function submitNewEnrollment(studentData) {

  fetch("http://localhost:6969/api/admission", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(studentData)
  })

    .then(async res => {

      if (res.status === 409) {
        document
          .getElementById("noSlotModal")
          ?.classList.remove("hidden");

        return null;
      }

      if (!res.ok) {
        throw new Error("Save failed");
      }

      return res.json();
    })

    .then(data => {

      if (!data) return;

      localStorage.setItem("currentStudentId", data.id);

      window.location.href = "assessment.html";
    })

    .catch(err => {
      console.error("SAVE ERROR:", err);
    });
}


/* =========================
   EXISTING STUDENT MODAL ACTIONS (NEW)
========================= */

function reviewExistingData() {

  document
    .getElementById("existingStudentModal")
    ?.classList.add("hidden");

  document
    .getElementById("enrollmentForm")
    ?.scrollIntoView({ behavior: "smooth" });
}

function proceedExistingAssessment() {

  document
    .getElementById("existingStudentModal")
    ?.classList.add("hidden");

  // continue with stored data if needed
  if (pendingStudentData) {
    submitNewEnrollment(pendingStudentData);
  }
}


/* =========================
   SECTION AUTO DISPLAY
========================= */
document.addEventListener("DOMContentLoaded", function () {

  const program =
    document.getElementById("program");

  const yearLevel =
    document.getElementById("yearLevel");

  const sectionDisplay =
    document.getElementById("generatedSection");

  if (!program || !yearLevel || !sectionDisplay) return;

  sectionDisplay.value = "";

  function updateSection() {

    let prog =
      (program.value || "").trim();

    let year =
      (yearLevel.value || "").trim();

    if (!prog || !year) {
      sectionDisplay.value = "";
      return;
    }

    if (prog === "BS Information Technology") prog = "BSIT";
    if (prog === "BS Computer Science") prog = "BSCS";

    let yearNum = "";

    if (year.includes("1")) yearNum = "1";
    else if (year.includes("2")) yearNum = "2";
    else if (year.includes("3")) yearNum = "3";
    else if (year.includes("4")) yearNum = "4";

    sectionDisplay.value = `${prog}${yearNum}A`;
  }

  program.addEventListener("change", updateSection);
  yearLevel.addEventListener("change", updateSection);
});

window.addEventListener("load", function () {

  const sectionDisplay =
    document.getElementById("generatedSection");

  if (sectionDisplay) {
    sectionDisplay.value = "";
  }
});
