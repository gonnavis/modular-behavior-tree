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

let mainTree = new MemSequence({
    nodes: [
        new Action({
            start: function (dog) {
              console.log('*** 000 start')
            },
            end: function (dog) {
              console.log('*** 000 end')
            },
            run: function (dog) {
              console.log('000 SUCCESS')
              return SUCCESS
            }
        }),
        new Action({
          start: function (dog) {
            console.log('*** 111 start')
          },
          end: function (dog) {
            console.log('*** 111 end')
          },
          run: function (dog) {
            testCount1++;
            if (testCount1 <= 3) {
              console.log('111 RUNNING')
              return RUNNING
            } else {
              console.log('111 SUCCESS')
              return SUCCESS
            }
          }
        }),
        new Action({
          start: function (dog) {
            console.log('*** 222 start')
          },
          end: function (dog) {
            console.log('*** 222 end')
          },
          run: function (dog) {
            testCount2++;
            if (testCount2 <= 3) {
              console.log('222 RUNNING')
              return RUNNING
            } else {
              console.log('222 SUCCESS')
              return SUCCESS
            }
          }
        }),
    ]
})

var bt = new BehaviorTree({tree: mainTree, blackboard: {someVariable: 123}})

// setInterval(() => {
//     console.info("tick")
//     bt.tick()
// }, 500)

let count = 0;
function step() {
  bt.tick()
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
