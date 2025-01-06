import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Suspense} from "react";
import {LazyAbout} from "@/pages/About/About.lazy";
import {LazyShop} from "@/pages/Shop/Shop.lazy";
import {App} from "@/components/App";

const root = document.getElementById('root');

if (!root) {
    throw new Error('No root found');
}

const container = createRoot(root);

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/about',
                element: <Suspense fallback={'loading...'}><LazyAbout /></Suspense>
            },
            {
                path: '/shop',
                element: <Suspense fallback={'loading...'}><LazyShop /></Suspense>
            }
        ]
    }
]);

// container.render(<BrowserRouter><App/></BrowserRouter>);

container.render(<RouterProvider router={router} />);