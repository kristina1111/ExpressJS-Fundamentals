const fs = require('fs');
const path = require("path");

class Storage {
    constructor() {
        this.data = {}
    }

    validateKeyType(key) {
        if (typeof key !== 'string') {
            throw new Error('Key must be string!')
        }
        return true;
    }

    validateKeyExists(key) {
        return this.data.hasOwnProperty(key)

    }

    put(key, value) {
        if (this.validateKeyType(key)) {
            if (this.validateKeyExists(key)) {
                throw new Error('Key already exists!')
            }
        }

        this.data[key] = value;
        return this;
    }

    get(key) {
        if (this.validateKeyType(key)) {
            if (!this.validateKeyExists(key)) {
                throw new Error('Key does not exists!')
            }
        }

        return this.data[key];
    }

    update(key, value) {
        if (this.validateKeyType(key)) {
            if (!this.validateKeyExists(key)) {
                throw new Error('Key does not exists!')
            }
        }

        this.data[key] = value;
        return this;
    }

    deleteItem(key) {
        if (this.validateKeyType(key)) {
            if (!this.validateKeyExists(key)) {
                throw new Error('Key does not exists!')
            }
        }

        delete this.data[key];
        return this;
    }

    clear() {
        this.data = {};
    }

    save() {
        fs.writeFileSync(path.join(__dirname, '..', 'data.json'), JSON.stringify(this.data), 'utf8');
    }

    load(callback) {
        let that = this;

        //  asyncronous solution with promise
        return new Promise(function (resolve, reject) {
            fs.readFile(path.join(__dirname, '..', 'data.json'), 'utf8', function (err, data) {
                if (err) {
                    return
                }
                that.data = JSON.parse(data);

                resolve();
            })
        })

        // // asyncronous solution with callback
        // let that = this;
        // fs.readFile(path.join(__dirname, '..', 'data.json'),'utf8', function(err, data){
        //     if(err){
        //         return
        //     }

        //     that.data = JSON.parse(data);

        //     callback();
        // })
    }

    getAll() {
        if (Object.keys(this.data).length === 0) {
            return "There are no items in the storage"
        }
        return this.data;
    }

    toString() {
        return JSON.stringify(this.data);
    }
}

let storage = new Storage();

module.exports = storage;