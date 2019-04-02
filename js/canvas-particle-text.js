class Point{
    constructor(ctx,x,y,z,canvasWidth, canvasHeight){
        this.x = x;
        this.y = y;
        this.z = z;
        this.initX = Math.random() * canvasWidth;
        this.initY = Math.random() * canvasHeight;
        this.initZ = z;
        this.speedX = (this.x - this.initX)/100;
        this.speedY = (this.y - this.initY)/100;
        this.speedZ = (this.initZ - 1)/100;
        this.opacity = this.z/2-0.5;
        this.opacitySpeed = 1 - this.opacity/100;
        this.drawPoint(ctx);
    }
    drawPoint(ctx){
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = `rgba(0,0,0,${this.opacity})`;
        ctx.strokeStyle = `rgba(0,0,0,${this.opacity})`;
        ctx.arc(this.initX, this.initY ,3 * this.initZ,0,2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
        ctx.closePath();
    }
}


export class DrawText{
    constructor(id, text, time =3,fontSize=150) {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext('2d');
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        let count = 0;// timer的次数
        let textPoint = [];
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = `${fontSize}px Arial`;
        ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);
        ctx.restore();
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (let i = 0; i < canvasWidth; i += 6) {
            for (let j = 0; j < canvasHeight; j += 6) {
                let k = (j * canvasWidth) + i;
                if (imageData[4 * k + 3] > 0) {
                    textPoint.push(new Point(ctx, i, j, (Math.random() + 0.5) * 2, canvasWidth, canvasHeight));
                }
            }
        }
        const timer = setInterval(() => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            textPoint.forEach(item => {
                item.initX = item.initX + item.speedX;
                item.initY = item.initY + item.speedY;
                item.initZ = item.initZ - item.speedZ;
                item.opacity = item.opacity + item.opacitySpeed;
                item.drawPoint(ctx);
            });
            if (++count === 100) {
                clearInterval(timer);
            }
        }, Math.floor(time * 1000 / 100));
    }
}
// new DrawText('canvasText',new Date().toLocaleString(),3);
