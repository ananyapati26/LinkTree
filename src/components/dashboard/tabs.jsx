"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LinksTab from "@/components/addlinks/LinksTab";
import AnalyticsTab from "@/components/dashboard/AnalyticsTab";
import AppearanceTab from "@/components/appearance/AppearanceTab";
import SettingsTab from "@/components/dashboard/SettingsTab";

const DashboardTabs = () => {
  return (
    <div className="mt-14">
    
      {/* Tabs */}
      <Tabs defaultValue="links" className="w-full">
        <TabsList className="top-0 z-10 flex gap-3 bg-gray-200 dark:bg-gray-800 p-2 rounded-xl shadow-md">
          <TabsTrigger value="links" className="hover:bg-gray-300 dark:hover:bg-gray-700 transition-all">
            Links
          </TabsTrigger>
          <TabsTrigger value="appearance" className="hover:bg-gray-300 dark:hover:bg-gray-700 transition-all">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="analytics" className="hover:bg-gray-300 dark:hover:bg-gray-700 transition-all">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="hover:bg-gray-300 dark:hover:bg-gray-700 transition-all">
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
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
        </motion.div>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
