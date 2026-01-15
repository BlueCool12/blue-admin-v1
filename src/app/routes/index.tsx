import { Navigate, createBrowserRouter } from "react-router-dom";
import { RequireAuth, RequireGuest } from "@/app/routes/guards";
import Dashboard from "@/features/dashboard/pages/DashboardPage";
import { RootLayout } from "@/app/layouts/RootLayout";
import PostEditPage from "@/features/posts/pages/PostEditPage";
import Login from "@/features/auth/pages/Login";
import PostListPage from "@/features/posts/pages/PostListPage";
import CategoryListPage from "@/features/categories/pages/CategoryListPage";
import CommentListPage from "@/features/comments/pages/CommentListPage";
import UserListPage from "@/features/users/pages/UserListPage";

export const router = createBrowserRouter([
    // 로그인
    {
        element: <RequireGuest />,
        children: [{ path: '/login', element: <Login /> }]
    },

    // 인증
    {
        element: <RequireAuth />,
        children: [
            {
                path: "/",
                element: <RootLayout />,
                children: [
                    { index: true, element: <Navigate to="dashboard" replace /> },
                    { path: "dashboard", element: <Dashboard /> },
                    {
                        path: "posts",
                        children: [
                            { index: true, element: <PostListPage /> },
                            { path: ":postId/edit", element: <PostEditPage /> }
                        ]
                    },
                    {
                        path: "categories",
                        children: [
                            { index: true, element: <CategoryListPage /> },
                        ]
                    },
                    {
                        path: "comments",
                        children: [
                            { index: true, element: <CommentListPage /> }
                        ]
                    },
                    {
                        path: "users",
                        children: [
                            { index: true, element: <UserListPage /> }
                        ]
                    }
                ],
            },
        ],
    },

    // Fallback
    { path: '*', element: <Navigate to="/dashboard" replace /> }
]);