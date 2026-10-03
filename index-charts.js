// Gráficos con Chart.js
const chartInstances = {};

function renderChartsResumen() {
  if (!DB) return;
  
  const per = periodoActual();
  const c = calcMes(per);
  const gastosMes = DB.expenses.filter(e=>periodo(e.date)===per);
  
  // 1. PASTEL 50/30/20
  const NEC = ["Comida","Transporte","Renta/Vivienda","Servicios","Salud","Familia","Mudanza"];
  const GUSTOS = ["Restaurantes","Suscripciones","Compras","Ocio","Otro"];
  let nec = 0, gustos = 0, futuro = c.totalAhorro;
  gastosMes.forEach(e=>{
    if (e.category === "Deudas") futuro += e.amount;
    else if (NEC.includes(e.category)) nec += e.amount;
    else gustos += e.amount;
  });
  
  const chartRegla = document.getElementById("chart-regla");
  if (chartRegla && c.totalIng > 0) {
    if (chartInstances.regla) chartInstances.regla.destroy();
    chartInstances.regla = new Chart(chartRegla, {
      type: 'doughnut',
      data: {
        labels: ['Necesidades', 'Gustos', 'Ahorro+Deudas'],
        datasets: [{
          data: [nec, gustos, futuro],
          backgroundColor: ['#3498db', '#9b59b6', '#27ae60'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
  
  // 2. BARRAS GASTOS POR CATEGORÍA
  const porCat = {};
  gastosMes.forEach(e=>{ porCat[e.category] = (porCat[e.category]||0)+e.amount; });
  const cats = Object.entries(porCat).sort((a,b)=>b[1]-a[1]).slice(0,8);
  
  const chartCats = document.getElementById("chart-categorias");
  if (chartCats && cats.length > 0) {
    if (chartInstances.cats) chartInstances.cats.destroy();
    chartInstances.cats = new Chart(chartCats, {
      type: 'bar',
      data: {
        labels: cats.map(c=>c[0]),
        datasets: [{
          label: 'Gastos',
          data: cats.map(c=>c[1]),
          backgroundColor: cats.map(c=> CATCOLORS[c[0]] || '#95a5a6'),
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } }
      }
    });
  }
  
  // 3. LÍNEAS PROGRESO ÚLTIMOS 6 MESES
  let datos6m = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const per = d.toISOString().slice(0,7);
    const c = calcMes(per);
    datos6m.push(c.totalGas);
  }
  
  const chartLinea = document.getElementById("chart-progreso");
  if (chartLinea) {
    if (chartInstances.linea) chartInstances.linea.destroy();
    const meses = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      meses.push(d.toLocaleDateString("es", {month:"short"}));
    }
    chartInstances.linea = new Chart(chartLinea, {
      type: 'line',
      data: {
        labels: meses,
        datasets: [{
          label: 'Gastos',
          data: datos6m,
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#e74c3c'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}
