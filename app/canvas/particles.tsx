import { useEffect } from 'react';

export default function Particles() {

    useEffect(() => {
        const canvas = document.getElementById("particles") as HTMLCanvasElement;
        
        let reSize: any;
        let mouseMove: any;
        let touchMove: any;
        
        let click: any;
        let touchEnd: any;
        let animation: any;
        let pause: boolean = false;

        if (canvas) {

            const ctx = canvas.getContext("2d")

            if (ctx) {

                let particles: any = []
                let amount: number = 0
                let mouse: any = {x:0,y:0}
                let radius: number = .5;
        
                // let colors = ["#468966", "#FFB03B","black", "white", "#B64926", "#8E2800"];
                // let colors = ["#468966", 'orange'];
                // let colors = ["black "];
                let colors = [ 'orange', 'darkgreen', '#468966']
            
                let ww = canvas.width = document.documentElement.clientWidth;
                let wh = canvas.height = document.documentElement.clientHeight;
        
                function Particle(this: any, x: any,y: any){
                    this.x =  x;
                    this.y =  y;
                    this.dest = {
                        x : x,
                        y: y
                    };
                    // this.r =  Math.random()*3 + 2;
                    this.r = 2;
                    this.vx = (Math.random()-0.5)*10;
                    this.vy = (Math.random()-0.5)*10;
                    this.accX = 0;
                    this.accY = 0;
                    this.friction = Math.random()*0.02 + 0.94;
            
                    // this.color = colors[Math.floor(Math.random()*3)];
                    this.color = 'lightgray';
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
                    ctx.closePath();
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
                    ww = canvas.width = document.documentElement.clientWidth;
                    wh = canvas.height = document.documentElement.clientHeight;
                    
                    if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                        // ctx.font = "" + ww / 7 + "px Source Sans Pro";
                        if (ww > 800) {
                            ctx.font = "" + ww / 10 + "px Source Sans Pro";
                        } else {
                            ctx.font = "" + ww / 7 + "px Source Sans Pro";
                        }
                        ctx.textAlign = "left";
                        ctx.fillText("< Cotter />", 75, wh > 2000 ? 500 : ww > 1200 ? 250 : 200, 1200);
                        // ctx.fillText("Hi, I'm Sean", 25, 300);
            
                        let data  = ctx.getImageData(0, 0, ww, wh);
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.globalCompositeOperation = "screen";
                        particles = [];
                        // for(let i=0;i<ww;i+=Math.round(ww/1000)){
                        //     for(let j=0;j<wh;j+=Math.round(wh/150)){
                        //         if(data.data[ ((i + j*ww)*4) + 3] > 150){
                        //             particles.push(new (Particle as any)(i,j));
                        //         }
                        //     }
                        // }
                        if (ww > 1000) {
                            for(let i=0;i<data.width;i+=6){
                                for(let j=0;j<data.height;j+=4){
                                    if(data.data[(j * 4 * data.width) + (i * 4) + 3] > 128){
                                        particles.push(new (Particle as any)(i,j));
                                    }
                                }
                            }
                        }
                        else if (ww <= 1000){
                            for(let i=0;i<data.width;i+=4){
                                for(let j=0;j<data.height;j+=2){
                                    if(data.data[(j * 4 * data.width) + (i * 4) + 3] > 128){
                                        particles.push(new (Particle as any)(i,j));
                                    }
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
                    if (pause) return;
                    ctx?.clearRect(0, 0, canvas.width, canvas.height);
                    for (let i = 0; i < amount; i++) {
                        particles[i].render();
                    }
                    connect();
                    requestAnimationFrame(render);
                };

                function connect() {
                  let opacityValue = 1;
                  let connectors = particles.length;
                  for (let a = 0; a < connectors; a+=2) {
                    for (let b = a; b < connectors; b++) {
                      let distance =
                        (particles[a].dest.x - particles[b].dest.x) *
                          (particles[a].dest.x - particles[b].dest.x) +
                        (particles[a].dest.y - particles[b].dest.y) *
                          (particles[a].dest.y - particles[b].dest.y);

                      if (distance < 50) {
                        opacityValue = 1 - distance / 50;
                        let dx = mouse.x - particles[a].x;
                        let dy = mouse.y - particles[a].y;
                        let mouseDistance = Math.sqrt(dx * dx + dy * dy);
                        if (ctx) {
                          if (mouseDistance < radius - 50) {
                            particles[a].r = 4;
                            ctx.strokeStyle =
                              "rgba(0,0,0," + opacityValue + ")";
                          } else if (mouseDistance < radius) {
                            particles[a].r = 3;
                            ctx.lineWidth=8;
                            ctx.strokeStyle =
                              "rgba(0,255,0," + opacityValue + ")";
                          } else if (mouseDistance < radius + 50) {
                            particles[a].r = 1;
                            ctx.lineWidth=4;
                            ctx.strokeStyle =
                              "rgba(0,0,0," + opacityValue + ")";
                          } else {
                            particles[a].r = .5;
                            ctx.lineWidth = .5;
                            ctx.strokeStyle =
                            "rgba(0,0,0," + opacityValue + ")";
                        }
                          ctx.beginPath();
                          ctx.moveTo(particles[a].x, particles[a].y);
                          ctx.lineTo(particles[b].x, particles[b].y);
                          ctx.stroke();
                        }
                      }
                    }
                  }
                }
        
                reSize = window.addEventListener("resize", initScene);
                mouseMove = window.addEventListener("mousemove", onMouseMove);
                touchMove = window.addEventListener("touchmove", onTouchMove);
                click = window.addEventListener("click", onMouseClick);
                touchEnd = window.addEventListener("touchend", onTouchEnd);
                initScene();
                animation = render();
            }
        }

        return () => {
            window.removeEventListener("resize", reSize);
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("touchmove", touchMove);
            window.removeEventListener("click", click);
            window.removeEventListener("touchend", touchEnd);
            cancelAnimationFrame(animation);
            pause = true;
        }
    });

    return (
        <canvas id="particles" height='400' width='800'></canvas>
    )
}