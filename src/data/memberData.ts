export interface Member {
    id: number;
    username: string;
    email: string;
    password: string;
    language: string;
}

export const presetMembers: Member[] = [
    {
        id: 1,
        username: 'jadenChan',
        email: 'jadenChan@abc.com',
        password: 'abcabc',
        language: 'Chinese'
    }
]