let storage = require('./Modules/Storage');

storage.put('first', 'my first text')
    .put('second', 'my second text')
    .put('third', 'my third text');

storage.clear();
// console.log(storage.get('second'));

console.log(storage.all());