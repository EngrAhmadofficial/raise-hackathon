import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { 
  CreditCard, 
  Users, 
  Zap, 
  Settings, 
  Shield, 
  History, 
  Bell, 
  HelpCircle,
  TrendingUp,
  Sliders,
  DollarSign
} from "lucide-react";

export default function BillingPage() {
  return (
    <div className="flex h-screen bg-[#030712] text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col justify-between">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              A
            </div>
            <span className="font-semibold text-lg text-white tracking-tight">Acme Analytics</span>
          </div>

          <nav className="space-y-1.5">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-lg transition-all text-sm font-medium">
              <Sliders size={18} />
              Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-lg transition-all text-sm font-medium">
              <Users size={18} />
              Team Members
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-indigo-950/40 text-indigo-400 border border-indigo-900/40 rounded-lg transition-all text-sm font-medium">
              <CreditCard size={18} />
              Billing & Subscription
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-lg transition-all text-sm font-medium">
              <Shield size={18} />
              Security Settings
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-lg transition-all text-sm font-medium">
              <Settings size={18} />
              Integrations
            </a>
          </nav>
        </div>

        <div className="p-6 border-t border-slate-900">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-sm font-semibold text-slate-200">
              JD
            </div>
            <div>
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-slate-500">john@acme.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-slate-900 px-8 flex items-center justify-between bg-slate-950/40 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-white">Billing & Subscription</h1>
          <div className="flex items-center gap-4">
            <button className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900 transition-all">
              <Bell size={18} />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900 transition-all">
              <HelpCircle size={18} />
            </button>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-8">
          {/* Top Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Plan */}
            <Card className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Plan</span>
                  <span className="px-2 py-0.5 text-xs font-medium text-indigo-400 bg-indigo-950/50 border border-indigo-900/50 rounded-full">
                    Free Trial
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Starter Sandbox</h3>
                <p className="text-sm text-slate-400">Great for evaluating capabilities and sandbox testing.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">$0 <span className="text-slate-500 font-normal">/ month</span></span>
                <span className="text-xs text-indigo-400 flex items-center gap-1">
                  <TrendingUp size={12} /> Trial ends in 12 days
                </span>
              </div>
            </Card>

            {/* Usage metrics */}
            <Card className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">API Usage</span>
                  <Zap size={16} className="text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">8,421 <span className="text-slate-500 text-lg font-medium">/ 10,000</span></h3>
                <p className="text-sm text-slate-400">Monthly quota reset occurs in 12 days.</p>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1.5 rounded-full" style={{ width: "84.2%" }}></div>
                </div>
              </div>
              <div className="mt-4 text-xs text-slate-400 flex justify-between">
                <span>84.2% consumed</span>
                <span className="text-indigo-400 hover:underline cursor-pointer">Adjust limits</span>
              </div>
            </Card>

            {/* Team members */}
            <Card className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Seats Consumed</span>
                  <Users size={16} className="text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">3 <span className="text-slate-500 text-lg font-medium">/ 5</span></h3>
                <p className="text-sm text-slate-400">Active users associated with your sandbox space.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-indigo-900 border border-slate-900 flex items-center justify-center text-[10px] font-bold text-indigo-200">AB</div>
                  <div className="h-6 w-6 rounded-full bg-emerald-900 border border-slate-900 flex items-center justify-center text-[10px] font-bold text-emerald-200">CD</div>
                  <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-200">JD</div>
                </div>
                <Button size="sm" variant="secondary">Invite User</Button>
              </div>
            </Card>
          </div>

          {/* Upgrade CTA and Intentional Drift block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <DollarSign className="text-emerald-400" />
                Payment Methods
              </h3>
              <p className="text-sm text-slate-400 mb-6">Manage how you pay for Acme services. Card updates take effect instantly.</p>
              
              <div className="bg-slate-950 border border-slate-900 rounded-lg p-4 flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-12 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">VISA</div>
                  <div>
                    <p className="text-sm font-medium text-white">Visa ending in 4242</p>
                    <p className="text-xs text-slate-500">Expires 12/28</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">Edit</Button>
              </div>
              
              <Button variant="secondary" className="w-full">Add Payment Method</Button>
            </Card>

            {/* This is the upgrade CTA where the intentional design drift will reside */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Premium Features Upgrade</h4>
                <span className="text-xs text-slate-500">Violates button-standard & spacing-scale</span>
              </div>

              {/* DRIFTGUARD_DEMO_DRIFT_START */}
              <div className="p-[19px] rounded-[11px] bg-[#101a31] border border-[#1c2a44]">
                <div>
                  <p className="text-[15px] font-medium text-white">
                    Upgrade to Pro
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Unlock advanced AI usage and team controls.
                  </p>
                </div>

                <button className="mt-4 bg-[#2563eb] text-white px-[18px] py-[9px] rounded-[10px] text-[15px] font-medium shadow-sm">
                  Upgrade Plan
                </button>
              </div>
              {/* DRIFTGUARD_DEMO_DRIFT_END */}
            </div>
          </div>

          {/* Invoice Table Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <History size={18} className="text-slate-400" />
              <h3 className="text-lg font-semibold text-white">Invoicing History</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="text-xs uppercase bg-slate-950/40 text-slate-500 border-b border-slate-900">
                  <tr>
                    <th className="py-3 px-4">Invoice ID</th>
                    <th className="py-3 px-4">Billing Date</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  <tr className="hover:bg-slate-900/20 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">INV-0914</td>
                    <td className="py-3.5 px-4">June 24, 2026</td>
                    <td className="py-3.5 px-4">$15.00</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-900/50">Paid</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button size="sm" variant="ghost">Download</Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/20 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">INV-0803</td>
                    <td className="py-3.5 px-4">May 24, 2026</td>
                    <td className="py-3.5 px-4">$15.00</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-900/50">Paid</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button size="sm" variant="ghost">Download</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
