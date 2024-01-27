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

function sortedArrayToBST(inputArray)
{
    // If the input array is empty, return null
    if (inputArray.length === 0)
    {
        return null;
    }

    const mid = Math.floor(inputArray.length / 2);
    const root = new Node(inputArray[mid]);

    // Initialising Queue
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

// Driver program to test the above function
const sortedArray = [1,2,3,4,5,6,7];
const root = sortedArrayToBST(sortedArray);
printBST(root);