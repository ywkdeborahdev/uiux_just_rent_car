export interface Member {
    id: number;
    username: string;
    password: string;
    email: string;
    name: string;
    phonePrefix: string;
    phone: string;
}

export const members: Member[] = [
    {
        id: 1,
        username: 'jadenChan',
        email: 'jadenChan@abc.com',
        name: 'Jaden Chan',
        phonePrefix: '+852',
        phone: '91234567',
        password: '$2b$10$1GSjYWzUY3fx3zy4WUCHfuNAOr2M//JiJRZCRsYuP/CeUNAI5N0p.'
    }
]