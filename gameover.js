var gameover= {
   

	preload: function(){
		game.load.image('gomenu','assets/menubtn.png');
		game.load.image('play again','assets/retry.png');
		game.load.image('gameoverpic','assets/gameoverpic.jpg');
		game.load.audio('over','audio/oversound.mp3');
	},


	create:function(){	
	
		over = game.add.audio('over');
		over.play();
		
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		var background=game.add.sprite(0,0,'gameoverpic');
	

		var button1 = game.add.button(130 , 100, "play again", function(){
			over.stop(); 
			lives=3;
			game.state.start('part1');
		});
		button1.anchor.set(0.5, 0.5);
		
		var button2 = game.add.button(82 , 120, "gomenu", function(){
			over.stop(); 
			lives=3;
			game.state.start('menu');
		});
		button1.anchor.set(0.5, 0.5);

}


}	