import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/app-layout.tsx", [
    index("routes/home.tsx"),
    route("board", "routes/board.tsx"),
    route("events", "routes/events.tsx"),
    route("mock-interviews", "routes/mock-interviews.tsx"),
    route("leaderboard", "routes/leaderboard.tsx"),
  ]),
] satisfies RouteConfig;
