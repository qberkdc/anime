$(window).on('load', function()
{
	$('#vid-1').css('display', 'none');
	$('#vid-2').css('display', 'none');
	$('.win').css('display','none');

	// Cookie Set
	function setCookie(cname, cvalue, exdays) {
	  const d = new Date();
	  d.setTime(d.getTime() + (exdays*24*60*60*1000));
	  let expires = "expires="+ d.toUTCString();
	  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	// Cookie Get
	function getCookie(cname) {
	  let name = cname + "=";
	  let decodedCookie = decodeURIComponent(document.cookie);
	  let ca = decodedCookie.split(';');
	  for(let i = 0; i <ca.length; i++) {
  	  let c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
	  }
	  return "";
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
	
	// Load Data
	if(getCookie("data_hp") > 1) hp = getCookie("data_hp");
	if(getCookie("data_maxhp") > 1) maxhp = getCookie("data_maxhp");
	if(getCookie("data_damage_power") > 1) damage_power = getCookie("data_damage_power");
	if(getCookie("data_damage_level") > 1) damage_level = getCookie("data_damage_level");
	if(getCookie("data_stage") > 1) stage = getCookie("data_stage");
	if(getCookie("data_coin") > 1) coin = getCookie("data_coin");
	if(getCookie("data_dmgdeal") > 1) dmgdeal = getCookie("data_dmgdeal");
	
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
		$('.health').html(`Coins: ${coin} | Damage Lv: ${damage_level} | Stage: ${stage} | HP: ${hp}/${maxhp}`);
		
		// Update health bar
		$('.current-health').css('width', (300 / maxhp * hp));
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
		if(hp > 0 && touchable == 1)
		{
			// Play pain sound
			var Oof = new Audio('sound/yahh.wav'); Oof.play();
			
			// Drop the health
			hp = hp - (damage * damage_level);
			
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
					stage = stage + 1;
					coin = coin + stgawrd;
					printStage(stage);
					var playAudio = new Audio('sound/yamete_kudasai.mp3'); playAudio.play();
					touchable = 0;
				}
			}, 10);
			
			// Award message
			if(hp <= 0)
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
			if(hp <= 0)
			{
				setTimeout(() => 
				{
					nextStage()
				}, 6000);
			}
			
			// Save data
			setTimeout(() =>
			{
				saveData();
			}, 100);
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
		setCookie("data_hp", `${hp}`", 99999999);
		setCookie("data_maxhp", `${maxhp}`", 99999999);
		setCookie("data_damage_power", `${damage_power}`", 99999999);
		setCookie("data_damage_level", `${damage_level}`", 99999999);
		setCookie("data_stage", `${stage}`", 99999999);
		setCookie("data_coin", `${coin}`", 99999999);
		setCookie("data_dmgdeal", `${dmgdeal}`", 99999999);
	}
})
