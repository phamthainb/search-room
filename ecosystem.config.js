module.exports = {
  apps: [
    {
      name: "customer-service",
      script: 'cd customer-service && npm run start:dev',
      watch: './customer-service',
    },
    {
      name: "employee-service",
      script: 'cd employee-service && npm run start:dev',
      watch: './employee-service',
    },
    {
      name: "excel-service",
      script: 'cd excel-service && npm run start:dev',
      watch: './excel-service',
    },
    {
      name: "order-service",
      script: 'cd order-service && npm run start:dev',
      watch: './order-service',
    },
    {
      name: "room-service",
      script: 'cd room-service && npm run start:dev',
      watch: './room-service',
    },
    {
      name: "search-room-service",
      script: 'cd search-room-service && npm run start:dev',
      watch: './search-room-service',
    },
    {
      name: "front-end",
      script: 'cd front-end && npm run start',
      watch: './front-end',
    },
  ],
};

// > check employee auth 
// > get list room 
// > get list order room 
// > get customer order 
// > get employee support





