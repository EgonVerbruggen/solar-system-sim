const planetsData = [
{ name: "Mercurius", dist: "57,9", mass: "0,055", diam: "4.879", rot: "58,6 d", orbit: "88 d", moons: 0, temp: "167°C", type: "Rotsachtig", color: "#A5A5A5",
size: 12, speed: 8, axis: 0.03, rotSpeed: 10 },
{ name: "Venus", dist: "108,2", mass: "0,815", diam: "12.104", rot: "243 d", orbit: "224,7 d", moons: 0, temp: "464°C", type: "Rotsachtig (Extreem)", color:
"#E3BB76", size: 20, speed: 15, axis: 177.3, rotSpeed: 20 },
{ name: "Aarde", dist: "149,6", mass: "1", diam: "12.756", rot: "23u 56m", orbit: "365,25 d", moons: 1, temp: "15°C", type: "Terrestrisch", color: "#2271B3",
size: 22, speed: 25, axis: 23.5, rotSpeed: 2 },
{ name: "Mars", dist: "227,9", mass: "0,107", diam: "6.792", rot: "24u 37m", orbit: "687 d", moons: 2, temp: "-65°C", type: "Rotsachtig", color: "#E27B58",
size: 16, speed: 40, axis: 25.2, rotSpeed: 2.1 },
{ name: "Jupiter", dist: "778,6", mass: "317,8", diam: "142.984", rot: "9u 55m", orbit: "11,86 j", moons: 95, temp: "-110°C", type: "Gasreus", color: "#D39C7E",
size: 50, speed: 80, axis: 3.1, rotSpeed: 1 },
{ name: "Saturnus", dist: "1.433,5", mass: "95,2", diam: "120.536", rot: "10u 33m", orbit: "29,45 j", moons: 146, temp: "-140°C", type: "Gasreus", color:
"#C5AB6E", size: 42, speed: 120, axis: 26.7, rotSpeed: 1.1 },
{ name: "Uranus", dist: "2.872,5", mass: "14,5", diam: "51.118", rot: "17u 14m", orbit: "84 j", moons: 28, temp: "-195°C", type: "Ijsreus", color: "#BBE1E4", size:
30, speed: 200, axis: 97.8, rotSpeed: 1.5 },
{ name: "Neptunus", dist: "4.495,1", mass: "17,1", diam: "49.528", rot: "16u 06m", orbit: "164,8 j", moons: 16, temp: "-201°C", type: "Ijsreus", color:
"#6081FF", size: 28, speed: 300, axis: 28.3, rotSpeed: 1.4 }
];
const planetGradients = {
"Mercurius": "radial-gradient(circle at 35% 35%, #d0d0d0, #a0a0a0, #5a5a5a)",
"Venus":     "radial-gradient(circle at 40% 30%, #f5e07a, #e3bb76, #c08530)",
"Aarde":     "radial-gradient(ellipse at 28% 40%, #1e6b30 0%, transparent 40%), radial-gradient(ellipse at 68% 55%, #256b2a 0%, transparent 35%), radial-gradient(circle, #2271b3, #1a5080)",
"Mars":      "radial-gradient(circle at 62% 28%, #7a2010 0%, transparent 40%), radial-gradient(circle, #e27b58, #b84030)",
"Jupiter":   "repeating-linear-gradient(0deg, #c8855a 0px, #b07045 10px, #e8c090 20px, #b88060 30px, #d8956a 40px, #c8855a 50px)",
"Saturnus":  "repeating-linear-gradient(0deg, #d4bc7a 0px, #a88535 10px, #dcc872 21px, #b09548 31px, #d4bc7a 42px)",
"Uranus":    "radial-gradient(circle at 40% 35%, #d0eef5, #bbe1e4, #78c0d0)",
"Neptunus":  "radial-gradient(circle at 42% 32%, #8898ff, #6081ff, #2848c0)"
};
const universe = document.getElementById('universe');
const viewport = document.getElementById('viewport');
const sun = document.getElementById('sun');
const pathAnimations = [];
let isRunning = true;
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
planetsData.forEach((p, i) => {
const orbitSize = 180 + (i * 95);
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
const surfaceDiv = document.createElement('div');
surfaceDiv.className = 'planet-surface';
surfaceDiv.style.background = planetGradients[p.name] || p.color;
surfaceDiv.style.animationDuration = p.rotSpeed + 's';
body.appendChild(surfaceDiv);
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
], { duration: 2500, iterations: Infinity });
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