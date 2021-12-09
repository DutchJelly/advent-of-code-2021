#include <iostream>
#include <string>
#include <vector>

int main()
{
    std::vector<std::pair<std::string, int>> instructions;
    for (std::string line; std::getline(std::cin, line);)
    {
        size_t space = line.find(' ');
        instructions.push_back(std::make_pair(
            line.substr(0, space),
            std::stoi(line.substr(space + 1))));
    }

    int depth = 0;
    int aim = 0;
    int forward = 0;
    for (auto instr : instructions)
    {
        if (instr.first == "forward")
        {
            forward += instr.second;
            depth += instr.second * aim;
        }

        if (instr.first == "up")
            aim -= instr.second;
        if (instr.first == "down")
            aim += instr.second;
    }
    std::cout << "Forward: " << forward << " depth: " << depth << " multiplied: " << forward * depth << std::endl;
}