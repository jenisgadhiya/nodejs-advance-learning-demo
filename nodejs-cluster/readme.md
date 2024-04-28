## Understanding Clustering

Clustering in Node.js involves creating multiple worker processes that share the incoming workload. Each worker process runs in its own event loop, utilizing the available CPU cores. The master process manages the worker processes, distributes incoming requests, and handles process failures.

## Benefits of Clustering

- **Improved Performance**: Clustering enables parallel processing of requests across multiple cores, leading to improved performance and responsiveness of the application.
- **Scalability**: Clustering enhances the scalability of Node.js applications by handling concurrent requests in parallel.
- **Fault Tolerance**: If a worker process crashes or becomes unresponsive, the master process can detect the failure and restart the worker process automatically.

## Example Implementation

```
const cluster = require("cluster");
const os = require("os");
const express = require("express");

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();

  app.get("/heavy", (req, res) => {
    let total = 0;
    for (let i = 0; i < 5000000; i++) {
      total++;
    }
    res.send(`Total: ${total}`);
  });

  app.listen(3000, () => {
    console.log(`Worker process ${process.pid} is listening on port 3000`);
  });
}
```

## Load Testing

Load testing assesses an application’s performance under various workloads. Follow these steps to conduct load testing using the loadtest package:

1. **Install the loadtest package**: Run the following command in your project directory to install the loadtest package globally:

   ```bash
   npm install -g loadtest
   ```

2. **Start your Express application**: Run the following command in the terminal to start your Express application:

   ```bash
   node app.js
   ```

3. **Execute load testing**: Open a new terminal window and execute the following command to load test the application:

   ```bash
   loadtest -c 10 --rps 100 -n 100 http://localhost:3000
   ```

   In this example, we simulate 10 concurrent users with a request rate of 100 requests per second to the specified URL.

## Observations

**Without Cluestering: 100 errors/100 requests**

![without cluster](https://github.com/jenisgadhiya/nodejs-advance-learning-demo/blob/main/nodejs-cluster/without_cluster.png)

**With Cluestering: 0 errors/100 requests**

![with cluster](https://github.com/jenisgadhiya/nodejs-advance-learning-demo/blob/main/nodejs-cluster/with_cluster.png)
