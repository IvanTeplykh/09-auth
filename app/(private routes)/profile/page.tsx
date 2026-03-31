import { Metadata } from "next";
import ProfileContent from "./ProfileContent";

export const metadata: Metadata = {
  title: "NoteHub - User Profile",
  description: "View and edit your personal profile on NoteHub.",
  openGraph: {
    title: "NoteHub - Profile",
    description: "Your NoteHub user profile page.",
  },
};

export default function ProfilePage() {
  return <ProfileContent />;
}
