import { createMuiTheme } from '@material-ui/core/styles';

const theme1 = {
    palette: {
        primary: {
            main: '#897DFE'
        }
    },
    app: {
        gradiant: {
            colorful: 'linear-gradient(to right top, #897dfe, #F370DD, #FF77AB, #FF9C7B, #FFCC61, #F9F871)',
            dark: 'linear-gradient(to right top, #585865, #565663, #535461, #515260, #4e505e)',
            primary: 'linear-gradient(to right top, #786bdf, #7064d5, #685dcb, #6157c2, #5950b8)'
        },
        content: {
            backgroundImage: 'linear-gradient(to right top, #897dfe, #F370DD, #FF77AB, #FF9C7B, #FFCC61, #F9F871)',
            // backgroundImage: 'linear-gradient(to right top, #696a84, #62647b, #5c5e73, #55586a, #4f5262);',
        },
        graph: {
            lineStroke: "#897DFE",
            lineStrokeWidth: 6,
            lineDot: {
                r: 6,
                fill: '#897DFE',
                stroke: '#CAC5FB',
                strokeWidth: 2
            },
            lineDotActive: {
                r: 6,
                fill: '#897DFE',
                stroke: '#FFF',
                strokeWidth: 2
            },
            tooltip: {
                backgroundImage: 'linear-gradient(to right top, #585865, #565663, #535461, #515260, #4e505e)',
                color: '#FFF'
            }
        },
        // graph: {
        //     lineStroke: "#897DFE",
        //     lineStrokeWidth: 10,
        //     lineDot: {
        //         r: 10,
        //         fill: '#897DFE',
        //         stroke: '#CAC5FB',
        //         strokeWidth: 5
        //     },
        //     lineDotActive: {
        //         r: 10,
        //         fill: '#897DFE',
        //         stroke: '#FFFFFF',
        //         strokeWidth: 5
        //     },
        //     tooltip: {
        //         backgroundImage: 'linear-gradient(to right top, #585865, #565663, #535461, #515260, #4e505e)',
        //         color: '#FFF'
        //     }
        // }
    }
}

export default createMuiTheme(theme1);