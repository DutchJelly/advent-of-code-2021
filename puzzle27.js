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

const insertElements = () => {
    for (let i = 0; i < template.length - 1; i++) {
        const [pair, result] = input.find(([pair]) => {
            return pair.charAt(0) === template.charAt(i) && pair.charAt(1) === template.charAt(i + 1);
        });
        if (pair) {
            template = template.substring(0, i + 1) + result + template.substring(i + 1);
            i++;
        }
    }
}


let steps = 4;
for (let i = 0; i < steps; i++) {
    insertElements();
}

const count = {};
[...template].forEach(x => {
    if (!count[x]) count[x] = 1;
    else count[x]++;
});

const countKeys = Object.keys(count);
let highest = count[countKeys[0]];
let lowest = highest;
Object.keys(count).forEach(x => {
    if (count[x] > highest) highest = count[x];
    if (count[x] < lowest) lowest = count[x];
});

console.log(highest - lowest);