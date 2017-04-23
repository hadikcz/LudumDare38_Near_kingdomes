var AI = function(game, difficulty){
    
    this.game = game;
    
    this.team = 'red';
    
    this.difficulty = difficulty;
    
    this.unitManager = new UnitManager(this.game, this.team, 50);
    this.unitManager.ai = true;
    
    this.unitManager._canSendUnit = false;
    
    this.game.time.events.add(1500, function(){
        this.unitManager._canSendUnit = true;
    }, this);
    
    this.minimalAttackGold = this.game.rnd.integerInRange(35, 65);
    
    if(this.difficulty == 'cheater'){
        this.game.time.events.loop(10000, function(){
        if(world.isGameOver) return;
            this.unitManager.addGold(this.game.rnd.integerInRange(15, 25));
        }, this); 
    }
    
    // attack groups
    this.game.time.events.loop(35000, function(){
        if(world.isGameOver) return;
        this.attackGroup();
    }, this);
};

AI.prototype = {
    update: function(){
        if(world.isGameOver) return;
        
        this.handleWorker();
        this.handleArmy();
        this.handleRepairCastle();
    },
    
    handleWorker: function(){        
        if(!this.isSafeSpawnWorker()){
            return;
        }
        var workerCount = this.getUnitCount(UnitSettings.worker);
        var treeCount = this.getCountOfGrowerTree();
        
        
        if(workerCount < treeCount){
            if(this.unitManager.canBuyUnit(UnitSettings.worker)){
                this.unitManager.tryBuyUnit(UnitSettings.worker);
            }
        }
    },
    
    handleArmy: function(){
        if(this.unitManager.gold <= this.minimalAttackGold){
            return;
        }
        
        this.minimalAttackGold = this.game.rnd.integerInRange(35, 65);
        
        var soldierCount =  this.getUnitCount(UnitSettings.soldier); 
        var horseCount =  this.getUnitCount(UnitSettings.horseRider); 
        
        
        var rnd = this.game.rnd.integerInRange(0, 2);
        if(rnd == 0){
            var unit = UnitSettings.horseRider;
        } else {
            var unit = UnitSettings.soldier;
        }
        
        if(this.unitManager.canBuyUnit(unit)){
            this.unitManager.tryBuyUnit(unit);
        }
    },
    
    handleRepairCastle: function(){
        if(this.unitManager.castleHp < this.unitManager.castleMaxHp / 1.25){
            this.unitManager.tryRepairCastle();
        }
        
        if(this.unitManager.castleHp < this.unitManager.castleMaxHp && this.unitManager.gold >= 150){
            this.unitManager.tryRepairCastle();
        }
    },
    attackGroup: function(){
        var unitsAttack = [];
        
        if(this.difficulty == 'easy'){
            unitsAttack = [UnitSettings.soldier, UnitSettings.soldier];
        } else if(this.difficulty == 'normal'){
            unitsAttack = [UnitSettings.horseRider, UnitSettings.soldier, UnitSettings.soldier];
        } else if(this.difficulty == 'hard'){
            unitsAttack = [UnitSettings.horseRider, UnitSettings.soldier, UnitSettings.soldier, UnitSettings.soldier];
        } else if(this.difficulty == 'cheater'){
            unitsAttack = [UnitSettings.horseRider, UnitSettings.horseRider, UnitSettings.soldier, UnitSettings.soldier, UnitSettings.soldier, UnitSettings.soldier];   
        }
        
        var i = 0;
        var step = 1000;
        
        unitsAttack.forEach(function(attackingUnit){
            i++;
            this.game.time.events.add(i * step, function(){
                this.unitManager.buyUnit(attackingUnit);
            }, this);
        }, this);
    },
    // helpers
    getUnitCount: function(searchedUnit){
        var count = 0;
        units.children.forEach(function(unit){
            if(unit.typeSettings.defaultSprite == searchedUnit.defaultSprite && unit.team == this.team){
                count++;
            }
        }, this);
        return count;
    },
    getCountOfGrowerTree: function(){
        var count = 0;  
        
        world.trees.children.forEach(function(tree){
            if(tree.scale.x >= 1){
                count ++;
            }
        }, this);
        return count;
    },
    isSafeSpawnWorker: function(){
        var minimalSafeDistance = 500;
        var isSafe = true;
        
        units.children.forEach(function(unit){
            if(unit.team != this.team && unit.typeSettings.offensive == true){
                if(this.game.physics.arcade.distanceBetween(unit, world.castles.children[1]) < minimalSafeDistance){
                    isSafe = false;
                }
            }
        }, this);
        return isSafe;
    },
    
    
};