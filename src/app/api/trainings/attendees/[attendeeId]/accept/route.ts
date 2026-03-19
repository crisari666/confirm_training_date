import { acceptAttendeeInvite, normalizeAttendeeId } from "@/lib/services/trainingService";
import { NextResponse } from "next/server";

export async function POST(
  _request: Request,
  context: { params: Promise<{ attendeeId: string }> }
) {
  const { attendeeId } = await context.params;
  const normalizedAttendeeId = normalizeAttendeeId(attendeeId);
  if (!normalizedAttendeeId) {
    return NextResponse.json({ error: "Invalid attendee id" }, { status: 400 });
  }

  const result = await acceptAttendeeInvite(normalizedAttendeeId);
  if (!result) {
    return NextResponse.json(
      { error: "Unable to confirm attendance" },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: result }, { status: 200 });
}

