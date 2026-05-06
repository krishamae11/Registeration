window.onload = function () {
  loadAdmission();
  loadSchedule();
};

function loadAdmission() {
  fetch("http://localhost:6969/api/admission/21") // MAROBAYYYYYYYYYYYYY IGDIIIIIIIIIIII
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

            // ✅ CONDITION
      const btn = document.getElementById("actionBtn");

      if (data.validated === true) {
        btn.textContent = "COE";
        btn.className = "btn-coe";
        btn.onclick = goToCOE;
      } else {
        btn.textContent = "Enroll";
        btn.className = "btn-enroll";
        btn.onclick = handleEnroll;
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

/// This handles the ACTUAL enrollment logic
function confirmEnroll() {
  const studentId = 21; // MARIBAAAYYYYYYYYYYYYYYYYYYYYYYYYYYYY IGDIIIIIIIIII

  const today = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  // Sending the PUT request with the date in the body
  fetch(`http://localhost:6969/api/official-student/${studentId}/validate`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      validated: true,
      dateEnrolled: today // Matches your Controller's studentData.getDateEnrolled()
    })
  })
  .then(data => {
    console.log("SUCCESS - Data saved to both tables:", data);

    // 1. Update UI: Validated Status
    const validatedField = document.getElementById("validated");
    if (validatedField) {
      validatedField.innerText = "Yes";
    }

    // 2. Update UI: Message
    const message = document.getElementById("enrollMessage");
    if (message) {
      message.innerText = "Student is OFFICIALLY Enrolled.";
      message.style.color = "green"; // Added a little visual feedback
    }

    // 3. Update UI: Change Enroll button to COE button
    const btn = document.getElementById("actionBtn");
    if (btn) {
      btn.textContent = "COE";
      btn.className = "btn-coe"; // You can style this in CSS
      btn.onclick = goToCOE; 
    }

    // 4. Close the Modal
    document.getElementById("modalOverlay")?.classList.add("hidden");
    
  })
  .catch(err => {
    console.error("ENROLL ERROR:", err);
    alert("Failed to enroll student. Make sure the backend is running!");
  });
}

// Opens the confirmation modal
function saveData() {
  document.getElementById("modalOverlay")?.classList.remove("hidden");
}

// Helper to redirect to COE page
function goToCOE() {
  window.location.href = "coe.html";
}
