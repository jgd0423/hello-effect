import { Effect } from "effect";

const delay = (message: string) => {
    return Effect.promise<string>(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(message);
            }, 2000);
        });
    });
}

const program1 = delay("Async operation completed successfully!");

const res1 = await Effect.runPromise(program1);
console.log(res1);


const getTodo = (id: number) => {
    // Will catch any errors and propagate them as UnknownException
    return Effect.tryPromise({
        try: () => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`),
        // remap the error
        catch: (unknown) => new Error(`something went wrong ${unknown}`)
    })
}

//      ┌─── Effect<Response, UnknownException, never>
//      ▼
const program2 = getTodo(999999);
try {
    const res2 = await Effect.runPromise(program2);
    const data = await res2.json();
    console.log(data);
} catch (error) {
    console.error(error);
}
