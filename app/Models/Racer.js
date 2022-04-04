export class Racer
{
    constructor(p_name, p_position = 0)
    {
        this.name = p_name;
        this.position = p_position;
    }

    go(p_amount)
    {
        this.position += p_amount;
    }

    set_position(p_position)
    {
        this.position = p_position;
    }

    get Template()
    {
        return `
        <div class="row my-2 bg-dark racetrack">
            <div class="col-12 d-flex align-items-center" style="position: relative">
                <span class="text-light" style="position: relative; left: ${0 + 95 * (this.position / 100)}%;">${this.name[0]}</span>
                <span class="racer-name">${this.name}</span>
            </div>
        </div>
        `;
    }
}