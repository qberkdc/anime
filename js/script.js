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
	var died = 0;
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
	var energy = 0;
	var maxenergy = 30;
	
	var level = 1;
	var exp = 0;
	var req = 20;

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
	var stgawrd = 5;
	
	var isUserHit = 1;
	
	let username = ""
	
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
			let amount = prompt("[ Damage ]: How much improve ?");
			powerUp(parseInt(amount));
		}
	})
	
	$('#energy_upgrade').on('click', function()
	{
		if(touchable == 1)
		{
			// Call function
			let amount = prompt("[ Energy ]: How much improve ?");
			energyUp(parseInt(amount));
		}
	})

	$('#change-bg1').on('click', 
	function()
	{
		 let bg_img = "https://raw.githubusercontent.com/qberkdc/anime/master/images/ninmy_bg.png";
		$('container').css('background', `url(${bg_img})`);
	});
	
	$('#change-bg2').on('click', 
	function()
	{
		 let bg_img = "https://raw.githubusercontent.com/qberkdc/anime/master/images/ninmy_bg2.png";
		$('container').css('background', `url(${bg_img})`);
	});
	
	$('#change-bg3').on('click', 
	function()
	{
		 let bg_img = "https://raw.githubusercontent.com/qberkdc/anime/master/images/ninmy_bg3.png";
		$('container').css('background', `url(${bg_img})`);
	});
	
	$('#change-bg4').on('click', 
	function()
	{
		 let bg_img = "https://raw.githubusercontent.com/qberkdc/anime/master/images/ninmy_bg4.png";
		$('container').css('background', `url(${bg_img})`);
	});
	
	$('#change-bg5').on('click', 
	function()
	{
		 let bg_img = "https://raw.githubusercontent.com/qberkdc/anime/master/images/ninmy_bg5.png";
		$('container').css('background', `url(${bg_img})`);
	});
	
	$('#change-bg6').on('click', 
	function()
	{
		 let bg_img = "https://raw.githubusercontent.com/qberkdc/anime/master/images/ninmy_bg6.png";
		$('container').css('background', `url(${bg_img})`);
	});
	
	$('#change-bg7').on('click', 
	function()
	{
		 let bg_img = "https://raw.githubusercontent.com/qberkdc/anime/master/images/ninmy_bg7.png";
		$('container').css('background', `url(${bg_img})`);
	});
	
	function updateHealth()
	{
		// Update text info
		$('.health').html(`Coins: ${coin} | Damage Lv: ${damage_level} | Stage: ${stage} | HP: ${hp}/${maxhp}`);
		$('.name').html(`${username}  |  Level: ${level}  |  Exp: (${exp}/${req})`);
		
		// Update health bar
		$('.current-health').css('width', (300 / maxhp * hp));
	}
	
	function updateEnergy()
	{
		// Update energy bar
		$('.current-energy').css('width', (300 / maxenergy * energy));
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

	function powerUp(amount)
	{
		// Calculate prices
		var price = amount * ( 15 * damage_level );
		var needs = price - coin;
		
		if(!parseInt(amount))
		{
			alert("Wrong amount");
			return;
		}
		
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
			damage_level += amount; coin -= price;
			var playAudio = new Audio('sound/upgrade_success.mp3'); playAudio.play();
			$('.health').html(`Upgrade successfull: ${damage_level} Lv`);
			
			setTimeout(() => 
			{
				updateHealth();
				touchable = 1;
			}, 1500);
		}
	}
	
	function energyUp(amount)
	{
		// Calculate prices
		var price = amount * ( 2 * maxenergy );
		var needs = price - coin;
		
		if(!parseInt(amount))
		{
			alert("Wrong amount");
			return;
		}
		
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
			maxenergy += amount * 5; coin -= price;
			var playAudio = new Audio('sound/upgrade_success.mp3'); playAudio.play();
			$('.health').html(`Upgrade successfull: ${maxenergy} Energy`);
			
			setTimeout(() => 
			{
				updateHealth();
				touchable = 1;
			}, 1500);
		}
	}
			
	function hit()
	{
		if(hp > 0 && touchable == 1 && energy < maxenergy)
		{
			isUserHit = 1;
			
			// Macro blocker
			touchable = 0; setTimeout(() => { touchable = 1 }, 60);
			
			// Play pain sound
			var random_sound = getRandom(0, 1);
			let sound
			
			if(random_sound == 1) sound = "sound/ahh.wav";
			if(random_sound == 0) sound = "sound/yahh.wav";
			
			var Oof = new Audio(sound); Oof.play();
			
			energy += 1
			
			// Drop the health
			hp -= (getRandom(2, 6) + (damage * damage_level));
			
			// Damage power & Award
			damage_power += 1;
			dmgdeal += (damage * damage_level);

			if(dmgdeal >= dmgmax)
			{
				dmgdeal = 0;
				coin += dmgawrd;
			}
			
			// Update character status
			updateHealth(); updateDamage(); updateEnergy();
			
			// If health is lower than 0
			if(hp < 0) hp = 0;

			// Change character status
			setTimeout(() => 
			{
				if(hp > 0)
				{
					// Make hurt effect
					$('.ninmy').css('background', `url(${ninmy_hurt})`);
					$('.blood').css('background', `url(${ninmy_blood})`);
				}
				else if (died == 0)
				{
					// Kill character
					killNinmy();
					
					// Switch next stage
					stage += 1;
					coin += stgawrd;
					printStage(stage);
					touchable = 0;
					
					// Give user exp
					exp += 5;
				}
			}, 10);

			// Character is alive
			setTimeout(() => 
			{
				if(hp > 0)
				{
					$('.ninmy').css('background', `url(${ninmy_normal})`);
					$('.blood').css('background', `url(${ninmy_null})`);
					isUserHit = 0;
				}
			}, 1000);
			
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
					isUserHit = 0;
					energy = 0;
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
		setCookie("data_sec", sec);
		setCookie("data_energy", energy);
		setCookie("data_maxenergy", maxenergy);
		
		setCookie("data_level", level);
		setCookie("data_exp", exp);
		setCookie("data_req", req);
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
		if(_getCookie("data_sec") != "") sec = parseInt(_getCookie("data_sec"));
		if(_getCookie("data_energy") != "") energy = parseInt(_getCookie("data_energy"));
		if(_getCookie("data_maxenergy") != "") maxenergy = parseInt(_getCookie("data_maxenergy"));
		
		if(_getCookie("data_level") != "") level = parseInt(_getCookie("data_level"));
		if(_getCookie("data_exp") != "") exp = parseInt(_getCookie("data_exp"));
		if(_getCookie("data_req") != "") req = parseInt(_getCookie("data_req"));
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
			if(sec > 20) $('.timer').css('color', `white`);
			if(sec > 15 && sec <= 20) $('.timer').css('color', `yellow`);
			if(sec <= 15) $('.timer').css('color', `orange`);
			if(sec <= 5) $('.timer').css('color', `red`);
			
			$('.timer').html(`${sec}`);
			
			if(sec > 0)
			{
				sec -= 1;
			}
			
			if(!sec)
			{
				endGame();
				died = 1;
			}
			
			if(sec ==5)
			{
				clearInterval(taskID_energy);
				taskID_energy = setInterval(setEnergy, 125);
			}
		}
	}
		
	function endGame()
	{
		setTimeout(() =>
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
				energy = 0;
				maxenergy = 25;
			}, 4000);
		}, 1000);
	}
	
	function killNinmy()
	{
		$('.ninmy').css('background', `url(${ninmy_dead})`);
		$('.blood').css('background', `url(${ninmy_blood})`);
		$('.timer').html(``);
		died = 1;
		hp = -1;
		sec = 30;
		clearInterval(taskID_energy);
		taskID_energy = setInterval(setEnergy, 300);
		var playAudio = new Audio('sound/yamete_kudasai.mp3'); 
		playAudio.play();
	}
	
	function setEnergy()
	{
		if(!isUserHit)
		{
			if(energy > 0) energy -= 1;
			updateEnergy();
		}
	}
	
	// Auto data saver
	let taskID_data = setInterval(saveData, 100);
	
	// Auto timer
	let taskID_timer = setInterval(timer, 1000);
	
	// Name checker
	let taskID_setname = setInterval(setName, 200);
	
	// Energy loader
	let taskID_energy = setInterval(setEnergy, 300);
	
	// PreThink
	let taskID_prethink = setInterval(client_PreThink, 200);
	
	function client_PreThink()
	{
		// Level Up System
		if(exp >= req)
		{
			exp -= req;
			level += 1;
			req += 25;
		}
		
		// Stage award
		stgawrd = stage * 5
	}
	
	function setName()
	{
		// Your name?
		username = getCookie("data_username");
	
		if(username == "")
		{
			dead = 1;
			touchable = 0;
			clearInterval(taskID_timer)
			username = prompt("Please enter your name:", "");

			if(!username.length)
			{
				alert("If you can't write your name, can't start the game");
			}
			else
			{
				setCookie("data_username", username);
				alert(`Welcome the game ${username}`);
				
				clearInterval(taskID_setname);
				taskID_timer = setInterval(timer, 1000);
				
				died = 0;
				sec = 30;
				touchable = 1;
				updateHealth();
			}
		}
	}
	
	function getRandom(min, max)
	{
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	// Load data
	loadData()
	
	// Fix Health
	fixHealth()
	
	// Update health
	updateHealth();
})
