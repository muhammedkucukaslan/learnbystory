import { SignJWT } from 'jose';

const getJWTSecretKey = () => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw new Error('JWT_SECRET is not defined');
    }
    return new TextEncoder().encode(secretKey);
};

export async function generateToken(id: string): Promise<string> {
    const payload = { id };
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2w')
        .sign(getJWTSecretKey());
    return token;
}
