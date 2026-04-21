import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Activity, ArrowUpRight, DollarSign, TrendingUp, Users } from "@workspace/ui/icons";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="font-display font-medium text-xl tracking-tight">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button size="sm">New Project</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="$45,231.89"
            description="+20.1% from last month"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Active Users"
            value="2,350"
            description="+180 new users this month"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Active Now"
            value="573"
            description="+201 from last hour"
            icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Growth Rate"
            value="+12.5%"
            description="+4.3% from last quarter"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-7 mt-8">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Olivia Martin</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Completed</Badge>
                    </TableCell>
                    <TableCell>$1,999.00</TableCell>
                    <TableCell className="text-right">Feb 2, 2026</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jackson Lee</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Processing</Badge>
                    </TableCell>
                    <TableCell>$39.00</TableCell>
                    <TableCell className="text-right">Feb 1, 2026</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Isabella Nguyen</TableCell>
                    <TableCell>
                      <Badge variant="outline">Pending</Badge>
                    </TableCell>
                    <TableCell>$299.00</TableCell>
                    <TableCell className="text-right">Jan 31, 2026</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">William Kim</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Completed</Badge>
                    </TableCell>
                    <TableCell>$99.00</TableCell>
                    <TableCell className="text-right">Jan 30, 2026</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent activity feed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  title="New user signup"
                  description="john@example.com created an account"
                  time="2 min ago"
                />
                <ActivityItem
                  title="Payment received"
                  description="$1,999.00 from Olivia Martin"
                  time="15 min ago"
                />
                <ActivityItem title="Project updated" description="Dashboard v2 was deployed" time="1 hour ago" />
                <ActivityItem title="New subscription" description="Enterprise plan activated" time="3 hours ago" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <ArrowUpRight className="h-3 w-3" />
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function ActivityItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-2 h-2 rounded-full bg-primary" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="text-xs text-muted-foreground">{time}</div>
    </div>
  );
}
