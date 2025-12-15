import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

/**
 * 
 * @param {*} app -  express app 
 */

const initWebRoutes = (app) => {
    // router.get(path, handler)
    router.get("/", homeController.handleHelloWorld);
    // router.get("/", (req, res) => {
    //     return res.send("Hello world");
    // })
    router.get("/user", homeController.handleUserPage);

    return app.use("/", router);
}

export default initWebRoutes;