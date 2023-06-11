import {
  createBrowserRouter,
  RouterProvider as RRProvider,
} from "react-router-dom";
import { IndexPage } from "../indexPage/index";
import { DialoguePage } from "../dialoguePage/dialogue";
import { TestPage } from "../testPage/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    errorElement: <div>Error Index Page</div>,
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
