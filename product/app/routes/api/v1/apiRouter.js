var express = require('express'),
    apiRouter = express.Router(),
    usersRoutes = require('./endpoints/users');

apiRouter.get("/users/self", usersRoutes.getSelf);
// apiRouter.get("/students/:id", studentsRoutes.getOne);
// apiRouter.post("/students", studentsRoutes.post);
// apiRouter.put("/students/:id", studentsRoutes.put);
// apiRouter.delete("/students/:id", studentsRoutes.del);

module.exports = apiRouter;