$(window).on('load', function() {

	$('#vid-1').css('display', 'none');
	$('#vid-2').css('display', 'none');
	$('.win').css('display','none');

	var berkayHealth = 300;
	var win = false;
	var berkay = $('#berkay');

	$('#berkay').on('click', function(){
		hitTheBerkayRandomly();
	})

	function updateHealth(){
		$('.current-health').css('width', berkayHealth)
	}

	function hitTheBerkayRandomly(){
		if(win === false)
		{
			var damage = Math.floor(Math.random() * 12);
			var Oof = new Audio('sound/yahh.wav');
			Oof.play();
			berkayHealth = berkayHealth - damage;
			updateHealth();
			printDamage(damage);
			if(berkayHealth <= 0)
			{
				Win();
				win = true;
			}
		}
	}

	function printDamage(damage){
		$('.damage').html(`Damage -${damage}`);
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
