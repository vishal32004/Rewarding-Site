import CalendarWithEvents from "@/components/Event-Calendar/CalendarWithEvents";
import {
  Edit,
  HelpCircle,
  IndianRupee,
  Plus,
  Settings,
  UserCheck2,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppStore } from "@/store/store";

const Dashboard = () => {
  const { user } = useAppStore();
  const callActions = [
    {
      title: "Start New Campaign",
      link: "/create-new-campaign",
      icon: Plus,
      color: "bg-emerald-500",
    },
    {
      title: "View/Edit Storefront",
      link: "/storefront",
      icon: Edit,
      color: "bg-blue-500",
    },
    {
      title: "Manage Funds",
      link: "#",
      icon: IndianRupee,
      color: "bg-purple-500",
    },
    {
      title: "Helpdesk",
      link: "#",
      icon: HelpCircle,
      color: "bg-amber-500",
    },
    {
      title: "Admins",
      link: "/admins",
      icon: UserCheck2,
      color: "bg-rose-500",
    },
    {
      title: "Settings",
      link: "#",
      icon: Settings,
      color: "bg-slate-700",
    },
    {
      title: "Reports",
      link: "#",
      icon: BarChart3,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <section>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
                Hello, {user?.first_name}  {user?.last_name}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Welcome back to your dashboard
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border">
              <h2 className="font-medium">Dashboard Overview</h2>
            </div>
          </div>

          <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {callActions.map((action) => (
                <Link
                  to={action.link}
                  className="group block"
                  key={action.title}
                >
                  <div className="h-full rounded-xl border bg-white dark:bg-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md hover:translate-y-[-2px]">
                    <div className="flex items-center p-5">
                      <div className={`${action.color} rounded-lg p-3 mr-4`}>
                        <action.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                          {action.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="h-full">
              <CalendarWithEvents />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
