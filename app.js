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





class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class HashTableJSON {
  constructor(size) {
    this.size = size;
    this.data = new Array(size);
  }

  // _hash(key) {
  //   const hash = SHA256(key).toString();
  //   const index = parseInt(hash, 16) % this.size;
  //   return index;
  // }
  _hash(key) {
    const salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const hashedKey = SHA256(key + salt).toString();
    return hashedKey % this.size;
  }

  set(key, value) {
    let index = this._hash(key);
    let step = 1;
    while (this.data[index]) {
      // Linear probing to the next available slot
      index = (index + step) % this.data.length;
      step++;
    }
    data[index] = [key, value];
  }

  get(key) {
    let index = this._hash(key);
    let step = 1;
    while (this.data[index]) {
      if (this.data[index][0] === key) {
        return this.data[index][1];
      }
      // Linear probing to the next slot
      index = (index + step) % this.data.length;
      step++;
    }
    return undefined;
  }
  values() {
    let valuesArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        valuesArr.push(this.keyMap[i][1]);
      }
    }
    return valuesArr;
  }

  entries() {
    let entriesArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        entriesArr.push(this.keyMap[i]);
      }
    }
    return entriesArr;
  }
  searchByName(name) {
    for (let i = 0; i < this.data.length; i++) {
      // console.log(data[i]);
      if (data[i] === undefined) continue;
      if (data[i].name === name) {
        return data[i];
      }
    }
    return null;
  }
}
class HashTableJSON2 {
  constructor() {
    this.root = null;
  }
  _hash(key) {
    const salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const hashedKey = SHA256(key + salt).toString();
    return hashedKey % this.size;
  }
  insert(key, value) {
    const hash = this._hash(key);
    const newNode = new Node(key, value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (current) {
      if (hash < this._hash(current.key)) {
        if (!current.left) {
          current.left = new Node(key,value);
          break;
        }
        current = current.left;
      } else if (hash > this._hash(current.key)) {
        if (!current.right) {
          current.right = new Node(key,value);
          break;
        }
        current = current.right;
      } else {
        // key already exists, update the value
        current.value = value;
        break;
      }
    }
  }
  searchByName(name) {
    const hash = this._hash(name);
    let current = this.root;
    while (current) {
      console.log(current);
      if (hash < this._hash(current.key)) {
        current = current.left;
        console.log(current);
      } else if (hash > this._hash(current.key)) {
        current = current.right;
        console.log(current);
      } else if (current.key === name) {
        console.log(current.key);
        return current.value;
      } else {
        // key not found
        break;
      }
    }
    return null;
  }
}  

const myHashTableJSON = new HashTableJSON(500);
const myHashTableJSON2 = new HashTableJSON2(500);

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
    'Ellie', 'Colton', 'Genesis', 'Brandon', 'Paisley', 'Evan', 'Naomi', 'Asher', 'Aaliyah', 'Jace', 'Georgia'
  ];
  
  const data = [];
  
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const age = Math.floor(Math.random() * 90) + 1; // generate random age between 1 and 100
    data.push({ name, age });
  }

  return data;
}

const data = generateRandomData();

data.forEach(item => {
  myHashTableJSON.set(item, item.age);
});
data.forEach(item => {
  myHashTableJSON2.insert(item, item.age);
});
 

// console.time();
// console.log(myHashTableJSON.searchByName('Alyssa')); // Output: { name: 'Alyssa', age: 26 }

// console.timeEnd();
console.time();
console.log(myHashTableJSON2.searchByName('Alyssa')); // Output: { name: 'Alyssa', age: 26 }

console.timeEnd();
// myHashTableJSON.delete({ name: 'Charlie', age: 35 });


module.exports = app;
