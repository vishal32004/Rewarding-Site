export type EventType = "birthday" | "trip" | "meeting" | "party" | "dinner" | "holiday" | "anniversary" | "other"

export interface Event {
    id: string
    title: string
    date: string
    time?: string
    type: EventType
    description?: string
    location?: string
}
