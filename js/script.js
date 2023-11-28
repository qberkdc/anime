$(window).on('load', function()
{
	$('#vid-1').css('display', 'none');
	$('#vid-2').css('display', 'none');
	$('.win').css('display','none');

	// Variable Settings
	var berkayDied = 0
	var berkayHealth = 512;
	var maxHealth = 512;
	var win = false;
	var berkay = $('#berkay');
	var blood = $('#blood');
	var damage_power = 1;
	var damage = 5;
	var damage_level = 1;
	var stage = 1;

	var touchable = 1;

	let ninmy_hurt = "https://raw.githubusercontent.com/qberkdc/anime/master/images/ninmy_hurt.png";
	let ninmy_dead = "https://raw.githubusercontent.com/qberkdc/anime/master/images/ninmy_dead.png";
	let ninmy_normal = "https://raw.githubusercontent.com/qberkdc/anime/master/images/ninmy_normal.png";
	let ninmy_blood = "https://raw.githubusercontent.com/qberkdc/anime/master/images/blood.gif";
	let ninmy_null = "https://raw.githubusercontent.com/qberkdc/anime/master/images/null.png";
	
	var coin = 0;
	var dmgdeal = 0;
	var dmgmax = 250;
	var dmgawrd = 3;
	var stgawrd = 10;

	$('#berkay').on('click', function()
	{
		// Call function
		hitTheBerkayRandomly();
	})

	$('#power_upgrade').on('click', function()
	{
		if(touchable == 1)
		{
			// Call function
			powerUp();
		}
	})

	function updateHealth()
	{
		// Update text info
		$('.health').html(`Coins: ${coin} | Damage Lv: ${damage_level} | Stage: ${stage} | HP: ${berkayHealth}/${maxHealth}`);
		
		// Update health bar
		$('.current-health').css('width', (300 / maxHealth * berkayHealth));
	}

	function updateDamage()
	{
		if (damage_power < 300)
		{
			// Update damage bar status
			$('.damage-bar').css('width', damage_power);
		}
		else
		{
			// Update damage level
			damage_power = 0;
			damage_level = damage_level + 1;
		}
	}

	function powerUp()
	{
		// Calculate prices
		var price = 6 * damage_level;
		var needs = price - coin;
		
		// Block the punch
		touchable = 0;
		
		// Purchase process
		if(price > coin)
		{
			// Purchase fail
			$('.health').html(`It takes ${needs} coins to upgrade`);
			var playAudio = new Audio('sound/upgrade_fail.mp3'); playAudio.play();
			
			setTimeout(() => 
			{
				updateHealth();
				touchable = 1;
			}, 1500);
		}
		else
		{
			// Purchase success
			damage_level = damage_level + 1; coin = coin - price;
			var playAudio = new Audio('sound/upgrade_success.mp3'); playAudio.play();
			$('.health').html(`Upgrade successfull: ${damage_level} Lv`);
			
			setTimeout(() => 
			{
				updateHealth();
				touchable = 1;
			}, 1500);
		}
	}
			
	function hitTheBerkayRandomly()
	{
		if(berkayHealth > 0 && touchable == 1)
		{
			// Play pain sound
			var Oof = new Audio('sound/yahh.wav'); Oof.play();
			
			// Drop the health
			berkayHealth = berkayHealth - (damage * damage_level);
			
			// Damage power & Award
			damage_power = damage_power + 1;
			dmgdeal = dmgdeal + (damage * damage_level)

			if(dmgdeal >= dmgmax)
			{
				dmgdeal = 0;
				coin = coin + dmgawrd;
			}
			
			// Update character status
			updateHealth(); updateDamage(); 
			if(berkayHealth <= 0) { berkayDied = 1; }

			// Change character status
			setTimeout(() => 
			{
				if(berkayHealth <= 0)
				{
					// Make character dead
					$('.ninmy').css('background', `url(${ninmy_dead})`);
				}
				else if(berkayHealth > 0)
				{
					// Make hurt effect
					$('.ninmy').css('background', `url(${ninmy_hurt})`);
					$('.blood').css('background', `url(${ninmy_blood})`);
				}
			}, 250);

			// Character is alive
			setTimeout(() => 
			{
				if(berkayHealth > 0)
				{
					$('.ninmy').css('background', `url(${ninmy_normal})`);
					$('.blood').css('background', `url(${ninmy_null})`);
				}
			}, 1000);
			
			// Character is died
			setTimeout(() => 
			{
				if(berkayHealth <= 0 && berkayDied == 1)
				{
					stage = stage + 1;
					coin = coin + stgawrd;
					printStage(stage);
					var playAudio = new Audio('sound/yamete_kudasai.mp3'); playAudio.play();
					touchable = 0;
				}
			}, 10);
			
			// Award message
			if(berkayHealth <= 0)
			{
				setTimeout(() => 
				{
					setTimeout(() => 
					{
						$('.health').html(`You won stage award: ${stgawrd} coin`);
					}, 1500);
				}, 1500);
			}
			
			// Switch next stage
			if(berkayHealth <= 0)
			{
				setTimeout(() => 
				{
					berkayHealth = (512 * stage); maxHealth = berkayHealth;
					$('.ninmy').css('background', `url(${ninmy_normal})`);
					updateHealth()
					berkayDied = 0;
					touchable = 1;
				}, 6000);
		}
		
		}
	}

	// Stage print
	function printStage(next)
	{
		$('.health').html(`Next stage: ${next}`);
	}
})
