import { UserDetailsPage } from "@/components/user-details/UserDetailsPage";

export default async function UserDetailsRoutePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <UserDetailsPage userId={id} />;
}
