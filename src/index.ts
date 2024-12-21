import { Effect, Console } from "effect";

const divide = (a: number, b: number): Effect.Effect<number, Error> => {
    return b === 0 ? Effect.fail(new Error("Cannot divide by zero")) : Effect.succeed(a / b);
}

const res = divide(4, 0);
// const program = Console.log(res);

try {
    const result = Effect.runSync(res);
    console.log(result);
}  catch (error) {
    console.log(error);
}
