
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";

interface ProgressReport {
  id: string;
  date: string;
  name: string;
  downloadUrl: string;
}

const RecentProgress: React.FC = () => {
  // Sample data - reduced to only 3 reports
  const reports: ProgressReport[] = [
    { id: "1", date: "2025-04-26", name: "Weekly Progress Summary", downloadUrl: "#" },
    { id: "2", date: "2025-04-19", name: "Reading Comprehension Assessment", downloadUrl: "#" },
    { id: "3", date: "2025-04-12", name: "Writing Skills Evaluation", downloadUrl: "#" }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-500" />
          Recent Progress
        </CardTitle>
        <CardDescription>Archived reports and assessments</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Report Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id} className="hover:bg-gray-50">
                <TableCell>{formatDate(report.date)}</TableCell>
                <TableCell>{report.name}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled
                    className="text-gray-400 border-gray-300"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-xs text-gray-500 mt-4 text-center">This is a preview. Download functionality will be available to Beta subscribers.</p>
      </CardContent>
    </Card>
  );
};

export default RecentProgress;
