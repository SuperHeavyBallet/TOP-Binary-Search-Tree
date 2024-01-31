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

                let succParent = currentNode;

                //Find successir
                let succ = currentNode.right;
                while (succ.left !== null)
                {
                    succParent = succ;
                    succ = succ.left;
                }
                //Delete succesor, since successor is always left child
                //of its parent we can safely make successor's right
                //child as left of its parent.
                // If there is no succ, then asign succ.right to
                //succParent.right
                if (succParent !== currentNode)
                {
                    succParent.left = succ.right;
                }
                else
                {
                    succParent.right = succ.right;
                }
                //Copy successor Data to root
                currentNode.val = succ.val;
                // Delete successor and return root
                delete succ;
                return currentNode;

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

function traverseTreeToFind(currentNode, numberToFind)
{

    if (currentNode.val === null)
    {
        return { node: null, value: `${numberToFind} not found in tree!` };
    }
    else
    {
        if (currentNode.val < numberToFind)
        {
            return traverseTreeToFind(currentNode.right, numberToFind);
        }
        else if (currentNode.val > numberToFind)
        {
            return traverseTreeToFind(currentNode.left, numberToFind);
        }
        else if (currentNode.val === numberToFind)
        {
            console.log(`Found Matching Node at: ${currentNode, currentNode.val}`);
            return { node: currentNode, value: currentNode.val };
        }
    }

}



function fibSequence(prevNumber, prevPrevNumber, limitNumber)
{
    if (prevNumber > limitNumber)
    {
        return;
    }
    else if (prevNumber === 0)
    {
        console.log(1);
        fibSequence(currentNumber, prevNumber, limitNumber);
    }
    else
    {
        let currentNumber = prevNumber + prevPrevNumber;
        console.log(currentNumber);
        fibSequence(currentNumber, prevNumber, limitNumber);
    }
    
}

function levelOrderRecursion(root, callback)
{

    // If supplied root is not present, return an empty array
    if (!root)
    {
        return [];
    }

    // Initialise result as an empty array, 
    // and queue as an array with root as element 0 
    const result = [];
    const queue = [root];

    // Internal function
    function traverse()
    {
        // if queue's length is 0, for example an empty tree supplied
        // return
        if (queue.length === 0)
        {
            return;
        }

        // The current node is the 0 element of the queue array
        const currentNode = queue.shift();

        // if a callback operation is supplied in arguments
        // push the result of that callback using the current node
        // to the end of the result array
        // else, if no callback is supplied, simply push the value
        // of the current node to the end of the result array

        /////////////////////////////
        // Ternery operator version
        //result.push(callback ? callback(currentNode) : currentNode.val);

        //Explicit if/else Version
        if (callback)
        {
            result.push(callback(currentNode));
        }
        else
        {
            result.push(currentNode.val);
        }

        // If the current node has a left or right child, 
        // add that child to the end of the queue array
        
        if (currentNode.left)
        {
            queue.push(currentNode.left);
        }
        if (currentNode.right)
        {
            queue.push(currentNode.right);
        }

        // Repeat this function with the updated queue array
        traverse();
    }

    traverse();

    return result;
}

traverseTreeToInsert(tree.root, 69);
prettyPrint(tree.root);

traverseTreeToDelete(tree.root, 23);
prettyPrint(tree.root);

const numberToFind = 4;
const foundNumber = traverseTreeToFind(tree.root, numberToFind);
console.log(foundNumber);


const traverse = levelOrderRecursion(tree.root);
console.log(traverse);
