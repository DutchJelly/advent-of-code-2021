// I forgot to copy the file when I changed it to be the part 2 solution.

const testInput = [
    'start-A',
    'start-b',
    'A-c',
    'A-b',
    'b-d',
    'A-end',
    'b-end',
]

const testInput2 = [
    'dc-end',
    'HN-start',
    'start-kj',
    'dc-start',
    'dc-HN',
    'LN-dc',
    'HN-end',
    'kj-sa',
    'kj-HN',
    'kj-dc',
]

const puzzleInput = [
    'xq-XZ',
    'zo-yr',
    'CT-zo',
    'yr-xq',
    'yr-LD',
    'xq-ra',
    'np-zo',
    'end-LD',
    'np-LD',
    'xq-kq',
    'start-ra',
    'np-kq',
    'LO-end',
    'start-xq',
    'zo-ra',
    'LO-np',
    'XZ-start',
    'zo-kq',
    'LO-yr',
    'kq-XZ',
    'zo-LD',
    'kq-ra',
    'XZ-yr',
    'LD-ws',
    'np-end',
    'kq-yr',
]

const input = puzzleInput.map(x => x.split('-'));
const revPaths = input.map(y => [y[1], y[0]]);
input.push(...revPaths);

const walk = (visited) => {
    const current = visited[visited.length - 1];

    let doubleSmallCaveCount = 0;
    for (let i = 0; i < visited.length - 1; i++) {
        for (let j = i + 1; j < visited.length; j++) {
            if (visited[i] === visited[j] && visited[i].match('[a-z]+')) {
                doubleSmallCaveCount++;
            }
        }
    }
    if (doubleSmallCaveCount > 1) return 0;

    if (current === 'end') {
        // console.log(`walked path: ${visited.join(', ')}`);
        return 1;
    }

    let counter = 0;

    input.forEach(path => {
        // console.log(path[1]);
        if (path[0] === current) {
            // if (path[0] == 'c') console.log('1');
            if (path[1] === 'start')
                return;
            // if (path[0] == 'c') console.log('3');
            counter += walk([...visited, path[1]]);
        }
    })
    return counter;
}

console.log(walk(['start']));