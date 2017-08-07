export interface UiState {
    userId: number;
    currentThreadId: number;
}

export const INITIAL_UI_STATE = {
    userId: 1,
    currentThreadId: undefined
};
