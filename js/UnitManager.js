var UnitManager = function(game, team, startGold){
    this.game = game;
    
    this.gold = 0;
    
    this.ai = false;
    
    this.castleHp = 150;
    this.castleMaxHp = 150;
    
    this._canSendUnit = true;
    
    if(typeof startGold !== 'undefined'){
        this.gold = startGold;
    }
    
    this.team = team;
    
    this.game.time.events.loop(2500, function(){
        var range = [];
        if(this.team == 'blue'){
            range = [2, 5];
        } else if(this.team == 'red'){
            if(difficulty == 'easy'){
                range = [1, 3];
            } else if(difficulty == 'normal'){
                range = [2, 3];
            } if(difficulty == 'hard'){
                range = [2, 8];
            }else if(difficulty == 'cheater'){
                range = [5, 9];
            }
        }
        this.addGold(this.game.rnd.integerInRange(range[0], range[1]));
    }, this);    
    
    
};

UnitManager.prototype = {    
    addGold: function(value){
        this.gold += value;
        
        if(this.ai == false){
            gui.redrawGold();
        }
    },
    takeGold: function(value){
        this.gold -= value;
        
        if(this.ai == false){
            gui.redrawGold();
        }
    },
    tryBuyUnit: function(unit){
        if(this.canBuyUnit(unit)){
            this.buyUnit(unit);
            this.takeGold(unit.price);
        }
        
        if(this.ai == false && unit.price >= this.gold){
            gui.noGoldWarnBlink();
        }
    },
    canBuyUnit: function(unit){
        return (unit.price <= this.gold && this._canSendUnit);
    },
    buyUnit: function(unit){
        if(this.team == 'blue'){
            new Unit(this.game, world.spawnPoints[0], unit, this.team);
        } else if(this.team == 'red'){
            new Unit(this.game, world.spawnPoints[1], unit, this.team);
        }
        this._canSendUnit = false;
        
        this.game.time.events.add(500, function(){
            this._canSendUnit = true;
        }, this);
        
    },
    castelTakeDamage: function(damage){
        this.castleHp -= damage;
        if(this.team == 'blue'){
            gui.redrawPlayerCastleHp();
        }
        
        if(this.castleHp <= 0 && world.isGameOver == false){
            if(this.team == 'blue'){
                world.gameOver('lose');
            } else {
                world.gameOver('win');
            }
        }
    },
    tryRepairCastle: function(){
        if(this.castleHp == this.castleMaxHp){
            return;
        }
        
        if(this.gold >= UnitSettings.castleRepair.price){
            this.repairCastle();
            this.takeGold(UnitSettings.castleRepair.price);
        } else if(this.ai == false){
            gui.noGoldWarnBlink();
        }
    },
    repairCastle: function(){
        this.castleHp += UnitSettings.castleRepair.hp;
        if(this.castleHp > this.castleMaxHp){
            this.castleHp = this.castleMaxHp;
        }
        if(this.team == 'blue'){
            gui.redrawPlayerCastleHp();
        } else if(this.team == 'red'){
            gui.redrawEnemyCastleHp();
        }
    },
};