declare module "next-auth" {
    interface User {
        id: string; // ID should not be null, Prisma guarantees this
        name: string | null;
        email: string | null;
        image: string | null;
        isAdmin: boolean; // Assuming `isAdmin` is always defined
    }

    interface Session {
        user: User; // Ensure session.user matches the User type
    }

    interface JWT {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
        isAdmin?: boolean; // Optional in the JWT
    }
}
