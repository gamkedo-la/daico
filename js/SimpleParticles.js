// a very simple particle system

const PARTICLES_ENABLED = true; // if false, no particles at all

var particles = new SimpleParticles(); 

function SimpleParticles() {

    var particle = []; // all known particles in a pool so old ones can be reused

    this.add = function (x, y, sprite, life, rotationSpeed, forcedAngle, velX, velY, myAlpha) {
        if (!PARTICLES_ENABLED) return;
        var p, pnum, pcount;
        if (velX == undefined) velX = 0;
        if (velY == undefined) velY = 0;
        if (myAlpha == undefined) myAlpha = 1;
        if (rotationSpeed == undefined) rotationSpeed = Math.random() * 3 - 2;
        if (forcedAngle == undefined) forcedAngle = 0;
        if (sprite == undefined) { 
            console.log("ERROR: particles are using an undefined sprite!"); 
            sprite = sparklePic;
        }
        for (pnum = 0, pcount = particle.length; pnum < pcount; pnum++) {
            p = particle[pnum];
            if (p && p.inactive) { break; } // found one we can reuse
        }
        if (!p || !p.inactive) { // we need a new one
            var newParticle = { inactive: true };
            particle.push(newParticle);
            p = newParticle;
        }
        if (p && p.inactive) { // reuse an old one
            p.x = x;
            p.y = y;
            p.inactive = false;
            p.sprite = sprite;
            p.life = life;
            p.birth = (new Date()).getTime();
            p.death = p.birth + life;
            p.angle = forcedAngle;
            p.alpha = myAlpha;
            p.maxalpha = myAlpha;
            p.rotSpd = rotationSpeed;
            p.velX = velX;
            p.velY = velY;
        }
    }

    this.update = function () {
        if (!PARTICLES_ENABLED) return;
        var timestamp = (new Date()).getTime();
        particle.forEach(
            function (p) {
                if (!p.inactive) {
                    p.age = timestamp - p.birth;
                    var lifePercent = (p.age / p.life);
                    if (lifePercent > 1) lifePercent = 1;
                    if (lifePercent < 0) lifePercent = 0;
                    p.x += p.velX; // move
                    p.y += p.velY;
                    p.velX *= 0.94; // slow down
                    p.velY *= 0.94;
                    p.alpha = (1 - lifePercent) * p.maxalpha; // fade
                    p.angle = Math.PI * 2 * lifePercent * p.rotSpd;
                    if (timestamp >= p.death) p.inactive = true;
                }
            });
    }

    this.draw = function () {
        if (!PARTICLES_ENABLED) return;
        particle.forEach(
            function (p) {
                if (!p.inactive) {
                    drawBitmapCenteredAtLocationWithRotation(p.sprite,p.x,p.y,p.angle,p.alpha);
                }
            }
        );
    }

    // immediately clears all particles
    this.clear = function () { particle = []; }
};

// helper function (inclusive: eg 1,10 may include 1 or 10)
function randomInt(min,max) { return Math.floor(Math.random()*(max-min+1))+min; }




///////////////////////////////////////////////////
// custom effects used by this game specifically //
///////////////////////////////////////////////////

function footprint_fx(x,y) {
    //console.log("footprint_fx");
    let life = 4000;
    let rotspd = 0;
    let ang = 0;
    let velx = 0;
    let vely = 0;
    let alpha = 0.15;
    particles.add(x,y+18,footprintPic,life,rotspd,ang,velx,vely,alpha);
}

function damage_fx(x, y) {
    //console.log("damage_fx");
    var num = 8;
    for (var i = 0; i < num; i++) {
        let life = randomInt(333,777);
        let size = 1;
        let rotspd = Math.random()*0.3-0.15;
        let ang = 0;
        let velx = Math.random()*7-1.5;
        let vely = Math.random()*-3;
        let alpha = 0.5;
        particles.add(x,y,bloodPic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function goal_fx(x, y) {
    //console.log("goal_fx");
    for (var i = 0; i < 32; i++) {
        let life = randomInt(1000,2000);
        let size = 1;
        let rotspd = Math.random()*4-2;
        let ang = 0;
        let velx = Math.random()*2-1.5;
        let vely = Math.random()*-8;
        let alpha = 1.0;
        particles.add(x,y,sparklePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function key_fx(x, y) {
    //console.log("key_fx");
    for (var i = 0; i < 32; i++) {
        let life = randomInt(555,999);
        let size = 1;
        let rotspd = Math.random()*4-2;
        let ang = 0;
        let velx = Math.random()*6-3;
        let vely = Math.random()*8-4;
        let alpha = 1.0;
        particles.add(x,y,sparklePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function door_fx(x, y) {
    //console.log("door_fx");
    for (var i = 0; i < 64; i++) {
        let life = randomInt(1500,2500);
        let size = 10;
        let rotspd = Math.random()*4-2;
        let ang = 0;
        let velx = Math.random()*2-1;
        let vely = Math.random()*2-1;
        let ofsx = Math.random()*100-50;
        let ofsy = Math.random()*100-50;
        let alpha = 0.5;
        particles.add(x+ofsx,y+ofsy,smokePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function rock_fx(x,y) {
    //console.log("rock_fx");
    for (var i = 0; i < 32; i++) {
        let life = randomInt(555,999);
        let size = 1;
        let rotspd = Math.random()*4-2;
        let ang = 0;
        let velx = Math.random()*6-3;
        let vely = Math.random()*8-4;
        let alpha = 1.0;
        particles.add(x,y,sparklePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function diamond_fx(x,y) {
    //console.log("diamond_fx");
    for (var i = 0; i < 32; i++) {
        let life = randomInt(555,999);
        let size = 1;
        let rotspd = Math.random()*4-2;
        let ang = 0;
        let velx = Math.random()*6-3;
        let vely = Math.random()*8-4;
        let alpha = 1.0;
        particles.add(x,y,sparklePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function angel_fx(x,y) {
    //console.log("angel_fx");
    for (var i = 0; i < 32; i++) {
        let life = randomInt(555,999);
        let size = 1;
        let rotspd = Math.random()*4-2;
        let ang = 0;
        let velx = Math.random()*6-3;
        let vely = Math.random()*8-4;
        let alpha = 1.0;
        particles.add(x,y,sparklePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}

function bump_wall_fx(x, y) {
    //console.log("bump_wall_fx");
    for (var i = 0; i < 32; i++) {
        let life = randomInt(555,999);
        let size = 1;
        let rotspd = Math.random()*4-2;
        let ang = 0;
        let velx = Math.random()*6-3;
        let vely = Math.random()*8-4;
        let alpha = 1.0;
        particles.add(x,y,sparklePic,life,size,rotspd,ang,velx,vely,alpha);
    }
}
