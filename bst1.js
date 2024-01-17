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


}


const unsortedArray =  [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(unsortedArray);

console.log(tree.root);


