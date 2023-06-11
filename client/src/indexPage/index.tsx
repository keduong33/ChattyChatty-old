import { useNavigate } from "react-router-dom";
import { BlueButton } from "../components/buttons";

export function IndexPage() {
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate("/dialogue");
  };

  return (
    <div>
      <h1>Index Page</h1>
      <BlueButton onClick={handleStartClick}>Start</BlueButton>
    </div>
  );
}
