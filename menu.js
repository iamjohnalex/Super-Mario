var menu= {
    
    preload: function(){
		game.load.image('level1','assets/stage1.png');
		game.load.image('backgroundpic','assets/menupic.jpg');
	},
    
    
	create:function(){	
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		var background=game.add.sprite(0,0,'backgroundpic');
		

		var button1 = game.add.button(130 , 150, "level1", function(){
			game.state.start('part1');
		});
		button1.anchor.set(0.5, 0.5);

}
    
    
    
    
}