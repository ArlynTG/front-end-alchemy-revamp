
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const LoadingState: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Details</CardTitle>
        <CardDescription>Loading subscription information...</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-tobey-orange"></div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;
