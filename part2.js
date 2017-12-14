var part2= {
    
    
    
    
    preload: function() {
			//Οι απαιτούμενοι ήχοι για το παιχνίδι.
			game.load.audio('maintheme','audio/themesong.wav');
			game.load.audio('stomp','audio/stomp.wav');
			game.load.audio('jump','audio/jump.wav');
			game.load.audio('coinsc','audio/coin.wav');
			game.load.audio('death','audio/death.mp3');
			game.load.image('pic','assets/count_coin_gold.png');
			game.load.audio('finish','audio/tasteofwin.mp3');
			game.load.audio('tpsound','audio/teleport.mp3');   
			
			

			this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
			this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
			this.load.spritesheet('mage', 'assets/mage.png', 16, 16);
			this.load.spritesheet('mario', 'assets/luigi.png', 16, 16);
			this.load.spritesheet('coin', 'assets/coin_gold.png', 16, 16);

			this.load.tilemap('level', 'assets/2016041_2.json', null,
					Phaser.Tilemap.TILED_JSON);
					
		},


    
    create: function() {
			
			menus.stop(); 
			Phaser.Canvas.setImageRenderingCrisp(game.canvas)

			game.stage.backgroundColor = '#000000';

			map = game.add.tilemap('level');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');
			map.setCollisionBetween(3, 12, true, 'flag');
			
			map.createLayer('background');
			
			
			layer = map.createLayer('solid');
			layer.resizeWorld();
			flag = map.createLayer('flag');  
			flag.resizeWorld();		

			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 1, 2,3,4,5,6,7 ], 10, true);
			coins.callAll('animations.play', 'animations', 'spin');

			mages = game.add.group();
			mages.enableBody = true;
			map.createFromTiles(3,null,'mage','stuff',mages);
			mages.callAll('animations.add', 'animations', 'walk', [ 0, 1,2,3,4 ],9, true);
			mages.callAll('animations.play', 'animations', 'walk');
			mages.setAll('body.bounce.x', 1);							
			mages.setAll('body.velocity.x', -25);
			mages.setAll('body.gravity.y', 500);
			
			
			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);

			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
			player.goesRight = true;

			game.camera.follow(player);
			
			scoreText=game.add.text(16,8,'LUIGI\n'+score,{font:'25px FONT' ,fontSize: '10px', fill: 'white'} );
			cimage=game.add.sprite(95,7,'pic'); //95
			lcounter=game.add.text(189,13,'Lives X'+lives,{font:'25px FONT' ,fontSize: '10px', fill: 'white'}); //189
			ccounter=game.add.text(110,13,'X'+cvalue,{font:'25px FONT' ,fontSize: '10px', fill: 'white'}); //110
			cimage.fixedToCamera=true;
			scoreText.fixedToCamera=true;
			ccounter.fixedToCamera=true;
			lcounter.fixedToCamera=true;
			
			
			cursors = game.input.keyboard.createCursorKeys();
			
		
			
			music=game.add.audio('maintheme');
			music.loop=true;
			music.play();
			
		},

   








		
    update: function() {
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);
			game.physics.arcade.collide(mages, layer);  
			game.physics.arcade.overlap(player, mages, mageOverlap);
			game.physics.arcade.collide(player, flag, flagOverlap);
			
			if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 7;
				}

				if (cursors.up.isDown && player.body.onFloor()) {
					player.body.velocity.y = -190;
					jumps = game.add.audio('jump');
		        		jumps.play();
					player.animations.stop();
				}

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
				}
			}
		}
    
}