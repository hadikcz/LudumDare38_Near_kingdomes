var HealthBarSprite = function(game, providedConfig) {
    
    this.game = game;
    this.config = providedConfig;
    
    this.bgSprite;
    this.barSprite;
    
    this.drawBackground();
    this.drawHealthBar();
    
    this.setPosition(this.config.x, this.config.y);
    
    if(this.config.fixedToCamera === true){
        this.setFixedToCamera(this.config.isFixedToCamera);
    }
};


HealthBarSprite.prototype.constructor = HealthBarSprite;

HealthBarSprite.prototype.drawBackground = function() {
    this.bgSprite = this.game.add.sprite(this.config.x, this.config.y, this.config.sprite, 0);
};

HealthBarSprite.prototype.drawHealthBar = function() {
    this.barSprite = this.game.add.sprite(this.config.x, this.config.y, this.config.sprite, 1);
    if(this.config.vertical === false){
        this.barSprite.scale.setTo(0.0, 1);
    } else {
        this.barSprite.scale.setTo(1, 0.0);
    }
            
};

HealthBarSprite.prototype.setPercent = function(percent, delay){
    var newScale = {};
    if(percent < 0){
        percent = 0;
    }
    
    if(percent > 100){
        percent = 100;
    }
    
    if(this.config.vertical === false){
        newScale.x = percent / 100;
        newScale.y = 1;
    } else {
        newScale.x = 1;
        newScale.y = percent / 100;
    }
    
    if(typeof delay === 'undefined' || delay === 0){
        var delay = this.config.delay;
    } 
    this.game.add.tween(this.barSprite.scale).to(newScale, delay, Phaser.Easing.Linear.None, true);
    
};

HealthBarSprite.prototype.setPosition = function(x, y){
    this.bgSprite.x = x;
    this.bgSprite.y = y;
    
    this.barSprite.x = x + this.config.barOffesetX;
    this.barSprite.y = y + this.config.barOffesetY;
};

HealthBarSprite.prototype.setFixedToCamera = function(){
    this.bgSprite.fixedToCamera = true;
    this.barSprite.fixedToCamera = true;
};

HealthBarSprite.prototype.destroy = function(){
    this.bgSprite.destroy();
    this.barSprite.destroy();
};

HealthBarSprite.prototype.hide = function(){
    this.bgSprite.visible = false;
    this.barSprite.visible = false;
    this.bgSprite.kill();
    this.barSprite.kill();
};

HealthBarSprite.prototype.show = function(){
    this.bgSprite.visible = true;
    this.barSprite.visible = true;
    this.bgSprite.revive();
    this.barSprite.revive();
};

HealthBarSprite.prototype.addToGroup = function(group){
    group.add(this.bgSprite);
    group.add(this.barSprite);
};