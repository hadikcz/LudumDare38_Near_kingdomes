var Gui = function(game, playerUnitManager){
    
    this.game = game;
    
    this.gui = this.game.add.group();
    
    this.playerUnitManager = playerUnitManager;
    
    this.create();
};

Gui.prototype = {
    create: function(){
        var startX = 0;
        var startY = 60;
        var stepY = 64;
        var i = 0;  
        
        var button = this.game.add.button(startX, startY + i * stepY, 'buttons', function(){
            this.playerUnitManager.tryBuyUnit(UnitSettings.worker);
        }, this, 0, 0, 1);
        var text = this.game.add.text(startX + 65, startY + i * stepY + 18, UnitSettings.worker.price, {fill: '#00b5c5', font: '20px Consolas, Arial'});
        text.stroke = '#004D54';
        text.strokeThickness = 2;
        i++;
        
        var button = this.game.add.button(startX, startY + i * stepY, 'buttons', function(){
            this.playerUnitManager.tryBuyUnit(UnitSettings.soldier);
        }, this, 2, 2, 3);
        var text = this.game.add.text(startX + 65, startY + i * stepY + 18, UnitSettings.soldier.price, {fill: '#00b5c5', font: '20px Consolas, Arial'});
        text.stroke = '#004D54';
        text.strokeThickness = 2;
        i++;
        
        var button = this.game.add.button(startX, startY + i * stepY, 'buttons', function(){
            this.playerUnitManager.tryBuyUnit(UnitSettings.horseRider);
        }, this, 4, 4, 5);
        var text = this.game.add.text(startX + 65, startY + i * stepY + 18, UnitSettings.horseRider.price, {fill: '#00b5c5', font: '20px Consolas, Arial'});
        text.stroke = '#004D54';
        text.strokeThickness = 2;
        i++;
        
        var button = this.game.add.button(startX, startY + i * stepY, 'buttons', function(){
            this.playerUnitManager.tryRepairCastle();
        }, this, 6, 6, 7);
        var text = this.game.add.text(startX + 65, startY + i * stepY + 18, UnitSettings.castleRepair.price, {fill: '#00b5c5', font: '20px Consolas, Arial'});
        text.stroke = '#004D54';
        text.strokeThickness = 2;
        i++;
        
        
        var goldIcon = this.game.add.sprite(20, 340, 'tileset', 150);
        goldIcon.anchor.setTo(0.5);
        
        this.goldText = this.game.add.text(56, 343, this.playerUnitManager.gold, {fill: '#ffcc86', font: '20px Consolas, Arial'});
        this.goldText.stroke = '#ffa56c';
        this.goldText.strokeThickness = 3;
        this.goldText.anchor.setTo(0.5);
        
        this.noGoldWarn = this.game.add.text(150, 343, 'Not enough gold', {fill: '#FF0000', font: '15px Consolas, Arial'});
        this.noGoldWarn.anchor.setTo(0.5);
        this.noGoldWarn.stroke = '#ff8e8e';
        this.noGoldWarn.strokeThickness = 2;
        this.noGoldWarn.alpha = 0;
        
        // player castle HP        
        this.playerHp = new HealthBarSprite(this.game, {x: -15, y: 0, fixedToCamera: true, vertical: false, sprite: 'healthBar', barOffesetX: 55, barOffesetY: 0, delay: 150});
        this.playerHp.setPercent(100);    
        
        // enemy castle HP        
        this.enemyHp = new HealthBarSprite(this.game, {x: game.width - 272, y: 0, fixedToCamera: true, vertical: false, sprite: 'healthBar', barOffesetX: 55, barOffesetY: 0, delay: 150});
        this.enemyHp.setPercent(100);     
    },
    update: function(){},
    redrawGold: function(){
        this.goldText.setText(this.playerUnitManager.gold);
    },
    redrawPlayerCastleHp: function(){
        var percentage = Math.round(100 * (playerUnitManager.castleHp / playerUnitManager.castleMaxHp));
        this.playerHp.setPercent(percentage);
    },
    redrawEnemyCastleHp: function(){
        var percentage = Math.round(100 * (ai.unitManager.castleHp / ai.unitManager.castleMaxHp));
        this.enemyHp.setPercent(percentage);
    },
    drawGameOver: function(endType){
        var bmd = game.add.bitmapData(window.innerWidth, window.innerHeight);
        bmd.fill(65, 0, 0, 255);
        var redScreen = this.game.add.sprite(0, 0, bmd);
        redScreen.alpha = 0.0;
        this.game.add.tween(redScreen).to({alpha: 1}, 3000, Phaser.Easing.Linear.None, true);
        
        this.game.time.events.add(3000, function(){
            if(endType == 'win'){
                var endText = 'You WIN!';
            } else if(endType == 'lose'){
                var endText = 'You LOSE!';
            } else {
                var endText = 'Game over!';
            }
            
            var restartButtonText = this.game.add.text(game.width / 2, game.height / 2 - 150, endText, {fill: '#ffcc86', font: '72px Consolas, Arial'});
            restartButtonText.anchor.setTo(0.5);
            restartButtonText.alpha = 0;
            
            var restartButton = this.game.add.button(game.width / 2, game.height / 2, 'wideButton', function(){
                this.game.state.start(game.state.current);
            }, this, 0, 0, 1);
            restartButton.anchor.setTo(0.5);
            restartButton.alpha = 0;
            
            
            var creditText = this.game.add.text(game.width / 2, game.height - 15, 'Developed for Ludum Dare 38 by Vladimír Novák', {fill: '#ffcc86', font: '20px Consolas, Arial'});
            creditText.anchor.setTo(0.5);
            creditText.alpha = 0;
            
            this.game.add.tween(restartButton).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(restartButtonText).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(creditText).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);
        }, this);  
    },
    noGoldWarnBlink: function(){
        if(this.noGoldWarn.alpha != 0){
            return;
        }
        
        this.game.add.tween(this.noGoldWarn).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        this.game.time.events.add(1000, function(){
            this.game.add.tween(this.noGoldWarn).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        }, this);
    },
};