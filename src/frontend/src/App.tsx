import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import type React from "react";
import { Layout } from "./components/Layout";
import { LoadingSpinner } from "./components/LoadingSpinner";

const HomePage = lazy(() => import("./pages/Home"));
const BrowsePage = lazy(() => import("./pages/Browse"));
const CategoryPage = lazy(() => import("./pages/Category"));
const DesignDetailPage = lazy(() => import("./pages/DesignDetail"));
const CalculatorPage = lazy(() => import("./pages/Calculator"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const ContactPage = lazy(() => import("./pages/Contact"));
const PricingPage = lazy(() => import("./pages/Pricing"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const BuilderPage = lazy(() => import("./pages/Builder"));

function PageLoader() {
  return <LoadingSpinner className="py-24" />;
}

function wrap(Component: React.ComponentType) {
  return function WrappedPage() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    );
  };
}

const rootRoute = createRootRoute({ component: Layout });

const routeTree = rootRoute.addChildren([
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: wrap(HomePage),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/browse",
    component: wrap(BrowsePage),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/browse/$category",
    component: wrap(CategoryPage),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/design/$id",
    component: wrap(DesignDetailPage),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/calculator",
    component: wrap(CalculatorPage),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    component: wrap(DashboardPage),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/contact",
    component: wrap(ContactPage),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/pricing",
    component: wrap(PricingPage),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/builder",
    component: wrap(BuilderPage),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "*",
    component: wrap(NotFoundPage),
  }),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
