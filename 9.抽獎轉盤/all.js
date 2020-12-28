const dataTest = [
    {
        kind: 'movie',
        quantity: 1
    },
    {
        kind: 'Wish',
        quantity: 1
    },
    {
        kind: 'Anything',
        quantity: 1
    },
    {
        kind: 'child',
        quantity: 1
    },
    {
        kind: 'Wifi',
        quantity: 1
    },
    {
        kind: 'Flight',
        quantity: 1
    }
];

const width = document.querySelector(`#test`).clientWidth;
const height = width;
console.log(width, height);

const svg = d3
    .select(document.querySelector(`#test`))
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

const arcBig = d3
    .arc()
    .innerRadius(width - 100)
    .outerRadius(width / 2)

svg
    .selectAll('path')
    .enter()
    .append('path')
    .attr('d', arcBig)
    .attr('stroke', 'red')
    .attr('stroke-width', '3px')
    .attr('class', 'big')


// const tooltip = tip.setTooltip('pie')
// svg.call(tooltip)

const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(width / 2)

let pie = d3.pie().value(d => d.quantity);
// let pieData = pie(dataTest);

svg //新增各個區塊
    .selectAll('path')
    .data(pie(dataTest))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('stroke', 'black')
    .attr('stroke-width', '3px')

svg
    .selectAll('path')
    .append('text')
    .append('textPath')
        .attr('x', 0)
    .attr('y', 30)
    // .attr('href', '#test')
    .attr('fill', 'red')
    .style('font-size', '16px')
    .text('qweqwe')

// svg //準備嘗試新增文字
//     .selectAll('path')
//     .append('text')
//     .append('textPath')
//     .attr('x', 0)
//     .attr('y', 30)
//     .style('fill', 'red')
//     .style('font-size', '16px')
//     .text((dataTest.kind))


d3.selectAll("path").style("fill", function (d, i) {
    return i % 2 ? "#F0BEFF" : "#5858B9";
});