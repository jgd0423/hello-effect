import { Effect } from "effect";

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
    b === 0
        ? Effect.fail(new Error("Cannot divide by zero"))
        : Effect.succeed(a / b);
try {
    console.log(Effect.runSync(divide(4, 0)));
} catch (error) {
    console.error(error);
}

interface User {
    readonly id: number;
    readonly name: string;
}

const getUser = (userId: number): Effect.Effect<User, Error> => {
    const userDatabase: Record<number, User> = {
        1: { id: 1, name: "John Doe" },
        2: { id: 2, name: "Jane Smith" }
    }

    const user = userDatabase[userId];
    if (user) {
        return Effect.succeed(user);
    } else {
        return Effect.fail(new Error("User not found"));
    }
}

const exampleUserEffect = getUser(1);
console.log(Effect.runSync(exampleUserEffect));

const log = (message: string) => {
    return Effect.sync(() => {
        console.log(message);
    })
}

const program1 = log('hello world!');
Effect.runSync(program1);

const parse = (input: string) =>
    Effect.try({
        // JSON.parse may throw for bad input
        try: () => JSON.parse(input),
        // remap the error
        catch: (unknown) => new Error(`something went wrong ${unknown}`)
    })

//      ┌─── Effect<any, Error, never>
//      ▼
const program2 = parse("");
Effect.runSync(program2);