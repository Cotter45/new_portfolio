import { useEffect } from 'react';

export default function ProfileImage() {

  useEffect(() => {
      const image = new (Image as any)();
      image.src = '/images/linkedin_pic.jpg';

      let animation: any;
    
      image.addEventListener("load", function () {
    
        const canvas = document.getElementById("selfie") as HTMLCanvasElement;
        const ctx = canvas?.getContext("2d");
        canvas.width = 572;
        canvas.height = 352;
    
        let particlesArray: any = [];
        const numberOfParticles = 5000;
        const detail = 5;
    
        ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    
        const pixels = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
    
        let grid: any = [];
        for (let y = 0; y < canvas.height; y += detail) {
          let row = [];
          for (let x = 0; x < canvas.width; x += detail) {
              let brightness;
              if (pixels) {
                  const red: number = pixels.data[y * 4 * pixels.width + x * 4];
                  const green: number = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
                  const blue: number = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];
                  // const color: string = "rgb(" + red + "," + green + "," + blue + ")";
                  brightness = calculateBrightness(red, green, blue) / 100;
              }
    
              row.push(brightness);
          }
          grid.push(row);
        }


        class Particle {
            x: number;
            y: number;
            speed: number;
            velocity: number;
            size: number;

          constructor() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            //this.prevX = this.x;
            this.speed = 0;
            this.velocity = Math.random() * 0.7;
            this.size = Math.random() * .8 + 1;
          }
          update() {
            this.speed =
              grid[Math.floor(this.y / detail)][Math.floor(this.x / detail)];
            let movement = 2.5 - this.speed + this.velocity;
            this.y += movement;
            if (this.y >= canvas.height) {
              this.y = 0;
              this.x = Math.random() * canvas.width;
            }
            //console.log(this.x += movement)
          }
          draw() {
              if (ctx) {
                  ctx.beginPath();
                  ctx.fillStyle = "white";
                  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
                  ctx.fill();
              }
          }
        }

        function init() {
          for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
          }
        }
        init();

        function animate() {
            if (ctx) {
                ctx.globalAlpha = 0.05;
                ctx.fillStyle = "rgb(0, 0,0)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 0.2;
                for (let i = 0; i < particlesArray.length; i++) {
                  particlesArray[i].update();
                  ctx.globalAlpha = particlesArray[i].speed * 0.3;
                  particlesArray[i].draw();
            }
          }
          requestAnimationFrame(animate);
        }
        animation = animate();

        function calculateBrightness(red: number, green: number, blue: number) {
          return Math.sqrt(
            red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
          );
        }
      });

      return () => {
        // cleanup
        window.cancelAnimationFrame(animation);
      }

    });

    return (
        <canvas id="selfie" />
    );
}