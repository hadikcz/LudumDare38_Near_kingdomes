var World = function(game){
    this.game = game;
    
    this.isGameOver = false;
    
    this.treeLimit = 25;
    this._canSpawnTree = true;
    
    this.spawnPoints = [180, 850];

    this.grassPlatforms = this.game.add.group();
    this.trees = game.add.group();
    this.grassAnimated = this.game.add.group();
    
    this.castles = this.game.add.group();
    this.game.physics.enable(this.castles, Phaser.Physics.ARCADE);
    
    this.defaultYHigh = this.game.height - 100;
    
    this.create();
};

World.prototype = {
    create: function(){
        this.game.stage.backgroundColor = '#ddeaff';
        
        this.createGrassPlatforms();
        this.createGrassAnimations();
        this.createCastles();
    },
    
    createGrassPlatforms: function(){
        var y = this.defaultYHigh + 39;
        var xStep = 64;
        
        for(var x = 0; x < 20; x++)  {
            var grass = this.game.add.sprite(x * xStep, y, 'groundTile');
            this.grassPlatforms.add(grass);
        }
    },
    
    createGrassAnimations: function(){
        var y = this.defaultYHigh - 26;
        var xStep = 18;
        
        
        for(var x = -2; x < 60; x++)  {
            var grass = this.game.add.sprite(x * xStep, y, 'grassAnimation');
            grass.anim = grass.animations.add('run');
            grass.anim.play(5, true);
            grass.anim.setFrame(this.game.rnd.integerInRange(0, 2));
            grass.scale.setTo(1, 1.5);
            this.grassAnimated.add(grass);
        }
    },
    createCastles: function(){
        var castle = this.game.add.sprite(50, this.defaultYHigh - 41, 'castles', 1);
        castle.anchor.setTo(0.5);
        castle.scale.setTo(0.7);        
        this.game.physics.enable(castle, Phaser.Physics.ARCADE);
        castle.team = 'blue';
        this.castles.add(castle);
        
        
        var castle = this.game.add.sprite(1000, this.defaultYHigh - 41, 'castles', 0);
        castle.anchor.setTo(0.5);
        castle.scale.setTo(-0.7, 0.7);        
        this.game.physics.enable(castle, Phaser.Physics.ARCADE);
        castle.team = 'red';
        this.castles.add(castle);
        
        var flag = this.game.add.sprite(105, this.defaultYHigh - 150, 'flagDefault');
        var anim = flag.animations.add('run');
        flag.animations.play('run', 5, true);
        anim.setFrame(this.game.rnd.integerInRange(0, 5));
        flag.tint = 0xb2dbed;
        
        
        
        var flag = this.game.add.sprite(947, this.defaultYHigh - 150, 'flagDefault');
        flag.animations.add('run');
        flag.animations.play('run', 5, true);
        flag.tint = 0xFF0000;
        flag.scale.setTo(-1, 1);
    },
    update: function(){
        if(this._canSpawnTree && this.trees.children.length < this.treeLimit){
            new Tree(this.game, this.game.rnd.integerInRange(200, 830));
            this._canSpawnTree = false;
            
            // 3000 - 6000
            this.game.time.events.add(this.game.rnd.integerInRange(1500, 4000), function(){
                this._canSpawnTree = true;
            }, this);
            
        }
    },
    gameOver: function(endType){
        this.isGameOver = true;
        units.forEach(function(unit){
            unit._destroyInNextTick = true;
        }, this);
        gui.drawGameOver(endType);
    },
    wipeTrees: function(){
        this.trees.children.forEach(function(tree){
            tree.destroy();
        }, this);
    },
};