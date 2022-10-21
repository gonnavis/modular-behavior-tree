import {
    BehaviorTree,
    MemSequence,
    MemSelector,
    Action,
    Composite,
    Decorator,
    Condition,
    Sequence,
    Selector,
    Wait,
    Inverter,
    SUCCESS,
    FAILURE,
    RUNNING,
    MaxTime
} from '../src';

let testCount1 = 0;
let testCount2 = 0;
class F0 extends Action {
    constructor({properties = { text: null }} = {}) {
        super({properties})
    }
    start() {
        console.log('*** 000 start')
    }
    run(blackboard) {
        console.log('000 SUCCESS')
        return SUCCESS
    }
    end() {
        console.log('*** 000 end')
    }
}
class F1 extends Action {
    constructor({properties = { text: null }} = {}) {
        super({properties})
    }
    start() {
        console.log('*** 111 start')
    }
    run(blackboard) {
        testCount1++;
        if (testCount1 <= 3) {
          console.log('111 RUNNING')
          return RUNNING
        } else {
          console.log('111 SUCCESS')
          return SUCCESS
        }
    }
    end() {
        console.log('*** 111 end')
    }
}
class F2 extends Action {
    constructor({properties = { text: null }} = {}) {
        super({properties})
    }
    start() {
        console.log('*** 222 start')
    }
    run(blackboard) {
        testCount2++;
        if (testCount2 <= 3) {
          console.log('222 RUNNING')
          return RUNNING
        } else {
          console.log('222 SUCCESS')
          return SUCCESS
        }
    }
    end() {
        console.log('*** 222 end')
    }
}


let mainTree = BehaviorTree.parseFileXML('./example/maintree.xml', {F0, F1, F2})

var bt = new BehaviorTree({tree: mainTree, blackboard: {someVariable: 123}})

// setInterval(() => {
//     console.info("tick")
//     bt.tick()
// }, 500)

let count = 0;
async function step() {
  await bt.tick()
  console.log('-----------------------------')
  count++;
  if (count < 10) setTimeout(step, 1000);
}
step();

/*
var maintree = new Sequence({
    nodes: [
        new Action({
            run: function() {
                console.log("another test")
                return FAILURE
            }
        }),
        subtree
    ]
})

*/
