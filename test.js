const Element = ElementManager();

const test0 = Element.create(
    ['teszt','<div></div>',{returnId:true}],
);

console.log(test0);


const test1 = Element.create(
    ['div','<div></div>',{isRoot:true, returnNode: true}],
);

console.log(test1);


const test2 = Element.create(
    ['div','<div></div>',{isRoot:true, returnId:true, returnNode: true}],
);


console.log(test2);