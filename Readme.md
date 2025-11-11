# Enviroment

api/.env
```
MYSQL_HOST=...
MYSQL_PORT=...
MYSQL_DATABASE=...
MYSQL_ROOT_PASSWORD=...

EMAIL_ADDRESS=...
EMAIL_PASSWORD=...
EMAIL_RECIPIENT=...

ADMIN_PASSWORD=...
```
<br/>

# Start
## 1. Docker starten
```bash
chmod +x start.sh
chmod +x stop.sh
./start.sh
```

## 2. <a href="http://87.106.40.31:81/nginx/proxy">`IP:81`</a> öffnen
## 3. Anmelden und Email/Passwort ändern!
## 4. neuer Proxy-Host

### Website
* Domain: <b>marloneulberg.de</b> 
* IP/URL: <b>website</b> 
* Port: <b>3000</b> 
* http 
* subdomains ✅ 
* SSL

### API
*  Domain: <b>api.marloneulberg.de</b> 
*  IP/URL: <b>api</b> 
*  Port: <b>8000</b> 
*  http 
*  SSL 
 

##  5. Ports schließen (VPS Konfiguration)
* `81` (nginx UI)
* `22` (SSH)
