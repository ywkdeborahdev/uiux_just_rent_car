export interface Member {
    id: number;
    username: string;
    email: string;
    password: string;
    language: string;
}

export const members: Member[] = [
    {
        id: 1,
        username: 'jadenChan',
        email: 'jadenChan@abc.com',
        password: '$2b$10$1GSjYWzUY3fx3zy4WUCHfuNAOr2M//JiJRZCRsYuP/CeUNAI5N0p.',
        language: 'Chinese'
    }
]