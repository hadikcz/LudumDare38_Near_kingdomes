var Bullet = function(game, x, y, team, damage){

    this.game = game;
    this.team = team;
    
    this.damage = damage;
    
    this._destroyInNextTick = false;
    
    Phaser.Sprite.call(this, this.game, x, y, 'hitStone');
    
    this.game.add.existing(this);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    
    this.body.setSize(16 ,16, 0, 0);
    
    this.scale.setTo(1, 30);
    this.anchor.setTo(0.5);
    bullets.add(this);
    
    this.alpha = 0;
        
            
    this.game.time.events.add(150, function(){
        this.destroy();
    }, this);
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function(){
    if(this._destroyInNextTick === true){
        this.destroy();
        return;
    }
    if(this.team == 'blue'){
        this.body.velocity.x = 500;
    } else {
        this.body.velocity.x = -500;
    }
};