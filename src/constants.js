export const LANGUAGE_VERSIONS = {
    "python": "3.9.6",
    "java": "17"
};

export const CODE_SNIPPETS = {
    "python": `def result(input_value): 
    # Write your code here`,
    "java": `public class Result {
    // Write your code here
}`,
};

export const TASK_SNIPPETS = {
    1: {
        "python": `def result(input_value): 
    # Write your code here`,
        "java": `public class Result { 
    public static int defineInteger(int value) { 
        // Write your code here 
    } 
} `,
    },
    2: {
        "python": `def result(a, b): 
    # Write your code here`,
        "java": `public class Result { 
    public static int addTwoIntegers(int a, int b) {  
        // Write your code here 
    } 
} `,
    },
    3: {
        "python": `def result(value):  
    # Write your code here`,
        "java": `public class Result { 
    public static String displayValue(int value) { 
        // Write your code here 
    } 
} `,
    },
    4: {
        "python": `def result(a, b): 
    # Write your code here`,
        "java": `public class Result { 
    public static double addTwoNumbers(double a, double b) { 
        // Write your code here 
    } 
} `,
    },
    5: {
        "python": `def result(a, b): 
    # Write your code here`,
        "java": `public class Result { 
    public static double multiplyTwoNumbers(double a, double b) {
        // Write your code here 
    } 
} `,
    },
    6: {
        "python": `def result(a, b):
    # Write your code here`,
        "java": `public class Result {
    public static int divideAndRound(double a, double b) { 
        // Write your code here
    }
} `,
    },  
    7: {
        "python": `def result(n):
    # Write your code here`,
        "java": `public class Result {
    public static String checkIfEven(int number) { 
        // Write your code here
    }
} `,
    },
    8: {
        "python": `def result(n):
    # Write your code here`,
        "java": `public class Result {
    public static String checkIfPositive(int number) {
        // Write your code here
    }
} `,
    },
    9: {
        "python": `def result(a, b):
    # Write your code here`,
        "java": `public class Result {
    public static String compareTwoNumbers(int a, int b) {
        // Write your code here
    }
} `,
    },
    10: {
        "python": `def result():
    # Write your code here`,
        "java": `import java.util.List; 
import java.util.Arrays;

public class Result {
    public static List<Integer> defineArray() { 
        // Write your code here
    }
} `,
    },
    11: {
        "python": `def result(numbers):
    # Write your code here`,
        "java": `import java.util.List; 

public class Result {
    public static int calculateSum(List<Integer> numbers) { 
        // Write your code here
    }
} `,
    },
    12: {
        "python": `def result(numbers):
    # Write your code here`,
        "java": `public class Result {
    public static Integer findLargestElement(Integer[] array) { 
        // Write your code here
    }
} `,
    },
    13: {
        "python": `def result():
    # Write your code here`,
        "java": `public class Result {
    public static int calculateSumOfEvens() {
        // Write your code here
    }
} `,
    },
    14: {
        "python": `def result(n):
    # Write your code here`,
        "java": `public class Result {
    public static int sumNumbersUpToN(int n) { 
        // Write your code here
    }
} `,
    },
    15: {
        "python": `def result(numbers):
    # Write your code here`,
        "java": `public class Result {
    public static int findNumberDivisibleBy7(int[] numbers) {
        // Write your code here
    }
} `,
    },
    16: {
        "python": `def result(a, b):
    # Write your code here`,
        "java": `public class Result {
    public static int sumTwoNumbers(int a, int b) { 
        // Write your code here
    }
} `,
    },
    17: {
        "python": `def result(numbers):
    # Write your code here`,
        "java": `import java.util.List; 

public class Result {
    public static Integer findLargestInList(List<Integer> numbers) {
        // Write your code here
    }
} `,
    },
    18: {
        "python": `def result(n):
    # Write your code here`,
        "java": `public class Result {
    public static int factorial(int n) {
        // Write your code here
    }
} `,
    },
    19: {
        "python": `def result(n):
    # Write your code here`,
        "java": `public class Result {
    public static int sumToN(int n) {
        // Write your code here
    }
} `,
    },
    20: {
        "python": `def result(n):
    # Write your code here`,
        "java": `public class Result {
    public static int fibonacci(int n) {
        // Write your code here
    }
} `,
    },
    21: {
        "python": `def tower_of_hanoi(n, source, target, auxiliary, logger): 
    # Write your code here
def result(n):
    output = []
    logger = lambda x: output.append(x) 
    tower_of_hanoi(n, 'A', 'C', 'B', logger) 
    return ''.join(output) `,
        "java": `import java.io.*; 
import java.util.function.Consumer; 

public class Result {
    public static void towerOfHanoi(int n, char source, char destination, char auxiliary, Consumer<String> logger) { 
        // Write your code here
    }
} `,
    },
    22: {
        "python": `def result(arr):
    # Write your code here`,
        "java": `import java.io.*; 
import java.util.*; 
import java.util.function.Function; 

public class Result {
    public static List<Integer> bubbleSort(List<Integer> numbers) { 
        // Write your code here
    }
} `,
    },
    23: {
        "python": `def result(arr):
    # Write your code here`,
        "java": `import java.io.*; 
import java.util.*; 
import java.util.function.Function; 
import java.util.function.Consumer; 

public class Result {
    public static List<Integer> quickSort(List<Integer> numbers) { 
        // Write your code here
    }
} `,
    },
    24: {
        "python": `def result(arr):
    # Write your code here`,
        "java": `import java.util.List; 
import java.util.Arrays; 
        
public class Result {
    public static List<Integer> selectionSort(List<Integer> numbers) {
        // Write your code here
    }
} `,
    },
    25: {
        "python": `class Stack:
    # Write your code here`,
        "java": `import java.io.*; 
import java.util.*; 

class Stack {

    private List<Integer> stack; 

    // Write your code here

} `,
    },
    26: {
        "python": `class Queue:
    # Write your code here`,
        "java": `import java.io.*;
import java.util.*;  
        
class Queue {  

    private LinkedList<Integer> queue;

    // Write your code here

} `,
    },
    27: {
        "python": `class BinaryTree:

    # Write your code here`,
        "java": `import java.util.*;
        
class BinaryTree {

    // Write your code here

} `,
    },
    Daily1: {
        "python": `def result(input_str):

    # Write your code here`,
        "java": `public class Result {
    public static int calculateStringLength(String input) {
        // Write your code here
    }
} `,
    },
    Daily2: {
        "python": `def result(str1, str2):

    # Write your code here`,
        "java": `import java.util.List;
import java.util.Arrays; 
        
public class Result { 
    public static String concatenateStrings(String str1, String str2) { 
        // Write your code here
    }
} `,
    },
    Daily3: {
        "python": `def result(text, phrase):

    # Write your code here`,
        "java": `import java.util.List;
        
public class Result {
    public static int countPhraseOccurrences(String text, String phrase) {
        // Write your code here
    }
} `,
    },
    Daily4: {
        "python": `def result(strings):

    # Write your code here`,
        "java": `import java.util.List; 
import java.util.stream.Collectors; 
        
public class Result {
    public static List<String> convertToUpper(List<String> strings) {
        // Write your code here
    }
} `,
    },
    Daily5: {
        "python": `def result(grades):

    # Write your code here`,
        "java": `import java.util.Map;
        
public class Result {
    public static double calculateAverage(Map<String, Integer> scores) {
        // Write your code here
    }
} `,
    },
    Daily6: {
        "python": `def result(dictionary, new_entry):

    # Write your code here`,
        "java": `import java.util.Map;

public class Result {
    public static Map<String, String> addEntry(Map<String, String> dictionary, String[] entry) {
        // Write your code here
    }
} `,
    },
    
};