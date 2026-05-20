window.onload = function () {

  const studentId =
    localStorage.getItem("currentStudentId");

  if (!studentId || studentId === "undefined") {

    alert("No student selected. Please enroll first.");
    return;
  }

  loadStudent(studentId);
};


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

      console.log("STUDENT DATA:", student);

      if (!student) {
        console.error("Student not found");
        return;
      }

      displayStudent(student);

      const section =
        (student.section || "").trim();

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
};


/* =========================
   NAME CAPITALIZATION FIX
========================= */
function capitalizeName(str) {

  if (!str) return "";

  return str
    .toLowerCase()
    .split(" ")
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};


/* =========================
   DISPLAY STUDENT
========================= */
function displayStudent(data) {

  const middle =
    data.middleName ||
    data.middle_name ||
    data.middlename ||
    data.middle ||
    "";

  const middleInitial =
    middle
      ? middle.trim().charAt(0).toUpperCase() + "."
      : "";

  const lastName =
    capitalizeName(data.lastName);

  const firstName =
    capitalizeName(data.firstName);

  setText(
    "First_name",
    `${lastName || ""}, ${firstName || ""}${middleInitial ? " " + middleInitial : ""}`
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

  setText(
    "courseYear",
    `${prog}-${yearNum}`
  );

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

      const msg =
        document.getElementById("enrollMessage");

      if (msg) {

        msg.innerText =
          "OFFICIALLY ENROLLED";

        msg.className =
          "enrolled-text";
      }

    } else {

      btn.textContent = "ENROLL";
      btn.className = "btn-enroll";
      btn.onclick = handleEnroll;
    }
  }

  const semRaw =
    (
      data.semester ||
      data.sem ||
      ""
    ).trim();

  const semesterMapDisplay = {

    "1st": "1st Semester",
    "2nd": "2nd Semester",

    "1st Semester": "1st Semester",
    "2nd Semester": "2nd Semester"
  };

  const semDisplay =
    semesterMapDisplay[semRaw] || semRaw;

  const ay =
    (
      data.academicyear ||
      data.academicYear ||
      data.academic_year ||
      ""
    ).trim();

  const period =
    document.getElementById("period");

  if (period) {

    period.innerHTML =
      `<option>${semDisplay} AY ${ay}</option>`;
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
function loadSchedule(
  section,
  academicYear,
  semester
) {

  if (
    !section ||
    !academicYear ||
    !semester
  ) return;

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
   ENROLL FLOW
========================= */
function handleEnroll() {

  document
    .getElementById("modalOverlay")
    ?.classList.remove("hidden");
}


/* =========================
   CONFIRM ENROLL (FIXED FOR OFFICIAL RESPONSE)
========================= */
function confirmEnroll() {

  const id =
    localStorage.getItem("currentStudentId");

  if (!id) {
    alert("No student selected.");
    return;
  }

  fetch(`http://localhost:6969/api/admission/${id}/validate`, {

    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },

    // ✅ ADD THIS BODY (THIS IS THE FIX FOR MIDDLE NAME + ALL FIELDS)
    body: JSON.stringify({
      includeAll: true
    })

  })

  .then(async res => {

    if (res.status === 409) {
      alert("Already enrolled.");
      return null;
    }

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    return res.json();
  })

  .then(data => {

    if (!data) return;

    console.log("ENROLLED OFFICIAL:", data);

    setText("validated", "Yes");

    const msg = document.getElementById("enrollMessage");
    if (msg) {
      msg.innerText = "OFFICIALLY ENROLLED";
      msg.className = "enrolled-text";
    }

    const btn = document.getElementById("actionBtn");
    if (btn) {
      btn.textContent = "COE";
      btn.className = "btn-coe";
      btn.onclick = goToCOE;
    }

    localStorage.setItem("officialStudentId", data.id);

    document
      .getElementById("modalOverlay")
      ?.classList.add("hidden");

    alert("Enrollment successful!");
  })

  .catch(err => {
    console.error("ENROLL ERROR:", err);
    alert("Enrollment failed: " + err.message);
  });
}
/* =========================
   NAVIGATION
========================= */
function goToCOE() {
  window.location.href = "coe.html";
}

function goBack() {
  document.getElementById("modalOverlay")
    ?.classList.add("hidden");
}

function toggleMenu() {
  alert("Menu clicked");
}

function goToEnrollmentPage() {

  localStorage.removeItem("currentStudentId");

  window.location.href =
    "enrollment.html";
}
