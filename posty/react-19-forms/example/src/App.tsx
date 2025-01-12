import { useActionState } from "react";
import "./App.css";

const getCatFacts = async () => {
    const response = await fetch("https://catfact.ninja/fact");
    const data = await response.json();
    return data;
};

type FormState = {
    type: string;
    error?: string;
    data?: string;
} | null;

function App() {
    const [result, submitAction, isPending] = useActionState(
        async (previousState: FormState, formData: FormData) => {
            const name = formData.get("name");
            console.log(previousState);

            await new Promise((resolve) => setTimeout(resolve, 2000));

            const catFacts: { fact: string } = await getCatFacts();
            const isError = Math.random() > 0.5;

            console.log(catFacts);

            return {
                type: isError ? "error" : "success",
                data: isError ? undefined : catFacts.fact,
                error: isError ? "Something went wrong" : undefined,
            };
        },
        null
    );

    return (
        <>
            {isPending && <p>Loading...</p>}
            {result?.type === "error" && <p>{result.error}</p>}
            {result?.type === "success" && <p>{result.data}</p>}
            <form action={submitAction}>
                <input type="text" name="name" />
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default App;
