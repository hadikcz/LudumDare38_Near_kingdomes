var MenuWindow = function(game){
    /**
     * @property {Phaser} game - Main game context
     * @private
     */
    this.game = game;
    
    /**
     * @property {Phaser.Group} gui - Group for all interface parts
     * @private
     */
    this.gui = this.game.add.group();

    this.create();
};

MenuWindow.prototype = {

    create: function(){// ffcc86 , 
        var gameName  = this.game.add.text(this.game.width / 2, 70, 'Near kingdoms', {fill: '#00b5c5', font: '72px Consolas, Arial'});
        gameName.anchor.setTo(0.5);
        gameName.stroke = "#004D54";
        gameName.strokeThickness = 5;
        
        var credits = this.game.add.text(game.width / 2, game.height - 15, 'Developed for Ludum Dare 38 by Vladimír Novák', {fill: '#ffcc86', font: '20px Consolas, Arial'});
        credits.anchor.setTo(0.5);
        
        var step = 150;
        
        var button = this.game.add.button(game.width / 2 - 225, game.height / 2, 'easyButton', function(){
            difficulty = 'easy';
            this.startGame();
        }, this, 0, 0, 1);
        button.anchor.setTo(0.5);
        this.gui.add(button);
        
        
        var button = this.game.add.button(game.width / 2 - 75, game.height / 2, 'normalButton', function(){
            difficulty = 'normal';
            this.startGame();
        }, this, 0, 0, 1);
        button.anchor.setTo(0.5);
        this.gui.add(button);
        
        var button = this.game.add.button(game.width / 2 + 75, game.height / 2, 'hardButton', function(){
            difficulty = 'hard';
            this.startGame();
        }, this, 0, 0, 1);
        button.anchor.setTo(0.5);
        this.gui.add(button);
        
        var button = this.game.add.button(game.width / 2 + 225 , game.height / 2, 'omgButton', function(){
            difficulty = 'cheater';
            this.startGame();
        }, this, 0, 0, 1);
        button.anchor.setTo(0.5);
        this.gui.add(button);
        
        
        
        this.gui.add(gameName);
        this.gui.add(credits);
        
    },
    update: function(){},
    startGame: function(){
        this.hide();
        gameStarted = true;
        startGame();
    },
    show: function(){
        this.gui.visible = true;
    },
    hide: function(){
        this.gui.visible = false;
    },
    destroy: function(){
        this.gui.destroy();
    }
};