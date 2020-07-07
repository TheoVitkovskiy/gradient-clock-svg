import createFruit from './fruit.js';

const createFruitContainer = () => {

    const orange = createFruit('orange');
    const tomato = createFruit('tomato');
    const pear = createFruit('pear');
    const apple = createFruit('apple');
    const fruits = [orange, tomato, pear, apple];

    return {
        orange,
        tomato,
        pear,
        apple,
        fruits,
        getNextActiveFruit() {
            return fruits.find(fruit => !fruit.isRipe() && !fruit.isIdle());
        }
    }
}

const fruitContainer = createFruitContainer();

export {
    fruitContainer
}


