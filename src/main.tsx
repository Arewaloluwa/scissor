import React from "react";
import ReactDOM from "react-dom/client";

import { ClerkProvider } from "@clerk/clerk-react";

import {
  ConvexReactClient,
} from "convex/react";

import {
  ConvexProvider,
} from "convex/react";

import App from "./App";

import "./index.css";

const clerkPubKey =
  import.meta.env
    .VITE_CLERK_PUBLISHABLE_KEY;

const convex = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL
);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={clerkPubKey}
    >
      <ConvexProvider
        client={convex}
      >
        <App />
      </ConvexProvider>
    </ClerkProvider>
  </React.StrictMode>
);