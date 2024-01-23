
class Node
{
    constructor(d)
    {
        this.data = d;
        this.left = null;
        this.right = null;
    }

}

function sortArray(inputArray)
{
    if (inputArray.length <= 1)
    {
        return inputArray;
    }

    const middleIndex = Math.floor(inputArray.length / 2);
    const leftHalf = inputArray.slice(0, middleIndex);
    const rightHalf = inputArray.slice(middleIndex);

    const sortedLeft = sortArray(leftHalf);
    const sortedRight = sortArray(rightHalf);

    return merge(sortedLeft, sortedRight);

}

function merge(left, right)
{
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

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

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}


let root = null;

function sortedArrayToBST(inputArray, start, end)
{
    if (start > end)
    {
        return null;
    }

        let middleIndex = parseInt((start + end) / 2);

        const node = new Node(inputArray[middleIndex]);

        node.left = sortedArrayToBST(inputArray, start, middleIndex - 1);
        node.right = sortedArrayToBST(inputArray, middleIndex +1, end);

        return node;
        
    

}

function preOrder(node)
{
    if (node == null)
    {
        return;
    }
    console.log(node.data + " ");
    preOrder(node.left);
    preOrder(node.right);
}









const unsortedArray =  [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedArray = sortArray(unsortedArray);

console.log(unsortedArray);
console.log(sortedArray);

const n = sortedArray.length;

root = sortedArrayToBST(sortedArray, 0, n-1);

console.log("Preorder traversal of constructed BST");
preOrder(root);










traverseTreeToDelete(currentNode, numberToDelete, previousNode)
{
    if (currentNode)
    {
        console.log(`Current: ${currentNode.value}`);
        console.log(`Insert: ${numberToDelete}`);

        if (currentNode.value === numberToDelete)
        {
            console.log("Found the number to delete")
            return
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