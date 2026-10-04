const heartRate = document.getElementById('heartRate');
const reps = document.getElementById('reps');
const timer = document.getElementById('timer');
const formStatus = document.getElementById('formStatus');
const exerciseName = document.getElementById('exerciseName');
const coachTip = document.getElementById('coachTip');
const cameraExercise = document.getElementById('cameraExercise');
const cameraTip = document.getElementById('cameraTip');
const cameraHeartRate = document.getElementById('cameraHeartRate');

const demoSection = document.getElementById('demo');
const cameraSection = document.getElementById('arCameraSection');
const cameraVideo = document.getElementById('cameraVideo');
const cameraPlaceholder = document.getElementById('cameraPlaceholder');
const cameraBtn = document.getElementById('cameraBtn');
const stopCameraBtn = document.getElementById('stopCameraBtn');
const cameraStatus = document.getElementById('cameraStatus');

let repCount = 0;
let restSeconds = 30;
let restHandle = null;
let hrHandle = null;
let cameraStream = null;

function renderTimer() {
  const minutes = Math.floor(restSeconds / 60).toString().padStart(2, '0');
  const seconds = (restSeconds % 60).toString().padStart(2, '0');
  timer.textContent = minutes + ':' + seconds;
}

function startDemo() {
  if (!hrHandle) {
    hrHandle = setInterval(() => {
      const value = 118 + Math.floor(Math.random() * 24);
      heartRate.textContent = value;
      cameraHeartRate.textContent = value;
    }, 1200);
  }

  formStatus.textContent = 'Tracking live';
  formStatus.classList.add('good');
}

function openDemo() {
  if (demoSection) {
    demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  startDemo();
}

function resetDemo() {
  repCount = 0;
  reps.textContent = repCount;
  restSeconds = 30;
  renderTimer();
  heartRate.textContent = 128;
  cameraHeartRate.textContent = 128;
  formStatus.textContent = 'Good form';

  if (restHandle) clearInterval(restHandle);
  if (hrHandle) clearInterval(hrHandle);

  restHandle = null;
  hrHandle = null;

  const timerBtn = document.getElementById('timerBtn');
  if (timerBtn) timerBtn.textContent = 'Start rest';
}

async function startCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    cameraStatus.textContent = 'Camera access is not supported in this browser.';
    return;
  }

  try {
    cameraStatus.textContent = 'Requesting camera permission…';

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false
    });

    cameraVideo.srcObject = cameraStream;
    cameraPlaceholder.style.display = 'none';
    cameraBtn.disabled = true;
    stopCameraBtn.disabled = false;
    cameraStatus.textContent = 'Camera active. AI guidance overlay is running.';
    startDemo();
  } catch (error) {
    cameraStatus.textContent = 'Camera permission was not granted. You can enable it in browser site settings.';
  }
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
  }

  cameraVideo.srcObject = null;
  cameraPlaceholder.style.display = 'grid';
  cameraBtn.disabled = false;
  stopCameraBtn.disabled = true;
  cameraStatus.textContent = 'Camera is off.';
}

const startBtn = document.getElementById('startBtn');
const demoBtn = document.getElementById('demoBtn');
const resetBtn = document.getElementById('resetBtn');
const cameraJumpBtn = document.getElementById('cameraJumpBtn');
const repBtn = document.getElementById('repBtn');
const timerBtn = document.getElementById('timerBtn');
const finalDemoBtn = document.getElementById('finalDemoBtn');

if (startBtn) startBtn.addEventListener('click', openDemo);
if (demoBtn) demoBtn.addEventListener('click', openDemo);
if (resetBtn) resetBtn.addEventListener('click', resetDemo);
if (finalDemoBtn) finalDemoBtn.addEventListener('click', openDemo);

if (cameraJumpBtn) {
  cameraJumpBtn.addEventListener('click', () => {
    cameraSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (cameraBtn) cameraBtn.addEventListener('click', startCamera);
if (stopCameraBtn) stopCameraBtn.addEventListener('click', stopCamera);

if (repBtn) {
  repBtn.addEventListener('click', () => {
    repCount = Math.min(12, repCount + 1);
    reps.textContent = repCount;

    if (repCount === 12) {
      formStatus.textContent = 'Set complete';
    } else if (repCount > 0) {
      formStatus.textContent = 'Tracking live';
    }
  });
}

if (timerBtn) {
  timerBtn.addEventListener('click', (event) => {
    if (restHandle) return;

    event.currentTarget.textContent = 'Resting…';

    restHandle = setInterval(() => {
      restSeconds -= 1;
      renderTimer();

      if (restSeconds <= 0) {
        clearInterval(restHandle);
        restHandle = null;
        event.currentTarget.textContent = 'Start rest';
        restSeconds = 30;
        formStatus.textContent = 'Ready for next set';
        setTimeout(renderTimer, 900);
      }
    }, 1000);
  });
}

document.querySelectorAll('.exercise').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.exercise').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const name = button.dataset.exercise;
    const tip = button.dataset.tip;

    exerciseName.textContent = name;
    coachTip.textContent = tip;
    cameraExercise.textContent = name;
    cameraTip.textContent = tip;

    repCount = 0;
    reps.textContent = repCount;
    formStatus.textContent = 'Good form';
  });
});

document.querySelectorAll('.sport-chip').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.sport-chip').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

window.addEventListener('beforeunload', stopCamera);
renderTimer();


/* Installable phone app (PWA) */
let deferredInstallPrompt = null;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installBtn) installBtn.hidden = false;
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installBtn.hidden = true;
  });
}

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  if (installBtn) installBtn.hidden = true;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}


/* Interactive 360-style Altima avatar */
(() => {
  const viewer = document.getElementById('avatarViewer');
  const layerA = document.getElementById('avatarLayerA');
  const layerB = document.getElementById('avatarLayerB');
  const angleLabel = document.getElementById('avatarAngle');
  if (!viewer || !layerA || !layerB) return;

  const frames = [
    { angle: 0, src: 'avatar/front.webp', flip: false },
    { angle: 45, src: 'avatar/quarter.webp', flip: false },
    { angle: 90, src: 'avatar/side.webp', flip: false },
    { angle: 180, src: 'avatar/back.webp', flip: false },
    { angle: 270, src: 'avatar/side.webp', flip: true },
    { angle: 315, src: 'avatar/quarter.webp', flip: true },
    { angle: 360, src: 'avatar/front.webp', flip: false }
  ];

  frames.forEach((frame) => {
    const img = new Image();
    img.src = frame.src;
  });

  let targetAngle = 0;
  let displayAngle = 0;
  let dragging = false;
  let lastX = 0;

  function normalize(value) {
    return ((value % 360) + 360) % 360;
  }

  function setLayer(layer, frame, opacity) {
    if (layer.dataset.src !== frame.src) {
      layer.src = frame.src;
      layer.dataset.src = frame.src;
    }
    layer.style.opacity = opacity;
    layer.style.transform = frame.flip ? 'scaleX(-1)' : 'scaleX(1)';
  }

  function render(angle) {
    const a = normalize(angle);
    let left = frames[0];
    let right = frames[1];

    for (let n = 0; n < frames.length - 1; n += 1) {
      if (a >= frames[n].angle && a <= frames[n + 1].angle) {
        left = frames[n];
        right = frames[n + 1];
        break;
      }
    }

    const range = Math.max(1, right.angle - left.angle);
    const mix = Math.min(1, Math.max(0, (a - left.angle) / range));

    setLayer(layerA, left, 1 - mix);
    setLayer(layerB, right, mix);

    if (angleLabel) angleLabel.textContent = Math.round(a) + '°';
  }

  function animate() {
    const delta = targetAngle - displayAngle;
    displayAngle += delta * 0.14;
    if (Math.abs(delta) < 0.02) displayAngle = targetAngle;
    render(displayAngle);
    requestAnimationFrame(animate);
  }

  viewer.addEventListener('wheel', (event) => {
    event.preventDefault();
    targetAngle += event.deltaY * 0.11;
  }, { passive: false });

  viewer.addEventListener('pointerdown', (event) => {
    dragging = true;
    lastX = event.clientX;
    viewer.classList.add('is-dragging');
    viewer.setPointerCapture?.(event.pointerId);
  });

  viewer.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const dx = event.clientX - lastX;
    lastX = event.clientX;
    targetAngle += dx * 0.55;
  });

  function stopDrag(event) {
    dragging = false;
    viewer.classList.remove('is-dragging');
    if (event?.pointerId != null) viewer.releasePointerCapture?.(event.pointerId);
  }

  viewer.addEventListener('pointerup', stopDrag);
  viewer.addEventListener('pointercancel', stopDrag);
  viewer.addEventListener('pointerleave', (event) => {
    if (dragging && event.buttons === 0) stopDrag(event);
  });

  render(0);
  animate();
})();
