window.onload = function () {
  loadAdmission();
  loadSchedule();
};

function loadAdmission() {
  fetch("http://localhost:6969/api/admission/2")
    .then(res => res.json())
    .then(data => {

      console.log("API DATA:", data);

      // always safe check
      const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value ?? "";
      };

      setText("student_id", data.id);
      setText("First_name", `${data.firstName ?? ""} ${data.lastName ?? ""}`);

      setText("course", data.program);          
      setText("department", data.department);
      setText("courseYear", data.yearLevel);   
      setText("sex", data.sex);
      setText("validated", data.validated ? "Yes" : "No");

    })
    .catch(err => console.log("ADMISSION ERROR:", err));
}


function loadSchedule() {
  fetch("http://localhost:6969/api/schedule")
    .then(res => res.json())
    .then(data => {

      let table = document.getElementById("scheduleTable");
      table.innerHTML = "";

      let total = 0; // 👈 ADD THIS

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

        total += Number(s.units || 0); // 👈 ADD THIS
      });

      // show total units
      document.getElementById("totalUnits").innerText = total;

    })
    .catch(err => console.log("SCHEDULE ERROR:", err));
}

/* =========================
   UI FUNCTIONS
========================= */

function toggleMenu() {
  alert("Menu clicked!");
}

function closeTab() {
  alert("Closing tab...");
}

/* =========================
   MODAL / ENROLL
========================= */

function saveData() {
  document.getElementById("modalOverlay")?.classList.remove("hidden");
}

function handleEnroll() {
  document.getElementById("modalOverlay")?.classList.remove("hidden");
}

function confirmEnroll() {
  const btn = document.getElementById("actionBtn");
  const message = document.getElementById("enrollMessage");

  if (message) {
    message.innerText = "Student is OFFICIALLY Enrolled.";
  }

  if (btn) {
    btn.textContent = "COE";
    btn.onclick = goToCOE;
  }

  document.getElementById("modalOverlay")?.classList.add("hidden");
}

function goToCOE() {
  window.location.href = "coe.html";
}

function closeModal() {
  window.location.href = "coe.html";
}

function goBack() {
  document.getElementById("modalOverlay")?.classList.add("hidden");
}
