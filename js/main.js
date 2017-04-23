var game;

require(['game', 'World', 'entity/Unit', 'entity/UnitSettings', 'entity/Bullet', 'entity/Tree', 'gui', 'UnitManager', 'HealthBarSprite', 'AI', 'MenuWindow'], function () {
	game = new Phaser.Game(1024, 640, Phaser.AUTO, 'game', {preload: preload, create: create, update: update, render: render});
});
