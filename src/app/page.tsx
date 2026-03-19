import PublicConfirmation from "./components/public-confirmation/PublicConfirmation";
import {
  getPublicConfirmationData,
  type PublicConfirmationData,
} from "@/lib/services/trainingService";
import { notFound } from "next/navigation";

export default async function Home() {
  // Demo entrypoint for local development.
  const data: PublicConfirmationData | null = await getPublicConfirmationData("demo");
  if (!data) notFound();
  return <PublicConfirmation initialData={data} />;
}
