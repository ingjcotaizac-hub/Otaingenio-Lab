/* OTAINGENIO LAB — TELEMETRY AND METRICS CONTROLLER */

export function initTelemetry() {
  const telemetryTime = document.getElementById('telemetry-time');
  const metricAudited = document.getElementById('metric-audited');
  const telemetryLoad = document.getElementById('telemetry-load');
  const svgPath = document.getElementById('telemetry-path');
  const svgArea = document.getElementById('telemetry-area');

  if (!telemetryTime || !metricAudited || !svgPath) return;

  // 1. Live Timestamp Tick
  setInterval(() => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    telemetryTime.textContent = timeStr;
  }, 1000);

  // 2. Slow incremental audited rooms tick
  let auditedCount = 142390;
  setInterval(() => {
    auditedCount += Math.floor(Math.random() * 2);
    metricAudited.textContent = auditedCount.toLocaleString('es-ES');
  }, 4000);

  // 3. Operational load fluctuator
  setInterval(() => {
    const randomLoad = 80 + Math.floor(Math.random() * 9); // between 80% and 88%
    telemetryLoad.textContent = `${randomLoad}%`;
  }, 7000);

  // 4. Real-time SVG Tension Wave generator
  const points = [];
  const totalPoints = 9;
  const width = 400;
  const height = 120;
  const spacing = width / (totalPoints - 1);

  // Initialize flat line points
  for (let i = 0; i < totalPoints; i++) {
    points.push({ x: i * spacing, y: 60 });
  }

  let offset = 0;

  function animateWave() {
    offset += 0.05;
    
    // Updates coordinates of inner points using trigonometric waves + noise
    for (let i = 1; i < totalPoints - 1; i++) {
      // Create a nice looking stress oscillation: base waves + high freq noise
      const baseSine = Math.sin(i * 1.2 - offset) * 20;
      const noise = (Math.cos(i * 3.7 + offset * 1.5) * 8);
      points[i].y = 65 + baseSine + noise;
    }

    // Smooth bezier curve generator or standard polyline
    let pathD = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < totalPoints; i++) {
      // Control points for cubic bezier interpolation to make it look super fluid
      const cpX1 = points[i-1].x + spacing / 2;
      const cpY1 = points[i-1].y;
      const cpX2 = points[i].x - spacing / 2;
      const cpY2 = points[i].y;
      pathD += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${points[i].x},${points[i].y}`;
    }

    // Set line path
    svgPath.setAttribute('d', pathD);

    // Set gradient fill area below curve
    const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;
    svgArea.setAttribute('d', areaD);

    requestAnimationFrame(animateWave);
  }

  // Trigger telemetry graph animation
  animateWave();
}
