# Farben für die Ausgabe
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # Keine Farbe

echo -e "${YELLOW}📦 Stopping containers...${NC}"

# Container stoppen
sudo docker compose stop
if [ $? -eq 0 ]; then
    echo -e "${GREEN}📦 Containers stopped successfully${NC}"
else
    echo -e "${RED}❌ Failed to stop containers${NC}"
    exit 1
fi

echo -e "${YELLOW}🐋 Stopping Docker service...${NC}"

# Docker-Dienst stoppen
sudo systemctl stop docker
if ! systemctl is-active --quiet docker; then
    echo -e "${GREEN}🐋 Docker service stopped successfully${NC}"
else
    echo -e "${RED}❌ Failed to stop Docker service${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All done!${NC}"
