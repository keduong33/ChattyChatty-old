import { BlueButton } from "../components/buttons";

export function IndexPage() {
  return (
    <div>
      <h1>Index Page</h1>
      <BlueButton
        onClick={() => {
          console.log("hello");
        }}
      ></BlueButton>
    </div>
  );
}
