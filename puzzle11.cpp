#include <iostream>
#include <string>
#include <iterator>
#include <algorithm>
#include <vector>
#include <array>

std::vector<int> readNumbers()
{
    std::string firstLine;
    std::getline(std::cin, firstLine);
    size_t splitIndex;
    std::vector<int> numbers;

    do
    {
        splitIndex = firstLine.find_first_of(',');
        numbers.push_back(std::stoi(firstLine.substr(0, splitIndex)));
        firstLine = firstLine.substr(splitIndex + 1);
    } while (splitIndex != std::string::npos);
    return numbers;
}

int main()
{
    std::vector<int> firstGen = readNumbers();
    long double fishCount[9] = {0};
    for (int fish : firstGen)
    {
        fishCount[fish]++;
    }

    for (int i = 0; i < 256; i++)
    {
        long double zeroCount = fishCount[0];
        for (int j = 1; j < 9; j++)
        {
            fishCount[j - 1] = fishCount[j];
        }
        fishCount[6] += zeroCount;
        fishCount[8] = zeroCount;

        // std::cout << "after day " << i + 1 << ": ";
        // for (int j = 0; j < 9; j++)
        // {
        //     std::cout << fishCount[j] << " ";
        // }
        // std::cout << std::endl;
    }
    long double counter = 0;
    for (int i = 0; i < 9; i++)
    {

        counter += fishCount[i];
    }
    std::cout << "there are " << std::fixed << counter << " fish" << std::endl;
}