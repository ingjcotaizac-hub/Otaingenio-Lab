/* OTAINGENIO LAB — CPOR AND LEAKAGE CALCULATOR CONTROLLER */

export function initCalculator() {
  // Input Sliders
  const slideRooms = document.getElementById('slide-rooms');
  const slideOccupancy = document.getElementById('slide-occupancy');
  const slideWage = document.getElementById('slide-wage');
  const slideTimeTarget = document.getElementById('slide-time-target');
  const slideTimeReal = document.getElementById('slide-time-real');

  // Input value badges
  const valRooms = document.getElementById('val-rooms');
  const valOccupancy = document.getElementById('val-occupancy');
  const valWage = document.getElementById('val-wage');
  const valTimeTarget = document.getElementById('val-time-target');
  const valTimeReal = document.getElementById('val-time-real');

  // Output Tiles
  const resCporTarget = document.getElementById('res-cpor-target');
  const resCporReal = document.getElementById('res-cpor-real');
  const resCporDiff = document.getElementById('res-cpor-diff');
  const resFugaAnual = document.getElementById('res-fuga-anual');
  const resFugaBar = document.getElementById('res-fuga-bar');
  const resFugaDesc = document.getElementById('res-fuga-desc');

  if (!slideRooms || !resCporTarget) return;

  function calculateCPOR() {
    // 1. Fetch values
    const rooms = parseInt(slideRooms.value);
    const occupancy = parseInt(slideOccupancy.value) / 100;
    const wage = parseFloat(slideWage.value);
    const timeTarget = parseInt(slideTimeTarget.value);
    const timeReal = parseInt(slideTimeReal.value);

    // Update slider badges
    valRooms.textContent = rooms;
    valOccupancy.textContent = `${slideOccupancy.value}%`;
    valWage.textContent = `${wage.toFixed(2)}€`;
    valTimeTarget.textContent = `${timeTarget} min`;
    valTimeReal.textContent = `${timeReal} min`;

    // Highlight real time slider if real is higher than planned
    if (timeReal > timeTarget) {
      valTimeReal.className = 'slider-val font-mono text-amber';
    } else {
      valTimeReal.className = 'slider-val font-mono text-green';
    }

    // 2. Mathematical model calculations
    const cporTarget = wage * (timeTarget / 60);
    const cporReal = wage * (timeReal / 60);
    const diff = cporReal - cporTarget;
    
    // Percent deviation
    const deviation = cporTarget > 0 ? (diff / cporTarget) * 100 : 0;
    
    // Daily occupied rooms
    const dailyOccupied = rooms * occupancy;
    
    // Annual occupied rooms
    const annualOccupied = dailyOccupied * 365;

    // Annual loss calculation (only if there is active leakage)
    const annualLoss = diff > 0 ? diff * annualOccupied : 0;

    // 3. Render Outputs
    resCporTarget.textContent = `${cporTarget.toFixed(2)}€`;
    resCporReal.textContent = `${cporReal.toFixed(2)}€`;

    // Render Difference Badge
    if (diff > 0) {
      resCporDiff.textContent = `+${diff.toFixed(2)}€ (+${deviation.toFixed(1)}%)`;
      resCporDiff.className = 'tile-sub text-amber font-mono';
      resCporReal.className = 'tile-val font-mono text-amber';
    } else if (diff < 0) {
      resCporDiff.textContent = `${diff.toFixed(2)}€ (${deviation.toFixed(1)}%)`;
      resCporDiff.className = 'tile-sub text-green font-mono';
      resCporReal.className = 'tile-val font-mono text-green';
    } else {
      resCporDiff.textContent = `0.00€ (0.0% Desviación)`;
      resCporDiff.className = 'tile-sub text-muted font-mono';
      resCporReal.className = 'tile-val font-mono';
    }

    // Render Annual Loss Amount
    resFugaAnual.textContent = `${Math.round(annualLoss).toLocaleString('es-ES')}€`;

    // Render Progress Bar fill percentage (cap at 100%)
    const fillPercent = diff > 0 ? Math.min(deviation, 100) : 0;
    resFugaBar.style.width = `${fillPercent}%`;

    // Color progress bar accordingly
    resFugaBar.className = 'fuga-bar-fill';
    if (deviation > 25) {
      resFugaBar.classList.add('bg-red');
      resFugaAnual.className = 'fuga-amount font-mono text-red animate-pulse';
    } else if (deviation > 0) {
      resFugaBar.classList.add('bg-amber');
      resFugaAnual.className = 'fuga-amount font-mono text-amber';
    } else {
      resFugaBar.classList.add('bg-green');
      resFugaAnual.className = 'fuga-amount font-mono text-green';
    }

    // Render customized operational analysis description text
    if (annualLoss > 40000) {
      const ebitdaImpact = (annualLoss / (rooms * 20000)) * 100; // Simulated EBITDA leakage ratio
      resFugaDesc.innerHTML = `
        Esta fuga representa un impacto crítico de **${ebitdaImpact.toFixed(1)}% en tu margen de EBITDA**. Se pierden sumas masivas en tiempos muertos no auditados, traslados ineficientes y fragilidad de procesos en el departamento de pisos.
      `;
    } else if (annualLoss > 10000) {
      // equivalent floor managers at annual cost of 24k gross
      const equivalentFTE = annualLoss / 24000;
      resFugaDesc.innerHTML = `
        Un goteo financiero constante. Equivale al coste bruto anual de **${equivalentFTE.toFixed(1)} gobernantes** o subgobernantas a jornada completa que se diluye en ineficiencias de planificación diaria.
      `;
    } else if (annualLoss > 0) {
      resFugaDesc.innerHTML = `
        Tu operativa está relativamente optimizada, pero aún existe un margen de mejora. Implementando la metodología LQA de Otaingenio Lab puedes asegurar hasta **${Math.round(annualLoss).toLocaleString('es-ES')}€ de ahorro** neto directo.
      `;
    } else {
      resFugaDesc.innerHTML = `
        **¡Enhorabuena!** Tu hotel opera en el nivel nominal óptimo de eficiencia. Mantén esta excelencia implementando auditorías periódicas de calidad LQA para evitar desviaciones futuras.
      `;
    }
  }

  // Hook change listeners to sliders
  const sliders = [slideRooms, slideOccupancy, slideWage, slideTimeTarget, slideTimeReal];
  sliders.forEach(slider => {
    slider.addEventListener('input', calculateCPOR);
  });

  // Run initial calculations on load
  calculateCPOR();
}
