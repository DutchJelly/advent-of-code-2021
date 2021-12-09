#include <iostream>
#include <string>
#include <vector>

int main()
{
    std::vector<int> lines;
    for (std::string line; std::getline(std::cin, line);)
        lines.push_back(std::stoi(line));

    int previousLineSum = INT32_MAX;
    int counter = 0;
    for (int i = 0; i < (int)lines.size() - 2; i++)
    {
        int lineSum = 0;
        for (int j = i; j < i + 3; j++)
        {
            lineSum += lines.at(j);
        }
        if (lineSum > previousLineSum)
            counter++;
        previousLineSum = lineSum;
    }
    std::cout << "I counted " << counter << " increases!" << std::endl;
}