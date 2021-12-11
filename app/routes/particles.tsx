import { useEffect } from 'react';

export default function Particles() {

    useEffect(() => {
        const canvas = document.getElementById("particles") as HTMLCanvasElement;
        
        if (canvas) {

            const ctx = canvas.getContext("2d")
            if (ctx) {

                let particles: any = []
                let amount: number = 0
                let mouse: any = {x:0,y:0}
                let radius: number = .5;
        
                let colors = ["#468966", "#FFB03B","#B64926", "#8E2800"];
                // let colors = ["#EA00FF", "#39FF14"];
            
                let ww = canvas.width = document.documentElement.clientWidth;
                let wh = canvas.height = document.documentElement.clientHeight;
        
                function Particle(this: any, x: any,y: any){
                    this.x =  Math.random()*ww;
                    this.y =  Math.random()*wh;
                    this.dest = {
                        x : x,
                        y: y
                    };
                    this.r =  Math.random()*3 + .5;
                    this.vx = (Math.random()-0.5)*20;
                    this.vy = (Math.random()-0.5)*20;
                    this.accX = 0;
                    this.accY = 0;
                    this.friction = Math.random()*0.02 + 0.94;
            
                    this.color = colors[Math.floor(Math.random()*2)];
                }
        
                Particle.prototype.render = function() {
        
                    this.accX = (this.dest.x - this.x)/1000;
                    this.accY = (this.dest.y - this.y)/1000;
                    this.vx += this.accX;
                    this.vy += this.accY;
                    this.vx *= this.friction;
                    this.vy *= this.friction;
            
                    this.x += this.vx;
                    this.y +=  this.vy;
        
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
                    ctx.fill();
        
                    let a = this.x - mouse.x;
                    let b = this.y - mouse.y;
        
                    let distance = Math.sqrt( a*a + b*b );
                    if(distance<(radius*70)){
                        this.accX = (this.x - mouse.x)/100;
                        this.accY = (this.y - mouse.y)/100;
                        this.vx += this.accX;
                        this.vy += this.accY;
                    }
        
                }
        
                function onMouseMove(e: MouseEvent){
                    mouse.x = e.clientX;
                    mouse.y = e.clientY;
                }
        
                function onTouchMove(e: TouchEvent){
                    if(e.touches.length > 0 ){
                        mouse.x = e.touches[0].clientX;
                        mouse.y = e.touches[0].clientY;
                    }
                }
        
                function onTouchEnd(e: TouchEvent){
                    mouse.x = 0;
                    mouse.y = 0;
                }
        
                function initScene(){
                    const size = canvas.getBoundingClientRect();
                    ww = canvas.width = document.documentElement.clientWidth;
                    wh = canvas.height = document.documentElement.clientHeight;
                    
                    if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                        ctx.font = "" + wh / 6 + "px Source Sans Pro";
                        ctx.textAlign = "center";
                        ctx.fillText("Hi,", ww / 3.5, wh / 3.5);
                        ctx.fillText("I'm Sean", ww/2, wh / 2.2);
            
                        let data  = ctx.getImageData(0, 0, ww, wh).data;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.globalCompositeOperation = "screen";
                        particles = [];
                        for(let i=0;i<ww;i+=Math.round(ww/400)){
                            for(let j=0;j<wh;j+=Math.round(wh/150)){
                                if(data[ ((i + j*ww)*4) + 3] > 150){
                                    particles.push(new (Particle as any)(i,j));
                                }
                            }
                        }
                    }
        
                    amount = particles.length;
            
                }
        
                function onMouseClick(){
                    radius += .5;
                    if(radius === 2){
                        radius = 0.5;
                    }
                }
        
                function render() {
                    requestAnimationFrame(render);
                    ctx?.clearRect(0, 0, canvas.width, canvas.height);
                    for (var i = 0; i < amount; i++) {
                        particles[i].render();
                    }
                };
        
                window.addEventListener("resize", initScene);
                window.addEventListener("mousemove", onMouseMove);
                window.addEventListener("touchmove", onTouchMove);
                window.addEventListener("click", onMouseClick);
                window.addEventListener("touchend", onTouchEnd);
                initScene();
                requestAnimationFrame(render);
            }
        }
    });

    return (
        <canvas id="particles" height='400' width='800'></canvas>
    )
}