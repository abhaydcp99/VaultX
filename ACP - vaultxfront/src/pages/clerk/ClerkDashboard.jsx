import React from "react";
import ClerkLayout from "../../layouts/ClerkLayout";
import { BadgeCheck, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const ClerkDashboard = () => {
  return (
    <ClerkLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold">VaultX Clerk Portal</h2>
        <p className="text-muted-foreground">Welcome, John Clerk</p>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-orange-500 text-white p-6 rounded-xl shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Pending KYC</span>
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mt-4">1</div>
            <p className="text-sm mt-1">Applications pending review</p>
          </div>

          <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Video KYC Sessions</span>
              <Video className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mt-4">0</div>
            <p className="text-sm mt-1">In Progress</p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-xl shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Completed Today</span>
              <BadgeCheck className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mt-4">0</div>
            <p className="text-sm mt-1">Verifications complete</p>
          </div>
        </div>

        {/* Pending KYC Section */}
        <div className="bg-white dark:bg-muted p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold">
                Pending KYC Applications
              </h3>
              <p className="text-sm text-muted-foreground">
                Review and conduct Video KYC for customer applications
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Search</Button>
            </div>
          </div>

          <div className="border rounded-xl p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-medium">Abhay Chavan</h4>
                <p className="text-sm text-muted-foreground">ID: APP001</p>
                <p className="text-sm mt-2">Submitted: 2024-01-15</p>
                <p className="text-sm">
                  Account Type: <b>Savings</b>
                </p>
                <p className="text-sm">Documents: 4/4 Uploaded</p>
                <p className="text-sm">Email: abhay@example.com</p>
                <p className="text-sm">Phone: +91 9876543210</p>
                <p className="text-sm">PAN: ABCDE1234F</p>
                <p className="text-sm">DOB: 1990-01-01</p>
                <p className="text-sm">Occupation: Salaried</p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
                  Pending Review
                </span>
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                  Pending
                </span>

                <div className="flex gap-2 mt-4">
                  <Button variant="secondary">View Details</Button>
                  <Button variant="secondary">View Documents</Button>
                </div>
                <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                  <Video className="w-4 h-4 mr-2" /> Start Video KYC
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClerkLayout>
  );
};

export default ClerkDashboard;
