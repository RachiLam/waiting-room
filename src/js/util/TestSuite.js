let TestSuite = $.extend(class{
    constructor(title, init = function(){}){
        console.groupCollapsed(`%c${title}`, 'font-weight: bold; font-size: 16px;')
        init.call(this)
    }
    
    assert(title, value, expected, endSuiteOnFail = true){
        if(value != expected){
            if(endSuiteOnFail){
                this.end()
            }
            
            throw new TestSuite.AssertionFailedException(title, value, expected)
        }else{
            console.log(`%c  ${title}: passed`, 'color: green;')
        }
    }
    end(){
        console.groupEnd()
        return this
    }
    section(title, tests = function(){}){
        console.log(title)
        try{
            tests.call(this)
        }catch(exception){
            this.end()
            throw exception
        }
        
        return this
    }
},
/* Global Vars*/{
    AssertionFailedException: class{
        constructor(title, value, expected){
            this.message = `${title}: expected ${expected} was ${value}`
        }
    },
})
module.exports = TestSuite

