const form = document.getElementById("enrollmentForm");
const table = document.getElementById("studentTable");
const assessmentSection = document.getElementById("assessment");
const submitBtn = document.querySelector(".submit-btn");
const subtitle = document.querySelector(".subtitle");

/* =========================================
   HIDE ASSESSMENT ON PAGE LOAD
========================================= */
if (assessmentSection) {
  assessmentSection.style.display = "none";
}

/* =========================================
   LOAD STUDENTS WHEN PAGE LOADS
========================================= */
window.onload = loadStudents;

/* =========================================
   FORM SUBMIT
========================================= */
form.addEventListener("submit", function (e) {

  e.preventDefault();

  const studentData = {

    firstName: document.getElementById("firstName").value.trim(),
    middleName: document.getElementById("middleName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    department: document.getElementById("departmentSelect").value,
    program: document.getElementById("program").value,
    yearLevel: document.getElementById("yearLevel").value,
    section: document.getElementById("section").value,
    semester: document.getElementById("semester").value,
    academicYear: document.getElementById("academicYear").value.trim(),

    sex: "",
    validated: false,
    dateEnrolled: new Date().toLocaleDateString()
  };

  /* =========================================
     SAVE TO DATABASE
  ========================================= */
  fetch("http://localhost:6969/api/studentinfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(studentData)
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to save data");
      return res.json();
    })
    .then(savedStudent => {

      alert("Registration Successful!");

      localStorage.setItem("currentStudentId", savedStudent.id);

      /* =========================================
         LOAD STUDENTS TABLE
      ========================================= */
      loadStudents();

      form.reset();

      /* =========================================
         🔥 ONLY CHANGE (REDIRECT TO ASSESSMENT PAGE)
      ========================================= */
      window.location.href = "assessment.html";

    })
    .catch(err => {
      console.error("ERROR:", err);
      alert("Failed to save data.");
    });

});

/* =========================================
   LOAD STUDENTS TABLE
========================================= */
function loadStudents() {

  fetch("http://localhost:6969/api/studentinfo")
    .then(res => res.json())
    .then(data => {

      if (!table) return;

      table.innerHTML = "";

      data.forEach(student => {
        table.innerHTML += `
          <tr>
            <td>${student.id}</td>
            <td>${student.lastName}</td>
            <td>${student.firstName}</td>
            <td>${student.middleName}</td>
            <td>${student.department}</td>
            <td>${student.program}</td>
            <td>${student.yearLevel}</td>
            <td>${student.section}</td>
            <td>${student.semester}</td>
            <td>${student.academicYear}</td>
          </tr>
        `;
      });

    })
    .catch(err => {
      console.error("Failed to load students:", err);
    });
}

/* =========================================
   LOAD FILTERED SCHEDULE
========================================= */
function loadFilteredSchedule(section, yearLevel, semester) {

  const scheduleTable = document.getElementById("scheduleTable");

  if (!scheduleTable) return;

  const cleanSection = section.replace(/\s/g, "");
  const cleanYear = yearLevel.replace(/\D/g, "");
  const sem = semester.includes("1") ? "1" : "2";

  const tableName = `BSIT${cleanYear}${cleanSection}_${sem}`;

  console.log("Fetching schedule:", tableName);

  fetch(`http://localhost:6969/api/schedule/${tableName}`)
    .then(res => {
      if (!res.ok) throw new Error("Schedule API failed");
      return res.json();
    })
    .then(data => {

      scheduleTable.innerHTML = "";

      if (!data || data.length === 0) {
        scheduleTable.innerHTML =
          `<tr><td colspan="6">No schedule found.</td></tr>`;
        return;
      }

      data.forEach(subject => {
        scheduleTable.innerHTML += `
          <tr>
            <td>${subject.subjectCode}</td>
            <td>${subject.subjectName}</td>
            <td>${subject.days}</td>
            <td>${subject.time}</td>
            <td>${subject.room}</td>
            <td>${subject.instructor}</td>
          </tr>
        `;
      });

    })
    .catch(err => {
      console.error("Failed to load schedule:", err);
    });
}