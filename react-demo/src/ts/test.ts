function Greeter(greeting: string) {
    this.greeting = greeting;
    console.log(this.greeting);
}
new Greeter('awesome type..');

// Input
const enum Animals {
    Fish = 0
}
console.log(Animals.Fish);

// Default output
// var Animals;
(function (Animals) {
    Animals[Animals['Fish'] = 0] = 'Fish';
})(Animals || (Animals = {}));

console.log(Animals.Fish);

// `optimizeConstEnums` output
console.log(0);
