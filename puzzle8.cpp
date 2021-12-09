#include <iostream>
#include <string>
#include <iterator>
#include <algorithm>
#include <vector>
#include <array>

#define BOARD_SIZE 5
typedef std::array<std::array<int, BOARD_SIZE>, BOARD_SIZE> Board;

std::vector<int> readNumbers()
{
    std::string firstLine;
    std::getline(std::cin, firstLine);
    size_t splitIndex;
    std::vector<int> numbers;

    while ((splitIndex = firstLine.find_first_of(',')) != std::string::npos)
    {
        numbers.push_back(std::stoi(firstLine.substr(0, splitIndex)));
        firstLine = firstLine.substr(splitIndex + 1);
    }
    return numbers;
}

int sumRow(Board &b, int row)
{
    int sum = 0;
    for (int i = 0; i < BOARD_SIZE; i++)
    {
        sum += b[row][i];
    }
    return sum;
}

int sumCol(Board &b, int col)
{
    int sum = 0;
    for (int i = 0; i < BOARD_SIZE; i++)
    {
        sum += b[i][col];
    }
    return sum;
}

int sumBoard(Board &b)
{
    int sum = 0;
    for (int i = 0; i < BOARD_SIZE; i++)
    {
        for (int j = 0; j < BOARD_SIZE; j++)
        {
            sum += b[i][j];
        }
    }
    return sum;
}

std::array<std::array<int, BOARD_SIZE>, BOARD_SIZE> readBoard()
{
    std::array<std::array<int, BOARD_SIZE>, BOARD_SIZE> board;
    std::string line;
    for (int i = 0; i < BOARD_SIZE; i++)
    {
        std::getline(std::cin, line);
        for (int j = 0; j < BOARD_SIZE; j++)
        {
            size_t spaceIndex = line.find_first_of(' ');
            //TODO: this won't work for characters with 3 digits
            if (spaceIndex == 0) //single characters are aligned to the right, so move one
            {
                line = line.substr(1);
                spaceIndex = line.find_first_of(' ');
            }
            board[i][j] = stoi(line.substr(0, spaceIndex));
            line = line.substr(spaceIndex + 1);
        }
    }
    return board;
}

int main()
{
    std::vector<int> numbers = readNumbers();

    std::vector<std::array<std::array<int, BOARD_SIZE>, BOARD_SIZE>> boards;
    for (std::string line; std::getline(std::cin, line);)
    {
        boards.push_back(readBoard());
    }

    std::vector<std::pair<int, int>> boardScores;

    for (int num : numbers)
    {
        for (int boardIndex = 0; boardIndex < (int)boards.size(); boardIndex++)
        {
            Board &board = boards[boardIndex];
            for (int i = 0; i < BOARD_SIZE; i++)
            {
                for (int j = 0; j < BOARD_SIZE; j++)
                {
                    if (board[i][j] == num)
                    {
                        board[i][j] = 0;
                        if (sumCol(board, j) == 0 || sumRow(board, i) == 0)
                        {
                            bool match = false;
                            for (auto boardScore : boardScores)
                            {
                                if (boardScore.first == boardIndex)
                                    match = true;
                            }
                            if (!match)
                                boardScores.push_back(std::make_pair(boardIndex, sumBoard(board) * num));
                        }
                    }
                }
            }
        }
    }
    std::cout << boardScores.size() << std::endl;
    std::cout << "last winning board score: " << boardScores.back().second << std::endl;
}