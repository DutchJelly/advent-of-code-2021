/**
 * I use 'function' here because the parsers sometimes have to call eachother back which isn't possible
 * without forward declarations. 'function' is available anywhere within the scope.
 */


function valueParser(packet, binaryPacket, readHead) {
    if (readHead >= binaryPacket.length) return readHead;

    let groupPrefix;
    let value = '';
    do {
        groupPrefix = binaryPacket.charAt(readHead++);
        value += binaryPacket.substring(readHead, readHead += 4);
    } while (groupPrefix !== '0');
    packet.value = value;
    packet.base10Value = parseInt(value, 2);
    return readHead;
}

function operatorParser(packet, binaryPacket, readHead) {
    if (readHead >= binaryPacket.length) return readHead;

    packet.lengthType = binaryPacket[readHead++];
    packet.subPackets = [];
    if (packet.lengthType === '0') {
        packet.subPacketBitLength = parseInt(binaryPacket.substring(readHead, readHead += 15), 2);
        let readHeadStart = readHead;
        //parse sub packets until we reach the subpacketbitlength
        while (readHead - readHeadStart < packet.subPacketBitLength) {
            let subPacket = {};
            readHead = parsePacket(subPacket, binaryPacket, readHead);
            packet.subPackets.push(subPacket);
        }
        if (readHead - readHeadStart !== packet.subPacketBitLength) {
            console.error('invalid state: readhead went past subpacket bit length');
            return -1;
        }
    } else {
        packet.subPacketCount = parseInt(binaryPacket.substring(readHead, readHead += 11), 2);
        //parse subPacketCount sub packets
        for (let i = 0; i < packet.subPacketCount; i++) {
            let subPacket = {};
            readHead = parsePacket(subPacket, binaryPacket, readHead);
            packet.subPackets.push(subPacket);
        }
    }
    return readHead;
}

function parsePacket(packet, binaryPacket, readHead) {
    if (readHead >= binaryPacket.length) return readHead;

    packet.version = binaryPacket.substring(readHead, readHead += 3);
    packet.type = binaryPacket.substring(readHead, readHead += 3);
    if (packet.type === '100') return valueParser(packet, binaryPacket, readHead);
    return operatorParser(packet, binaryPacket, readHead);
}

function getBinaryRepresentation(hex) {
    return [...hex].map(x => {
        const binary = parseInt(x, 16).toString(2);
        return '0000'.substring(0, 4 - binary.length) + binary;
    }).join('');
}

const input = '420D50000B318100415919B24E72D6509AE67F87195A3CCC518CC01197D538C3E00BC9A349A09802D258CC16FC016100660DC4283200087C6485F1C8C015A00A5A5FB19C363F2FD8CE1B1B99DE81D00C9D3002100B58002AB5400D50038008DA2020A9C00F300248065A4016B4C00810028003D9600CA4C0084007B8400A0002AA6F68440274080331D20C4300004323CC32830200D42A85D1BE4F1C1440072E4630F2CCD624206008CC5B3E3AB00580010E8710862F0803D06E10C65000946442A631EC2EC30926A600D2A583653BE2D98BFE3820975787C600A680252AC9354FFE8CD23BE1E180253548D057002429794BD4759794BD4709AEDAFF0530043003511006E24C4685A00087C428811EE7FD8BBC1805D28C73C93262526CB36AC600DCB9649334A23900AA9257963FEF17D8028200DC608A71B80010A8D50C23E9802B37AA40EA801CD96EDA25B39593BB002A33F72D9AD959802525BCD6D36CC00D580010A86D1761F080311AE32C73500224E3BCD6D0AE5600024F92F654E5F6132B49979802129DC6593401591389CA62A4840101C9064A34499E4A1B180276008CDEFA0D37BE834F6F11B13900923E008CF6611BC65BCB2CB46B3A779D4C998A848DED30F0014288010A8451062B980311C21BC7C20042A2846782A400834916CFA5B8013374F6A33973C532F071000B565F47F15A526273BB129B6D9985680680111C728FD339BDBD8F03980230A6C0119774999A09001093E34600A60052B2B1D7EF60C958EBF7B074D7AF4928CD6BA5A40208E002F935E855AE68EE56F3ED271E6B44460084AB55002572F3289B78600A6647D1E5F6871BE5E598099006512207600BCDCBCFD23CE463678100467680D27BAE920804119DBFA96E05F00431269D255DDA528D83A577285B91BCCB4802AB95A5C9B001299793FCD24C5D600BC652523D82D3FCB56EF737F045008E0FCDC7DAE40B64F7F799F3981F2490';
const packet = {};
parsePacket(packet, getBinaryRepresentation(input), 0);

const calculate = (packet) => {
    let type = parseInt(packet.type, 2);

    if (type === 0) { //add
        let result = 0;
        packet.subPackets.forEach(p => {
            result += calculate(p);
        });
        return result;
    }
    if (type === 1) { //mul
        let result = 1;
        packet.subPackets.forEach(p => {
            result *= calculate(p);
        });
        return result;
    }
    if (type === 2) { //min
        let result;
        packet.subPackets.forEach(p => {
            const calculation = calculate(p);
            if (result === undefined || calculation < result)
                result = calculation;
        });
        return result;
    }
    if (type === 3) { //max
        let result;
        packet.subPackets.forEach(p => {
            const calculation = calculate(p);
            if (result === undefined || calculation > result)
                result = calculation;
        });
        return result;
    }
    if (type === 4) { //value
        return packet.base10Value;
    }
    if (type === 5) { //Greater than
        return calculate(packet.subPackets[0]) > calculate(packet.subPackets[1]) ? 1 : 0;
    }
    if (type === 6) { //Less than
        return calculate(packet.subPackets[0]) < calculate(packet.subPackets[1]) ? 1 : 0;
    }
    if (type === 7) { //Less than
        return calculate(packet.subPackets[0]) === calculate(packet.subPackets[1]) ? 1 : 0;
    }
    console.error('unknown packet type' + type);
    return 0;
}

console.log(`Evaluation of packet: ${calculate(packet)}`);







