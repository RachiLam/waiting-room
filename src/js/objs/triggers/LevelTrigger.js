var GameObj = EngineUtil.GameObj

class LevelTrigger extends GameObj{
    constructor(x, y, width, height, options){
        super(x, y, width, height, $.extend(options, {
            physics: true,
            gravity: 0,
            collider: false,
            trigger: true,
            //draw: false,
        }))
    }
}
module.exports = LevelTrigger