/* OTAINGENIO LAB — WORKLOAD CREDITS SIMULATOR (MINI SaaS PREVIEW) */

export function initSimulator() {
  const roomTypeSelect = document.getElementById('room-type-select');
  const assigneeSelect = document.getElementById('assignee-select');
  const btnAddRoom = document.getElementById('btn-add-room');
  const btnReset = document.getElementById('btn-reset-sim');
  const overallAlert = document.getElementById('sim-overall-alert');
  const leadForm = document.getElementById('lead-form');

  if (!btnAddRoom || !btnReset) return;

  // Roster state
  const roster = {
    cam1: { name: 'Ana', rooms: [], credits: 0.0, limit: 18 },
    cam2: { name: 'María', rooms: [], credits: 0.0, limit: 18 },
    cam3: { name: 'Laura', rooms: [], credits: 0.0, limit: 18 }
  };

  // Helper room counter database
  let roomIndex = 101;

  function updateStaffUI(id) {
    const staff = roster[id];
    const card = document.getElementById(`staff-${id}`);
    const roomLbl = document.getElementById(`${id}-room-lbl`);
    const creditsLbl = document.getElementById(`${id}-credits-lbl`);
    const bar = document.getElementById(`${id}-bar`);
    const list = document.getElementById(`${id}-rooms-list`);

    if (!card || !roomLbl || !creditsLbl || !bar || !list) return;

    // Room count label
    roomLbl.textContent = `${staff.rooms.length} habs`;
    
    // Credits label
    creditsLbl.textContent = `${staff.credits.toFixed(2)} / ${staff.limit}`;

    // Fill percent
    const percent = Math.min((staff.credits / staff.limit) * 100, 150); // allow up to 150% visually
    bar.style.width = `${Math.min(percent, 100)}%`;

    // Recalculate colors based on credits load
    bar.className = 'meter-bar-fill';
    card.classList.remove('overload');
    creditsLbl.className = 'staff-credits font-mono';

    if (staff.credits > staff.limit) {
      bar.classList.add('bg-red');
      card.classList.add('overload');
      creditsLbl.classList.add('text-red');
    } else if (staff.credits >= 15) {
      bar.classList.add('bg-amber');
      creditsLbl.classList.add('text-amber');
    } else {
      bar.classList.add('bg-green');
      creditsLbl.classList.add('text-green');
    }

    // Render room badges
    list.innerHTML = '';
    staff.rooms.forEach((room, index) => {
      const badge = document.createElement('span');
      badge.className = `room-badge ${room.type}`;
      badge.innerHTML = `
        <span>H-${room.number}</span>
        <span>(${room.credits.toFixed(1)}c)</span>
        <i class="fa-solid fa-times-circle delete-room-btn" style="cursor:pointer; opacity:0.6;" data-staff="${id}" data-index="${index}"></i>
      `;
      
      // Delete single room listener
      badge.querySelector('.delete-room-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        removeRoom(id, index);
      });

      list.appendChild(badge);
    });
  }

  function addRoom() {
    const targetStaffId = assigneeSelect.value;
    const selectedOpt = roomTypeSelect.options[roomTypeSelect.selectedIndex];
    const roomCredits = parseFloat(selectedOpt.getAttribute('data-credits'));
    const roomType = roomTypeSelect.value;

    const newRoom = {
      number: roomIndex++,
      type: roomType,
      credits: roomCredits
    };

    roster[targetStaffId].rooms.push(newRoom);
    roster[targetStaffId].credits += roomCredits;

    updateStaffUI(targetStaffId);
    checkRosterAlerts();
  }

  function removeRoom(staffId, index) {
    const room = roster[staffId].rooms[index];
    roster[staffId].credits -= room.credits;
    roster[staffId].rooms.splice(index, 1);
    
    updateStaffUI(staffId);
    checkRosterAlerts();
  }

  function checkRosterAlerts() {
    let hasOverload = false;
    for (const key in roster) {
      if (roster[key].credits > roster[key].limit) {
        hasOverload = true;
        break;
      }
    }

    if (hasOverload) {
      overallAlert.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-red animate-pulse"></i> FRAGILIDAD OPERATIVA CRÍTICA`;
      overallAlert.className = 'sim-status warning';
    } else {
      overallAlert.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> Cargas equilibradas`;
      overallAlert.className = 'sim-status';
    }
  }

  function resetRoster() {
    roomIndex = 101;
    for (const key in roster) {
      roster[key].rooms = [];
      roster[key].credits = 0.0;
      updateStaffUI(key);
    }
    checkRosterAlerts();
  }

  // Hook event listeners
  btnAddRoom.addEventListener('click', addRoom);
  btnReset.addEventListener('click', resetRoster);

  // Email Lead Capture Mock submit
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = leadForm.querySelector('input[type="email"]').value;
    
    alert(`¡ÉXITO! Enhorabuena.\nHemos enviado la plantilla oficial de repartos en créditos de Otaingenio Lab a: ${email}.\nTransforma hoy la gestión de tu hotel.`);
    leadForm.reset();
  });

  // Prepopulate with a realistic initial workload so the simulator isn't totally blank at first glance
  roster.cam1.rooms.push({ number: 101, type: 'estancia', credits: 1.5 });
  roster.cam1.rooms.push({ number: 102, type: 'estancia', credits: 1.5 });
  roster.cam1.rooms.push({ number: 103, type: 'salida', credits: 3.0 });
  roster.cam1.credits = 6.0;

  roster.cam2.rooms.push({ number: 201, type: 'vip', credits: 4.0 });
  roster.cam2.rooms.push({ number: 202, type: 'salida', credits: 3.0 });
  roster.cam2.credits = 7.0;

  roster.cam3.rooms.push({ number: 301, type: 'repaso', credits: 0.75 });
  roster.cam3.rooms.push({ number: 302, type: 'estancia', credits: 1.5 });
  roster.cam3.credits = 2.25;

  // Trigger initial renders
  updateStaffUI('cam1');
  updateStaffUI('cam2');
  updateStaffUI('cam3');
  checkRosterAlerts();
}
