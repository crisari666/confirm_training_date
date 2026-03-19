import PublicConfirmation from "@/app/components/public-confirmation/PublicConfirmation";
import {
  getPublicConfirmationData,
  type PublicConfirmationData,
} from "@/lib/services/trainingService";
import { notFound } from "next/navigation";

export default async function CodePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const data: PublicConfirmationData | null = await getPublicConfirmationData(code);
  if (!data) notFound();

  return <PublicConfirmation initialData={data} />;
}

