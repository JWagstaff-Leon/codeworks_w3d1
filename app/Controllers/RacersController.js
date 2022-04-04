import { appState } from "../AppState.js";
import { racerService } from "../Services/RacerService.js";

let _raceInterval = null;

function _drawLeaderboard()
{
    const sortedRacers = [...appState.racers].sort((a, b) => {return b.wins - a.wins;});
    let template = "";
    sortedRacers.forEach(v => template += v.LeaderboardTemplate);
    document.getElementById("leaderboard").innerHTML = template;
}

function _drawRacers()
{
    let template = "";
    appState.racers.forEach(v => template += v.TrackTemplate);
    document.getElementById("racers").innerHTML = template;
}

function _moveRacers()
{
    appState.racers.forEach(v => racerService.go(v));
    _drawRacers();
    _checkWinner();
}

function _checkWinner()
{
    let winner = null;

    appState.racers.forEach(v =>
    {
        if(v.position >= 100)
        {
            if(winner === null)
            {
                winner = v;
            }
            else if(winner.position <= v.position)
            {
                winner = v;
            }
        }
    });

    if(winner !== null)
    {
        _stopRace();
        racerService.addWin(winner);
        document.getElementById("winners-circle").innerText = `${winner.name} is the winner!`;
        _drawLeaderboard();
    }
}

function _startRace()
{
    _resetRace();
    document.getElementById("winners-circle").innerText = "";
    _raceInterval = setInterval(_moveRacers, 100);

    const startButton = document.getElementById("start-button");
    startButton.classList.remove("btn-success");
    startButton.classList.remove("btn-warning");
    startButton.classList.add("btn-danger");
    startButton.innerText = "Stop Race";
    startButton.onclick = app.racersController.endRace;
}

function _stopRace()
{
    if(_raceInterval)
    {
        clearInterval(_raceInterval);
        _raceInterval = null;

        const startButton = document.getElementById("start-button");
        startButton.classList.remove("btn-danger");
        startButton.classList.remove("btn-success");
        startButton.classList.add("btn-warning");
        startButton.innerText = "Reset Race";
        startButton.onclick = app.racersController.resetRace;
    }
}

function _resetRace()
{
    appState.racers.forEach(v => racerService.reset(v));
    _drawRacers();

    const startButton = document.getElementById("start-button");
    startButton.classList.remove("btn-danger");
    startButton.classList.remove("btn-warning");
    startButton.classList.add("btn-success");
    startButton.innerText = "Start Race";
    startButton.onclick = app.racersController.startRace;
}

export class RacersController
{
    startRace()
    {
        _startRace();
    }

    stopRace()
    {
        _stopRace();
    }

    resetRace()
    {
        _resetRace();
    }

    endRace()
    {
        _stopRace();
        _resetRace();
    }

    addRacer(p_name)
    {
        if(p_name)
        {
            racerService.addRacer(p_name);
            this.endRace()
            _drawRacers();
            _drawLeaderboard();
        }
    }
}