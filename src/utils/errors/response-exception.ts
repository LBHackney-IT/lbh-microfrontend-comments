export interface ResponseError {
    errors: Record<string, string | string[]>;
    status: number;
    title: string;
}

export class ResponseException extends Error {
    public response: Response;
    public status: number;
    public payload: ResponseError;
    constructor(payload: Record<string, any>, response: Response) {
        super(`[${response.status}] ${response.url}`);
        this.status = response.status;
        this.response = response;
        this.payload = payload as ResponseError;
    }
}
