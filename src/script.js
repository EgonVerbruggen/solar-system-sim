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
const universe = document.getElementById('universe');
const viewport = document.getElementById('viewport');
const sun = document.getElementById('sun');
const pathAnimations = [];
let isRunning = true;
function init() {
sun.onclick = () => focusPlanet("Zon", sun);
planetsData.forEach((p, i) => {
const orbitSize = 180 + (i * 95);
const orbitDiv = document.createElement('div');
orbitDiv.className = 'orbit';
orbitDiv.style.width = orbitSize + 'px';
orbitDiv.style.height = orbitSize + 'px';
const path = document.createElement('div');
path.className = 'planet-path';
path.style.height = orbitSize + 'px';
const axisContainer = document.createElement('div');
axisContainer.style.transform = `rotate(${p.axis}deg)`;
axisContainer.className = 'planet-body-container';
const body = document.createElement('div');
body.className = 'planet-body rotating';
body.style.width = p.size + 'px';
body.style.height = p.size + 'px';
body.style.backgroundColor = p.color;
body.style.animationDuration = p.rotSpeed + 's';
body.onclick = (e) => { e.stopPropagation(); focusPlanet(p.name, body); };
const axisLine = document.createElement('div');
axisLine.className = 'axis-line';
body.appendChild(axisLine);
if (p.name === "Saturnus") {
const ring = document.createElement('div');
ring.className = 'saturn-ring';
axisContainer.appendChild(ring);
}
axisContainer.appendChild(body);
path.appendChild(axisContainer);
orbitDiv.appendChild(path);
universe.appendChild(orbitDiv);
const ani = path.animate([
{ transform: 'translateX(-50%) translateY(-50%) rotate(0deg)' },
{ transform: 'translateX(-50%) translateY(-50%) rotate(360deg)' }
], { duration: p.speed * 1000, iterations: Infinity });
pathAnimations.push(ani);
});
}
function focusPlanet(name, element) {
pathAnimations.forEach(a => a.pause());
isRunning = false;
document.getElementById('toggleBtn').innerText = "Start Tijd";
const rect = element.getBoundingClientRect();
const offsetX = (window.innerWidth/2) - (rect.left + rect.width/2);
const offsetY = (window.innerHeight/2) - (rect.top + rect.height/2);
viewport.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(5)`;
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
init();