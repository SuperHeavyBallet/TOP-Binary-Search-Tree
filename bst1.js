/// HTML DECLARATIONS ///
const body = document.getElementById("body");
const displayText = document.createElement("h1");
displayText.textContent = "Hello World!";
body.appendChild(displayText);

/// INDIVIDUAL NODE CLASS ///
class Node
{
    constructor(value, left, right)
    {
        this.value = value;
        this.left = left;
        this.right = right;
    }
    /*
    Each Node is:
    ---V---
    --/-\--
    -L---R-
    */
    
}

/// TREE CLASS ///
class Tree
{

    // Generate the tree root from an input Array //
    constructor(array)
    {
        this.elementCounter = 0;
        this.root = this.buildTree(this.removeDuplicates(array), 0, array.length - 1);
        
    }



    // Recursive Method to output the Tree Nodes/Values into an HTML DOM
    display(currentNode, previousNode, direction)
    {
        const thisNode = currentNode;
        const lastNode = previousNode;

        if (thisNode)
        {
            const newDOMNode = document.createElement("h3");
            const prevDOMNode = document.createElement("h4");

            newDOMNode.textContent = `${direction} :  ${currentNode.value}`;
            prevDOMNode.textContent = `Parent : ${lastNode.value}`;
            
            body.appendChild(newDOMNode);
            body.appendChild(prevDOMNode);

            if (thisNode.left)
            {
                this.display(thisNode.left, thisNode, "Left");
            }

            if (thisNode.right)
            {
                this.display(thisNode.right, thisNode, "Right");
            }

            return;

        }
        else
        {
            return;
        }

    }

    // Convert the input Array to a Set of unique values, and then return that Set into a new Array
    removeDuplicates(inputArray)
    {   
        const uniqueSet = new Set(inputArray);
        const uniqueArray = Array.from(uniqueSet);
        return this.sortArray(uniqueArray);
    }

    // Sort the now Unique array in order from smallest to largest value elements
    sortArray(inputArray)
    {
        if (inputArray.length <= 1)
        {
            return inputArray;
        }

        // Find the middle Index by cutting the array in half, 
        // set left and right as the remaining array to either side of that middle index
        const middleIndex = Math.floor(inputArray.length / 2);
        const leftHalf = inputArray.slice(0, middleIndex);
        const rightHalf = inputArray.slice(middleIndex);

        // Create variables by repeating this method with the split left and right half
        const sortedLeft = this.sortArray(leftHalf);
        const sortedRight = this.sortArray(rightHalf);

        // Merge the left and right half variables
        return this.merge(sortedLeft, sortedRight);
    }

    merge(left, right)
    {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        // While left index is less than the length of the left array, and right index is less than the length of the right array
        // If the Value in the left array at the current Left Index is less than the equivelant in right
        // Push that smaller value into the result array and increase the left index count by one
        // If not, push the right side into the result value and increase the right index count by one
        while (leftIndex < left.length && rightIndex < right.length)
        {
            if (left[leftIndex] < right[rightIndex])
            {
                result.push(left[leftIndex]);
                leftIndex++;
            }
            else
            {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        // Return the ordered Result array, 
        // also concatenate the remaining values in the left and right after the last index increase, in case any remain which are already in order
        return result.concat(left.slice(leftIndex), right.slice(rightIndex));
    }


    // Recursive Method to build the tree from an input array (This class by default uses the initial input array)
    // Arguments are the array, array start and end point
    buildTree(inputArray, start, end)
    {
        // If the start is greater than the end (end will normally be array.length -1, 
        // so array of 1 element would be start: 0, end: 1-1 = 0, so this would still return a single node
        // array of 0 elements would be start: 0, end: 0-1 = -1, so this would return null)

        this.elementCounter ++;
        //console.log(this.elementCounter);

        if (start > end)
        {
            return null;
        }

        // Get middle index point by adding 0 or other argument value + array.length and dividing by two, 
        // using Math.floor to round down in case of decimals
        let middleIndex = Math.floor((start + end) / 2);
        console.log(middleIndex);
        // Create a new node with the value of the array element at the middle index point
        const node = new Node(inputArray[middleIndex]);

        // Create a left and right child node using this same method, but with the array split to either side of the middle index point
        node.left = this.buildTree(inputArray, start, middleIndex -1);
        node.right = this.buildTree(inputArray, middleIndex +1, end);
    
        return node;
        
    }

    // Method to pass through each tree node until a suitable position is found to place the number chosen
    traverseTreeToInsert( currentNode, insertNumber, previousNode)
    {

        if (currentNode)
        {
            console.log(`Current: ${currentNode.value}`);
            console.log(`Insert: ${insertNumber}`);

            if (currentNode.value === insertNumber)
            {
                console.log("++ Already in the tree ++");
                return;
            }

            if (currentNode.value < insertNumber)
            {
                console.log(">> Go Right >>");
                console.log(currentNode);
                this.traverseTreeToInsert(currentNode.right, insertNumber, currentNode);
            }
            else if (currentNode.value > insertNumber)
            {
                console.log("<< Go Left <<");
                console.log(currentNode);
                this.traverseTreeToInsert(currentNode.left, insertNumber, currentNode);
            }
        }
        else{
            console.log("!! Empty Node !!");

            if (!currentNode)
            {

                if (previousNode.value < insertNumber)
                {
                    const newNode = new Node(insertNumber);
                    previousNode.right = newNode;
                    console.log(`New Node: ${previousNode.right.value}`);
                }

                else if (previousNode.value > insertNumber)
                {
                    const newNode = new Node(insertNumber);
                    previousNode.left = newNode;
                    console.log(`New Node: ${previousNode.left.value}`);
                }
                
            }

        }

        this.display(tree.root, 0, "Root");

        

    }

}







function traverseTreeToDelete(currentNode, deleteNumber, previousNode)
{

    if (currentNode)
    {
        console.log(`Current: ${currentNode.value}`);
        console.log(`Insert: ${deleteNumber}`);

        if (currentNode.value === deleteNumber)
        {
            console.log("++ Already in the tree ++");
            return;
        }

        if (currentNode.value < deleteNumber)
        {
            console.log(">> Go Right >>");
            console.log(currentNode);
            traverseTreeToDelete(currentNode.right, deleteNumber, currentNode);
        }
        else if (currentNode.value > deleteNumber)
        {
            console.log("<< Go Left <<");
            console.log(currentNode);
            traverseTreeToDelete(currentNode.left, deleteNumber, currentNode);
        }
    }
    else{
        console.log("!! Empty Node !!");

        if (!currentNode)
        {

            if (previousNode.value < deleteNumber)
            {
                const newNode = new Node(deleteNumber);
                previousNode.right = newNode;
                console.log(`New Node: ${previousNode.right.value}`);
            }

            else if (previousNode.value > deleteNumber)
            {
                const newNode = new Node(deleteNumber);
                previousNode.left = newNode;
                console.log(`New Node: ${previousNode.left.value}`);
            }
            
        }

    }

}



const unsortedArray =  [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 72, 46, 99, 1054, 123, 53, 96, 83, 62];


const tree = new Tree(unsortedArray);
console.log(tree.removeDuplicates(unsortedArray));
tree.display(tree.root, 0, "Root");

const numberToInsert = 6;

const numberToDelete = 7;

//tree.traverseTreeToInsert(tree.root, numberToInsert);





