GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}🐋 Starting Docker service...${NC}"

# Docker starten
sudo systemctl start docker
if systemctl is-active --quiet docker; then
    echo -e "${GREEN}🐋 Docker is running${NC}"
else
    echo -e "${RED}❌ Failed to start Docker${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Building images (if needed) and starting containers...${NC}"
# alte Container löschen
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
# Compose Container starten
sudo docker compose up -d --build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}📦 Containers are up and running${NC}"
else
    echo -e "${RED}❌ Failed to start containers${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All done!${NC}"
