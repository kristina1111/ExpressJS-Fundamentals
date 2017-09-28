let storage = require('./Modules/Storage');

//  asyncronous solution with promise
storage.load()
.then(function () {
    console.log('first load')
    console.log(storage.getAll())
})
storage.put('first', 'firstValue')
storage.put('second', 'secondValue')
storage.put('third', 'thirdValue')
storage.put('fouth', 'fourthValue')
console.log(storage.get('first'))
console.log(storage.getAll())
storage.deleteItem('second')
storage.update('first', 'updatedFirst')
storage.save()
storage.clear()
console.log(storage.getAll())

//  asyncronous solution with promise
storage.load()
    .then(function () {
        console.log('second load')
        console.log(storage.getAll())
    })


// // asyncronous solution with callback
// storage.load(function() {
//     console.log(storage.getAll())
// })