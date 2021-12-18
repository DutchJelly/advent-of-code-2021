//target area: x=20..30, y=-10..-5

const testInput = {
    xmin: 20,
    xmax: 30,
    ymin: -10,
    ymax: -5
}

const puzzleInput = {
    //target area: x=81..129, y=-150..-108
    xmin: 81,
    xmax: 129,
    ymin: -150,
    ymax: -108
}

const input = puzzleInput;
//y vel decreases every step by 1
//x vel decreases by 1 until 0

const overShotTarget = (probe) => probe.x > input.xmax;
const underShotTarget = (probe) => probe.y < input.ymin && probe.vely <= 0;
const hitTarget = (probe) => probe.x <= input.xmax && probe.x >= input.xmin && probe.y <= input.ymax && probe.y >= input.ymin;

const shoot = (probe, maxYRef = {}) => {
    while (!overShotTarget(probe) && !underShotTarget(probe) && !hitTarget(probe)) {
        if (maxYRef.value === undefined || maxYRef.value < probe.y)
            maxYRef.value = probe.y;
        probe.x += probe.velx;
        probe.y += probe.vely;
        probe.vely--;
        if (probe.velx > 0) probe.velx--;
    }
    return hitTarget(probe);
}

let hittingProbes = [];
let probe = { x: 0, y: 0 };
for (probe.velx = 1; probe.velx <= input.xmax; probe.velx++) {

    //hacky ass hell, sorry :P. I couldn't find how we could determine if the 
    //y value could still increase to not skip the target, so I just used a limit in the for loop.
    for (probe.vely = input.ymin; probe.vely <= 7000; probe.vely++) {
        if (shoot({ ...probe }))
            hittingProbes.push({ ...probe });
    }
}


console.log(hittingProbes.length);


