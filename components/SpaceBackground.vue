<template>
  <div class="space-background" ref="spaceRef">
    <div class="nebula"></div>
    <div class="stars-container">
        <canvas ref="canvasRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const spaceRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLCanvasElement>();

interface Star {
  x: number;
  y: number;
  z: number;
  color: string;
}

// 기준: 1440px 데스크탑에서 SPEED=8, COUNT=800, TRAIL=40
// 화면 크기에 비례하여 스케일링 → 체감 속도/밀도 동일
const BASE_WIDTH = 1440;
const BASE_SPEED = 8;
const BASE_COUNT = 800;
const BASE_TRAIL = 40;

const getStarSpeed = () => Math.max(1.5, BASE_SPEED * (w / BASE_WIDTH));
const getStarsCount = () => Math.max(100, Math.round(BASE_COUNT * (w * h) / (BASE_WIDTH * 900)));
const getTrailLength = () => Math.max(15, Math.round(BASE_TRAIL * (w / BASE_WIDTH)));

let STARS_COUNT = 800;
let STAR_SPEED = 8;
let TRAIL_LENGTH = 40;
const STAR_COLORS = [
  'rgba(255, 255, 255, 1)', 
  'rgba(255, 255, 255, 1)', 
  'rgba(224, 247, 250, 1)', 
  'rgba(179, 236, 255, 1)', 
  'rgba(100, 255, 218, 1)'
];

const stars: Star[] = [];
const starSprites: Record<string, HTMLCanvasElement> = {};

let animationFrameId: number;
let ctx: CanvasRenderingContext2D | null = null;
let w: number;
let h: number;
let resizeTimeout: ReturnType<typeof setTimeout>;

// Pre-render star sprites to avoid expensive shadowBlur and arc calls per frame
const createStarSprite = (color: string) => {
  const size = 32; // Sprite size (enough for glow)
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const sCtx = canvas.getContext('2d');
  if (!sCtx) return canvas;

  const center = size / 2;
  const radius = size * 0.2; // Core size

  // Create a customized glow effect using radial gradient
  const gradient = sCtx.createRadialGradient(center, center, radius * 0.2, center, center, size / 2);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.1, color);            // Solid core
  gradient.addColorStop(0.4, color.replace(', 1)', ', 0.3)')); // Fading glow (Color with 0.3 alpha)
  gradient.addColorStop(1, color.replace(', 1)', ', 0)'));     // Fade to transparent

  // sCtx.shadowBlur = 10; // Not strictly needed with gradient, but can add extra softness if performance allows
  // sCtx.shadowColor = color;
  sCtx.fillStyle = gradient; // Use gradient for fill
  sCtx.beginPath();
  sCtx.arc(center, center, size/2, 0, Math.PI * 2);
  sCtx.fill();
  
  return canvas;
};

const initStars = () => {
  // 화면 크기에 따라 파라미터 재계산
  STARS_COUNT = getStarsCount();
  STAR_SPEED = getStarSpeed();
  TRAIL_LENGTH = getTrailLength();

  // Generate sprites for each unique color
  STAR_COLORS.forEach(color => {
    if (!starSprites[color]) {
        starSprites[color] = createStarSprite(color);
    }
  });

  stars.length = 0;
  for (let i = 0; i < STARS_COUNT; i++) {
    stars.push({
      x: Math.random() * w - w / 2,
      y: Math.random() * h - h / 2,
      z: Math.random() * w,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
    });
  }
};

const moveStars = () => {
  for (let i = 0; i < STARS_COUNT; i++) {
    const star = stars[i];
    star.z -= STAR_SPEED;

    if (star.z <= 0) {
      star.z = w;
      star.x = Math.random() * w - w / 2;
      star.y = Math.random() * h - h / 2;
    }
  }
};

const drawStars = () => {
  if (!ctx) return;

  const cx = w / 2;
  const cy = h / 2;

  ctx.clearRect(0, 0, w, h);
  // Remove lineCap round to save a tiny bit, or keep for visual. Keep for visual.
  ctx.lineCap = 'round';
  
  for (let i = 0; i < STARS_COUNT; i++) {
    const star = stars[i];
    
    let z = star.z;
    if (z <= 0) continue;

    const x = (star.x / z) * w;
    const y = (star.y / z) * w;

    // Tail calculation
    const prevZ = z + (STAR_SPEED * TRAIL_LENGTH);
    const prevX = (star.x / prevZ) * w;
    const prevY = (star.y / prevZ) * w;

    // Bounds check with padding for sprite size
    if (x < -w - 20 || x > w + 20 || y < -h - 20 || y > h + 20) continue;

    const startX = prevX + cx;
    const startY = prevY + cy;
    const endX = x + cx;
    const endY = y + cy;

    const dist = Math.abs(endX - startX) + Math.abs(endY - startY);
    // Skip tiny sub-pixel lines
    if (dist < 2) continue;

    const opacity = (1 - (z / w));
    // Limit max thickness to avoid huge blobs near camera
    const thickness = Math.max(0.1, (1 - z / w) * 1.5);

    // 1. Draw Tail
    // Replacing Gradient with solid line + alpha can be faster, but Gradient is requested.
    // We try to optimize: only draw gradient if it's visible enough
    
    const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, star.color);

    ctx.lineWidth = thickness;
    ctx.strokeStyle = gradient;
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // 2. Draw Head using Sprite (Bit blit is much faster than arc+shadowBlur)
    const sprite = starSprites[star.color];
    if (sprite) {
        ctx.globalAlpha = 1.0; // Head keeps full opacity or could scale with Z
        // Scale sprite based on Z (closer = bigger)
        const size = Math.max(2, thickness * 4); // Scaled relative to thickness
        ctx.drawImage(sprite, endX - size/2, endY - size/2, size, size);
    }
  }
  
  ctx.globalAlpha = 1.0;
};

const animate = () => {
  moveStars();
  drawStars();
  animationFrameId = requestAnimationFrame(animate);
};

const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  
  resizeTimeout = setTimeout(() => {
    if (!canvasRef.value || !spaceRef.value) return;
    
    w = spaceRef.value.offsetWidth;
    h = spaceRef.value.offsetHeight;
    
    canvasRef.value.width = w;
    canvasRef.value.height = h;
    
    initStars();
  }, 200);
};

onMounted(() => {
  if (!canvasRef.value || !spaceRef.value) return;
  
  const context = canvasRef.value.getContext('2d');
  if (!context) return;
  ctx = context;

  w = spaceRef.value.offsetWidth;
  h = spaceRef.value.offsetHeight;
  canvasRef.value.width = w;
  canvasRef.value.height = h;
  
  initStars();
  
  window.addEventListener('resize', handleResize);
  animationFrameId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (resizeTimeout) clearTimeout(resizeTimeout);
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.space-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: radial-gradient(circle at center, #0B1021 0%, #000000 100%);
  overflow: hidden;
}

.nebula {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 0% 0%, rgba(88, 28, 135, 0.05) 0%, transparent 40%),
    radial-gradient(circle at 100% 100%, rgba(30, 58, 138, 0.05) 0%, transparent 40%);
  filter: blur(60px);
  pointer-events: none;
}

.stars-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style> 