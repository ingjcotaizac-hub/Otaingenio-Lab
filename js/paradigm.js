/* OTAINGENIO LAB — PARADIGM COMPARISON WIDGET CONTROLLER */

export function initParadigm() {
  const btnOld = document.getElementById('btn-paradigm-old');
  const btnNew = document.getElementById('btn-paradigm-new');
  const modeTitle = document.getElementById('paradigm-mode-title');
  const modeStatus = document.getElementById('paradigm-mode-status');
  const barsContainer = document.getElementById('roster-bars-container');
  const deviationVal = document.getElementById('roster-deviation');
  const fatigueVal = document.getElementById('roster-fatigue');

  if (!btnOld || !barsContainer) return;

  const dataOld = [
    { name: 'Camarera 1', label: '18 Habitaciones (Todas Estancia)', credits: 27, percent: 150, color: 'var(--color-amber)' },
    { name: 'Camarera 2', label: '18 Habitaciones (Salidas y VIPs)', credits: 51, percent: 283, color: 'var(--color-red)' },
    { name: 'Camarera 3', label: '18 Habitaciones (Mayoría Repaso)', credits: 22.5, percent: 125, color: 'var(--color-amber)' }
  ];

  const dataNew = [
    { name: 'Camarera 1', label: '12 Habitaciones Calibradas', credits: 18, percent: 100, color: 'var(--color-green)' },
    { name: 'Camarera 2', label: '6 Habitaciones Calibradas', credits: 18, percent: 100, color: 'var(--color-green)' },
    { name: 'Camarera 3', label: '10 Habitaciones Calibradas', credits: 18, percent: 100, color: 'var(--color-green)' }
  ];

  function renderRoster(isNew) {
    const list = isNew ? dataNew : dataOld;
    
    // Clear and draw rows
    barsContainer.innerHTML = '';
    
    list.forEach(item => {
      const row = document.createElement('div');
      row.className = 'roster-bar-row';
      
      row.innerHTML = `
        <span class="row-label font-mono">${item.name}</span>
        <div class="row-bar-container" title="${item.label}">
          <div class="row-bar-fill" style="width: 0%; background-color: ${item.color}"></div>
        </div>
        <span class="row-bar-val font-mono" style="color: ${item.color}">${item.credits} Cr.</span>
      `;
      
      barsContainer.appendChild(row);
      
      // Animate growth with slight offset to feel alive
      setTimeout(() => {
        const fill = row.querySelector('.row-bar-fill');
        if (fill) {
          // Cap the visual bar width to 100% of container so it doesn't break CSS bounds, but display the actual values
          const widthVal = Math.min(item.percent, 100);
          fill.style.width = `${widthVal}%`;
        }
      }, 50);
    });

    // Update summaries
    if (isNew) {
      modeTitle.textContent = 'Modelo Calibrado (Créditos de Esfuerzo Equitativos)';
      modeStatus.textContent = 'SISTEMA ESTABLE Y SOSTENIBLE';
      modeStatus.className = 'info-status font-mono text-green';
      deviationVal.textContent = '±0%';
      deviationVal.className = 'text-green';
      fatigueVal.textContent = 'NINGUNO';
      fatigueVal.className = 'text-green';
    } else {
      modeTitle.textContent = 'Modelo Clásico (18 Habitaciones Fijas por Trabajador)';
      modeStatus.textContent = 'SOBRECARGA Y RIESGO SEVERO';
      modeStatus.className = 'info-status font-mono text-red';
      deviationVal.textContent = '±45%';
      deviationVal.className = 'text-red';
      fatigueVal.textContent = 'SÍ (Cam. 1 & 2)';
      fatigueVal.className = 'text-red';
    }
  }

  // Active listeners
  btnOld.addEventListener('click', () => {
    btnOld.classList.add('active');
    btnNew.classList.remove('active');
    renderRoster(false);
  });

  btnNew.addEventListener('click', () => {
    btnNew.classList.add('active');
    btnOld.classList.remove('active');
    renderRoster(true);
  });

  // Initial draw
  renderRoster(false);
}
