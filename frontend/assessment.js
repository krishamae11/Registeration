window.onload = function () {
  loadAdmission();
  loadSchedule();
};

function loadAdmission() {
  fetch("http://localhost:6969/api/admission/15") // Using ID 15 consistently
    .then(res => res.json())
    .then(data => {
      console.log("API DATA:", data);

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

      const periodSelect = document.getElementById("period");
      if (periodSelect) {
        // MATCHING THE BACKEND: Using data.academicyear to match your Entity
        const semester = data.sem || "Unknown";
        const year = data.academicyear || "Unknown"; 
        
        const periodText = `${semester} Semester AY ${year}`;
        
        periodSelect.innerHTML = `<option value="${periodText}">${periodText}</option>`;
      }
    })
    .catch(err => console.log("ADMISSION ERROR:", err));
}

function loadSchedule() {
  fetch("http://localhost:6969/api/schedule")
    .then(res => res.json())
    .then(data => {
      let table = document.getElementById("scheduleTable");
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

function goToCOE() {
  window.location.href = "coe.html";
}

function goBack() {
  document.getElementById("modalOverlay")?.classList.add("hidden");
}

/* =========================
   MODAL / ENROLL LOGIC
========================= */

// This now ONLY opens the modal
function handleEnroll() {
  const modal = document.getElementById("modalOverlay");
  if (modal) {
    modal.classList.remove("hidden");
  }
}

// This handles the ACTUAL enrollment logic
function confirmEnroll() {
  const studentId = 15; // Set to 15 to match loadAdmission

  const today = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  fetch(`http://localhost:6969/api/admission/${studentId}/validate`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ 
      validated: true,
      dateEnrolled: today 
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("SUCCESS:", data);

    // Update Validated Status
    const validatedField = document.getElementById("validated");
    if (validatedField) {
      validatedField.innerText = "Yes";
    }

    // Update message
    const message = document.getElementById("enrollMessage");
    if (message) {
      message.innerText = "Student is OFFICIALLY Enrolled.";
    }

    // Change Enroll button to COE button
    const btn = document.getElementById("actionBtn");
    if (btn) {
      btn.textContent = "COE";
      btn.onclick = goToCOE;
    }

    // Hide Modal
    document.getElementById("modalOverlay")?.classList.add("hidden");
    alert("Enrolled successfully on " + today);
  })
  .catch(err => {
    console.error("ENROLL ERROR:", err);
    alert("Failed to enroll student.");
  });
}

// Keeping original functions as requested
function saveData() {
  document.getElementById("modalOverlay")?.classList.remove("hidden");
}

function enrollStudent(id) {
  const studentId = 15;
  fetch(`http://localhost:6969/api/admission/${studentId}/validate`, {
    method: "PUT"
  })
  .then(res => res.json())
  .then(data => {
    console.log("ENROLLED:", data);
    alert("Student enrolled successfully!");
  })
  .catch(err => console.log("ENROLL ERROR:", err));
}
