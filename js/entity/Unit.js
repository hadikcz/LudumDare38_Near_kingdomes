var Unit = function(game, x, type, team){
    this.game = game;
    
    this.team = team;
    
    this.typeSettings = type;
    
    this.hp = this.typeSettings.hp;
    
    this._destroyInNextTick = false;
    
    this._canAttack = true;
    
    this.state = 'walk';
    
    this.velocity = this.typeSettings.velocity;
    
    Phaser.Sprite.call(this, this.game, x, world.defaultYHigh + 3, this.typeSettings.defaultSprite + capitalize(team));
    this.game.add.existing(this);
    
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    
    
    this.body.setSize(32, 64, 16, 0);
    
    this.anchor.setTo(0.5, 0);
    
    units.add(this);
    
    this.defaultAnimation = this.animations.add('walk');
    this.defaultAnimation.play(this.typeSettings.animationSpeed, true);
    
    this.soundMine = this.game.add.audio('mine' + this.game.rnd.integerInRange(1, 3));
    this.soundDie = this.game.add.audio('unitCrashCastle' + this.game.rnd.integerInRange(1, 3));
};

Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.update = function(){
    if(this._destroyInNextTick === true){
        this.destroy();
        return;
    }
    
    if(this.hp <= 0){
        this.die();
    }
    
    if(this._canAttack && this.typeSettings.offensive == true){
        new Bullet(game, this.x, this.y, this.team, this.typeSettings.attackForce);
        this._canAttack = false;
        
        this.game.time.events.add(1000, function(){
            this._canAttack = true;
        }, this);
    }
    
    
    if(this.team == 'blue'){
        this.body.velocity.x = this.velocity;
    } else {
        this.body.velocity.x = -this.velocity;
        if(this.state != 'carry'){
            this.scale.setTo(-1, 1);
        }
    }
    
    
    this.game.physics.arcade.overlap(this, world.trees, this.processHitTree, null, this);
    this.game.physics.arcade.overlap(this, world.castles, this.processHitCastle, null, this);
};

Unit.prototype.processHitCastle = function(me, castle){
    if(castle.team == 'blue' && this.typeSettings.defaultSprite == 'workerWalk' && this.state == 'carry'){
         playerUnitManager.addGold(this.game.rnd.integerInRange(5, 15));
    }
    
    if(castle.team == 'red' && this.typeSettings.defaultSprite == 'workerWalk' && this.state == 'carry'){
        var range = [];
        if(difficulty == 'easy'){
            range = [1, 3];
        } else if(difficulty == 'normal'){
            range = [3, 6];
        } if(difficulty == 'hard'){
            range = [6, 10];
        }else if(difficulty == 'cheater'){
            range = [10, 15];
        }
        ai.unitManager.addGold(this.game.rnd.integerInRange(range[0], range[1]));
    }
    
    if(me.team != castle.team && me.typeSettings.offensive && this.state != 'stay'){
        if(me.team == 'red'){
            playerUnitManager.castelTakeDamage(me.typeSettings.attackForce);
        } else if(me.team == 'blue'){
            ai.unitManager.castelTakeDamage(me.typeSettings.attackForce);
            gui.redrawEnemyCastleHp();
        }
        this.soundDie.play();
    }
    
    this.die();
    this.state = 'stay';
    
};

Unit.prototype.processHitTree = function(me, tree){
    if(this.state == 'walk' && this.typeSettings.defaultSprite == 'workerWalk' && tree.scale.x > 1 && tree.gathering == false){
        var oldVelocity = $.extend( {}, this.velocity);
        this.velocity = 0;
        tree.gathering = true;
        
        this.soundMine.loop = true;
        this.soundMine.play();
        
        this.loadTexture(this.typeSettings.animations.mine + capitalize(this.team) , 0);
        this.animations.add('work');
        this.animations.play('work', this.typeSettings.animationSpeed + 5, true);
        this.body.setSize(32, 64, 16, -100);
        
        var mineTime = this.game.rnd.integerInRange(800, 1200);
        this.game.time.events.add(mineTime, function(){
//            tree.destroy();
            tree.harvest();
        }, this);
        
        this.game.time.events.add(mineTime, function(){
            if(typeof me.x == 'undefined'){
                return;
            }
            try{
                this.soundMine.stop();
                this.loadTexture(me.typeSettings.animations.carry + capitalize(me.team) , 0);
                this.animations.add('carry');
                this.animations.play('carry', this.typeSettings.animationSpeed, true);
                this.state = 'carry';

                if(this.team == 'blue'){
                    this.velocity = -this.typeSettings.velocity;
                    this.scale.setTo(-1, 1);                
                } else if(this.team == 'red'){
                    this.velocity = -this.typeSettings.velocity;
                    this.scale.setTo(1, 1);   
                }
            } catch(e){console.log(e);}
        }, this);
        
        
    }
};

Unit.prototype.hurt = function(damage){
    this.hp -= damage;
};

Unit.prototype.die = function(){
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    
    this.game.add.tween(this).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
    this.game.time.events.add(200, function(){
        this._destroyInNextTick = true;
    }, this);
};