import { api } from '../../index'

async function getArticlesByUser(token?: string, userId?: string) {

    try {
        const userCreated = await api.get(`/article/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return userCreated.data;
    } catch (error: any) {
        return error
    }
}

async function getArticlesByContent(id: string) {
    try {
        const articles = await api.get(`/article/content/${id}`);
        return articles.data;
    } catch (error: any) {
        return error
    }
}

export { getArticlesByUser, getArticlesByContent };