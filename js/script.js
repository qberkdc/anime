$(window).on('load', function()
{
	$('#vid-1').css('display', 'none');
	$('#vid-2').css('display', 'none');
	$('.win').css('display','none');

	// Cookie Set
	function setCookie(cname, cvalue)
	{
		document.cookie = cname + "=" + cvalue;
	}

	// Cookie Get
	function getCookie(name) 
	{
		let result = document.cookie.match("(^|[^;]+)\s*" + name + "\s*=\s*([^;]+)")
		return result ? result.pop() : ""
	}

	// Cookie Get > Which method
	function _getCookie(name)
	{
		const nameString = name + "="
		const value = document.cookie.split(";").filter(item => { return item.includes(nameString) })
		const data = value[0].substring(nameString.length, value[0].length);
		if (value.length) { return data.replace("=", ""); } 
		else { return ""; }
	}

	// Variable Settings
	var died = 0
	var hp = 100;
	var maxhp = 100;
	var win = false;
	var berkay = $('#berkay');
	var blood = $('#blood');
	var damage_power = 1;
	var damage = 5;
	var damage_level = 1;
	var stage = 1;
	var sec = 30;

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
		hit();
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
		$('.health').html(`Coins: ${coin} | Damage Lv: ${damage_level} | Stage: ${stage} | HP: ${hp}/${maxhp}`);
		
		// Update health bar
		$('.current-health').css('width', (300 / maxhp * hp));
	}

	function updateDamage()
	{
		if (damage_power < 500)
		{
			// Update damage bar status
			$('.damage-bar').css('width', (300 / 500 * damage_power));
		}
		else
		{
			// Update damage level
			damage_power = 0;
			damage_level += 1;
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
			damage_level += 1; coin -= price;
			var playAudio = new Audio('sound/upgrade_success.mp3'); playAudio.play();
			$('.health').html(`Upgrade successfull: ${damage_level} Lv`);
			
			setTimeout(() => 
			{
				updateHealth();
				touchable = 1;
			}, 1500);
		}
	}
			
	function hit()
	{
		if(hp > 0 && touchable == 1)
		{
			// Play pain sound
			var Oof = new Audio('sound/yahh.wav'); Oof.play();
			
			// Drop the health
			hp -= (damage * damage_level);
			
			// Damage power & Award
			damage_power += 1;
			dmgdeal += (damage * damage_level);

			if(dmgdeal >= dmgmax)
			{
				dmgdeal = 0;
				coin += dmgawrd;
			}
			
			// Update character status
			updateHealth(); updateDamage(); 
			if(hp <= 0) { died = 1; }

			// Change character status
			setTimeout(() => 
			{
				if(hp <= 0)
				{
					// Make character dead
					$('.ninmy').css('background', `url(${ninmy_dead})`);
					$('.blood').css('background', `url(${ninmy_blood})`);
				}
				else if(hp > 0)
				{
					// Make hurt effect
					$('.ninmy').css('background', `url(${ninmy_hurt})`);
					$('.blood').css('background', `url(${ninmy_blood})`);
				}
			}, 350);

			// Character is alive
			setTimeout(() => 
			{
				if(hp > 0)
				{
					$('.ninmy').css('background', `url(${ninmy_normal})`);
					$('.blood').css('background', `url(${ninmy_null})`);
				}
			}, 1000);
			
			// Character is died
			setTimeout(() => 
			{
				if(hp <= 0 && died == 1)
				{
					stage += 1;
					coin += stgawrd;
					printStage(stage);
					var playAudio = new Audio('sound/yamete_kudasai.mp3'); playAudio.play();
					touchable = 0;
					sec = 30;
				}
			}, 10);
			
			// Award message
			if(hp <= 0)
			{
				setTimeout(() => 
				{
					$('.health').html(`You won stage award: ${stgawrd} coin`);
				}, 1500);
			}
			
			// Switch next stage
			if(hp <= 0)
			{
				setTimeout(() => 
				{
					nextStage();
				}, 6000);
			}
		}
	}

	// Stage print
	function printStage(next)
	{
		$('.health').html(`Next stage: ${next}`);
	}
	
	// Stage next
	function nextStage()
	{
		hp = (112 * stage); maxhp = hp;
		$('.ninmy').css('background', `url(${ninmy_normal})`);
		$('.blood').css('background', `url(${ninmy_null})`);
		updateHealth()
		died = 0;
		touchable = 1;
	}
	
	// Save Data
	function saveData()
	{
		setCookie("data_hp", hp);
		setCookie("data_maxhp", maxhp);
		setCookie("data_damage_power", damage_power);
		setCookie("data_damage_level", damage_level);
		setCookie("data_stage", stage);
		setCookie("data_coin", coin);
		setCookie("data_dmgdeal", dmgdeal);
	}
	
	// Load Data
	function loadData()
	{
		if(_getCookie("data_hp") != "") hp = parseInt(_getCookie("data_hp"));
		if(_getCookie("data_maxhp") != "") maxhp = parseInt(_getCookie("data_maxhp"));
		if(_getCookie("data_damage_power") != "") damage_power = parseInt(_getCookie("data_damage_power"));
		if(_getCookie("data_damage_level") != "") damage_level = parseInt(_getCookie("data_damage_level"));
		if(_getCookie("data_stage") != "") stage = parseInt(_getCookie("data_stage"));
		if(_getCookie("data_coin") != "") coin = parseInt(_getCookie("data_coin"));
		if(_getCookie("data_dmgdeal") != "") dmgdeal = parseInt(_getCookie("data_dmgdeal"));
	}

	// Fix Broken health
	function fixHealth()
	{
		if(hp <= 0)
		{
			hp = maxhp;
		}
	}
	
	function timer()
	{
		if(died == 0)
		{
			$('.timer').html(`${sec}`);
			
			if(sec > 0)
			{
				sec -= 1;
			}
			
			if(!sec)
			{
				endGame();
			}
		}
	}
		
	function endGame()
	{
		$('.health').html(`Game over`);
		killNinmy();
		
		setTimeout(() =>
		{
			$('.ninmy').css('background', `url(${ninmy_normal})`);
			$('.blood').css('background', `url(${ninmy_null})`);
			coin = 0;
			damage_level = 1;
			damage_power = 0;
			hp = 100;
			maxhp = 100;
			stage = 1;
			updateHealth()
			died = 0;
			touchable = 1;
		}, 2000);
	}
	
	function killNinmy()
	{
		$('.ninmy').css('background', `url(${ninmy_dead})`);
		$('.blood').css('background', `url(${ninmy_blood})`);
		var playAudio = new Audio('sound/yamete_kudasai.mp3'); playAudio.play();
		died = 1;
		hp = -1;
	}
		
	// Auto data saver
	let taskID_data = setInterval(saveData, 100);
	
	// Auto timer
	let taskID_timer = setInterval(timer, 1000);
	
	// Load data
	loadData(); fixHealth(); updateHealth();
})
