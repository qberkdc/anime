$(window).on('load', function() {

	$('#vid-1').css('display', 'none');
	$('#vid-2').css('display', 'none');
	$('.win').css('display','none');

	var berkayHealth = 300;
	var maxHealth = 300;
	var win = false;
	var berkay = $('#berkay');
	var damage_power = 1;
	var damage = 3;
	var damage_level = 1;
	var stage = 1;

	$('#berkay').on('click', function(){
		hitTheBerkayRandomly();
	})

	function updateHealth(){
		$('.health').html(`Damage Lv: ${damage_level} | Stage: ${stage} | HP: ${berkayHealth}/${maxHealth}`);
	}

	function updateDamage(){
		if (damage_power < 50) {
			$('.damage-bar').css('width', (damage_power * 3))
		}
		else {
			damage_power = 1;
			damage_level = damage_level + 1;
		}
	}
	
	function hitTheBerkayRandomly(){
		if(win === false)
		{
			var Oof = new Audio('sound/yahh.wav');
			Oof.play();
			
			berkayHealth = berkayHealth - (damage * damage_level);
			damage_power = damage_power + 1
			
			updateHealth();
			updateDamage();
			// printDamage(damage * damage_level);
			
			if(berkayHealth <= 0)
			{
				stage = stage + 1;
				berkayHealth = (300 * stage);
				maxHealth = berkayHealth;
				printStage(stage);
				var dansAudio = new Audio('sound/yamete_kudasai.mp3');
				dansAudio.play();
				$(berkay).attr('src', 'images/ninmy_dead.png');
			}
		}
	}

	function printDamage(damage){
		$('.damage').html(`${damage}`);
		$('.damage').css('animation', 'damage_fade 50;ms');
		$(berkay).attr('src', 'images/ninmy_hurt.png');
		setTimeout(() => {
			$('.damage').html('');
			$('.damage').css('animation', 'none');
			if(win === false)
			{
				$(berkay).attr('src', 'images/ninmy_normal.png');
			}else {
				$(berkay).attr('src', 'images/ninmy_dead.png');
			}
		}, 300);
	}

	function printStage(next){
		$('.health').html('Next stage: '${next});
	}

	function Win(){
		$('#vid-1').css('display', 'block');
		$('#vid-2').css('display', 'block');
		$('.win').css('display','block');
		$(berkay).attr('src', 'images/ninmy_dead.png');
		berkayHealth = 300;
		win = false;
		var dansAudio = new Audio('sound/yamete_kudasai.mp3');
		dansAudio.play()
	}

})
