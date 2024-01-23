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
        this.nodeDepth = 0;
        this.nodeLeft = 0;
        this.nodeRight = 0;
        this.nodesLeftOfRoot = 0;
        this.nodesRightOfRoot = 0;
        
    }

    clearOldDisplay()
    {
        delete(body.childNodes);        
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
        // Check if current node input via argument exists
        if (currentNode)
        {
            console.log(`Current: ${currentNode.value}`);
            console.log(`Insert: ${insertNumber}`);

            // If the value of this currend node is equal to the number we are trying to insert, then return that the number is already present
            if (currentNode.value === insertNumber)
            {
                console.log("++ Already in the tree ++");
                return;
            }

            // If the value of this current node is less than the value of the number to insert, move to the right side child and repeat this process
            else if (currentNode.value < insertNumber)
            {
                console.log(">> Go Right >>");
                console.log(currentNode);
                this.traverseTreeToInsert(currentNode.right, insertNumber, currentNode);
            }
            // Or if the value of this current node is greater than the value of the number to insert, move to the left sild child and repeat this process
            else if (currentNode.value > insertNumber)
            {
                console.log("<< Go Left <<");
                console.log(currentNode);
                this.traverseTreeToInsert(currentNode.left, insertNumber, currentNode);
            }
        }
        // Else, if the process arrives at an empty position and none of the prior values were equal, then we can insert the number here
        else{
            console.log("!! Empty Node !!");

            // Double check to make sure that this position is in fact empty, ie there is not a current node at this position
            if (!currentNode)
            {
                // If the parent node's value is less than the number to insert, then this node will be assigned as the right side child, with the value to insert
                if (previousNode.value < insertNumber)
                {
                    const newNode = new Node(insertNumber);
                    previousNode.right = newNode;
                    console.log(`New Node: ${previousNode.right.value}`);
                }
                // Or if the parent node's value is greater than the number to insert, then this node will be assiged as the left side child, with the value to insert
                else if (previousNode.value > insertNumber)
                {
                    const newNode = new Node(insertNumber);
                    previousNode.left = newNode;
                    console.log(`New Node: ${previousNode.left.value}`);
                }
                
            }

        }

        

        

    }

    traverseTreeToDelete(currentNode, numberToDelete, previousNode)
    {
        if (currentNode)
        {
            console.log(`Current: ${currentNode.value}`);
            console.log(`Delete: ${numberToDelete}`);
            console.log(" ");

            if (currentNode.value === numberToDelete)
            {
                console.log("Found the number to delete")
                
                if (currentNode.left)
                {
                    console.log("Node has a left child");
                    console.log(`Right Child: ${currentNode.left.value}`);
                }

                if (currentNode.right)
                {
                    console.log("Node has a right child");
                    console.log(`Right Child: ${currentNode.right.value}`);
                }
            }

            else if (currentNode.value < numberToDelete)
            {
                this.traverseTreeToDelete(currentNode.right, numberToDelete, currentNode);
            }

            else if (currentNode.value > numberToDelete)
            {
                this.traverseTreeToDelete(currentNode.left, numberToDelete, currentNode);
            }

        }
        else
        {
            console.log("!! Empty Node!!");
        }
    }

    deleteNode(value)
    {
        //this.root
    }

    logNodePosition(currentNode, previousNode, direction)
    {
        if (currentNode)
        {
            if (previousNode)
            {
                console.log(`Parent Node: ${previousNode, previousNode.value}`);
            }
            
            console.log(`Node Value: ${currentNode.value}, Position: ${direction}`);
            console.log(" ");

            if (currentNode.left)
            {
                this.logNodePosition(currentNode.left, currentNode, "Left");
            }

            if (currentNode.right)
            {
                this.logNodePosition(currentNode.right, currentNode, "Right");
            }
        }
    }

    traverseTreeToFind(currentNode, numberToFind, previousNode)
    {

        
        if (currentNode)
        {
            if (currentNode.value === numberToFind)
            {
                console.log(`${numberToFind} is at ${currentNode}`, this.nodeDepth);
                return;
            }

            else if (currentNode.value < numberToFind)
            {
                this.nodeDepth ++;
                this.nodeRight ++;
                console.log(">> Go Right >>");
                console.log(currentNode);
                
                this.traverseTreeToFind(currentNode.right, numberToFind, currentNode);
            }

            else if (currentNode.value > numberToFind)
            {
                this.nodeDepth ++;
                this.nodeLeftt ++;
                console.log(">> Go Left >>");
                console.log(currentNode);
                this.traverseTreeToFind(currentNode.left, numberToFind, currentNode);
            }
        }
        else
        {

            console.log("Empty Node, number not found");
        }
    }

    isBalanced(rootNode)
    {

        const root = rootNode;
      

        this.traverseTree(root, nodesLeftOfRoot, nodesRightOfRoot);
        console.log(this.nodesLeftOfRoot);
        console.log(this.nodesRightOfRoot);
        
    }

    traverseTree(currentNode, nodesLeftOfRoot, nodesRightOfRoot)
    {
        if (currentNode)
        {

            if (currentNode.left.value)
            {
                this.nodesLeftOfRoot++;
                this.traverseTree(currentNode.left, nodesLeftOfRoot, nodesRightOfRoot);
            }

            if (currentNode.right.value)
            {
                this.nodesRightOfRoot++;
                this.traverseTree(currentNode.right, nodesLeftOfRoot, nodesRightOfRoot);
            }

        }

    }

}











const unsortedArray =  [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 72, 46, 99, 1054, 123, 53, 96, 83, 62];


const tree = new Tree(unsortedArray);
//console.log(tree.removeDuplicates(unsortedArray));
tree.display(tree.root, 0, "Root");

const numberToInsert = 8;

const numberToDelete = 7;

tree.clearOldDisplay();

//tree.traverseTreeToInsert(tree.root, numberToInsert);

const findNumber = 67;
//tree.traverseTreeToFind(tree.root, findNumber);

//tree.logNodePosition(tree.root, null, "Root");

//tree.traverseTreeToDelete(tree.root, 324);

tree.isBalanced(tree.root);





