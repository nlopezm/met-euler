import React, { PureComponent } from 'react';
import Chart from './Chart';
import Form from './Form';
import Grid from '@material-ui/core/Grid';

import { euler, eulerMejorado, rungeKutta } from "./utils";

class App extends PureComponent {

  state = {};
  onChange = ({ target: { id, value } }) => this.setState({ [id]: id === "formula" ? value : id === "h" ? parseFloat(value) : parseInt(value) });
  onSubmit = e => {
    e.preventDefault();
    const { formula, t0, x0, n, h, time} = this.state;
    this.setState({
      simple: euler(formula, t0, x0, n, h),
      mejorado: eulerMejorado(formula, t0, x0, n, h),
      rungeKutta: rungeKutta(formula, t0, x0, n, h),
      timeout: time,
    });
  }
  render() {
    const { simple, mejorado, timeout, rungeKutta } = this.state;
    simple && console.log ("Simple", simple)
    mejorado && console.log ("Mejorado", mejorado)
    rungeKutta && console.log ("Runge-Kutta", rungeKutta)
    return (
      <Grid className="App" container spacing={24} style={{ margin: 16 }}>
        <Grid item xs={12}>
          <Form onChange={this.onChange} onSubmit={this.onSubmit} />
        </Grid>
        {simple &&
          <Grid item xs={12} sm={4}>
            <Chart values={simple} timeout={timeout} title="Euler" />
          </Grid>}
        {mejorado && <Grid item xs={12} sm={4}>
          <Chart values={mejorado} timeout={timeout} title="Euler Mejorado" />
        </Grid>}
        {rungeKutta && <Grid item xs={12} sm={4}>
          <Chart values={rungeKutta} timeout={timeout} title="Runge-Kutta(4)" />
        </Grid>}
      </Grid>
    );
  }
}

export default App;
