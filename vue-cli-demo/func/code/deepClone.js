function clone(target, map = new WeakMap()) {
    const isArray = v => Array.isArray(v);
    if (typeof target === 'object') {
        let cloneTarget = isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
}

const target = {
    a: 1,
    b: 2,
    c: [ 'c', 'w', 'luv', 'ani' ],
    d: {
        name: 'jack',
        friend: 'jessy'
    }
};
target.target = target;

const clonedObj = clone(target);
console.log(clonedObj);