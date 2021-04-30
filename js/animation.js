let timer;

let player = {
    currentFrame: 0,
    fps: 10,
    isPlaying: true
};

function doAnimation() {

    player.fps = $('#txtFps').val();

	showCurrentFrame();

	nextFrame();

	timer = window.setTimeout(doAnimation, 1000/player.fps);
}

function showCurrentFrame() {
	$('#divAnim').html($('#preview' + player.currentFrame).html());

	let sourceCanvas = $('canvas', '#preview' + player.currentFrame);
	let destinationCanvas = $('canvas', '#divAnim');

	var destCtx = destinationCanvas[0].getContext('2d');

	destCtx.drawImage(sourceCanvas[0], 0, 0);
}

function nextFrame() {
	player.currentFrame++;
    
	if(player.currentFrame == 4) { 
        player.currentFrame = 0;
    }
}

function prevFrame() {
	player.currentFrame--;
    
	if(player.currentFrame < 0) { 
        player.currentFrame = 3;
    }
}

$(() => {
    $('#btnPause').click(() => {
        window.clearInterval(timer);
        player.isPlaying = false;
    });
    
    $('#btnPlay').click(() => {
        if(player.isPlaying) return;

        doAnimation();

        player.isPlaying = true;
    });
    
    $('#btnNext').click(() => {
        window.clearInterval(timer);
        nextFrame();
        showCurrentFrame();
    });
    
    $('#btnPrev').click(() => {
        window.clearInterval(timer);
        prevFrame();
        showCurrentFrame();
    });
    
    $('#txtFps').val(player.fps);
    doAnimation();
});