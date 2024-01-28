// HTML Declarations //
const body = document.getElementById("body");
const displayText = document.createElement("h1");
displayText.textContent = "Hello World!";
body.appendChild(displayText);



/// INDIVIDUAL NODE CLASS ///

class Node
{
    constructor(val)
    {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class Tree{

    constructor(inputArray)
    {
        this.sortedArray = sortArray(inputArray);
        this.root = buildTree(this.sortedArray);
    }
}

function sortArray(inputArray)
{
    const originalArray = inputArray;
    const uniqueSet = new Set(originalArray);
    const sortedUniqueArray = [...uniqueSet].sort((a,b) => a - b);

    return sortedUniqueArray;
}

function buildTree(inputArray)
{
    // If the input array is empty, return null
    if (inputArray.length === 0)
    {
        return null;
    }

    const mid = Math.floor(inputArray.length / 2);
    const root = new Node(inputArray[mid]);

    // Initialising Queue
    // q is an array containing arrays at each element
    // element 0 q[0] contains: root, and an array of 0 and mid -1
    // element 1 q[1] contains: root, and an array of mid+1 and the length of the input array -1
    const q = [
        [root, [0, mid - 1]],
        [root, [mid + 1, inputArray.length -1]]
    ];


    while (q.length > 0)
    {
        const [parent, [left, right]] = q.shift();

        // If there are elements to process and parent node is not null
        if (left <= right && parent != null)
        {
            const mid = Math.floor((left + right) / 2);
            const child = new Node(inputArray[mid]);

            // Set the child node as left or right child of the parent node
            if (inputArray[mid] < parent.val)
            {
                parent.left = child;
            }
            else{
                parent.right = child;
            }

            // Push the left and right child and their indices to the que
            q.push([child, [left, mid - 1]]);
            q.push([child, [mid + 1, right]]);
        }
    }

    return root;    
}

function traverseTreeToFind(currentNode, findNumber)
{
    if (currentNode === null)
    {
        console.log("Number Not In Tree");
        return false;
    }

    

    else
    {
        console.log("Current Node: ", currentNode.val);

        if (currentNode.val === findNumber)
        {
            console.log("Found Matching Node!");
            return true;
        }
        else
        {
            if (currentNode.val < findNumber)
            {
                console.log(">> Go Right >>");
                return traverseTreeToFind(currentNode.right, findNumber);
            }
            else if (currentNode.val > findNumber)
            {
                console.log("<< Go Left <<");
                return traverseTreeToFind(currentNode.left, findNumber);
            }
        }
    }

}

function printBST(root)
{
    if (root === null)
    {
        return;
    }

    console.log(root.val + " ");
    printBST(root.left);
    printBST(root.right);
}


    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
      
// Driver program to test the above function
const unsortedArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 72, 89, 54, 1560, 2, 4, 5];
const tree = new Tree(unsortedArray);
//printBST(tree.root);
prettyPrint(tree.root);


function findNumberInTree(treeToSearch, numberToFind)
{
    const found = traverseTreeToFind(treeToSearch, numberToFind);
    if (found)
    {

        return console.log(`Node with value ${numberToFind} found in tree.`);
    }
    else
    {
        return console.log(`Node with value ${numberToFind} not found in tree.`);
    }
}
const numberToFind = 68;
//findNumberInTree(tree.root, numberToFind);

function traverseTreeToInsert(currentNode, insertNumber, previousNode)
{
    if (currentNode === null)
    {
        console.log("Found Empty Spot To Place Value");
        const newNode = new Node(insertNumber);
        if (previousNode.val < insertNumber)
        {
            previousNode.right = newNode;
            console.log(previousNode.right.val);
        }
        else if (previousNode.val > insertNumber)
        {
            previousNode.left = newNode;
            console.log(previousNode.left.val);
        }
        return 
    }
    else
    {
        if (currentNode.val === insertNumber)
        {
            console.log(`${insertNumber} is already in the tree`);
        }

        else if (currentNode.val < insertNumber)
        {
            console.log(">> Go Right >>");
            traverseTreeToInsert(currentNode.right, insertNumber, currentNode);
        }
        else if (currentNode.val > insertNumber)
        {
            console.log("<< Go Left <<");
            traverseTreeToInsert(currentNode.left, insertNumber, currentNode);
        }
    }
}

function traverseTreeToDelete(currentNode, deleteNumber, previousNode)
{
    if (currentNode === null)
    {
        return null;
    }
    else
    {
        if (currentNode.val === deleteNumber)
        {

            // First case, lead with no children
            if (currentNode.left === null && currentNode.right === null)
            {
                console.log(`Found Leaf Node ${deleteNumber}`);

                if (previousNode.val < deleteNumber)
                {
                    previousNode.right = null;
                    return;
                }
                else if (previousNode.val > deleteNumber)
                {
                    previousNode.left = null;
                    return;

                }
            }
            // Second case, has one child
            else if (currentNode.left !== null && currentNode.right === null)
            {
                console.log(`Found Node ${deleteNumber} with Left Child`);
                previousNode.right = currentNode.left;

            }
            else if (currentNode.right !== null && currentNode.left == null)
            {
                console.log(`Found Node ${deleteNumber} with Right Child`);
                previousNode.left = currentNode.right;
            }

            // Third case, has two children
            else if (currentNode.left !== null && currentNode.right !== null)
            {
                console.log(`Found Node ${deleteNumber} with Two Children`);
            }
        }
        else if (currentNode.val < deleteNumber)
        {
            traverseTreeToDelete(currentNode.right, deleteNumber, currentNode);
        }
        else if (currentNode.val > deleteNumber)
        {
            traverseTreeToDelete(currentNode.left, deleteNumber, currentNode);
        }
        
    }
}


traverseTreeToInsert(tree.root, 69);
prettyPrint(tree.root);

traverseTreeToDelete(tree.root, 69);
prettyPrint(tree.root);

