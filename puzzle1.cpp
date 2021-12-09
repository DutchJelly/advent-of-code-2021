#include <iostream>
#include <string>

int main()
{
    int counter = 0;
    int previousLineValue = INT32_MAX;
    for (std::string line; std::getline(std::cin, line);)
    {
        int currentValue = std::stoi(line);
        if (currentValue > previousLineValue)
            counter++;
        previousLineValue = currentValue;
    }
    std::cout << "I counted " << counter << " increases!" << std::endl;
}