#include <iostream>
#include <string>
#include <iterator>
#include <algorithm>
#include <vector>

char mostCommonBit(int index, const std::vector<std::string> &log)
{
    int zeroCount = 0;
    for (std::string line : log)
    {
        if (line.at(index) == '0')
            zeroCount++;
    }
    if (zeroCount > (int)log.size() / 2)
        return '0';
    else
        return '1';
}

int main()
{
    std::vector<std::string> oxygenLines;
    std::vector<std::string> scribberLines;
    for (std::string line; std::getline(std::cin, line);)
    {
        oxygenLines.push_back(line);
        scribberLines.push_back(line);
    }

    int binaryLength = std::count_if(oxygenLines.at(0).begin(), oxygenLines.at(0).end(), [](auto x)
                                     { return x == '0' || x == '1'; });
    for (int i = 0; i < binaryLength; i++)
    {
        char mco = mostCommonBit(i, oxygenLines);
        char mcs = mostCommonBit(i, scribberLines);
        oxygenLines.erase(std::remove_if(oxygenLines.begin(), oxygenLines.end(), [i, mco, oxygenLines](const std::string &x)
                                         { return x.at(i) != mco && oxygenLines.size() > 1; }),
                          oxygenLines.end());
        scribberLines.erase(std::remove_if(scribberLines.begin(), scribberLines.end(), [i, mcs, scribberLines](const std::string &x)
                                           { return x.at(i) == mcs && scribberLines.size() > 1; }),
                            scribberLines.end());
    }
    int oxygen = std::stoi(oxygenLines.at(0), 0, 2);
    int scrubber = std::stoi(scribberLines.at(0), 0, 2);

    std::cout << "life support rating: " << oxygen * scrubber << std::endl;
}