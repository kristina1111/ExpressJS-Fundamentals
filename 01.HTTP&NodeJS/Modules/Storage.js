class Storage {
    constructor(){
        this.data = []
    }

    validateKeyType(key){
        if(typeof key !== 'string'){
            throw new Error('Key must be string!')
        }
        return true;
    }

    validateKeyExists(key){
        return this.data.hasOwnProperty(key)

    }

    put(key, value){
        if(this.validateKeyType(key)){
            if(this.validateKeyExists(key)){
                throw new Error('Key already exists!')
            }
        }

        this.data[key] = value;
        return this;
    }

    get(key){
        if(this.validateKeyType(key)){
            if(!this.validateKeyExists(key)){
                throw new Error('Key does not exists!')
            }
        }

        return this.data[key];
    }

    update(key, value){
        if(this.validateKeyType(key)){
            if(!this.validateKeyExists(key)){
                throw new Error('Key does not exists!')
            }
        }

        this.data[key] = value;
        return this;
    }

    deleteItem(key){
        if(this.validateKeyType(key)){
            if(!this.validateKeyExists(key)){
                throw new Error('Key does not exists!')
            }
        }

        delete this.data[key];
        return this;
    }

    clear(){
        this.data = [];
    }

    save(){

    }

    load(){

    }

    all(){
        return this.data;
    }
}

let storage = new Storage();

module.exports = storage;