$(window).on('load', function() {

	$('#vid-1').css('display', 'none');
	$('#vid-2').css('display', 'none');
	$('.win').css('display','none');

	var berkayDied = 0
	var berkayHealth = 512;
	var maxHealth = 512;
	var win = false;
	var berkay = $('#berkay');
	var blood = $('#blood');
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

	$('#power_upgrade').on('click', function()
	{
		if(touchable == 1) {
			powerUp();
		}
	})

	function updateHealth(){
		$('.health').html(`Coins: ${coin} | Damage Lv: ${damage_level} | Stage: ${stage} | HP: ${berkayHealth}/${maxHealth}`);
	}

	function updateDamage(){
		if (damage_power < 300) {
			$('.damage-bar').css('width', damage_power)
		}
		else {
			damage_power = 0;
			damage_level = damage_level + 1;
		}
	}

	function powerUp()
	{
		var price = 6 * damage_level;
		var needs = price - coin;

		touchable = 0;
		
		if(price > coin)
		{
			$('.health').html(`It takes ${needs} coins to upgrade`);
			var playAudio = new Audio('sound/upgrade_fail.mp3'); playAudio.play();
			setTimeout(() => {
				updateHealth();
				touchable = 1;
			}, 1500);
		}
		else
		{
			damage_level = damage_level + 1;
			coin = coin - price;
			var playAudio = new Audio('sound/upgrade_success.mp3'); playAudio.play();
			$('.health').html(`Upgrade successfull: ${damage_level} Lv`);
			setTimeout(() => {
				updateHealth();
				touchable = 1;
			}, 1500);
		}
	}
			
	function hitTheBerkayRandomly(){
		if(berkayHealth > 0 && touchable == 1)
		{
			var Oof = new Audio('sound/yahh.wav');
			Oof.play();
			
			berkayHealth = berkayHealth - (damage * damage_level);
			damage_power = damage_power + 1;

			dmgdeal = dmgdeal + (damage * damage_level)

			if(dmgdeal >= dmgmax) {
				dmgdeal = 0;
				coin = coin + dmgawrd;
			}
			
			updateHealth();
			updateDamage(); 
			if(berkayHealth <= 0) { berkayDied = 1; }

			setTimeout(() => {
				if(berkayHealth <= 0)
				{
					$('.ninmy').css('background-image', "images/ninmy_dead.png");
				}
				else if(berkayHealth > 0)
				{
					$('.ninmy').css('background-image', "images/ninmy_hurt.png");
					$('.blood').css('background-image', "images/blood.gif");
				}
			}, 250);

			setTimeout(() => {
				if(berkayHealth > 0)
				{
					$('.ninmy').css('background-image', "images/ninmy_normal.png");
					$('.blood').css('background-image', "images/null.png");
				}
			}, 400);

			setTimeout(() => {
				if(berkayHealth <= 0 && berkayDied == 1)
				{
					stage = stage + 1;
					coin = coin + stgawrd;
					printStage(stage);
					var playAudio = new Audio('sound/yamete_kudasai.mp3'); playAudio.play();
					touchable = 0;
				}
			}, 10);
			
			if(berkayHealth <= 0)
			{
				setTimeout(() => {
					setTimeout(() => {
						$('.health').html(`You won stage award: ${stgawrd} coin`);
					}, 1500);
				}, 1500);
			}
		}
		else if(berkayHealth <= 0)
		{
			setTimeout(() => {
				berkayHealth = (512 * stage);
				maxHealth = berkayHealth;
				$('.ninmy').css('background-image', "images/ninmy_normal.png");
				updateHealth()
				berkayDied = 0;
				touchable = 1;
			}, 6000);
		}
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
