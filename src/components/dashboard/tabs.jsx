"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LinksTab from "@/components/dashboard/LinksTab";
import AnalyticsTab from "@/components/dashboard/AnalyticsTab";
import AppearanceTab from "@/components/dashboard/AppearanceTab";
import SettingsTab from "@/components/dashboard/SettingsTab";

const DashboardTabs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">LinkHub Dashboard</h1>

      <Tabs defaultValue="links" className="w-full">
        <TabsList className="flex gap-2 bg-gray-100 p-2 rounded-lg">
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="links">
          <LinksTab />
        </TabsContent>
        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
