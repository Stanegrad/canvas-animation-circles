canvas = document.getElementById('canvas1');
ctx = canvas.getContext('2d');  // this will add the canvas inbuid api which hold all sittings such as fill color line width etc 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; //height and width both for canvas to cover the full screen
const particlesArray = [];

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;    
});

const mouse = {
    x: undefined,
    y: undefined,
}
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++){
        particlesArray.push(new Particle());    // this is making the circle as the click function triggers
    }
});

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 1; i++){
        particlesArray.push(new Particle());    // this is making the circle as the click function triggers and here it make the trail of the circle which follow the mouse 
    }
})

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        //this.x = Math.random() * canvas.width;
        //this.y = Math.random() * canvas.height;
        this.size = Math.random() * 12 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;  // this is reducing the size of the circles every frame
    }
    draw(){
        ctx.fillStyle = '#00F2DE';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();

        for (let j = i; j < particlesArray.length; j++){    //here we are finding out the dis btw the two particles 
            const dx = particlesArray[i].x - particlesArray[j].x //this will give the dx that the distance btw the particles in the x-axis
            const dy = particlesArray[i].y - particlesArray[j].y
            const distance = Math.sqrt(dx * dx + dy * dy); //here we are using the pythagorean theorem to find the dist 
            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = '#00F2DE';
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);   //starting point of the line
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);   //ending point of the line
                ctx.stroke();                
            }
        }

        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);    //splice is used here to remove the circles which are smaller than than 0.3 by comparing it with the 0.3
            console.log(particlesArray.length);
            i--;
        }
    }
}  // this is calling the particle to make the circle and than with the update and draw method it drawing them again and again 

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate); 
}
animate();
