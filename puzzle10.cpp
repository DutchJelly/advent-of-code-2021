#include <iostream>
#include <string>
#include <iterator>
#include <algorithm>
#include <vector>
#include <array>

typedef std::pair<int, int> Point;
typedef std::pair<Point, Point> Line;

Line parseLine(const std::string &line)
{
    Line parsed;
    size_t firstSeperator = line.find_first_of(',');
    size_t secondSeperator = line.find_first_of(' ');
    size_t thirdSeperator = line.find_last_of(' ');
    size_t fourthSeperator = line.find_last_of(',');
    parsed.first = std::make_pair(
        std::stoi(line.substr(0, firstSeperator)),
        std::stoi(line.substr(firstSeperator + 1, secondSeperator)));
    parsed.second = std::make_pair(
        std::stoi(line.substr(thirdSeperator + 1, fourthSeperator)),
        std::stoi(line.substr(fourthSeperator + 1)));
    return parsed;
}

void printPoint(const Point &point)
{
    std::cout << "Point: x" << point.first << " y" << point.second << std::endl;
}

bool equalPoints(const Point &p1, const Point &p2)
{
    if (p1.first == -1)
        return false;
    return p1.first == p2.first && p1.second == p2.second;
}

void movePoint(Point &point, const Point &towards)
{
    //Had to be fance here :P
    point.first += (point.first < towards.first) * 2 - (point.first != towards.first);
    point.second += (point.second < towards.second) * 2 - (point.second != towards.second);
}

int main()
{
    std::vector<Line> lines;
    for (std::string line; std::getline(std::cin, line);)
    {
        lines.push_back(parseLine(line));
    }
    uint16_t board[1000][1000] = {0};
    std::vector<Point> visitList;
    for (Line line : lines)
    {
        Point p = line.first;
        while (!equalPoints(p, line.second))
        {
            board[p.second][p.first]++;
            movePoint(p, line.second);
        }
        board[p.second][p.first]++;
    }

    int counter = 0;
    for (int i = 0; i < 1000; i++)
    {
        for (int j = 0; j < 1000; j++)
        {
            if (board[i][j] > 1)
                counter++;
        }
    }

    std::cout << "Overlaps: " << counter << std::endl;
}