import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Hello World!</h1>
      <Button>Click Me</Button>
    </div>
  );
}
