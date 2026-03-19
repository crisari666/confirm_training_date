import { declineAttendeeInvite, normalizeAttendeeId } from "@/lib/services/trainingService";
import { NextResponse } from "next/server";

type DeclineBody = {
  reason?: string;
};

export async function POST(
  request: Request,
  context: { params: Promise<{ attendeeId: string }> }
) {
  const { attendeeId } = await context.params;
  const normalizedAttendeeId = normalizeAttendeeId(attendeeId);
  if (!normalizedAttendeeId) {
    return NextResponse.json({ error: "Invalid attendee id" }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as DeclineBody | null;
  const reason = body?.reason?.trim();
  if (!reason) {
    return NextResponse.json({ error: "Reason is required" }, { status: 400 });
  }

  const result = await declineAttendeeInvite(normalizedAttendeeId, reason);
  if (!result) {
    return NextResponse.json(
      { error: "Unable to decline attendance" },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: result }, { status: 200 });
}

