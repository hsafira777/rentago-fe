"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import CardBox from "@/components/ui/cardbox";
import { useHydratedAuth } from "@/hooks/useHydratedAuth";

export default function ProfilePage() {
  const { hydrated, user } = useHydratedAuth("/auth"); // redirect ke /auth kalau belum login
  const [form, setForm] = useState({ firstName: "", lastName: "" });

  if (!hydrated) return <PageState message="Loading..." />;
  if (!user) return <PageState message="Redirecting..." />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-8">
        <ProfileHeader user={user} />

        <CardBox maxWidth="5xl" className="w-full">
          <ProfileTabs form={form} setForm={setForm} />
        </CardBox>
      </div>
    </div>
  );
}

function PageState({ message }: { message: string }) {
  return <p className="p-6 text-gray-500">{message}</p>;
}

function ProfileHeader({ user }: { user: any }) {
  return (
    <CardBox
      maxWidth="5xl"
      className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
    >
      <div className="flex items-center gap-4">
        <img
          src="/logo.png"
          alt="avatar"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span className="text-green-600 text-sm font-medium">
            ✔ Email Verified
          </span>
        </div>
      </div>

      <div className="flex gap-6">
        <StatBox value="12" label="Properties" color="text-blue-600" />
        <StatBox value="48" label="Bookings" color="text-green-600" />
      </div>
    </CardBox>
  );
}

function ProfileTabs({
  form,
  setForm,
}: {
  form: { firstName: string; lastName: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ firstName: string; lastName: string }>
  >;
}) {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="flex flex-wrap">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="avatar">Avatar</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
        <Button className="mt-6 w-full md:w-auto">Update Profile</Button>
      </TabsContent>

      <TabsContent value="avatar" className="mt-6">
        <p className="text-gray-500">Avatar settings coming soon...</p>
      </TabsContent>

      <TabsContent value="email" className="mt-6">
        <p className="text-gray-500">Email settings coming soon...</p>
      </TabsContent>
    </Tabs>
  );
}

function StatBox({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="text-center">
      <p className={`${color} text-xl font-bold`}>{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
}
