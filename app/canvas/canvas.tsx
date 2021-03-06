import { useEffect } from "react";


export default function CanvasFun() {

    useEffect(() => {
        const canvas = document.getElementById("canvas1") as HTMLCanvasElement;

        let mouseMove: any;

        if (canvas) {
            const ctx = canvas.getContext("2d");

            let TRAIL_PLAN = ["u","r","d","b","r","c"];
            const pointCopy = function(src: any, dst: any){
                dst.x = src.x;
                dst.y = src.y;
                dst.z = src.z;
                return dst;
            };
            const Trail = function(this: any, pos: any, t: any, plan_i: number){
                this.pos={x:0,y:0,z:0};
                this.start={x:0,y:0,z:0};
                this.goal={x:0,y:0,z:0};
                this.start_time;
                this.take_time;
                this.vertexes = [];
                pointCopy(pos, this.pos);
                pointCopy(pos, this.start);
                pointCopy(pos, this.goal);
                this.plan_i = plan_i%TRAIL_PLAN.length || 0;
                this.sz = pos.z;
                this.setNextGoal(t);
            };
            Trail.prototype.setNextGoal = function(t: any){
                pointCopy(this.goal, this.start);
                this.plan_i = (this.plan_i+1)%TRAIL_PLAN.length;
                switch(TRAIL_PLAN[this.plan_i]){
                    case "r":
                        this.goal.x += Math.random()*50+50;
                        break;
                    case "l":
                        this.goal.x -= Math.random()*50+50;
                        break;
                    case "u":
                        this.goal.y -= Math.random()*250+100;
                        break;
                    case "d":
                        this.goal.y = 0;
                        break;
                    case "b":
                        this.goal.z += Math.random()*1;
                        break;
                    case "c":
                        this.goal.z = this.sz;
                        break;
                    default:
                        break;
                }
                this.start_time = t;
                this.take_time = 100+Math.random()*100;
                this.vertexes.push(pointCopy(this.start, {x:0,y:0,z:0}));
                if(this.vertexes.length > 100){
                    this.vertexes.splice(0,this.vertexes.length-100);
                }
            };
            Trail.prototype.update = function(t: any){
                quadIn(
                    t-this.start_time,
                    this.start,
                    this.goal,
                    this.take_time,
                    this.pos
                    );
                if(t-this.start_time > this.take_time){
                    this.setNextGoal(this.start_time+this.take_time);
                    this.update(t);
                }
            };
            Trail.prototype.draw = function(ctx: any, camera: any){
                let i;
                let ps = {x:0, y:0};
                // ctx.font = "100px serif";
                // ctx.strokeText("Contact Me", -200, 200, 400);
                ctx.beginPath();
                if(perspective(this.vertexes[0], camera, ps)){
                  ctx.moveTo(ps.x, ps.y);
                  ctx.lineWidth = 2;
                }
                for(i=1; i<this.vertexes.length; i++){
                    if(perspective(this.vertexes[i], camera, ps)){
                        ctx.strokeStyle = "darkgreen";
                        ctx.lineTo(ps.x, ps.y);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(ps.x, ps.y);
                        ctx.closePath();
                    }
                }
                if(perspective(this.pos, camera, ps)){
                    ctx.strokeStyle = "gray";
                    ctx.lineTo(ps.x, ps.y);
                    ctx.closePath();
                    ctx.stroke();
                }
            };

            const quadIn = function(t: any, b: any, c: any, d: any, dst: any){
                t /= d;
                dst.x = (c.x-b.x)*t*t+b.x;
                dst.y = (c.y-b.y)*t*t+b.y;
                dst.z = (c.z-b.z)*t*t+b.z;
            };

            const perspective = function(point: any, camera: any, dst: any){
                let dz = point.z - camera.z;
                if(dz > 0){
                    dst.x = (point.x-camera.x)/dz;
                    dst.y = (point.y-camera.y)/dz;
                    return true;
                }
                return false;
            };
            
            const updateScene = function(): void{
                let time_now = new Date().getTime();
                let time_d = time_now-time_pre;
                for(let i=0; i<trails.length; i++){
                  trails[i].update(time_now);
                }
                camera.x += (trails[0].pos.x-camera.x-50)*0.0002*time_d;
                camera.y += (trails[0].pos.y-camera.y-300)*0.00002*time_d;
                // camera.z += (trails[0].pos.z-camera.z)*0.0002*time_d;
                time_pre = time_now;
            };

            const drawScene = function(ctx: any){
                ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
                for(let i=0; i<trails.length; i++){
                  trails[i].draw(ctx, camera);
                }
            };

            let trails = [] as any;
            let time_now = new Date().getTime();
            let time_pre = time_now;

            for(let i=0; i<8; i++) {
                trails.push(new (Trail as any)({x:Math.random()*50-25, y:Math.random()*50-25, z:i}, time_now, i));
            }

            const camera = {x:0, y:0, z:-2};
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx?.translate(canvas.width/2, canvas.height/2);
            setInterval(function(){
                updateScene();
                drawScene(ctx);
            }, 1000/60);
            mouseMove = canvas.addEventListener("mousemove", (e) => {
                camera.z = -2 + (e.clientY-canvas.height/2)/canvas.height*4;
            })
        }

        return () => {
            canvas.removeEventListener("mousemove", mouseMove);
        }
    })



  return (
      <canvas id='canvas1' height='400' width='800'></canvas>
  )
}
