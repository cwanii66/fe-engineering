export let counter = 1;

export function incA() {
    counter++;
}

export let foo = 'bar';
setTimeout(() => foo = 'baz', 500);