type Recipient = {
    id: number;
    name: string;
    email: string;
    phone: string;
    department: string;
};

export const recipients: Recipient[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        department: "Marketing",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9876543210",
        department: "Sales",
    },
    {
        id: 3,
        name: "Robert Johnson",
        email: "robert@example.com",
        phone: "5551234567",
        department: "IT",
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily@example.com",
        phone: "4445556666",
        department: "HR",
    },
];