const body = document.getElementById("body");

const displayText = document.createElement("h1");

displayText.textContent = "Hello World!";
body.appendChild(displayText);

class Node
{
    constructor(value, left, right)
    {
        this.value = value;
        this.left = left;
        this.right = right;
    }
    
}

class Tree
{
    constructor(array)
    {
        this.root = this.buildTree(this.removeDuplicates(array), 0, array.length - 1);
    }

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

            if (thisNode.left && thisNode.left.value != undefined)
            {
                this.display(thisNode.left, thisNode, "Left");
            }

            if (thisNode.right && thisNode.right.value != undefined)
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

    removeDuplicates(inputArray)
    {   
        const uniqueSet = new Set(inputArray);
        const uniqueArray = Array.from(uniqueSet);
        return(uniqueArray);
    }

    sortArray(inputArray)
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

        return this.merge(sortedLeft, sortedRight);
    }

    merge(left, right)
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

    buildTree(inputArray, start, end)
    {

        if (start > end)
        {
            return null;
        }

        let middleIndex = parseInt((start + end) / 2);

        const node = new Node(inputArray[middleIndex]);

        node.left = this.buildTree(inputArray, start, middleIndex -1);
        node.right = this.buildTree(inputArray, middleIndex +1, end);

        return node;
        

    }

    getTreeHeight(){
        let lengthToLeft = 0;
        let lengthToRight = 0;
        let pointerToLeft = this.root.left;
        let pointerToRight = this.root.right;
        while (pointerToLeft != null)
        {
            ++lengthToLeft;
            pointerToLeft = pointerToLeft.left;
        }
        while (pointerToRight != null)
        {
            ++lengthToRight;
            pointerToRight = pointerToRight.right;
        }
        const length = lengthToRight > lengthToLeft ?
            lengthToRight : lengthToLeft;

            // add 1 for the root
            return length + 1;
    }




}


const unsortedArray =  [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(unsortedArray);

const numberToInsert = 6;

function traverseTreeToInsert( currentNode, insertNumber, previousNode)
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
            traverseTreeToInsert(currentNode.right, insertNumber, currentNode);
        }
        else if (currentNode.value > insertNumber)
        {
            console.log("<< Go Left <<");
            console.log(currentNode);
            traverseTreeToInsert(currentNode.left, insertNumber, currentNode);
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
            traverseTreeToInsert(currentNode.right, deleteNumber, currentNode);
        }
        else if (currentNode.value > deleteNumber)
        {
            console.log("<< Go Left <<");
            console.log(currentNode);
            traverseTreeToInsert(currentNode.left, deleteNumber, currentNode);
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

function preOrder(node, nodeName)
{
    if (node == null)
    {
        return;
    }
    console.log(`${nodeName}: `, node.value);
    preOrder(node.left, "Left Child");
    preOrder(node.right, "Right Child");
}

const numberToDelete = 7;



tree.display(tree.root, 0, "Root");
console.log(tree.getTreeHeight());



