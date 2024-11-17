#include <bits/stdc++.h>

using namespace std;

// using dynamic programming
// implementing Levenshtein distance algorithm
int findDistance(string a, string b)
{
    // Initializing 2D array:
    int len_a = a.length();
    int len_b = b.length();
    int **d = new int *[len_a + 1];
    for (int i = 0; i < len_a + 1; i++)
    {
        d[i] = new int[len_b + 1];
    }

    // base case handling
    for (int i = 0; i < len_a + 1; i++)
    {
        d[i][0] = i;
    }
    for (int j = 0; j < len_b + 1; j++)
    {
        d[0][j] = j;
    }

    // Applying the algorithm:
    int insertion, deletion, replacement;

    for (int i = 1; i < len_a + 1; i++)
    {
        for (int j = 1; j < len_b + 1; j++)
        {
            if (a[i - 1] == b[j - 1])
            {
                d[i][j] = d[i - 1][j - 1];
            }
            else
            {
                // Choosing the best option:
                insertion = d[i][j - 1];
                deletion = d[i - 1][j];
                replacement = d[i - 1][j - 1];

                d[i][j] = 1 + min(insertion, min(deletion, replacement));
            }
        }
    }

    int answer = d[len_a][len_b];

    // Freeing memory:
    for (int i = 0; i < len_a + 1; i++)
    {
        delete[] d[i];
    }
    delete[] d;

    return answer;
}

// reading the words from the dictionary
std::vector<pair<int, string>> asyncReadFile(const std::string &filename)
{
    std::vector<pair<int, string>> pairsArray;
    std::ifstream file(filename);
    if (!file)
    {
        std::cerr << "Failed to open file\n";
        return pairsArray;
    }

    std::string line;
    while (std::getline(file, line))
    {
        pairsArray.push_back({-1, line});
    }
    return pairsArray;
}

int main()
{

    string a;
    cout << "\n\n\t\t\t\t\t\t\tPlease enter the word: ";
    cin >> a;
    // a = "he";

    std::string inputFilename = "text.txt"; // This file contains the data sets
    cout << "\n\n\t\t\tPrinting the list of top 15 valid dictionary words having minimum edit distance to the input word \" " << a << " \"  \n\n\n\t\t\t\t\t\t\t\tPlease wait "
         << "...\n\n\n";

    auto words = asyncReadFile(inputFilename);

    for (auto &word : words)
    {
        int editDistance = findDistance(a, word.second);
        word.first = editDistance; // Applying the algorithm for the input string on all the elements of the dataset
    }

    std::sort(words.begin(), words.end(), [](auto &left, auto &right)
              { return left.first < right.first; }); // Sorting the output by edit distance

    cout << "\t\t\t\t\t\tEdit Distance\t\t|\tDictionary Word\n";
    cout << "\t\t\t\t\t\t-----------------------------------------------------\n";

    for (int i = 0; i < 25; i += 1)
    {
        cout << "\t\t\t\t\t\t" << setw(8) << words[i].first << "\t\t|\t\t" << words[i].second << endl;
    }

    cout << "\t\t\t\t\t\t-----------------------------------------------------\n";
    std::cout << "\n\t\t\t\t\t\t          Total words scanned: " << words.size() << '\n';
    cout << "\t\t\t\t\t\t-----------------------------------------------------\n";
    std::cout << "\n\n\t\t\t\t\t\t          Time Complexity :  O ( N * K + K log(K) )\n"
              << '\n';
    std::cout << "\t\t\t\t\t\t          Space Complexity :  O ( N + K )\n"
              << '\n';
    std::cout << "\t\t\t\t\t\t          N  = Size of Input String\n"
              << '\n';
    std::cout << "\t\t\t\t\t\t          K  = Total No words used in the Dictionary\n"
              << '\n';
    std::cout << "\t\t\t\t\t\t          Algorithm Used : LEVENSHTEIN DISTANCE ALGORITHM\n"
              << '\n';
    cout << "\t\t\t\t\t\t-----------------------------------------------------\n";
    cout << "\t\t\t\t\t\t-----------------------------------------------------\n";
    cout << "\n\n\t\t\t\t\t\t.             \t\t\t";
    cout << "\n\n\t\t\t\t\t\t\t\t.    THE END    .  \t\t\t\n\n\n\n";
    cout << "\t\t\t\t\t\t-----------------------------------------------------\n";

    return 0;
}
