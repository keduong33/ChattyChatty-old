import {
  createBrowserRouter,
  RouterProvider as RRProvider,
} from "react-router-dom";
import { DialoguePage } from "../dialoguePage/dialogue";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DialoguePage />,
  },
]);

export default function RouterProvider() {
  return <RRProvider router={router} />;
}
