function drawHealthUI() {
    var pos=0;
    var showHeartNum;
    if(heartHeld<4) {
        showHeartNum = heartHeld;
    } else {
        showHeartNum = 4;
    }
    for (var i = 0; i<4; i++) {
        canvasContext.drawImage(heartEmpty,pos+i*26,0,
           heartEmpty.width, 
           heartEmpty.height);
    }

        
        for (var i = 0; i<showHeartNum; i++) {
            pos=0
            canvasContext.drawImage(heartFull,pos+i*26,0,
               heartEmpty.width, 
               heartEmpty.height);
        } 

}
