var paths = Util.paths

var Engine = EngineUtil.Engine
var Input = EngineUtil.Input
var PlayerInputs = EngineUtil.PlayerInputs
var Scene = EngineUtil.Scene

var Level3Coco = require(paths.obj('level3/Level3Coco'))
var Level3Millie = require(paths.obj('level3/Level3Millie'))

var Cloud = require(paths.obj('triggers/Cloud'))
var Conductor = require(paths.obj('level3/Conductor'))
var Collector = require(paths.obj('level3/Collector'))

var Wall = require(paths.obj('barriers/Wall'))
var InvisibleWall = require(paths.obj('barriers/InvisibleWall'))

class Level3 extends Scene{
    constructor(){
        super(Scene.CANVAS_WIDTH, Scene.CANVAS_HEIGHT, 0, 0, 'level3_theme', 3, [
            new PlayerInputs({
                'left': new Input(['a', 'A'], [Input.PAD_LEFT]),
                'right': new Input(['d', 'D'], [Input.PAD_RIGHT]),
                'jump': new Input(['w', 'W', ' '], [Input.PAD_UP, Input.A]),
                'sit': new Input(['s', 'S'], [Input.PAD_DOWN]),
                'bark': new Input(['q', 'Q'], [Input.B]),
            }),
        ])
    }
    
    load(){
        let U = Scene.U
        let SU = Scene.SU
        
        let millie  = new Level3Millie(4*U, 5.3*U)
        let coco  = new Level3Coco(4*U, 5*U)
        coco.setControllerId(0)
        
        let conductor = new Conductor()
        conductor.addNote('--B-----', 6000)
        conductor.addNote('---B----', 5500)
        conductor.addNote('----B---', 5000)
        conductor.addNote('-----B--', 4500)
        conductor.addNote('------B-', 4000)
        conductor.addNote('----B---', 3500)
        conductor.addNote('---B----', 3000)
        conductor.addNote('----B---', 2500)
        conductor.addNote('---B----', 2000)
        conductor.addNote('BBBBBBBB', 1500)
        conductor.addNote('BBBBBBBB', 1000)
        conductor.addNote('BBBBBBBB', 500)
        conductor.addNote('BBBBBBBB', 0)
        
        super.load([
            new InvisibleWall(-1*U, .5*SU.y , 2*U, SU.y),
            new InvisibleWall(9*U, .5*SU.y , 2*U, SU.y),
            
            conductor,
            new Collector(.5*SU.x, SU.y + 2*U, SU.x, 2*U),
            
            coco,
            millie,
        ])
    }
}
module.exports = Level3
