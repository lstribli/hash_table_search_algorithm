var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});









//CONCEPT HASHTABLE*************************************************

const { SHA256 } = require('crypto-js');

class HashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size);
  }

  hash(key) {
    const hashValue = SHA256(key.toString()).toString();
    let index = 0;
    for (let i = 0; i < hashValue.length; i++) {
      index += hashValue.charCodeAt(i);
    }
    return index % this.size;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    this.table[index].push([key, value]);
  }

  get(key) {
    const index = this.hash(key);
    if (!this.table[index]) {
      return undefined;
    }
    for (let i = 0; i < this.table[index].length; i++) {
      if (this.table[index][i][0] === key) {
        return this.table[index][i][1];
      }
    }
    return undefined;
  }

  remove(key) {
    const index = this.hash(key);
    if (!this.table[index]) {
      return undefined;
    }
    for (let i = 0; i < this.table[index].length; i++) {
      if (this.table[index][i][0] === key) {
        const removedValue = this.table[index][i][1];
        this.table[index].splice(i, 1);
        if (this.table[index].length === 0) {
          this.table[index] = undefined;
        }
        return removedValue;
      }
    }
    return undefined;
  }
}

function populateHashTable(hashTable) {
  const names = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Frank',
    'Grace',
    'Heidi',
    'Ivan',
    'Jack',
    'Kate',
    'Larry',
    'Mallory',
    'Nancy',
    'Oscar',
    'Peggy',
    'Quentin',
    'Ralph',
    'Steve',
    'Tina',
    'Ursula',
    'Victor',
    'Wendy',
    'Xavier',
    'Yvonne',
    'Zelda',
  ];
  const numElements = hashTable.size;
  for (let i = 0; i < numElements; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAge = Math.floor(Math.random() * 100);
    hashTable.set(randomName, randomAge);
  }
}

// Example usage
const myHashTable = new HashTable(100);
populateHashTable(myHashTable);


console.time();
console.log(myHashTable.get('Ivan')); // Output: Number
console.log(myHashTable.get('baz')); // Output: undefined
console.log(myHashTable.get(42)); // Output: undefined
console.log(myHashTable.get('David')); // Output: Number
console.timeEnd();
// Okay we got to build a quick proof of concept. Let's try something more advanced.







//BINARY SEARCH HASHTABLE******************************************

//In the spirit of being useful-
//Let's build a search that can access properties of an object in JSON, returning the whole object.


//WE NEED DSA
//Let's build some nodes
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
//And a binary tree to search with
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  //I wonder how fast this thing would get if I put
  // that sick CB/Glide sorting algorithm from a few days ago in here... 
  //Since you know, like a BST is way faster if the elements are pre-storted. Mayybe later.
  insert(key, value) {
    const newNode = new Node(key, value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;

    while (currentNode) {
      if (this._compareKeys(key, currentNode.key) < 0) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else if (this._compareKeys(key, currentNode.key) > 0) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      } else {
        // key already exists, update the value
        currentNode.value = value;
        return;
      }
    }
  }

  _compareKeys(key1, key2) {
    const name1 = key1.name;
    const name2 = key2.name;
    if (name1 < name2) {
      return -1;
    } else if (name1 > name2) {
      return 1;
    } else {
      return 0;
    }
  }


  searchAll(key) {
    const nodes = [];
    let currentNode = this.root;

    while (currentNode) {
      // console.log(currentNode.key);
      if (this._compareKeys(key, currentNode.key) === 0) {
        nodes.push(currentNode.key);
        currentNode = currentNode.left; // keep searching for matches in the left subtree
      } else if (this._compareKeys(key, currentNode.key) < 0) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return nodes;
  }
  
}


//Ok let's make a cool hash table that uses SHA-256 hashing algo
class HashTable2 {
  constructor(size = 32) {
    this.size = size;
    this.buckets = new Array(this.size);
    this.count = 0; // Keep track of the number of elements
    this.bst = new BinarySearchTree();
  }
  //we might have multiple names, lets get salty with it
  _hash(key) {
    const salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const hashedKey = SHA256(key + salt).toString();
    return hashedKey % this.size;
  }
  //This took me way longer than it should have
  insert(key, value) {
    const hash = this._hash(key);

    if (!this.buckets[hash]) {
      this.buckets[hash] = [];
    }

    // Check if the key already exists in the bucket
    const index = this.buckets[hash].findIndex(([k, v]) => k === key);
    if (index === -1) {
      // Key does not exist, add it to the bucket
      this.buckets[hash].push([key, value]);
      this.count++;
      this.bst.insert(key, value);
    } else {
      // Key already exists, update the value
      this.buckets[hash][index][1] = value;
    }

    // Check if the load factor exceeds the threshold
    if (this.count / this.size > 0.7) {
      this.resize();
    }
  }

  resize(newSize = this.size * 2) {
    // Create a new array with the new size
    const newBuckets = new Array(newSize);
    const newBST = new BinarySearchTree();

    // Rehash all elements and insert them into the new array
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let [key, value] of bucket) {
          const hash = this._hash(key);

          if (!newBuckets[hash]) {
            newBuckets[hash] = [];
          }

          newBuckets[hash].push([key, value]);
          newBST.insert(key, value);
        }
      }
    }

    this.buckets = newBuckets;
    this.size = newSize;
    this.bst = newBST;
  }
  
  searchAll(name) {
    const nodes = [];
    
    // Search the primary hash table
    const index = this._hash(name);
    for (let node of this.buckets[index]) {
      // console.log(node[0]);
      if (node[0].name === name) {
        nodes.push(node[0]);
      }
    }
    return nodes;
  }
}

//We need to test this
function generateRandomData() {
  const names = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Logan', 'Isabella', 'Lucas', 'Mia', 'Jackson', 'Charlotte',
    'Jacob', 'Amelia', 'William', 'Harper', 'Evelyn', 'Michael', 'Abigail', 'Benjamin', 'Emily', 'Alexander', 'Elizabeth',
    'Ella', 'Daniel', 'Avery', 'Matthew', 'Sofia', 'Joseph', 'Madison', 'Oliver', 'Scarlett', 'Carter', 'Victoria',
    'David', 'Aria', 'Isaac', 'Grace', 'Mason', 'Chloe', 'Samuel', 'Penelope', 'Sebastian', 'Riley', 'Henry', 'Lily',
    'Owen', 'Eleanor', 'Gabriel', 'Hannah', 'Caleb', 'Aubrey', 'Connor', 'Addison', 'Levi', 'Natalie', 'Nicholas',
    'Aaliyah', 'Isabelle', 'Grayson', 'Alyssa', 'Alyssa','Alyssa', 'Julian', 'Lila', 'Eli', 'Brooklyn', 'Ryan', 'Ellie', 'Luna', 'William',
    'Stella', 'Jayden', 'Savannah', 'Christopher', 'Maya', 'Aiden', 'Skylar', 'Jonathan', 'Audrey', 'Ella', 'Leah',
    'Nathan', 'Bella', 'Zoe', 'Eva', 'Aaron', 'Claire', 'Christian', 'Lucy', 'Adrian', 'Alice', 'Hazel', 'Caroline',
    'Landon', 'Aurora', 'Thomas', 'Katherine', 'Robert', 'Kylie', 'Easton', 'Makayla', 'Grayson', 'Nova', 'Josiah',
    'Ellie', 'Colton', 'Genesis', 'Brandon', 'Paisley', 'Evan', 'Naomi', 'Asher', 'Aaliyah', 'Jace', 'Georgia',
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Logan', 'Isabella', 'Lucas', 'Mia', 'Jackson', 'Charlotte',
    'Jacob', 'Amelia', 'William', 'Harper', 'Evelyn', 'Michael', 'Abigail', 'Benjamin', 'Emily', 'Alexander', 'Elizabeth',
    'Ella', 'Daniel', 'Avery', 'Matthew', 'Sofia', 'Joseph', 'Madison', 'Oliver', 'Scarlett', 'Carter', 'Victoria',
    'David', 'Aria', 'Isaac', 'Grace', 'Mason', 'Chloe', 'Samuel', 'Penelope', 'Sebastian', 'Riley', 'Henry', 'Lily',
    'Owen', 'Eleanor', 'Gabriel', 'Hannah', 'Caleb', 'Aubrey', 'Connor', 'Addison', 'Levi', 'Natalie', 'Nicholas',
    'Aaliyah', 'Isabelle', 'Grayson', 'Alyssa', 'Alyssa','Alyssa', 'Julian', 'Lila', 'Eli', 'Brooklyn', 'Ryan', 'Ellie', 'Luna', 'William',
    'Stella', 'Jayden', 'Savannah', 'Christopher', 'Maya', 'Aiden', 'Skylar', 'Jonathan', 'Audrey', 'Ella', 'Leah',
    'Nathan', 'Bella', 'Zoe', 'Eva', 'Aaron', 'Claire', 'Christian', 'Lucy', 'Adrian', 'Alice', 'Hazel', 'Caroline',
    'Landon', 'Aurora', 'Thomas', 'Katherine', 'Robert', 'Kylie', 'Easton', 'Makayla', 'Grayson', 'Nova', 'Josiah',
    'Ellie', 'Colton', 'Genesis', 'Brandon', 'Paisley', 'Evan', 'Naomi', 'Asher', 'Aaliyah', 'Jace', 'Georgia',
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Logan', 'Isabella', 'Lucas', 'Mia', 'Jackson', 'Charlotte',
    'Jacob', 'Amelia', 'William', 'Harper', 'Evelyn', 'Michael', 'Abigail', 'Benjamin', 'Emily', 'Alexander', 'Elizabeth',
    'Ella', 'Daniel', 'Avery', 'Matthew', 'Sofia', 'Joseph', 'Madison', 'Oliver', 'Scarlett', 'Carter', 'Victoria',
    'David', 'Aria', 'Isaac', 'Grace', 'Mason', 'Chloe', 'Samuel', 'Penelope', 'Sebastian', 'Riley', 'Henry', 'Lily',
    'Owen', 'Eleanor', 'Gabriel', 'Hannah', 'Caleb', 'Aubrey', 'Connor', 'Addison', 'Levi', 'Natalie', 'Nicholas',
    'Aaliyah', 'Isabelle', 'Grayson', 'Alyssa', 'Alyssa','Alyssa', 'Julian', 'Lila', 'Eli', 'Brooklyn', 'Ryan', 'Ellie', 'Luna', 'William',
    'Stella', 'Jayden', 'Savannah', 'Christopher', 'Maya', 'Aiden', 'Skylar', 'Jonathan', 'Audrey', 'Ella', 'Leah',
    'Nathan', 'Bella', 'Zoe', 'Eva', 'Aaron', 'Claire', 'Christian', 'Lucy', 'Adrian', 'Alice', 'Hazel', 'Caroline',
    'Landon', 'Aurora', 'Thomas', 'Katherine', 'Robert', 'Kylie', 'Easton', 'Makayla', 'Grayson', 'Nova', 'Josiah',
    'Ellie', 'Colton', 'Genesis', 'Brandon', 'Paisley', 'Evan', 'Naomi', 'Asher', 'Aaliyah', 'Jace', 'Georgia'
  ];
  
  const data = [];
  
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const age = Math.floor(Math.random() * 90) + 1; // generate random age between 1 and 90
    data.push({ name, age });
  }
  return data;
}

const data = generateRandomData();
//***NEED A FUNCTION HERE TO AUTO-ALLOCATE TABLE SIZE BASED ON INPUT SIZE.  */
const myHashTable2 = new HashTable2(700);

data.forEach(item => {
  myHashTable2.insert(item, item.age);
});

//It's ALIVE
console.time();
console.log(myHashTable2.searchAll('Alyssa')); // Output: { name: 'Alyssa', age: 26 }
console.timeEnd();


module.exports = app;
