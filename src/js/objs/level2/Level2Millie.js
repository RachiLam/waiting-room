var paths = Util.paths
var Sound = EngineUtil.Sound
var SpriteSheet = EngineUtil.SpriteSheet
var Scene = EngineUtil.Scene
var SU = Scene.SU
var U = Scene.U

var Camera = require(paths.obj('Camera'))

var Millie = require(paths.obj('dogs/Millie'))
var MillieTreat = require(paths.obj('triggers/MillieTreat'))
var EndTrigger = require(paths.obj('triggers/EndTrigger'))

var Wall = require(paths.obj('barriers/Wall'))
var Platform = require(paths.obj('platforms/Platform'))
var Elevator = require(paths.obj('platforms/Elevator'))

class Level2Millie extends Millie{
    constructor(x, y){
        super(x, y)
    }
    
    handleTrigger(engine, trigger){
        super.handleTrigger(engine, trigger)
        
        if(trigger.instanceOf('EndTrigger')){
            trigger.onTrigger(engine)
        }
        
        if(trigger.instanceOf('TreatTrigger')){
            trigger.onTrigger(engine)
            
            let treatId = trigger.treatId
            this.removeObjsByStage(engine, treatId)
            if(treatId == 'stage-1'){
                let stage2SetupTime = 2000
                let stage2Options = {tags: ['stage-2']}
                
                let stage2Start = new Wall(6.5*U, 1*SU.y + 5.50*U, U, 0, stage2Options)
                stage2Start.growTo(6.5*U, 1*SU.y + 5.25*U, U, .5*U, stage2SetupTime)
                
                let stage2Platform = new Platform(2.9*U, 6.5*U, 5*U, 1*SU.y + 5.0*U, undefined, 1000, 30, 10, stage2Options)
                stage2Platform.slideTo(2.9*U, 1*SU.y + 5.0*U, stage2SetupTime)
                
                let stage2Wall = new Wall(3.6*U, 5.5*U, 6, 10, stage2Options)
                stage2Wall.slideTo(3.6*U, 1*SU.y + 4.7*U, stage2SetupTime)
                
                let stage2End = new Wall(1.5*U, 5.5*U, 30, 10, stage2Options)
                stage2End.slideTo(1.5*U, 1*SU.y + 4.7*U, stage2SetupTime)
                
                let stage2Treat = new MillieTreat(1.5*U, 5.2*U, 'stage-2')
                stage2Treat.slideTo(1.5*U, 1*SU.y + 4.4*U, stage2SetupTime)
                
                engine.addObj(stage2Start)
                engine.addObj(stage2Platform)
                engine.addObj(stage2Wall)
                engine.addObj(stage2End)
                engine.addObj(stage2Treat)
            }else if(treatId == 'stage-2'){
                let stage3SetupTime = 2000
                let stage3Options = {tags: ['stage-3']}
                
                let elevator = engine.getObjsByClass('Elevator')[0]
                elevator.start()
                
                let stage3Platform1 = new Platform(2*U, 5.5*U, 3.25*U, 1*SU.y + 1.25*U - 5, undefined, 1000, 30, 10, stage3Options)
                stage3Platform1.slideTo(2*U, 1*SU.y + 1.25*U - 5, stage3SetupTime)
                
                let stage3Platform2 = new Platform(6*U, 5.5*U, 4.75*U, 1*SU.y + 1.25*U - 5, undefined, 1000, 30, 10, stage3Options)
                stage3Platform2.slideTo(6*U, 1*SU.y + 1.25*U - 5, stage3SetupTime)
                
                let stage3Treat = new MillieTreat(7.25*U, 5.5*U, 'stage-3')
                stage3Treat.slideTo(7.25*U, 1*SU.y + .88*U, stage3SetupTime)
                
                engine.addObj(stage3Platform1)
                engine.addObj(stage3Platform2)
                engine.addObj(stage3Treat)
            }else if(treatId == 'stage-3'){
                let endTrigger = new EndTrigger(4*U, -1*U, SU.x, 20, 'Level3')
                engine.addObj(endTrigger)
                
                this.setControllerId(undefined)
                this.disable()
                this.setAnimation('idleRight')
                
                let frameCamera = new Camera(7.25*U, 1*SU.y, 4*U, 4.5*U, 5000, ()=>{
                    let coco = engine.getObjsByClass('Coco')[0]
                    coco.disable()
                    coco.gravity = 0
                    coco.slideTo(4.5*U, -U, 3000)
                    
                    this.gravity = 0
                    this.slideTo(3.5*U, -U, 3000)
                })
                frameCamera.start()
                
                engine.addObj(frameCamera)
            }
        }
    }
    removeObjsByStage(engine, stageTag){
        let objs = engine.getObjsByTag(stageTag)
        $.each(objs, (index, obj)=>{
            obj.removeBy(false)
        })
    }
    update(engine){
        super.update(engine)
    }
}
module.exports = Level2Millie