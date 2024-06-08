import { Choice } from "./components/Choice";

function App() {
  const condition = true;

  return (
    <>
      <Choice.When condition={condition}>
        <h1>When</h1>
      </Choice.When>
      <Choice.Then condition={condition}>
        <h1>Then</h1>
      </Choice.Then>
      <Choice.And condition={condition}>
        <h1>And</h1>
      </Choice.And>
    </>
  )
}

export default App
