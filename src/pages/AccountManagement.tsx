
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountProfile from "@/components/account/AccountProfile";
import ManageSubscription from "@/components/account/ManageSubscription";

const AccountManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Account Management | Tobey's Tutor</title>
        <meta name="description" content="Manage your account settings and subscription details" />
      </Helmet>
      
      <Navbar />
      
      <div className="container py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8">Account Management</h1>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-tobey-orange"></div>
          </div>
        ) : (
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <AccountProfile />
            </TabsContent>
            
            <TabsContent value="subscription" className="space-y-4">
              <ManageSubscription />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default AccountManagement;
