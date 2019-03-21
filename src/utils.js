// https://mathjs.org/docs/expressions/syntax.html
import * as math from 'mathjs'

export const getParser = formula => {
    const parser = math.parser();
    parser.eval(`f(x, t) = ${formula}`)
    return parser;
};

export const euler = (formula, t0, x0, n, h) => {
    const parser = getParser(formula);
    let values = [{ t: t0, x: x0 }];
    for (let t = t0 + h, i = 0; t <= n * h + t0; t += h, i++) {
        const prev = values[i];
        values.push({
            t,
            x: prev.x + h * parser.eval(`f(${prev.x}, ${prev.t})`)
        })
    }
    return values;
}

export const eulerMejorado = (formula, t0, x0, n, h) => {
    const parser = getParser(formula);
    let values = [{ t: t0, x: x0 }];
    for (let t = t0 + h, i = 0; t <= n * h + t0; t += h, i++) {
        const prev = values[i];
        const predictor = prev.x + h * parser.eval(`f(${prev.x}, ${prev.t})`);
        const corrector = prev.x + h * 0.5 * (parser.eval(`f(${prev.x}, ${prev.t})`)
            + parser.eval(`f(${predictor}, ${t})`));
        values.push({
            t,
            x: corrector
        })
    }
    return values;
}

export const rungeKutta = (formula, t0, x0, n, h) => {
    const parser = getParser(formula);
    let values = [{ t: t0, x: x0 }];
    for (let t = t0 + h, i = 0; t <= n * h + t0; t += h, i++) {
        const prev = values[i];
        
        // https://wikimedia.org/api/rest_v1/media/math/render/svg/e83e78cce0d440ff06da69da43da7ad3dd082b53
        // https://wikimedia.org/api/rest_v1/media/math/render/svg/ccc07096d52f473fd1f15e9a4ff40d289eb87322

        let ks = [parser.eval(`f(${prev.x}, ${prev.t})`)]
        for (let k = 0; k < 3; k++)
            ks.push(parser.eval(`f(${prev.x + (k === 2 ? 1 : 0.5) * ks[k] * h}, 
                ${prev.t + (k === 2 ? 1 : 0.5) * h})`));

        values.push({
            t,
            x: prev.x + 1 / 6 * h * (ks.shift() + ks.pop() + ks.reduce((prev, curr) => prev + 2 * curr, 0))
        })
    }
    return values;
}