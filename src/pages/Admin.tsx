
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

interface BackupRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentName: string;
  studentAge: string;
  learningDifference: string;
  timestamp: string;
}

const Admin = () => {
  const [registrations, setRegistrations] = useState<BackupRegistration[]>([]);
  
  useEffect(() => {
    // Get all localStorage items that start with beta_registration
    const regs: BackupRegistration[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("beta_registration_")) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || "{}");
          regs.push(data as BackupRegistration);
        } catch (error) {
          console.error("Error parsing registration data:", error);
        }
      }
    }
    setRegistrations(regs);
  }, []);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-2">Backup Beta Registrations</h1>
      <p className="text-gray-600 mb-6">
        These are registrations stored in localStorage as a backup mechanism in case the Supabase function fails.
      </p>
      
      {registrations.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-500">No backup registrations found in localStorage.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Learning Difference</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((reg, i) => (
                <TableRow key={i}>
                  <TableCell>{reg.firstName} {reg.lastName}</TableCell>
                  <TableCell>{reg.email}</TableCell>
                  <TableCell>{reg.phone || "-"}</TableCell>
                  <TableCell>
                    {reg.studentName ? `${reg.studentName}${reg.studentAge ? ` (${reg.studentAge})` : ""}` : "-"}
                  </TableCell>
                  <TableCell>{reg.learningDifference || "-"}</TableCell>
                  <TableCell>
                    {reg.timestamp ? new Date(reg.timestamp).toLocaleString() : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Admin;
