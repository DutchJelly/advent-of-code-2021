

const testInput = [
    [5, 4, 8, 3, 1, 4, 3, 2, 2, 3,],
    [2, 7, 4, 5, 8, 5, 4, 7, 1, 1,],
    [5, 2, 6, 4, 5, 5, 6, 1, 7, 3,],
    [6, 1, 4, 1, 3, 3, 6, 1, 4, 6,],
    [6, 3, 5, 7, 3, 8, 5, 4, 7, 8,],
    [4, 1, 6, 7, 5, 2, 4, 6, 4, 5,],
    [2, 1, 7, 6, 8, 4, 1, 7, 2, 1,],
    [6, 8, 8, 2, 8, 8, 1, 1, 3, 4,],
    [4, 8, 4, 6, 8, 4, 8, 5, 5, 4,],
    [5, 2, 8, 3, 7, 5, 1, 5, 2, 6,],
]

const testInput2 = [
    [1, 1, 1, 1, 1,],
    [1, 9, 9, 9, 1,],
    [1, 9, 1, 9, 1,],
    [1, 9, 9, 9, 1,],
    [1, 1, 1, 1, 1,],
]

const puzzleInput = [
    [8, 8, 2, 6, 8, 7, 6, 7, 1, 4,],
    [3, 1, 2, 7, 7, 8, 7, 2, 3, 8,],
    [8, 1, 8, 2, 8, 5, 2, 8, 6, 1,],
    [4, 6, 5, 5, 3, 7, 1, 4, 8, 3,],
    [3, 8, 6, 4, 5, 5, 1, 3, 6, 5,],
    [1, 8, 7, 8, 2, 5, 3, 5, 8, 1,],
    [8, 3, 1, 7, 4, 2, 2, 4, 3, 7,],
    [1, 5, 1, 7, 2, 5, 4, 2, 6, 6,],
    [2, 6, 2, 1, 1, 2, 4, 7, 6, 1,],
    [3, 4, 7, 3, 3, 3, 1, 5, 1, 4,],
]

let input = puzzleInput;

const increase = (i, j) => {
    if (i < 0 || j < 0 || i >= input.length || j >= input[0].length || input[i][j] === -1)
        return 0;

    if (input[i][j] === 9) {
        input[i][j] = -1;
        return 1 + increase(i - 1, j) + increase(i + 1, j) + increase(i, j - 1) + increase(i, j + 1)
            + increase(i - 1, j - 1) + increase(i + 1, j - 1) + increase(i - 1, j + 1) + increase(i + 1, j + 1);
    }

    input[i][j]++;
    return 0;
}

for (let c = 0; ; c++) {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            increase(i, j);
        }
    }

    if (!input.find(x => x.find(y => y !== -1))) {
        console.log(`All flash at ${c + 1}`);
        return;
    }

    //clear flashes
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] === -1) input[i][j] = 0;
        }
    }
}