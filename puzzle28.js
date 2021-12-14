const testInput = [
    'NNCB',
    'CH -> B',
    'HH -> N',
    'CB -> H',
    'NH -> C',
    'HB -> C',
    'HC -> B',
    'HN -> C',
    'NN -> C',
    'BH -> H',
    'NC -> B',
    'NB -> B',
    'BN -> B',
    'BB -> N',
    'BC -> B',
    'CC -> N',
    'CN -> C',
]

const puzzleInput = [
    'PBFNVFFPCPCPFPHKBONB',
    'KK -> S',
    'FO -> B',
    'PP -> O',
    'HN -> S',
    'CN -> H',
    'VH -> P',
    'BK -> B',
    'VC -> N',
    'CB -> H',
    'OC -> K',
    'BF -> P',
    'FV -> K',
    'SP -> F',
    'OP -> K',
    'SS -> B',
    'NN -> O',
    'CS -> K',
    'CF -> K',
    'FF -> S',
    'SV -> P',
    'OK -> S',
    'CO -> F',
    'OB -> K',
    'BH -> B',
    'HH -> S',
    'VB -> V',
    'KV -> H',
    'CK -> V',
    'NV -> N',
    'SF -> V',
    'PK -> H',
    'PV -> N',
    'FB -> O',
    'BO -> K',
    'FP -> N',
    'OF -> N',
    'FK -> O',
    'VK -> V',
    'NO -> V',
    'NS -> C',
    'KC -> S',
    'VF -> V',
    'BV -> N',
    'CP -> K',
    'PB -> V',
    'CC -> S',
    'NH -> B',
    'CV -> P',
    'SO -> V',
    'NC -> O',
    'HK -> K',
    'SB -> H',
    'OO -> V',
    'HO -> P',
    'PS -> B',
    'BC -> P',
    'KO -> C',
    'KB -> C',
    'VV -> F',
    'BS -> F',
    'HB -> B',
    'KN -> S',
    'FC -> C',
    'SN -> S',
    'HC -> O',
    'HP -> F',
    'BP -> V',
    'ON -> K',
    'BB -> K',
    'KH -> O',
    'NP -> H',
    'KS -> N',
    'SH -> K',
    'VP -> O',
    'PF -> O',
    'HF -> S',
    'BN -> S',
    'NK -> C',
    'FH -> O',
    'CH -> B',
    'KP -> B',
    'FN -> K',
    'OV -> P',
    'VS -> K',
    'OH -> V',
    'PC -> F',
    'VO -> H',
    'SK -> S',
    'PO -> O',
    'KF -> N',
    'NF -> V',
    'NB -> C',
    'PN -> O',
    'FS -> C',
    'PH -> F',
    'VN -> S',
    'OS -> V',
    'HV -> H',
    'HS -> B',
    'SC -> C',
]

let template = puzzleInput[0];
const input = puzzleInput.splice(1).map(x => [x.split(' -> ')[0], x.split(' -> ')[1]]);

const pairs = {};
let first = template.substring(0, 2);
let last = template.slice(-2);
for (let i = 0; i < template.length - 1; i++) {
    const pair = template.charAt(i) + template.charAt(i + 1);
    if (!pairs[pair]) pairs[pair] = 1;
    else pairs[pair]++;
}

const insertElements = () => {
    const newPairs = {};

    //Also keep track of which is the new first and last pair to be able to count.
    let newFirst, newLast;

    Object.keys(pairs).forEach(x => {
        if (!pairs[x]) return;

        const [pair, result] = input.find(([pair]) => pair === x);
        if (!pair) return;
        const amountOfPairs = pairs[x];
        pairs[x] = 0;

        //Add new pairs to a buffer before adding them to pairs so we don't create new pairs from new pairs
        const firstNewPair = pair.charAt(0) + result;
        const secondNewPair = result + pair.charAt(1);

        if (x === first) newFirst = firstNewPair;
        else if (x === last) newLast = secondNewPair;

        if (!newPairs[firstNewPair]) newPairs[firstNewPair] = amountOfPairs;
        else newPairs[firstNewPair] += amountOfPairs;
        if (!newPairs[secondNewPair]) newPairs[secondNewPair] = amountOfPairs;
        else newPairs[secondNewPair] += amountOfPairs;
    });
    if (newFirst)
        first = newFirst;
    if (newLast)
        last = newLast;

    Object.keys(newPairs).forEach(x => {
        if (!pairs[x]) pairs[x] = newPairs[x];
        else pairs[x] += newPairs[x];
    });
}

let steps = 40;
for (let i = 0; i < steps; i++) {
    insertElements();
}

const count = {};
Object.keys(pairs).forEach(x => {
    const firstLetter = x.charAt(0);
    const secondLetter = x.charAt(1);
    if (!count[firstLetter]) count[firstLetter] = pairs[x] / 2;
    else count[firstLetter] += pairs[x] / 2;
    if (!count[secondLetter]) count[secondLetter] = pairs[x] / 2;
    else count[secondLetter] += pairs[x] / 2;
});

//Only first and last chars are not overlapping.
count[first.charAt(0)] += 0.5;
count[last.charAt(1)] += 0.5;

const [lowest, highest] = Object.keys(count).reduce(([lowest, highest], x) => [
    lowest === undefined || count[x] < lowest ? count[x] : lowest,
    highest === undefined || count[x] > highest ? count[x] : highest
], []);

console.log(highest - lowest);