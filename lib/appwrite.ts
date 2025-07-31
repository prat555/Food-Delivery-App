import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'appwrite';

interface CreateUserParams {
    email: string;
    password: string;
    name: string;
}

interface SignInParams {
    email: string;
    password: string;
}

interface GetMenuParams {
    category?: string;
    query?: string;
}

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.pg.foodapp",
    databaseId: '688b2ead000f90f7aaa7',
    bucketId: '688b6ba10018b8f5446f',
    userCollectionId: '688b2f05000d4423b08c',
    categoriesCollectionId: '688b6807001ccd2e05ba',
    menuCollectionId: '688b68b8003d583c6972',
    customizationsCollectionId: '688b6a02000f24b99159',
    menuCustomizationsCollectionId: '688b6ada0038b8810725'
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        // Delete any existing sessions first
        try {
            await account.deleteSessions();
        } catch (error) {
            // Ignore error if no sessions exist
        }

        const newAccount = await account.create(ID.unique(), email, password, name)
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(name);

        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );

        // Sign in after user creation is complete
        return await signIn({ email, password });
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        // Delete any existing sessions first
        try {
            await account.deleteSessions();
        } catch (error) {
            // Ignore error if no sessions exist
        }

        // Create new session
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )

        return menus.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const logout = async () => {
    try {
        await account.deleteSessions();
    } catch (e) {
        throw new Error(e as string);
    }
}