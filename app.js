/**
 * NeuroNav Interactive Engine
 * 1. Animated Real-time EEG Waves (Canvas)
 * 2. Interactive BCI Wheelchair Simulator with Focus Gating
 * 3. Mobile Navigation & Smooth Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 1. Realistic Real-time EEG Wave Generator
  // ==========================================
  const canvases = document.querySelectorAll('.wave-canvas');
  const waveConfigs = {
    mu: { freq: 0.08, amp: 8, color: '#38bdf8', noise: 2 },
    beta: { freq: 0.16, amp: 6, color: '#a855f7', noise: 3 },
    alpha: { freq: 0.07, amp: 10, color: '#10b981', noise: 1.5 },
    theta: { freq: 0.04, amp: 7, color: '#f59e0b', noise: 2.5 }
  };

  const canvasStates = [];

  canvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const waveType = canvas.getAttribute('data-wave') || 'mu';
    const config = waveConfigs[waveType] || waveConfigs.mu;

    // Resize canvas dynamically to match client width
    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth - 130;
      canvas.height = 28;
    };
    resize();
    window.addEventListener('resize', resize);

    canvasStates.push({
      canvas,
      ctx,
      config,
      offset: Math.random() * 100
    });
  });

  function renderWaves() {
    canvasStates.forEach(item => {
      const { canvas, ctx, config } = item;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = config.color;

      const midY = canvas.height / 2;
      item.offset += 0.08;

      for (let x = 0; x < canvas.width; x++) {
        const sine = Math.sin(x * config.freq + item.offset);
        const secondHarmonic = Math.sin(x * (config.freq * 2.2) + item.offset * 1.5) * 0.4;
        const randomNoise = (Math.random() - 0.5) * config.noise;
        const y = midY + (sine + secondHarmonic) * config.amp + randomNoise;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    });

    requestAnimationFrame(renderWaves);
  }
  requestAnimationFrame(renderWaves);

  // ==========================================
  // 2. Interactive BCI Wheelchair Simulator
  // ==========================================
  let currentDirection = 'MAJU';
  let isFocused = true;

  const dirButtons = document.querySelectorAll('.sim-btn-dir');
  const btnFocusYes = document.getElementById('btnFocusYes');
  const btnFocusNo = document.getElementById('btnFocusNo');
  const triggerPulseBtn = document.getElementById('triggerSignalPulse');

  const wheelchairAvatar = document.getElementById('wheelchairAvatar');
  const userHalo = document.getElementById('userHalo');
  const motionArrow = document.getElementById('motionArrow');
  const unfocusedWarning = document.getElementById('unfocusedWarning');
  const bciDecisionStatus = document.getElementById('bciDecisionStatus');
  const bciConfidence = document.getElementById('bciConfidence');
  const hudStatus = document.getElementById('hudStatus');
  const hudSpeed = document.getElementById('hudSpeed');
  const heroLivePrediction = document.getElementById('heroLivePrediction');

  // Direction selection
  dirButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dirButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDirection = btn.getAttribute('data-action');
      updateSimulatorState();
    });
  });

  // Focus selection
  if (btnFocusYes && btnFocusNo) {
    btnFocusYes.addEventListener('click', () => {
      isFocused = true;
      btnFocusYes.classList.add('active');
      btnFocusNo.classList.remove('active');
      updateSimulatorState();
    });

    btnFocusNo.addEventListener('click', () => {
      isFocused = false;
      btnFocusNo.classList.add('active');
      btnFocusYes.classList.remove('active');
      updateSimulatorState();
    });
  }

  function updateSimulatorState() {
    let rotation = 0;
    let arrowRotate = 0;
    let targetX = 0;
    let targetY = 0;

    switch (currentDirection) {
      case 'MAJU':
        rotation = 0;
        arrowRotate = 0;
        targetY = -40;
        break;
      case 'KANAN':
        rotation = 90;
        arrowRotate = 90;
        targetX = 40;
        break;
      case 'KIRI':
        rotation = -90;
        arrowRotate = -90;
        targetX = -40;
        break;
      case 'DIAM':
        rotation = 0;
        arrowRotate = 0;
        targetX = 0;
        targetY = 0;
        break;
    }

    // Safety Gating Check
    if (isFocused) {
      // Focus condition: Motion allowed
      if (unfocusedWarning) unfocusedWarning.style.display = 'none';
      if (bciDecisionStatus) {
        bciDecisionStatus.textContent = currentDirection === 'DIAM' ? 'STANDBY (DIAM)' : `NAVIGASI AKTIF: ${currentDirection}`;
        bciDecisionStatus.className = 'd-val text-success';
      }
      if (hudStatus) hudStatus.textContent = 'EXECUTING COMMAND';
      if (hudSpeed) hudSpeed.textContent = currentDirection === 'DIAM' ? '0.0 km/h' : '1.4 km/h';
      if (bciConfidence) bciConfidence.textContent = `${(89 + Math.random() * 4).toFixed(1)}%`;

      if (wheelchairAvatar) {
        wheelchairAvatar.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${rotation}deg)`;
      }
      if (userHalo) {
        userHalo.style.borderColor = 'rgba(56, 189, 248, 0.7)';
      }
      if (motionArrow) {
        motionArrow.style.display = currentDirection === 'DIAM' ? 'none' : 'block';
        motionArrow.style.color = '#38bdf8';
      }

      // Update hero preview as well
      if (heroLivePrediction) {
        heroLivePrediction.innerHTML = `
          <span class="badge-fokus focus-yes"><i class="fa-solid fa-bullseye"></i> FOKUS (Tinggi)</span>
          <span class="badge-gerak"><i class="fa-solid fa-compass"></i> ${currentDirection}</span>
        `;
      }
    } else {
      // Unfocused condition: SAFETY LOCK TRIGGERED
      if (unfocusedWarning) unfocusedWarning.style.display = 'flex';
      if (bciDecisionStatus) {
        bciDecisionStatus.textContent = 'GATING LOCK: DITOLAK (TIDAK FOKUS)';
        bciDecisionStatus.className = 'd-val text-danger';
      }
      if (hudStatus) hudStatus.textContent = 'SAFETY GATED (LOCKED)';
      if (hudSpeed) hudSpeed.textContent = '0.0 km/h (Emergency Stop)';
      if (bciConfidence) bciConfidence.textContent = 'Defisit Atensi (Alfa Drop)';

      if (wheelchairAvatar) {
        // Return to center safely
        wheelchairAvatar.style.transform = `translate(0px, 0px) rotate(0deg)`;
      }
      if (userHalo) {
        userHalo.style.borderColor = 'rgba(239, 68, 68, 0.8)';
      }
      if (motionArrow) {
        motionArrow.style.display = 'none';
      }

      // Update hero preview
      if (heroLivePrediction) {
        heroLivePrediction.innerHTML = `
          <span class="badge-fokus focus-no"><i class="fa-solid fa-triangle-exclamation"></i> TIDAK FOKUS</span>
          <span class="badge-gerak" style="border-color:#ef4444; color:#f87171;"><i class="fa-solid fa-lock"></i> LOCK: ${currentDirection}</span>
        `;
      }
    }
  }

  // Trigger Signal Pulse button
  if (triggerPulseBtn) {
    triggerPulseBtn.addEventListener('click', () => {
      const originalText = triggerPulseBtn.innerHTML;
      triggerPulseBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menangkap Sinyal 2 Detik...';
      triggerPulseBtn.disabled = true;

      setTimeout(() => {
        updateSimulatorState();
        triggerPulseBtn.innerHTML = originalText;
        triggerPulseBtn.disabled = false;
      }, 400); // 0.4s matches the actual real-time inference latency
    });
  }

  // Initialize
  updateSimulatorState();
});
