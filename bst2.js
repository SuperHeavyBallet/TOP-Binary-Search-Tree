class Node
{
    constructor(val)
    {
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class Tree{

    constructor(inputArray)
    {
        this.sortedArray = sortArray(inputArray);
        this.root = buildTree(this.sortedArray);
    }
}

function createRandomArray(minNumber, maxNumber, size)
{
    const newArray = [];

    for (let i = minNumber; i < size; i++)
    {
        const newElement = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
        newArray.push(newElement);
    }

    return newArray;
}

function sortArray(inputArray)
{
    const originalArray = inputArray;
    const uniqueSet = new Set(originalArray);
    const sortedUniqueArray = [...uniqueSet].sort((a,b) => a - b);

    return sortedUniqueArray;
}

function createNewArray(root, array)
{
    if (!root)
    {
        return [];
    }

    const result = [];

    function traverse(currentNode)
    {
        if (currentNode.left)
        {
            traverse(currentNode.left);
        }

        if (currentNode.right)
        {
            traverse(currentNode.right);
        }

        array.push(currentNode.val);
    }

    traverse(root);

    return array;
}

function buildTree(inputArray)
{
    if (inputArray.length === 0)
    {
        return null;
    }

    const mid = Math.floor(inputArray.length / 2);
    const root = new Node(inputArray[mid]);

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

function traverseInOrder(root, callback)
{
    if (!root)
    {
        return [];
    }

    const result = [];
    
    function traverse(currentNode)
    {
        if (currentNode.left)
        {
            traverse(currentNode.left);
        }

        if (callback)
        {
            result.push(callback(currentNode));
        }
        else
        {
            result.push(currentNode.val);
        }

        if (currentNode.right)
        {
            traverse(currentNode.right);
        }
    }

    traverse(root);

    return result;



}

function traversePreOrder(root, callback)
{
    if (!root)
    {
        return [];
    }

    const result = [];
    
    function traverse(currentNode)
    {
        

        if (callback)
        {
            result.push(callback(currentNode));
        }
        else
        {
            result.push(currentNode.val);
        }

        if (currentNode.left)
        {
            traverse(currentNode.left);
        }

        if (currentNode.right)
        {
            traverse(currentNode.right);
        }
    }

    traverse(root);

    return result;
}

function traversePostOrder(root, callback)
{
    if (!root)
    {
        return [];
    }

    const result = [];
    
    function traverse(currentNode)
    {
        if (currentNode.left)
        {
            traverse(currentNode.left);
        }

        if (currentNode.right)
        {
            traverse(currentNode.right);
        }

        if (callback)
        {
            result.push(callback(currentNode));
        }
        else
        {
            result.push(currentNode.val);
        }

    }

    traverse(root);

    return result;
}

let height = -1;
function findDepth(root, x)
{
    if (!root)
    {
        return -1;
    }

    let dist = -1;

    // Check if x is the current node
    if (root.val === x)
    {
        console.log("Found the node!");
        return 0;
    }
    
    const leftDepth = findDepth(root.left, x);
    if (leftDepth >= 0)
    {
        console.log("Found in the left subtree!");
        return leftDepth +1; // Increment depth when found in the left subtree
    }
    
    const rightDepth = findDepth(root.right, x);
    if (rightDepth >= 0)
    {
        console.log("Found in the right subtree!");
        return rightDepth +1; // Increment depth when found in the left subtree
    }
        
    //x was not found in the current subtree
    return -1;
}

function findHeightUtil(root, x)
{
    if (!root)
    {
        return -1;
    }

    //Store the maximum height of
    // the left and right subtree

        let leftHeight = findHeightUtil(root.left, x);

        let rightHeight = findHeightUtil(root.right, x);


    //Update height of the current node
    let ans = Math.max(leftHeight, rightHeight) +1;

    // If current node is the required node
    if (root.val === x)
    {
        height = ans;
    }

    return ans;

}

function findHeight(root, x)
{
    //Stores height of the tree
    findHeightUtil(root, x);

    //Return the height


    return height;
}

function checkBalance(root)
{
    if (!root)
    {
        return null;
    }
    // checking left subtree
    let leftSubTreeHeight = checkBalance(root.left);
    if (leftSubTreeHeight == -1)
    {
        return -1;
    }
    // if left subtree is not balanced then the entire tree is also not balanced

    // checking right subtree
    let rightSubTreeHeight = checkBalance(root.right);
    if (rightSubTreeHeight == -1) return -1;
    // if right subtree is not balanced then the entire tree is also nto balanced

    // checking the difference of left and right subtree for current node
    if (Math.abs(leftSubTreeHeight - rightSubTreeHeight) > 1)
    {
        return -1;
    }

    // if it is balanced then return the height
    return (Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1);

}

function judgeBalance(root)
{
    if (!root)
    {
        return null
    }

    const result = checkBalance(root);

    if (result > -1)
    {
        console.log("Tree is balanced");
        
    }
    else
    {
        console.log("Tree is not balanced")
        
    }
    return result;
}


//// Driver Script
const unsortedArray = createRandomArray(0, 100, 100);
console.log(unsortedArray);

const firstTree = new Tree(unsortedArray);
prettyPrint(firstTree.root);
judgeBalance(firstTree.root);

console.log("Pre Order: ", traversePreOrder(firstTree.root));
console.log("Post Order: ", traversePostOrder(firstTree.root));
console.log("In Order: ", traverseInOrder(firstTree.root));

traverseTreeToInsert(firstTree.root, 120);
traverseTreeToInsert(firstTree.root, 130);
traverseTreeToInsert(firstTree.root, 140);
traverseTreeToInsert(firstTree.root, 150);
traverseTreeToInsert(firstTree.root, 160);
traverseTreeToInsert(firstTree.root, 170);
traverseTreeToInsert(firstTree.root, 180);

prettyPrint(firstTree.root);
judgeBalance(firstTree.root);

const newArray = [];
createNewArray(firstTree.root, newArray);
secondTree = new Tree(newArray);

prettyPrint(secondTree.root);
judgeBalance(secondTree.root);

console.log("Pre Order: ", traversePreOrder(firstTree.root));
console.log("Post Order: ", traversePostOrder(firstTree.root));
console.log("In Order: ", traverseInOrder(firstTree.root));