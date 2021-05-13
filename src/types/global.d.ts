declare global {
    interface ArrayConstructor {
        isArray(
            argument: ReadonlyArray<any> | any
        ): argument is ReadonlyArray<any>;
    }
}

export {};
