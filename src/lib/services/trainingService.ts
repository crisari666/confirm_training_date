export type AttendeeStatus = "pending" | "confirmed" | "declined";

export type PublicTraining = {
  name: string;
  dateISO: string;
  timeHours: string;
  location: string;
  mapsUrl?: string;
  maxSlots: number;
  confirmedSlots: number;
};

export type PublicAttendee = {
  id: string;
  name: string;
  status: AttendeeStatus;
};

export type PublicConfirmationData = {
  training: PublicTraining;
  attendee: PublicAttendee;
};

export function normalizeAttendeeId(code: string): string | null {
  // The route may receive templated values like "{{1}}<attendeeId>" or extra hex
  // prefixes (e.g. "7d<attendeeId>"). Regexes with `{24}` + `g` don't return
  // overlapping matches, so we scan manually and allow overlap.
  const s = code;
  for (let i = s.length - 24; i >= 0; i--) {
    const candidate = s.slice(i, i + 24);
    if (/^[0-9a-fA-F]{24}$/.test(candidate)) return candidate.toLowerCase();
  }
  return null;
}

type BackendTraining = {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  location: string;
  mapsUrl?: string;
  maxSlots: number;
  confirmedCount: number;
};

type BackendAttendee = {
  id: string;
  name: string;
  status: AttendeeStatus;
};

type BackendResponse = {
  data: {
    training: BackendTraining;
    attendee: BackendAttendee;
  };
};

type BackendActionResponse = {
  data: {
    status: AttendeeStatus;
    message: string;
    reason?: string;
  };
};

export type AttendeeResponseResult = {
  status: AttendeeStatus;
  message: string;
  reason?: string;
};

function getBackendBaseUrl(): string | null {
  const baseUrlRaw = process.env.BASE_URL_BACKEND;
  if (!baseUrlRaw) return null;
  return baseUrlRaw.replace(/\/+$/, "/"); // Ensure exactly one trailing slash.
}

function toDateISO(dateYYYYMMDD: string, timeHHmm: string): string {
  // Interpret incoming date/time as UTC to keep UI formatting stable.
  // Example: "2026-04-01" + "14:23" => "2026-04-01T14:23:00.000Z"
  const normalizedTime = timeHHmm.match(/^(\d{2}):(\d{2})$/);
  if (!normalizedTime) return new Date(dateYYYYMMDD).toISOString();
  const [, hh, mm] = normalizedTime;
  return new Date(`${dateYYYYMMDD}T${hh}:${mm}:00.000Z`).toISOString();
}

export async function getPublicConfirmationData(
  attendeeId: string
): Promise<PublicConfirmationData | null> {
  const baseUrl = getBackendBaseUrl();
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}trainings/attendees/${attendeeId}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return null;

    const json = (await res.json()) as BackendResponse;
    const training = json?.data?.training;
    const attendee = json?.data?.attendee;
    if (!training || !attendee) return null;

    const timeHours = training.time.split(":")[0] ?? "";
    if (!timeHours) return null;

    return {
      training: {
        name: training.name,
        dateISO: toDateISO(training.date, training.time),
        timeHours,
        location: training.location,
        mapsUrl: training.mapsUrl,
        maxSlots: training.maxSlots,
        confirmedSlots: training.confirmedCount,
      },
      attendee: {
        id: attendee.id,
        name: attendee.name,
        status: attendee.status,
      },
    };
  } catch {
    return null;
  }
}

export async function acceptAttendeeInvite(
  attendeeId: string
): Promise<AttendeeResponseResult | null> {
  const baseUrl = getBackendBaseUrl();
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}trainings/attendees/${attendeeId}/accept`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as BackendActionResponse;
    if (!json?.data?.status || !json?.data?.message) return null;
    return {
      status: json.data.status,
      message: json.data.message,
      reason: json.data.reason,
    };
  } catch {
    return null;
  }
}

export async function declineAttendeeInvite(
  attendeeId: string,
  reason: string
): Promise<AttendeeResponseResult | null> {
  const baseUrl = getBackendBaseUrl();
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}trainings/attendees/${attendeeId}/decline`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as BackendActionResponse;
    if (!json?.data?.status || !json?.data?.message) return null;
    return {
      status: json.data.status,
      message: json.data.message,
      reason: json.data.reason,
    };
  } catch {
    return null;
  }
}

