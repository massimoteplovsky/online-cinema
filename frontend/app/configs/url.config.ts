export const getGenresPath = (string: string) => `/genres${string}`;
export const getMoviesPath = (string: string) => `/movies${string}`;
export const getActorsPath = (string: string) => `/actors${string}`;

export const getAdminPath = (url: string) => `/manage${url}`;
export const getAdminHomePath = () => getAdminPath('').slice(0, -1);
