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
  name: string;
  status: AttendeeStatus;
};

export type PublicConfirmationData = {
  training: PublicTraining;
  attendee: PublicAttendee;
};

// Mocked data for now. Replace this with a real DB/API call later.
const TRAININGS_BY_CODE: Record<string, PublicTraining> = {
  demo: {
    name: "Capacitación: Seguridad en el trabajo",
    dateISO: "2026-04-12T12:00:00.000Z",
    timeHours: "9",
    location: "Centro de formación",
    mapsUrl: "https://maps.google.com/?q=Centro%20de%20formaci%C3%B3n",
    maxSlots: 12,
    confirmedSlots: 7,
  },
  confirmed: {
    name: "Capacitación: Seguridad en el trabajo",
    dateISO: "2026-04-12T12:00:00.000Z",
    timeHours: "9",
    location: "Centro de formación",
    mapsUrl: "https://maps.google.com/?q=Centro%20de%20formaci%C3%B3n",
    maxSlots: 12,
    confirmedSlots: 8,
  },
  declined: {
    name: "Capacitación: Seguridad en el trabajo",
    dateISO: "2026-04-12T12:00:00.000Z",
    timeHours: "9",
    location: "Centro de formación",
    mapsUrl: "https://maps.google.com/?q=Centro%20de%20formaci%C3%B3n",
    maxSlots: 12,
    confirmedSlots: 6,
  },
};

const ATTENDEES_BY_CODE: Record<string, PublicAttendee> = {
  demo: { name: "Carolina", status: "pending" },
  confirmed: { name: "Carolina", status: "confirmed" },
  declined: { name: "Carolina", status: "declined" },
};

export async function getTrainingByCode(code: string): Promise<PublicTraining | null> {
  // Keep async to make it easy to replace with DB/API.
  return TRAININGS_BY_CODE[code] ?? null;
}

export async function getAttendeeByCode(code: string): Promise<PublicAttendee | null> {
  return ATTENDEES_BY_CODE[code] ?? null;
}

export async function getPublicConfirmationData(
  code: string
): Promise<PublicConfirmationData | null> {
  const [training, attendee] = await Promise.all([getTrainingByCode(code), getAttendeeByCode(code)]);
  if (!training || !attendee) return null;
  return { training, attendee };
}

