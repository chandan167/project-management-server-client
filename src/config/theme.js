


export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
            }
            : {
                // palette values for dark mode
                background: {
                    default: '#000d1a',
                    paper: '#000d1a'
                }
            }),
    },
});