$(window).on('load', function() {

	$('#vid-1').css('display', 'none');
	$('#vid-2').css('display', 'none');
	$('.win').css('display','none');

	var berkayDied = 0
	var berkayHealth = 300;
	var maxHealth = 300;
	var win = false;
	var berkay = $('#berkay');
	var damage_power = 1;
	var damage = 3;
	var damage_level = 1;
	var stage = 1;

	var touchable = 1;
	
	var coin = 0;
	var dmgdeal = 0;
	var dmgmax = 250;
	var dmgawrd = 3;
	var stgawrd = 10;

	$('#berkay').on('click', function(){
		hitTheBerkayRandomly();
	})

	$('#power_upgrade').on('click', function(){
		powerUp();
	})

	function updateHealth(){
		$('.health').html(`Coins: ${coin} | Damage Lv: ${damage_level} | Stage: ${stage} | HP: ${berkayHealth}/${maxHealth}`);
	}

	function updateDamage(){
		if (damage_power < 100) {
			$('.damage-bar').css('width', damage_power)
		}
		else {
			damage_power = 0;
			damage_level = damage_level + 1;
		}
	}

	function powerUp(){
		var price = 12 * damage_level;
		var needs = price - coin;

		touchable = 0;
		
		if(price > coin){
			$('.health').html(`It takes ${needs} coins to upgrade`);
			setTimeout(() => {
				updateHealth();
				touchable = 1;
			}, 1200);
		}
		else {
			damage_level = damage_level + 1;
			coin = coin - price;
			$('.health').html(`Upgrade successfull: ${damage_level} Lv`);
			setTimeout(() => {
				updateHealth();
				touchable = 1;
			}, 1200);
		}
	}
			
	function hitTheBerkayRandomly(){
		if(berkayHealth > 0 && touchable == 1)
		{
			var Oof = new Audio('sound/yahh.wav');
			Oof.play();
			
			berkayHealth = berkayHealth - (damage * damage_level);
			if(dmgdeal > dmgmax - 30) damage_power = damage_power + 1;

			dmgdeal = dmgdeal + (damage * damage_level)

			if(dmgdeal >= dmgmax) {
				dmgdeal = 0;
				coin = coin + dmgawrd;
			}
			
			updateHealth();
			updateDamage(); 
			if(berkayHealth <= 0) { berkayDied = 1; }

			$(berkay).attr('src', 'images/ninmy_hurt.png');

			setTimeout(() => {
				if(berkayHealth <= 0 && berkayDied == 1)
				{
					stage = stage + 1;
					coin = coin + stgawrd;
					printStage(stage);
					var dansAudio = new Audio('sound/yamete_kudasai.mp3');
					dansAudio.play();
					$(berkay).attr('src', 'images/ninmy_dead.png');
					berkayDied = 0
				}
				else
				{
					$(berkay).attr('src', 'images/ninmy_normal.png');
				}
			}, 100);
		}
		else
		{
			setTimeout(() => {
				berkayHealth = (512 * stage);
				maxHealth = berkayHealth;
				$(berkay).attr('src', 'images/ninmy_normal.png');
				updateHealth()
				berkayDied = 0
			}, 1500);
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
		$('.health').html(`Next stage: ${next}`);
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
