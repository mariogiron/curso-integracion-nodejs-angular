export interface Ticket {
    id: number;
    title: string;
    description: string;
    created_by: number;
    assigned_to: number;
    status: string;
    priority: string;
}
