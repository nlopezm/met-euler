import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "90%",
    },
    button: {
        margin: theme.spacing.unit,
        width: "100%",
    },
});

class Form extends PureComponent {

    state = {};
    onChange = ({ target: { id, value } }) => this.setState({ [id]: id === "formula" ? value : id === "h" ? parseFloat(value) : parseInt(value) });

    render() {
        const { classes, onSubmit } = this.props;
        return (
            <Paper style={{ width: "100%" }} elevation={1}>
                <form className={classes.container} autoComplete="off" onSubmit={e=> e.preventDefault() || onSubmit(this.state)}>
                    <Grid container spacing={16}>
                        <Grid item xs={4}>
                            <TextField
                                id="formula"
                                label="f(x,t)"
                                onChange={this.onChange}
                                margin="normal"
                                required
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="t0"
                                label="t0"
                                type="number"
                                onChange={this.onChange}
                                margin="normal"
                                required
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="x0"
                                label="x0"
                                type="number"
                                onChange={this.onChange}
                                margin="normal"
                                required
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="n"
                                label="n"
                                type="number"
                                onChange={this.onChange}
                                margin="normal"
                                required
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="h"
                                label="h"
                                onChange={this.onChange}
                                margin="normal"
                                required
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="time"
                                label="Intervalo (ms)"
                                onChange={this.onChange}
                                margin="normal"
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={8} />
                            <Grid item xs={3}>
                                <Button variant="contained" color="primary" className={classes.button} type="submit">
                                    OK
                        </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(Form);