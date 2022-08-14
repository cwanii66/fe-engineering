const doSomething = async () => {
    console.log('done');
}

const fn = async () => {
    console.log('do something');
    await doSomething();
}