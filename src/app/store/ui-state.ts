export interface UiState {
    userId: number;
    currentThreadId: number;
    currentError?: string;
}

export const INITIAL_UI_STATE = {
    userId: undefined,
    currentThreadId: undefined
};
