const ElementManager = () => {
    const _elementStorage = new Map();

    const remove = tagIds => {
        const storage = _elementStorage;

        const removeChild = child => {
            
            if(storage.get(child) !== undefined){
                const parent = storage.get(child).parentNode;
                parent != null ? parent.removeChild(storage.get(child)) : null;
            }

        };

        if (typeof tagIds === "string") {
            const tagId = tagIds;
            removeChild(tagId);
        }

        if (typeof tagIds === "object") {
            tagIds.forEach(el => {removeChild(el)});
        }
    };

    const get = tagId => {
        
        function getElement(elementId){
            if(_elementStorage.has(elementId)){
                return _elementStorage.get(elementId);
            } else {
                throw `[${elementId}] is not in the storage!`;
            }
        }

        return tagId instanceof Array ?  tagId.map(x => getElement(x)) : getElement(tagId)
    }

    return {
        get:tagIds => {
            return get(tagIds);
        },

        create: (...elementArr) => {

            const 
                storage = _elementStorage, 
                parser = new DOMParser();

            var returnStuff = [];
            

            // Store element, if the tagId already exist it will throw an error!
            const storeElement = (tagId, generatedElement) => {
                storage.has(tagId) === false ? storage.set(tagId, generatedElement) : () => {throw `[${tagId}] is exist in storage!`}; 
            }

            // Generate htmlNode from string
            const generateNode = htmlString => parser.parseFromString( htmlString, 'text/html').body.firstChild.cloneNode(true);

            const setItRoot = node => { document.body.appendChild(node) };

            elementArr
                .map( ([tagId, htmlString, options]) => {
                    return options ? [tagId, generateNode(htmlString), options] : [tagId, generateNode(htmlString)];
                })
                .forEach( el => {
                    const [tagId, node, options] = el;
                    if(el.length === 3){                   
                        options.isRoot && setItRoot(node);

                        if(options.returnId && !options.returnNode){
                            returnStuff.push(tagId);
                        }

                        if(options.returnNode && !options.returnId){
                            returnStuff.push(node);
                        }

                        if(options.returnId && options.returnNode){
                            
                            returnStuff.push({
                                [tagId]: node
                            });
                        }
                    } else {
                        returnStuff.push({
                            [tagId]: node
                        });
                    }

                    storeElement(tagId, node); 
                });
            
            return returnStuff;
        },

        remove: tagIds => {
            remove(tagIds);
        },

        search: test => {

        },

        append: elementTree => {
            return function loop(obj) {
                const 
                    childrens = obj.children.map(x => x instanceof Object ? loop(x) : _elementStorage.get(x)),
                    parent = _elementStorage.get(obj.parent);

                parent.append(...childrens);
                return parent;
            }(elementTree)
        },

        fetch: () => {
            console.log(_elementStorage);
        }
    }
}
