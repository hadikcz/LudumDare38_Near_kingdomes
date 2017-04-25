var UnitSettings = {
    worker: {
        defaultSprite: 'workerWalk',
        velocity: 40,
        animationSpeed: 7,
        hp: 5,
        price: 5,
        offensive: false,
        attackForce: 0,
        animations: {
            mine: 'workerMine',
            carry: 'workerCarry',
        }
    },
    soldier: {
        defaultSprite: 'soldierWalk',
        velocity: 55,
        animationSpeed: 10,
        hp: 5,
        price: 15,
        offensive: true,
        attackForce: 5,
        animations: {}
    },
    horseRider: {
        defaultSprite: 'horseWalk',
        animationSpeed: 10,
        velocity: 100, // 100
        hp: 10,
        price: 30,
        offensive: true,
        attackForce: 10,
        animations: {},
    },
    castleRepair: {
        hp: 25,
        price: 100,
    },
};