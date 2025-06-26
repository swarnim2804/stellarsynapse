export default function startStarfield(onComplete) {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.style.display = 'block';

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = Array.from({ length: 300 }, () => ({
    x: Math.random() * canvas.width - canvas.width / 2,
    y: Math.random() * canvas.height - canvas.height / 2,
    z: Math.random() * canvas.width
  }));

  let frameCount = 0;

  function animate() {
    frameCount++;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      s.z -= 3;
      if (s.z <= 0) s.z = canvas.width;
      const px = (s.x / s.z) * (canvas.width / 2) + canvas.width / 2;
      const py = (s.y / s.z) * (canvas.width / 2) + canvas.height / 2;
      const size = (1 - s.z / canvas.width) * 3;
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(px, py, size, 0, 2 * Math.PI);
      ctx.fill();
    });

    if (frameCount < 150) {
      requestAnimationFrame(animate);
    } else {
      if (onComplete) onComplete();
    }
  }

  animate();
}
