# 🚀 DEPLOY A RAILWAY (Cloud 24/7)

## ¿Qué es Railway?
- App siempre online (no depende de tu laptop)
- Costo: $0-7/mes (muy barato)
- Acceso desde cualquier lugar
- Plaid puede sincronizar automáticamente

## OPCIÓN 1: Usando Railway CLI (MÁS FÁCIL)

### 1. Instalar Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Conectar y Deploy
```bash
cd /Users/thomasbajana/MiDinero
railway login          # Abre navegador para autenticar
railway init           # Pregunta nombre del proyecto
railway up             # DEPLOY! 🚀
```

**¡LISTO!** Railway te da una URL tipo:
```
https://midinero-prod.up.railway.app
```

---

## OPCIÓN 2: Via GitHub (Sin CLI)

### 1. Ir a railway.app
- Crear cuenta
- Click "New Project" → "GitHub"
- Conectar GitHub
- Seleccionar repo `MiDinero`

### 2. Railway auto-detecta:
- `Procfile` → cómo correr la app
- `requirements.txt` → dependencias
- `runtime.txt` → versión Python

### 3. Deploy automático
- Cada `git push` a main = nuevo deploy
- Railway construye y publica automáticamente

---

## DESPUÉS DEL DEPLOY

### Acceder a la app:
```
https://[tu-proyecto].up.railway.app
```

### Configurar dominio personalizado (opcional):
En Railway → Settings → Domains → Agregar dominio

### Sincronización Plaid automática:
Una vez online, Plaid puede sincronizar cada noche sin intervención

---

## VARIABLES DE ENTORNO (Opcional)

Si necesitas cambiar el PIN o puerto, en Railway:
1. Go → Settings → Variables
2. Agregar:
   - `PIN=3012` (o lo que quieras)
   - `PORT=8080` (Railway asigna automáticamente)

---

## COSTO
- **Primeros $5/mes**: Gratis
- Después: ~$7/mes (muy barato para 24/7)
- Puedes pausar en cualquier momento

---

¿PREGUNTAS? Tu app estará online en 5 minutos.
