var fpsGraph, world, units, playerUnitManager;
var gameStarted = false;
var skipMenu = false;
function preload() {
    // animations
    // blue
    game.load.spritesheet('workerWalkBlue', 'assets/animations/workerBlueWalk.png', 64, 64);
    game.load.spritesheet('workerMineBlue', 'assets/animations/workerBlueMine.png', 64, 64);
    game.load.spritesheet('workerCarryBlue', 'assets/animations/workerBlueCarry.png', 64, 64);
    game.load.spritesheet('soldierWalkBlue', 'assets/animations/soldierBlueWalk.png', 64, 64);
    game.load.spritesheet('horseWalkBlue', 'assets/animations/horseBlueWalk.png', 64, 64);
    
    
    // red
    game.load.spritesheet('workerWalkRed', 'assets/animations/workerRedWalk.png', 64, 64);
    game.load.spritesheet('workerMineRed', 'assets/animations/workerRedMine.png', 64, 64);
    game.load.spritesheet('workerCarryRed', 'assets/animations/workerRedCarry.png', 64, 64);
    game.load.spritesheet('soldierWalkRed', 'assets/animations/soldierRedWalk.png', 64, 64);
    game.load.spritesheet('horseWalkRed', 'assets/animations/horseRedWalk.png', 64, 64);
    
    // other - anims
    game.load.spritesheet('grassAnimation', 'assets/animations/grassAnimation.png', 64, 64);
    game.load.spritesheet('flagDefault', 'assets/animations/flagDefault.png', 64, 64);

    
    // other-stuff
    game.load.spritesheet('tileset', 'assets/tileset.png', 64, 64);
    game.load.spritesheet('trees', 'assets/trees.png', 64, 64);
    game.load.spritesheet('castles', 'assets/castles.png', 316, 316);
    game.load.image('groundTile', 'assets/groundTile.png');
    game.load.image('hitStone', 'assets/stone.png');
    game.load.image('bg', 'assets/bg.png');
    
    game.load.spritesheet('treeAnim1', 'assets/animations/treeAnim1.png', 64, 64);
    game.load.spritesheet('treeAnim2', 'assets/animations/treeAnim2.png', 64, 64);
    game.load.spritesheet('treeAnim3', 'assets/animations/treeAnim3.png', 64, 64);
    
    // interface
    game.load.spritesheet('buttons', 'assets/buttons.png', 64, 64);
    game.load.spritesheet('healthBar', 'assets/healthbar.png', 281, 51);    
    game.load.spritesheet('wideButton', 'assets/wideButton.png', 128, 64);
    
    game.load.spritesheet('easyButton', 'assets/easyButton.png', 256, 64);
    game.load.spritesheet('normalButton', 'assets/normalButton.png', 256, 64);
    game.load.spritesheet('hardButton', 'assets/hardButton.png', 256, 64);
    game.load.spritesheet('omgButton', 'assets/omgButton.png', 256, 64);
    
    
    // audio
    game.load.audio('punch1', 'assets/sounds/punch1.wav');
    game.load.audio('punch2', 'assets/sounds/punch2.wav');
    game.load.audio('punch3', 'assets/sounds/punch3.wav');
    
    game.load.audio('mine1', 'assets/sounds/mine1.wav');
    game.load.audio('mine2', 'assets/sounds/mine2.wav');
    game.load.audio('mine3', 'assets/sounds/mine3.wav');
    
    
    game.load.audio('unitCrashCastle1', 'assets/sounds/unitCrashCastle1_1.wav');
    game.load.audio('unitCrashCastle2', 'assets/sounds/unitCrashCastle1_2.wav');
    game.load.audio('unitCrashCastle3', 'assets/sounds/unitCrashCastle1_3.wav');
    
}


function create() {
    game.stage.disableVisibilityChange = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.time.advancedTiming = true;  
    this.game.add.sprite(0, 0, 'bg');  
    
    
    world = new World(game);
    
    if(skipMenu === true){
        difficulty = 'normal';
        gameStarted = true;
        startGame();
    } else {
        menuWindow = new MenuWindow(game);
    }
}

function startGame(){
    gameStarted = true;
    world.wipeTrees();
    
    playerUnitManager = new UnitManager(game, 'blue', 50);
    
    // easy, normal, hard, CHEATER
    ai = new AI(game, difficulty);
    units = game.add.group();
    bullets = game.add.group();
    
    game.world.bringToTop(world.grassPlatforms);
    game.world.bringToTop(world.grassAnimated);
    gui = new Gui(game, playerUnitManager);
    
}


function update() {
    world.update();
    
    if(gameStarted === true){
        ai.update();
        game.physics.arcade.collide(units, units, function(unit1, unit2){
            if(unit1.typeSettings.defaultSprite == 'workerWalk' || unit2.typeSettings.defaultSprite == 'workerWalk'){
                return false;
            }
        }, null, this);

        game.physics.arcade.overlap(bullets, units, function(bullet, unit){
            if(bullet.team != unit.team){
                unit.hurt(bullet.damage);
                bullet._destroyInNextTick = true;
                
                var sound = game.add.audio('punch' + game.rnd.integerInRange(1, 3));
                sound.play();
            }
        }, null, this);
    }
}


//////// UTILS
function capitalize(s){
    return s[0].toUpperCase() + s.slice(1);
}

// DEBUG
function render() {
	//game.debug.text("FPS: " + game.time.fps, 5, 10);    
    try{        
        units.forEach(function(unit){
//            game.debug.body(unit);
        });
    } catch(e){}
}