import { createClient, AuthType, type WebDAVClient } from 'webdav';

// const client = createClient(
//     sync.value.server,
//     {
//       username: sync.value.username,
//       password: sync.value.password
//     }
//   );
export const getClient = ({ server, username, password }: { server: string; username: string; password: string }) => {
    const client = createClient(
        server,
        {
            authType: AuthType.Password,
            username: username,
            password: password
        }
    );
    return client;
};