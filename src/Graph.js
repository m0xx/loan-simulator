import React from 'react';
import {withTheme} from '@material-ui/core/styles';
import {ComposedChart, Bar, BarChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Rect from "@reach/rect";

import CustomTooltip from './CustomTooltip';

function Graph({payments, theme}) {
    const total = payments[0].remaining;

    const data = payments.map((payment) => {
        const totalPayment = payment.interest + payment.capital;

        return {
            ...payment,
            interestPercent: payment.interest / totalPayment * total,
            capitalPercent: payment.capital / totalPayment * total
        }
    })

    return (
        <Rect>
            {({ref, rect}) => {
                const {width, height} = rect || {};

                return <div ref={ref} style={{width: '100%', flex: 1}}>
                    {rect &&
                    <React.Fragment>
                        <ComposedChart width={width} height={height} data={data}>
                            <XAxis dataKey="noPeriod" />
                            <Tooltip content={<CustomTooltip payments={payments}/>}/>
                            <Legend />
                            <Bar
                                name="% Intérêts"
                                dataKey="interestPercent"
                                stackId="a"
                                fill="rgba(0,0,0,0.24)"
                            />
                            <Bar
                                name="% Remboursement"
                                dataKey="capitalPercent"
                                stackId="a"
                                fill="rgba(0,0,0,0.08)"
                            />
                            <Line
                                name="Balance"
                                type="basis"
                                stroke={theme.app.graph.lineStroke}
                                strokeWidth={theme.app.graph.lineStrokeWidth}
                                dot={theme.app.graph.lineDot}
                                activeDot={theme.app.graph.lineDotActive}
                                dataKey="remaining"/>
                        </ComposedChart>
                    </React.Fragment>
                    }
                </div>
            }}
        </Rect>
    )
}


export default withTheme()(Graph);