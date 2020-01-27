export declare class ChatService {
    messages: {
        id: any;
        text: string;
        creationDate: Date;
    }[];
    users: {
        id: any;
        name: string;
    }[];
    addMessage({ senderId, text }: {
        senderId: any;
        text: any;
    }): {
        id: any;
        senderId: any;
        text: any;
        creationDate: Date;
    };
    getAllMessages(): {
        id: any;
        text: string;
        creationDate: Date;
    }[];
    addUser({ name }: {
        name: any;
    }): {
        id: any;
        name: any;
    };
    getAllUsers(): {
        id: any;
        name: string;
    }[];
}
