export class Racer
{
    constructor(p_name)
    {
        this.name = p_name;
        this.position = 0;
        this.wins = 0;
    }

    go(p_amount)
    {
        this.position += p_amount;
    }

    set_position(p_position)
    {
        this.position = p_position;
    }

    get TrackTemplate()
    {
        return `
        <div class="row my-2 bg-dark racetrack">
            <div class="col-12 d-flex align-items-center" style="position: relative">
                <span class="racer-name" style="position: absolute">${this.name}</span>
                <span class="text-light" style="position: relative; left: ${0 + 95 * (this.position / 100)}%;">${this.name[0]}</span>
            </div>
        </div>`;
    }

    get LeaderboardTemplate()
    {
        return `
        <div class="row justify-content-around my-3 fs-4">
            <div class="col-3">${this.name}</div>
            <div class="col-3">${this.wins}</div>
        </div>`;
    }
}