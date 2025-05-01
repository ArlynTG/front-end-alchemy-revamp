
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
  // Sample data - in a real app, this would come from an API
  const reports: ProgressReport[] = [
    { id: "1", date: "2025-04-26", name: "Weekly Progress Summary", downloadUrl: "#" },
    { id: "2", date: "2025-04-19", name: "Reading Comprehension Assessment", downloadUrl: "#" },
    { id: "3", date: "2025-04-12", name: "Writing Skills Evaluation", downloadUrl: "#" },
    { id: "4", date: "2025-04-05", name: "Math Skills Progress", downloadUrl: "#" },
    { id: "5", date: "2025-03-29", name: "Executive Function Development", downloadUrl: "#" },
    { id: "6", date: "2025-03-22", name: "Quarterly Assessment", downloadUrl: "#" },
    { id: "7", date: "2025-03-15", name: "Reading Fluency Test", downloadUrl: "#" },
    { id: "8", date: "2025-03-08", name: "Spelling Progress Report", downloadUrl: "#" },
    { id: "9", date: "2025-03-01", name: "Monthly Summary", downloadUrl: "#" }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleDownload = (report: ProgressReport) => {
    // In a real app, this would trigger a download of the report
    console.log(`Downloading report: ${report.name}`);
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
                    className="transition-all hover:text-green-600 hover:border-green-600"
                    onClick={() => handleDownload(report)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentProgress;
