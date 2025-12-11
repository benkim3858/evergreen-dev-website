<template>
  <div class="space-background" ref="spaceRef">
    <canvas ref="canvasRef" />
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
}

const STARS_COUNT = 400;
const STAR_SPEED = 5; // Increased speed for better visibility
const stars: Star[] = [];
let animationFrameId: number;
let ctx: CanvasRenderingContext2D;
let w: number;
let h: number;

const initStars = () => {
  for (let i = 0; i < STARS_COUNT; i++) {
    stars[i] = {
      x: Math.random() * w - w / 2,
      y: Math.random() * h - h / 2,
      z: Math.random() * w, // Depth
    };
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
  const cx = w / 2;
  const cy = h / 2;

  ctx.fillStyle = 'rgba(10, 25, 47, 0.2)'; // Trail cleanup
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(100, 255, 218, 0.8)';
  ctx.lineWidth = 0.5; // Thinner lines for elegance
  ctx.beginPath();

  for (let i = 0; i < STARS_COUNT; i++) {
    const star = stars[i];
    
    // Calculate current screen position
    // Projection: x_screen = x_world / z * fov (using w as fov)
    const x = (star.x / star.z) * w;
    const y = (star.y / star.z) * w;

    // Calculate previous position for trail (based on speed)
    const prevZ = star.z + STAR_SPEED;
    const prevX = (star.x / prevZ) * w;
    const prevY = (star.y / prevZ) * w;

    // Only draw if the star didn't just wrap around
    if (star.z < w - STAR_SPEED) {
        ctx.moveTo(prevX + cx, prevY + cy);
        ctx.lineTo(x + cx, y + cy);
    }
  }

  ctx.stroke();
};

const animate = () => {
  moveStars();
  drawStars();
  animationFrameId = requestAnimationFrame(animate);
};

const handleResize = () => {
  if (!canvasRef.value || !spaceRef.value) return;
  
  w = spaceRef.value.offsetWidth;
  h = spaceRef.value.offsetHeight;
  
  canvasRef.value.width = w;
  canvasRef.value.height = h;
  
  initStars();
};

onMounted(() => {
  if (!canvasRef.value) return;
  
  ctx = canvasRef.value.getContext('2d')!;
  handleResize();
  
  window.addEventListener('resize', handleResize);
  animationFrameId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
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
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  overflow: hidden;
}

canvas {
  width: 100%;
  height: 100%;
}
</style> 