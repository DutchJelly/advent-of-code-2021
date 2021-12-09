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
    int forward = 0;
    for (auto instr : instructions)
    {
        if (instr.first == "forward")
            forward += instr.second;
        if (instr.first == "up")
            depth -= instr.second;
        if (instr.first == "down")
            depth += instr.second;
    }
    std::cout << "Forward: " << forward << " depth: " << depth << " multiplied: " << forward * depth << std::endl;
}