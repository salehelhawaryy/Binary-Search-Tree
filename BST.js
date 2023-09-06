function mergeSort(arr){
    if (arr.length === 1)
        return arr
    else{
        let a = arr.slice(0, arr.length / 2)
        let b = arr.slice(arr.length / 2);
        a = mergeSort(a)
        b = mergeSort(b)
        return merge(a, b)
    }
}

function merge(arrA, arrB){
    let j = 0;
    let res = [];
    for (let i = 0 ; i < arrA.length || j < arrB.length; i++){
        if (i >= arrA.length){
            res.push(arrB[j])
            j++;
            continue;
        }
        if (j >= arrB.length){
            res.push(arrA[i])
            continue;
        }
        if (arrA[i] < arrB[j])
            res.push(arrA[i]);
        else if (arrB[j] < arrA[i]){
            res.push(arrB[j]);
            j++; i--;
        }
        else {
            res.push(arrB[j]); res.push(arrA[i])
            j++;
        }
    }
    return res;
}

class Node{
    constructor(data){
        this.data = data
        this.left = null
        this.right = null
    }
    insertBST(value){
        let node = this
        if (node.data != value){
            if (node.data > value)
                if (!node.left)
                    node.left = new Node(value)
                else
                    node.left.insertBST(value, node.left)
            else
                if (!node.right)
                    node.right = new Node(value)
                else
                    node.right.insertBST(value, node.right)
        }
        else
            console.log(`Tree already has node with value ${value}, Cannot insert duplicates`)
    }
    delete(value){
        let node = this
        if (node.left && node.left.data === value){
            node.left = null
            return
        }
        if (node.right && node.right.data === value){
            node.right = null
            return;
        }
        if (node.data > value && node.left)
            node.left.delete(value)
        else if (node.right)
            node.right.delete(value)
        else
            console.log(`No node with value ${value} in Tree`);
    }
    find(value){
        let node = this
        if (node.left && node.left.data === value){
            return (node.left);
        }
        if (node.right && node.right.data === value){
            return (node.right);
        }
        if (node.data > value && node.left)
            return (node.left.find(value))
        else if (node.right)
            return (node.right.find(value))
        else
            console.log(`No node with value ${value} in Tree`);
    }
    levelOrder(func){
        let node = this
        let res = []
        if (func)
            res.push(func(node))
        else
            res.push(node.data)
        let queue = []
        if(node.left)
            queue.push(node.left)
        if(node.right)
            queue.push(node.right)
        while(queue.length != 0){
            let curr = queue.shift()
            if (func)
                res.push(func(curr))
            else
                res.push(curr.data)
            if (curr.left)
                queue.push(curr.left)
            if (curr.right)
                queue.push(curr.right)
        }
        return res;
    }
    inOrder(func){
        let node = this;
        if (func) {
            if (node.left && node.right)
                return (node.left.inOrder(func)).concat([func(node)]).concat(node.right.inOrder(func))
            else if (node.left && !node.right)
                return (node.left.inOrder(func)).concat([func(node)])
            else if (!node.left && node.right)
                return [func(node)].concat(node.right.inOrder(func))
            else
                return [func(node)]
        }
        else {
            if (node.left && node.right)
                return (node.left.inOrder(func)).concat([node.data]).concat(node.right.inOrder(func))
            else if (node.left && !node.right)
                return (node.left.inOrder(func)).concat([node.data])
            else if (!node.left && node.right)
                return [node.data].concat(node.right.inOrder(func))
            else
                return [node.data]
        }
    }
    preOrder(func){
        let node = this
        if (func) {
            if (node.left && node.right)
                return [func(node)].concat(node.left.preOrder(func)).concat(node.right.preOrder(func))
            else if (node.left && !node.right)
                return [func(node)].concat(node.left.preOrder(func))
            else if (!node.left && node.right)
                return [func(node)].concat(node.right.preOrder(func))
            else
                return [func(node)]
        }
        else {
            if (node.left && node.right)
                return [node.data].concat(node.left.preOrder(func)).concat(node.right.preOrder(func))
            else if (node.left && !node.right)
                return [node.data].concat(node.left.preOrder(func))
            else if (!node.left && node.right)
                return [node.data].concat(node.right.preOrder(func))
            else
                return [node.data]
        }
    }
    postOrder(func){
        let node = this
        if (func) {
            if (node.left && node.right)
                return (node.left.postOrder(func)).concat(node.right.postOrder(func)).concat([func(node)])
            else if (node.left && !node.right)
                return (node.left.postOrder(func)).concat([func(node)])
            else if (!node.left && node.right)
                return (node.right.postOrder(func)).concat([func(node)])
            else
                return [func(node)]
        }
        else {
            if (node.left && node.right)
                return (node.left.postOrder(func)).concat(node.right.postOrder(func)).concat([node.data])
            else if (node.left && !node.right)
                return (node.left.postOrder(func)).concat([node.data])
            else if (!node.left && node.right)
                return (node.right.postOrder(func)).concat([node.data])
            else
                return [node.data]
        }
    }
    isBalanced(){
        let node = this
        if (node.left && node.right){
            if (Math.abs(nodeHeight(node.left) - nodeHeight(node.left)) <= 1){
                if (node.left.isBalanced() && node.right.isBalanced())
                    return true
                else
                    return false
            }
            else
                return false
        }
        else if(node.left){
            if (nodeHeight(node.left) == 0)
                return true
            else
                return false
        }
        else if(node.right){
            if (nodeHeight(node.right) == 0)
                return true
            else
                return false
        }
        else
            return true
    }
}

class Tree{
    constructor(arr2){
        let arr = mergeSort(arr2)
        arr = [... new Set(arr)]
        this.root = this.buildTree(arr, this.root)
    }
    buildTree(arr, node){
        let currRoot = arr[Math.floor(arr.length / 2)]
        let leftArr = arr.slice(0, arr.length / 2);
        let rightArr;
        if (arr.length % 2 == 0)
            rightArr = arr.slice(Math.ceil(arr.length / 2) + 1)
        else
            rightArr = arr.slice(Math.ceil(arr.length / 2) );
        node = new Node(currRoot);
        if (arr.length === 1)
            return node
        if (arr.length < 3){
            node.left = new Node(arr[0])
            return node
        }
        if (leftArr.length == 1 && rightArr.length == 1){
            node.left = new Node(leftArr[0])
            node.right = new Node(rightArr[0])
            return node;
        }
        node.left = this.buildTree(leftArr, node.left)
        node.right = this.buildTree(rightArr, node.right)
        return node;
    }
    insert(value){
        this.root.insertBST(value)
    }
    delete(value){
        this.root.delete(value);
    }
    
    find(value){
        return (this.root.find(value));
    }
    levelOrder(func){
        return this.root.levelOrder(func)
    }
    inOrder(func){
        return this.root.inOrder(func)
    }
    preOrder(func){
        return this.root.preOrder(func)
    }
    postOrder(func){
        return this.root.postOrder(func)
    }
    height(){
        return nodeHeight(this.root)
    }
    depth(node){
        if (!node) return -1
        let currNode = this.root;
        let count = 0
        while(currNode && currNode != node){
            if (node.data > currNode.data){
                currNode = currNode.right
                count++
            }
            else{
                currNode = currNode.left
                count++
            }
        }
        if (currNode == node)
            return count
        else
            return -1
    }
    isBalanced(){
        return this.root.isBalanced()
    }
    rebalance(){
        this.root = this.buildTree(this.inOrder())
    }
}


function nodeHeight(node){
    if (node.left && node.right){
        return 1 + Math.max(nodeHeight(node.left), nodeHeight(node.right))
    }
    else if(node.left){
        return 1 + nodeHeight(node.left)
    }
    else if(node.right){
        return 1 + nodeHeight(node.right)
    }
    else{
        return 0
    }
}




const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };



let arr = randN(25)
const tree = new Tree(arr)
prettyPrint(tree.root)
console.log("Balanced: ", tree.isBalanced())
console.log('inOrder: ', tree.inOrder())
console.log('preOrder: ', tree.preOrder())
console.log('postOrder: ', tree.postOrder())
console.log("------------------------UNBALANCE TREE------------------------")
tree.insert(105)
tree.insert(110)
tree.insert(120)
tree.insert(130)
tree.insert(140)
tree.insert(150)
tree.insert(160)
tree.insert(170)
tree.insert(180)
tree.insert(190)
tree.insert(-5)
tree.insert(-10)
tree.insert(-20)
tree.insert(-50)
tree.insert(-55)
tree.insert(-56)
tree.insert(-57)
prettyPrint(tree.root)
console.log("Balanced: ", tree.isBalanced())
console.log("------------------------REBALANCE TREE------------------------")
tree.rebalance()
prettyPrint(tree.root)
console.log("Balanced: ", tree.isBalanced())
console.log('inOrder: ', tree.inOrder())
console.log('preOrder: ', tree.preOrder())
console.log('postOrder: ', tree.postOrder())

function randN(n){
    let arr = []
    for (let i = 0 ; i < n ; i++){
        arr.push(Math.round((1 + Math.random() * 100) )) 
    }
    return arr
}