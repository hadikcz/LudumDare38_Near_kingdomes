var Tree = function(game, x){
    
    this.game = game;
    
    this.gathering = false;
    
//    Phaser.Sprite.call(this, this.game, x, world.defaultYHigh + 67, 'trees', this.game.rnd.integerInRange(0, 2));
    
    
    
    Phaser.Sprite.call(this, this.game, x, world.defaultYHigh + 67, 'treeAnim' + this.game.rnd.integerInRange(1, 3));
    
    this.game.add.existing(this);
    
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    
    this.body.setSize(32, 64, 16, 0);
    
    this.anchor.setTo(0.5, 1);
    this.scale.setTo(0);
    
    
    this.anim = this.animations.add('run');
    this.anim.play(3, true);
    this.anim.setFrame(this.game.rnd.integerInRange(0, 6));
    
    var scale = this.game.rnd.realInRange(1, 1.2);
    
    this.game.add.tween(this.scale).to({x: scale, y: scale}, this.game.rnd.integerInRange(1500, 3500), Phaser.Easing.Linear.None, true);
    
    world.trees.add(this);
};

Tree.prototype = Object.create(Phaser.Sprite.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.harvest = function(){
    this.body.velocity.y = 100;
    
    if(this.game.rnd.integerInRange(0, 1)){
        this.body.angularVelocity = 200;
    } else {
        this.body.angularVelocity = -200;
    }
    
    this.game.time.events.add(2000, function(){
        this.destroy();
    }, this);
};

