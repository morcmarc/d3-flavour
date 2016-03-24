import { range } from './range';
import { merge } from './merge';

const defaultOptions = {
    depth    : 5,
    flavours : ['Malty', 'Sour', 'Floral', 'Fruit', 'Sweet', 'Smooth', 'Bitter', 'Hoppy'],
    thickness: 0.1,
    bgColor  : '#fff',
    fgColor1 : '#ccc',
    fgColor2 : '#666',
    fgColor3 : 'orange',
    color    : '#888',
};

let _getId = (id, i, d = 0) => {
    return id + '_a_' + i + '_' + d;
}

let _getIdSelector = (id, i, d = 0) => {
    return '#' + _getId(id, i, d);
}

let _getColor = (datum, d, options, width) => {
    return (options.depth - datum) <= d 
        ? options.fgColor2 
        : options.fgColor1;
}

let _getArcForFlavourAndDepth = (f, d, width, options) => {
    // Number of segments
    let n = options.flavours.length;
    // Segment length
    let s = Math.PI * 2 / n;
    // Start angle
    let s_a = f * s;
    // End angle
    let e_a = (f + 1) * s;
    return d3.svg
        .arc()
        .innerRadius(width / 2 * (1 - (d + 1) * options.thickness))
        .outerRadius(width / 2 * (1 - options.thickness - (d + 1) * options.thickness))
        .startAngle(s_a)
        .endAngle(e_a);
}

let _draw = (svg, id, data, width, height, options) => {
    let c = svg
        .selectAll('.flavour-arc')
        .data(data);
    
    let g = c    
        .enter()
        .append('g')
        .attr('class', '.flavour-arc');

    c.exit().remove();
    
    g.append((datum, i) => { 
        let sg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'g'));

        range(options.depth).forEach((d) => {
            sg.append('path')
                .attr('d', _getArcForFlavourAndDepth(i, d, width, options))
                .attr('transform', 'translate(' + width / 2 + ',' + width / 2 + ')')
                .attr('fill', _getColor(datum, d, options, width))
                .attr('stroke-width', width / 60)
                .attr('stroke', options.bgColor)
                .attr('id', _getId(id, i, d))
                .style('cursor', 'pointer')
                .on('mouseover', () => {
                    d3.select(_getIdSelector(id, i, d)).transition()
                        .ease('elastic')
                        .duration(300)
                        .attr('fill', options.fgColor3);
                })
                .on('mouseout', () => {
                    d3.select(_getIdSelector(id, i, d)).transition()
                        .ease('quad')
                        .duration(100)
                        .attr('fill', _getColor(datum, d, options, width));
                })
                .on('click', () => {
                    let newData = data.slice(0);
                    
                    newData[i] = options.depth - d;
                    if(newData[i] === data[i]) {
                        newData[i] = 0;
                    }
                    
                    if(typeof options.callback === 'function') {
                        options.callback(newData);
                    }
                    
                    c.selectAll("*").remove();
                    
                    _draw(svg, id, newData, width, height, options);
                });
        });

        let t = sg.append('text')
            .attr('x', 0)
            .attr('dy', (-width / 90))
            .style('font-size', (width / 20) + 'px')
            .style('font-family', 'Verdana')
            .style("text-anchor","middle");

        t.append('textPath')
            .attr('fill', options.color)
            .attr('xlink:href', _getIdSelector(id, i))
            .attr("startOffset", "20%")
            .text(options.flavours[i]);

        return sg.node(); 
    });
}

export let transformData = (data) => {
    return Object.keys(data).map(key => data[key]);
}

export let chart = (id, data, options = defaultOptions) => {
    let opts = merge(defaultOptions, options);
    let base = d3.select('#' + id);
    let width = base.node().getBoundingClientRect().width;
    let height = base.node().getBoundingClientRect().height;
    let svg = base
        .append("svg")
        .attr("width" , width)
        .attr("height", height);
    _draw(svg, id, data, width, height, opts);
}