// types/ApiResponse.ts (create this file if it doesn't exist)
export interface ApiResponse<T = any> {
    message: string;
    data?: T; // Optional, can hold any type
    token?: string; // Optional token for authentication
}