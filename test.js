const Element = ElementManager();

const test0 = Element.create(
    ['div0','<div>0</div>',{returnId:true}],
);

const test1 = Element.create(
    ['div1','<div>1</div>',{isRoot:true, returnNode: true}],
);


const test2 = Element.create(
    ['div2','<div>2</div>',{isRoot:true, returnId:true, returnNode: true}],
);

console.log(Element.search('div'));