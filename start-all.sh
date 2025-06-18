concurrently \
  "cd Authentication_Microservice && node authentication-service.js" \
  "cd Club-Service && node index.js" \
  "cd Event-Service && node index.js" \
  "cd Budget-Service && node index.js" \
  "cd Inventory-Service && node index.js" \
  "cd APIGateway_Microservice && node api-gateway.js"
