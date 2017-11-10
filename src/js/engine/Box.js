class Box{
    constructor(x, y, width, height){
        $.extend(this, {
            x: x,
            y: y,
            width: width,
            height: height,
            left: x,
            right: x + width,
            top: y,
            bottom: y + height,
        })
    }
    checkCollision(box){
        let above = box.bottom < this.top
        let below = box.top > this.bottom
        let left = box.right < this.left
        let right = box.left > this.right
        
        return !(above || below || left || right)
    }
    draw(ctx){
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.stroke()
    }
}
module.exports = Box
