import React, { PureComponent } from 'react';
import Chart from 'react-google-charts';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export default class LineChart extends PureComponent {
    state = { values: [], viewWindow: { x: { min: 0, max: 1 }, t: { min: 0, max: 1 } } };
    componentDidMount = () => this.componentWillReceiveProps(this.props);
    componentWillReceiveProps = async nextProps => {
        this.setState({ values: [] });
        const { values, timeout } = nextProps;
        if (!timeout) {
            this.setState({ values });
            return;
        }
        const val = [];
        const copy = Object.assign([], values);
        await this.setState({
            viewWindow: {
                x: { min: copy[0].x, max: copy[copy.length - 1].x },
                t: { min: copy[0].t, max: copy[copy.length - 1].t },
            }
        });
        val.push(copy.shift());
        this.setState({ values: val });
        while (copy.length) {
            await delay(timeout);
            val.push(copy.shift());
            await this.setState({ values: val, timestamp: new Date() });
        }
    };

    render() {
        const { values, viewWindow } = this.state;
        const { title } = this.props;
        return values.length && (<Chart
            width={'100%'}
            height={'400px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['t', 'x'],
                ...values.map(({ t, x }) => [t, x])
            ]}
            options={{
                title,
                titleTextStyle: {
                    fontSize: 24,
                    bold: false
                },
                hAxis: {
                    title: 't',
                    viewWindow: viewWindow.t
                },
                vAxis: {
                    title: 'x',
                    viewWindow: viewWindow.x
                }
            }}
        />)
    }
}

LineChart.defaultProps = {
    values: []
}