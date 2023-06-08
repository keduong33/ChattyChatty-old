import {
  createBrowserRouter,
  RouterProvider as RRProvider,
} from "react-router-dom";
import { IndexPage } from "../views";
import { DialoguePage } from "../views/dialogue";
import { TestPage } from "../views/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/dialogue",
    element: <DialoguePage />,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
]);

export default function RouterProvider() {
  return <RRProvider router={router} />;
}
