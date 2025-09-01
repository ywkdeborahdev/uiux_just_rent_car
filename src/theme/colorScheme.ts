// Define a type for the color object structure
type JustRentColors = {
    primary: {
        main: string;
        light: string;
        dark: string;
    };
    secondary: {
        main: string;
        light: string;
        dark: string;
    };
    error: {
        main: string;
    };
    background: {
        paper: string;
    };
    text: {
        primary: string;
        secondary: string;
        disabled: string;
    };
    divider: string;
};

// Assign the type to the object
const justRentColors: JustRentColors = {
    primary: {
        main: '#3A4143',
        light: '#E0E0E0',
        dark: '#131b1c',
    },
    secondary: {
        main: '#68b652',
        light: '#98e983',
        dark: '#3a8728',
    },
    error: {
        main: '#ff7800',
    },
    background: {
        paper: '#F2F4F5',
    },
    text: {
        primary: '#3A4143',
        secondary: '#788185',
        disabled: '#BCC2C4',
    },
    divider: '#d0d2d3',
};

// Export the object for use in other files
export { justRentColors };