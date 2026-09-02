import { hashPassword } from "../utils";

export const userList = [
    {
        email: "user1@gmail.com",
        password: await hashPassword("user1"),
        name: "user1",
        userName: "user1",
        bio: "just a passerby user",
        avatar: "https://picsum.photos/id/161/200/300",
    },
    {
        email: "user2@gmail.com",
        password: await hashPassword("user2"),
        name: "user2",
        userName: "user2",
        bio: "just an extra user",
        avatar: "https://picsum.photos/id/132/200/300",
    },
];
