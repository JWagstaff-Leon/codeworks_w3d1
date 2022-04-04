import { RacersController } from "./Controllers/RacersController.js";

class App
{
    racersController = new RacersController(document.getElementById("racers"));
}

window["app"] = new App();