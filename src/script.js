const planetsData = [
{ name: "Mercurius", dist: "57,9", mass: "0,055", diam: "4.879", rot: "58,6 d", orbit: "88 d", moons: 0, temp: "167°C", type: "Rotsachtig", color: "#A5A5A5",
size: 12, speed: 12, axis: 0.03, rotSpeed: 120, displayDist: 200 },
{ name: "Venus", dist: "108,2", mass: "0,815", diam: "12.104", rot: "243 d", orbit: "224,7 d", moons: 0, temp: "464°C", type: "Rotsachtig (Extreem)", color:
"#E3BB76", size: 20, speed: 20, axis: 177.3, rotSpeed: 490, displayDist: 290 },
{ name: "Aarde", dist: "149,6", mass: "1", diam: "12.756", rot: "23u 56m", orbit: "365,25 d", moons: 1, temp: "15°C", type: "Terrestrisch", color: "#2271B3",
size: 22, speed: 25, axis: 23.5, rotSpeed: 2, displayDist: 360 },
{ name: "Mars", dist: "227,9", mass: "0,107", diam: "6.792", rot: "24u 37m", orbit: "687 d", moons: 2, temp: "-65°C", type: "Rotsachtig", color: "#E27B58",
size: 16, speed: 34, axis: 25.2, rotSpeed: 2, displayDist: 440 },
{ name: "Jupiter", dist: "778,6", mass: "317,8", diam: "142.984", rot: "9u 55m", orbit: "11,86 j", moons: 95, temp: "-110°C", type: "Gasreus", color: "#D39C7E",
size: 50, speed: 86, axis: 3.1, rotSpeed: 0.8, displayDist: 640 },
{ name: "Saturnus", dist: "1.433,5", mass: "95,2", diam: "120.536", rot: "10u 33m", orbit: "29,45 j", moons: 146, temp: "-140°C", type: "Gasreus", color:
"#C5AB6E", size: 42, speed: 136, axis: 26.7, rotSpeed: 0.9, displayDist: 760 },
{ name: "Uranus", dist: "2.872,5", mass: "14,5", diam: "51.118", rot: "17u 14m", orbit: "84 j", moons: 28, temp: "-195°C", type: "Ijsreus", color: "#BBE1E4", size:
30, speed: 229, axis: 97.8, rotSpeed: 1.4, displayDist: 860 },
{ name: "Neptunus", dist: "4.495,1", mass: "17,1", diam: "49.528", rot: "16u 06m", orbit: "164,8 j", moons: 16, temp: "-201°C", type: "Ijsreus", color:
"#6081FF", size: 28, speed: 321, axis: 28.3, rotSpeed: 1.4, displayDist: 950 }
];
function vGrad(ctx, h, stops) {
const g = ctx.createLinearGradient(0, 0, 0, h);
stops.forEach(([p, c]) => g.addColorStop(p, c));
return g;
}

function drawPlanetTexture(ctx, name, tW, h) {
switch (name) {
  case 'Aarde': {
    ctx.fillStyle = vGrad(ctx, h, [[0,'#0d3b5e'],[0.15,'#1a62a0'],[0.5,'#2272b5'],[0.85,'#1a62a0'],[1,'#0d3b5e']]);
    ctx.fillRect(0, 0, tW, h);
    [
      [0.12,0.32,0.14,0.19, 0.2, '#2a6832'],
      [0.22,0.63,0.07,0.14, 0.1, '#267830'],
      [0.52,0.28,0.09,0.15,-0.1, '#336e36'],
      [0.56,0.54,0.06,0.16, 0.05,'#2a6030'],
      [0.68,0.25,0.17,0.15, 0.15,'#3a7840'],
      [0.80,0.64,0.07,0.07,-0.2, '#8a6830'],
    ].forEach(([x,y,rx,ry,a,c]) => {
      ctx.save(); ctx.translate(x*tW, y*h); ctx.rotate(a);
      ctx.fillStyle = c; ctx.beginPath();
      ctx.ellipse(0, 0, rx*tW, ry*h, 0, 0, Math.PI*2); ctx.fill();
      ctx.restore();
    });
    ctx.fillStyle = '#c8964088'; ctx.beginPath();
    ctx.ellipse(0.60*tW, 0.43*h, 0.05*tW, 0.07*h, 0.3, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#b8884088'; ctx.beginPath();
    ctx.ellipse(0.35*tW, 0.52*h, 0.04*tW, 0.06*h, -0.2, 0, Math.PI*2); ctx.fill();
    const iceN = ctx.createLinearGradient(0, 0, 0, h*0.18);
    iceN.addColorStop(0, 'rgba(230,240,255,0.95)'); iceN.addColorStop(1, 'rgba(210,230,255,0)');
    ctx.fillStyle = iceN; ctx.fillRect(0, 0, tW, h*0.18);
    const iceS = ctx.createLinearGradient(0, h*0.82, 0, h);
    iceS.addColorStop(0, 'rgba(210,230,255,0)'); iceS.addColorStop(1, 'rgba(230,240,255,0.95)');
    ctx.fillStyle = iceS; ctx.fillRect(0, h*0.82, tW, h*0.18);
    ctx.globalAlpha = 0.22;
    [[0.10,0.34],[0.30,0.22],[0.45,0.58],[0.72,0.42],[0.88,0.30]].forEach(([x,y]) => {
      ctx.fillStyle = 'white'; ctx.beginPath();
      ctx.ellipse(x*tW, y*h, 0.12*tW, 0.022*h, 0.1, 0, Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha = 1;
    break;
  }
  case 'Mars': {
    ctx.fillStyle = vGrad(ctx, h, [[0,'#7a2a18'],[0.25,'#b85030'],[0.5,'#d07050'],[0.75,'#b85030'],[1,'#7a2a18']]);
    ctx.fillRect(0, 0, tW, h);
    [[0.20,0.40,0.15,0.12,'rgba(100,30,10,0.4)'],[0.65,0.55,0.12,0.10,'rgba(120,40,15,0.35)'],
     [0.40,0.65,0.20,0.12,'rgba(200,130,90,0.5)'], [0.80,0.30,0.10,0.08,'rgba(90,20,5,0.45)']
    ].forEach(([x,y,rx,ry,c]) => {
      ctx.fillStyle = c; ctx.beginPath();
      ctx.ellipse(x*tW, y*h, rx*tW, ry*h, 0, 0, Math.PI*2); ctx.fill();
    });
    const mpN = ctx.createLinearGradient(0, 0, 0, h*0.16);
    mpN.addColorStop(0, 'rgba(235,225,215,0.92)'); mpN.addColorStop(1, 'rgba(220,210,200,0)');
    ctx.fillStyle = mpN; ctx.fillRect(0, 0, tW, h*0.16);
    const mpS = ctx.createLinearGradient(0, h*0.84, 0, h);
    mpS.addColorStop(0, 'rgba(220,210,200,0)'); mpS.addColorStop(1, 'rgba(235,225,215,0.92)');
    ctx.fillStyle = mpS; ctx.fillRect(0, h*0.84, tW, h*0.16);
    break;
  }
  case 'Venus': {
    ctx.fillStyle = vGrad(ctx, h, [[0,'#c8a050'],[0.2,'#e8c870'],[0.4,'#f0d880'],[0.6,'#e0c060'],[0.8,'#d4a840'],[1,'#b89030']]);
    ctx.fillRect(0, 0, tW, h);
    [[0.10,0.20,0.20,0.050,'rgba(255,245,180,0.50)'],[0.50,0.40,0.25,0.040,'rgba(200,160,60,0.40)'],
     [0.20,0.60,0.18,0.045,'rgba(255,230,140,0.45)'],[0.70,0.75,0.22,0.040,'rgba(180,130,40,0.40)'],
     [0.35,0.88,0.15,0.035,'rgba(255,220,130,0.40)']
    ].forEach(([x,y,rx,ry,c]) => {
      ctx.fillStyle = c; ctx.beginPath();
      ctx.ellipse(x*tW, y*h, rx*tW, ry*h, 0, 0, Math.PI*2); ctx.fill();
    });
    break;
  }
  case 'Uranus': {
    ctx.fillStyle = vGrad(ctx, h, [[0,'#6ab8c8'],[0.2,'#88ccd8'],[0.5,'#bbe1e4'],[0.8,'#88ccd8'],[1,'#6ab8c8']]);
    ctx.fillRect(0, 0, tW, h);
    [0.20, 0.50, 0.75].forEach(cy => {
      const bg = ctx.createLinearGradient(0, (cy-0.04)*h, 0, (cy+0.04)*h);
      bg.addColorStop(0, 'transparent'); bg.addColorStop(0.5, 'rgba(255,255,255,0.10)'); bg.addColorStop(1, 'transparent');
      ctx.fillStyle = bg; ctx.fillRect(0, (cy-0.04)*h, tW, 0.08*h);
    });
    break;
  }
  case 'Neptunus': {
    ctx.fillStyle = vGrad(ctx, h, [[0,'#1828a0'],[0.3,'#3050c8'],[0.5,'#4060d8'],[0.7,'#3050c8'],[1,'#1828a0']]);
    ctx.fillRect(0, 0, tW, h);
    ctx.fillStyle = 'rgba(10,20,80,0.55)'; ctx.beginPath();
    ctx.ellipse(0.40*tW, 0.40*h, 0.08*tW, 0.07*h, 0, 0, Math.PI*2); ctx.fill();
    [[0.15,0.25],[0.60,0.38],[0.30,0.55],[0.80,0.70]].forEach(([x,y]) => {
      ctx.fillStyle = 'rgba(200,220,255,0.45)'; ctx.beginPath();
      ctx.ellipse(x*tW, y*h, 0.14*tW, 0.020*h, 0.1, 0, Math.PI*2); ctx.fill();
    });
    break;
  }
  case 'Jupiter': {
    ctx.fillStyle = vGrad(ctx, h, [
      [0,'#9c7050'],[0.08,'#d4904c'],[0.16,'#c8a060'],[0.24,'#e0b870'],
      [0.32,'#b87845'],[0.40,'#d4a060'],[0.48,'#c89050'],[0.56,'#e0b870'],
      [0.64,'#c07040'],[0.72,'#d8a060'],[0.80,'#b87845'],[0.88,'#d4904c'],[1,'#9c7050']
    ]);
    ctx.fillRect(0, 0, tW, h);
    ctx.fillStyle = 'rgba(180,50,30,0.75)'; ctx.beginPath();
    ctx.ellipse(0.65*tW, 0.56*h, 0.08*tW, 0.055*h, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(220,90,60,0.50)'; ctx.beginPath();
    ctx.ellipse(0.65*tW, 0.56*h, 0.055*tW, 0.036*h, 0, 0, Math.PI*2); ctx.fill();
    break;
  }
  case 'Saturnus': {
    ctx.fillStyle = vGrad(ctx, h, [
      [0,'#a89050'],[0.1,'#d4bc7a'],[0.2,'#c4a860'],[0.35,'#dcc872'],
      [0.5,'#c8b468'],[0.65,'#dcc872'],[0.8,'#c4a860'],[0.9,'#d4bc7a'],[1,'#a89050']
    ]);
    ctx.fillRect(0, 0, tW, h);
    [0.25, 0.45, 0.65, 0.80].forEach(cy => {
      ctx.fillStyle = 'rgba(255,240,180,0.15)'; ctx.fillRect(0, cy*h - 1, tW, 2);
    });
    break;
  }
  case 'Mercurius': {
    ctx.fillStyle = vGrad(ctx, h, [[0,'#5a5a5a'],[0.5,'#959595'],[1,'#5a5a5a']]);
    ctx.fillRect(0, 0, tW, h);
    [[0.10,0.30,0.060],[0.30,0.60,0.040],[0.50,0.25,0.070],[0.65,0.50,0.050],
     [0.82,0.70,0.040],[0.45,0.72,0.035],[0.18,0.75,0.030],[0.90,0.35,0.045]
    ].forEach(([x,y,r]) => {
      const cx = x*tW, cy = y*h, cr = r*Math.min(tW, h);
      ctx.fillStyle = 'rgba(35,35,35,0.65)'; ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = 'rgba(185,185,185,0.50)'; ctx.lineWidth = cr*0.18;
      ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI*2); ctx.stroke();
    });
    break;
  }
}
// Copy left tile → right tile: pixel-perfect seamless loop
const img = ctx.getImageData(0, 0, tW, h);
ctx.putImageData(img, tW, 0);
}

function createPlanetSurface(name, size) {
const res = 3;
const canvas = document.createElement('canvas');
canvas.width = size * res * 2;
canvas.height = size * res;
canvas.className = 'planet-surface';
drawPlanetTexture(canvas.getContext('2d'), name, size * res, size * res);
return canvas;
}
const universe = document.getElementById('universe');
const viewport = document.getElementById('viewport');
const sun = document.getElementById('sun');
const tooltip = document.getElementById('planet-tooltip');
const pathAnimations = [];
let isRunning = true;
let hoverPausedBy = null;
let vpTx = 0, vpTy = 0, vpScale = 1;
function initStarfield() {
const canvas = document.getElementById('starfield');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
for (let i = 0; i < 320; i++) {
ctx.beginPath();
ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.2 + 0.2, 0, Math.PI * 2);
ctx.fillStyle = `rgba(255,255,255,${(Math.random() * 0.7 + 0.3).toFixed(2)})`;
ctx.fill();
}
}
function init() {
sun.onclick = () => focusPlanet("Zon", sun);
sun.addEventListener('mouseenter', () => {
const r = sun.getBoundingClientRect();
tooltip.textContent = 'De Zon';
tooltip.style.left = (r.left + r.width / 2) + 'px';
tooltip.style.top = (r.top - 24) + 'px';
tooltip.style.opacity = '1';
if (isRunning) { pathAnimations.forEach(a => a.pause()); hoverPausedBy = sun; }
});
sun.addEventListener('mouseleave', () => {
tooltip.style.opacity = '0';
if (hoverPausedBy === sun) {
  if (isRunning) pathAnimations.forEach(a => a.play());
  hoverPausedBy = null;
}
});
const beltCanvas = document.createElement('canvas');
const beltSize = 580;
beltCanvas.width = beltSize; beltCanvas.height = beltSize;
beltCanvas.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;';
const bctx = beltCanvas.getContext('2d');
for (let i = 0; i < 600; i++) {
const angle = Math.random() * Math.PI * 2;
const r = 238 + Math.random() * 34;
bctx.beginPath();
bctx.arc(beltSize/2 + Math.cos(angle) * r, beltSize/2 + Math.sin(angle) * r, Math.random() * 1.2 + 0.3, 0, Math.PI * 2);
bctx.fillStyle = `rgba(190,170,140,${(Math.random() * 0.55 + 0.2).toFixed(2)})`;
bctx.fill();
}
universe.appendChild(beltCanvas);
planetsData.forEach((p) => {
const orbitSize = p.displayDist;
const orbitDiv = document.createElement('div');
orbitDiv.className = 'orbit';
orbitDiv.style.width = orbitSize + 'px';
orbitDiv.style.height = orbitSize + 'px';
orbitDiv.style.top = '50%';
orbitDiv.style.left = '50%';
orbitDiv.style.transform = 'translate(-50%, -50%)';
const path = document.createElement('div');
path.className = 'planet-path';
const axisContainer = document.createElement('div');
axisContainer.style.transform = `rotate(${p.axis}deg)`;
axisContainer.style.marginTop = `-${p.size / 2}px`;
axisContainer.className = 'planet-body-container';
const body = document.createElement('div');
body.className = 'planet-body';
body.style.width = p.size + 'px';
body.style.height = p.size + 'px';
body.onclick = (e) => { e.stopPropagation(); focusPlanet(p.name, body); };
body.addEventListener('mouseenter', () => {
const r = body.getBoundingClientRect();
tooltip.textContent = p.name;
tooltip.style.left = (r.left + r.width / 2) + 'px';
tooltip.style.top = (r.top - 24) + 'px';
tooltip.style.opacity = '1';
if (isRunning) { pathAnimations.forEach(a => a.pause()); hoverPausedBy = body; }
});
body.addEventListener('mouseleave', () => {
tooltip.style.opacity = '0';
if (hoverPausedBy === body) {
  if (isRunning) pathAnimations.forEach(a => a.play());
  hoverPausedBy = null;
}
});
const surface = createPlanetSurface(p.name, p.size);
body.appendChild(surface);
const rotAni = surface.animate([
{ transform: 'translateX(0)' },
{ transform: 'translateX(-50%)' }
], { duration: p.rotSpeed * 1000, iterations: Infinity });
pathAnimations.push(rotAni);
const axisLine = document.createElement('div');
axisLine.className = 'axis-line';
body.appendChild(axisLine);
if (p.name === "Saturnus") {
const ring = document.createElement('div');
ring.className = 'saturn-ring';
axisContainer.appendChild(ring);
}
axisContainer.appendChild(body);
if (p.name === "Aarde") {
const mOrbitSize = 56, mBodySize = 6, mRadius = mOrbitSize / 2;
const moonOrbit = document.createElement('div');
moonOrbit.className = 'orbit';
moonOrbit.style.cssText = `width:${mOrbitSize}px;height:${mOrbitSize}px;top:50%;left:50%;transform:translate(-50%,-50%);z-index:5;`;
const moonArm = document.createElement('div');
moonArm.style.cssText = `position:absolute;top:50%;left:50%;width:0;height:${mRadius}px;margin-top:-${mRadius}px;transform-origin:50% 100%;pointer-events:none;`;
const moonBody = document.createElement('div');
moonBody.style.cssText = `width:${mBodySize}px;height:${mBodySize}px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#e0e0e0,#909090);margin-left:-${mBodySize/2}px;margin-top:-${mBodySize/2}px;`;
moonArm.appendChild(moonBody);
moonOrbit.appendChild(moonArm);
axisContainer.appendChild(moonOrbit);
const moonAni = moonArm.animate([
{ transform: 'rotate(0deg)' },
{ transform: 'rotate(360deg)' }
], { duration: p.speed * 1000 * (27.3 / 365.25), iterations: Infinity });
pathAnimations.push(moonAni);
}
path.appendChild(axisContainer);
orbitDiv.appendChild(path);
universe.appendChild(orbitDiv);
const ani = path.animate([
{ transform: 'rotate(0deg)' },
{ transform: 'rotate(360deg)' }
], { duration: p.speed * 1000, iterations: Infinity });
pathAnimations.push(ani);
});
}
function focusPlanet(name, element) {
pathAnimations.forEach(a => a.pause());
isRunning = false;
document.getElementById('toggleBtn').innerText = "Start Tijd";
const rect = element.getBoundingClientRect();
const s = 5;
const cx = rect.left + rect.width / 2;
const cy = rect.top + rect.height / 2;
const W = window.innerWidth, H = window.innerHeight;
const newTx = -s * (cx - vpTx - W / 2) / vpScale;
const newTy = -s * (cy - vpTy - H / 2) / vpScale;
vpTx = newTx; vpTy = newTy; vpScale = s;
viewport.style.transform = `translate(${newTx}px, ${newTy}px) scale(${s})`;
let data = planetsData.find(x => x.name === name) || { name: "De Zon", dist: "0", mass: "333.000x Aarde", diam: "1.392.700", rot: "~27 d", orbit: "N.v.t.",
moons: 0, temp: "5.500°C", type: "Ster" };
document.getElementById('m-name').innerText = data.name;
document.getElementById('m-dist').innerText = data.dist + " mln km";
document.getElementById('m-mass').innerText = data.mass;
document.getElementById('m-diam').innerText = data.diam + " km";
document.getElementById('m-rot').innerText = data.rot;
document.getElementById('m-orbit').innerText = data.orbit;
document.getElementById('m-moons').innerText = data.moons;
document.getElementById('m-temp').innerText = data.temp;
document.getElementById('m-type').innerText = data.type;
document.getElementById('info-panel').classList.add('active');
document.getElementById('resetBtn').style.display = 'block';
}
document.getElementById('resetBtn').onclick = function() {
vpTx = 0; vpTy = 0; vpScale = 1;
viewport.style.transform = `translate(0,0) scale(1)`;
document.getElementById('info-panel').classList.remove('active');
this.style.display = 'none';
pathAnimations.forEach(a => a.play());
isRunning = true;
document.getElementById('toggleBtn').innerText = "Stop Tijd";
};
document.getElementById('toggleBtn').onclick = function() {
isRunning = !isRunning;
this.innerText = isRunning ? "Stop Tijd" : "Start Tijd";
pathAnimations.forEach(ani => isRunning ? ani.play() : ani.pause());
};
// Snelheidsschuifregelaar
document.getElementById('speedSlider').addEventListener('input', function() {
const rate = parseFloat(this.value);
document.getElementById('speedLabel').innerText = rate.toFixed(1) + '×';
pathAnimations.forEach(a => { a.playbackRate = rate; });
});

// Orbitringen aan/uitzetten
document.getElementById('orbitBtn').addEventListener('click', function() {
const hidden = universe.classList.toggle('hide-orbits');
this.innerText = hidden ? 'Ringen Aan' : 'Ringen Uit';
});

// Muiswiel-zoom
let wheelTimeout;
viewport.addEventListener('wheel', (e) => {
e.preventDefault();
viewport.style.transition = 'none';
clearTimeout(wheelTimeout);
wheelTimeout = setTimeout(() => { viewport.style.transition = ''; }, 200);
const factor = e.deltaY < 0 ? 1.12 : 0.89;
const newScale = Math.min(Math.max(vpScale * factor, 0.25), 12);
const W = window.innerWidth, H = window.innerHeight;
const ratio = newScale / vpScale;
vpTx = e.clientX - W / 2 - ratio * (e.clientX - vpTx - W / 2);
vpTy = e.clientY - H / 2 - ratio * (e.clientY - vpTy - H / 2);
vpScale = newScale;
viewport.style.transform = `translate(${vpTx}px, ${vpTy}px) scale(${vpScale})`;
}, { passive: false });

initStarfield();
init();