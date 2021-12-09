#include <iostream>
#include <string>
#include <iterator>
#include <algorithm>
#include <vector>

int main()
{
    std::vector<std::string> diagnostic;
    for (std::string line; std::getline(std::cin, line);)
    {
        diagnostic.push_back(line);
    }

    int gammaRate = 0;
    int epsilonRate = 0;
    int binaryLength = std::count_if(diagnostic.at(0).begin(), diagnostic.at(0).end(), [](auto x)
                                     { return x == '0' || x == '1'; });
    for (int i = 0; i < binaryLength; i++)
    {
        int zeroCount = 0;
        for (std::string line : diagnostic)
        {
            if (line.at(i) == '0')
                zeroCount++;
        }
        gammaRate *= 2;
        epsilonRate *= 2;
        if (zeroCount > (int)diagnostic.size() / 2)
        {
            epsilonRate++;
        }
        else
        {
            gammaRate++;
        }
    }
    std::cout << "Epsilon: " << epsilonRate << " gamma: " << gammaRate << " consumption: " << epsilonRate * gammaRate << std::endl;
}