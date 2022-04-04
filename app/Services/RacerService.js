import { appState } from "../AppState.js";
import { Racer } from "../Models/Racer.js";

class RacerService
{
    go(p_racer)
    {
        const moveAmount = (Math.random() / 2) + 0.5;
        p_racer.go(moveAmount);
    }

    reset(p_racer)
    {
        p_racer.set_position(0);
    }

    addRacer(p_name)
    {
        if(appState.racers.find(v => v.name === p_name) == undefined)
        {
            // const newId = generateId();
            appState.racers.push(new Racer(p_name));
        }
    }
}

export const racerService = new RacerService();