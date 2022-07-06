function drawHealthUI() {
    var pos = 0;
    var showHeartNum;
    if(heartHeld < 4) {
        showHeartNum = heartHeld;
    } else {
        showHeartNum = 4;
    }

    const heartsToDraw = Math.max(showHeartNum, 4)
    for (let i = 0; i < heartsToDraw; i++) {
        if (i < showHeartNum) {
            canvasContext.drawImage(
                heartFull,
                pos + i * 26, 0,
                heartEmpty.width, heartEmpty.height
            );
        } else {
            canvasContext.drawImage(
                heartEmpty,
                pos + i * 26, 0,
                heartEmpty.width, heartEmpty.height
            );
        }
    }
}
