import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import Graph from 'components/Graph';

let tab: { name: string; data: [number, number][] }[] = [
    { name: 'id', data: [[5, 5]] },
];

describe('Graph', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<Graph data={tab} />, div);
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(<Graph data={tab} />, div);
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<div>
              <div data-highcharts-chart=\\"1\\" style=\\"overflow: hidden;\\">
                <div id=\\"highcharts-q25ukjb-4\\" style=\\"position: relative; overflow: hidden; width: 600px; height: 400px; text-align: left; line-height: normal; z-index: 0; user-select: none;\\" dir=\\"ltr\\" class=\\"highcharts-container \\"><svg version=\\"1.1\\" class=\\"highcharts-root\\" style=\\"font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;font-size:12px;\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"600\\" height=\\"400\\" viewBox=\\"0 0 600 400\\">
                    <desc>Created with Highcharts 9.0.0</desc>
                    <defs>
                      <clipPath id=\\"highcharts-q25ukjb-5-\\">
                        <rect x=\\"0\\" y=\\"0\\" width=\\"580\\" height=\\"NaN\\" fill=\\"none\\"></rect>
                      </clipPath>
                      <clipPath id=\\"highcharts-q25ukjb-7-\\">
                        <rect x=\\"0\\" y=\\"0\\" width=\\"580\\" height=\\"NaN\\" fill=\\"none\\"></rect>
                      </clipPath>
                    </defs>
                    <rect fill=\\"#ffffff\\" class=\\"highcharts-background\\" x=\\"0\\" y=\\"0\\" width=\\"600\\" height=\\"400\\" rx=\\"0\\" ry=\\"0\\"></rect>
                    <rect fill=\\"none\\" class=\\"highcharts-plot-background\\" x=\\"10\\" y=\\"10\\" width=\\"580\\" height=\\"NaN\\"></rect>
                    <g class=\\"highcharts-grid highcharts-xaxis-grid\\" data-z-index=\\"1\\">
                      <path fill=\\"none\\" data-z-index=\\"1\\" class=\\"highcharts-grid-line\\" d=\\"M 0 0\\" opacity=\\"1\\"></path>
                    </g>
                    <g class=\\"highcharts-grid highcharts-yaxis-grid\\" data-z-index=\\"1\\">
                      <path fill=\\"none\\" stroke=\\"#e6e6e6\\" stroke-width=\\"1\\" data-z-index=\\"1\\" class=\\"highcharts-grid-line\\"></path>
                    </g>
                    <rect fill=\\"none\\" class=\\"highcharts-plot-border\\" data-z-index=\\"1\\" x=\\"10\\" y=\\"10\\" width=\\"580\\" height=\\"0\\"></rect>
                    <g class=\\"highcharts-axis highcharts-xaxis\\" data-z-index=\\"2\\">
                      <path fill=\\"none\\" class=\\"highcharts-tick\\" stroke=\\"#ccd6eb\\" stroke-width=\\"1\\" d=\\"M 299.5 -100000 L 299.5 -99990\\" opacity=\\"1\\"></path>
                      <path fill=\\"none\\" class=\\"highcharts-axis-line\\" stroke=\\"#ccd6eb\\" stroke-width=\\"1\\" data-z-index=\\"7\\" d=\\"M 0 0\\"></path>
                    </g>
                    <g class=\\"highcharts-axis highcharts-yaxis\\" data-z-index=\\"2\\">
                      <path fill=\\"none\\" class=\\"highcharts-axis-line\\" data-z-index=\\"7\\" d=\\"M 0 0\\"></path>
                    </g>
                    <g class=\\"highcharts-series-group\\" data-z-index=\\"3\\">
                      <g class=\\"highcharts-series highcharts-series-0 highcharts-line-series highcharts-color-0\\" data-z-index=\\"0.1\\" opacity=\\"1\\" transform=\\"translate(10,10) scale(1 1)\\" clip-path=\\"url(#highcharts-q25ukjb-7-)\\">
                        <path fill=\\"none\\" d=\\"M 290 -100000\\" class=\\"highcharts-graph\\" data-z-index=\\"1\\" stroke=\\"#7cb5ec\\" stroke-width=\\"2\\" stroke-linejoin=\\"round\\" stroke-linecap=\\"round\\"></path>
                        <path fill=\\"none\\" d=\\"M 290 -100000\\" visibility=\\"visible\\" data-z-index=\\"2\\" class=\\"highcharts-tracker-line\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke=\\"rgba(192,192,192,0.002)\\" stroke-width=\\"22\\"></path>
                      </g>
                      <g class=\\"highcharts-markers highcharts-series-0 highcharts-line-series highcharts-color-0 highcharts-tracker\\" data-z-index=\\"0.1\\" opacity=\\"1\\" transform=\\"translate(10,10) scale(1 1)\\" clip-path=\\"none\\"></g>
                    </g><text x=\\"300\\" text-anchor=\\"middle\\" class=\\"highcharts-title\\" data-z-index=\\"4\\" style=\\"color:#333333;font-size:16px;fill:#333333;\\" y=\\"22\\"></text><text x=\\"300\\" text-anchor=\\"middle\\" class=\\"highcharts-subtitle\\" data-z-index=\\"4\\" style=\\"color:#666666;fill:#666666;\\" y=\\"10\\"></text><text x=\\"10\\" text-anchor=\\"start\\" class=\\"highcharts-caption\\" data-z-index=\\"4\\" style=\\"color:#666666;fill:#666666;\\" y=\\"397\\"></text>
                    <g class=\\"highcharts-legend\\" data-z-index=\\"7\\" transform=\\"translate(300,362)\\">
                      <rect fill=\\"none\\" class=\\"highcharts-legend-box\\" rx=\\"0\\" ry=\\"0\\" visibility=\\"visible\\"></rect>
                      <g data-z-index=\\"1\\">
                        <g>
                          <g class=\\"highcharts-legend-item highcharts-line-series highcharts-color-0 highcharts-series-0\\" data-z-index=\\"1\\" transform=\\"translate(8,3)\\">
                            <path fill=\\"none\\" d=\\"M 0 11 L 16 11\\" class=\\"highcharts-graph\\" stroke=\\"#7cb5ec\\" stroke-width=\\"2\\"></path><text x=\\"21\\" style=\\"color:#333333;cursor:pointer;font-size:12px;font-weight:bold;fill:#333333;\\" text-anchor=\\"start\\" data-z-index=\\"2\\" y=\\"15\\">id</text>
                          </g>
                        </g>
                      </g>
                    </g>
                    <g class=\\"highcharts-axis-labels highcharts-xaxis-labels\\" data-z-index=\\"7\\"><text x=\\"300\\" style=\\"color:#666666;cursor:default;font-size:11px;fill:#666666;\\" text-anchor=\\"middle\\" transform=\\"translate(0,0)\\" y=\\"-99981\\" opacity=\\"1\\">00:00:00.005</text></g>
                    <g class=\\"highcharts-axis-labels highcharts-yaxis-labels\\" data-z-index=\\"7\\"><text x=\\"590\\" style=\\"color:#666666;cursor:default;font-size:11px;fill:#666666;\\" text-anchor=\\"end\\" transform=\\"translate(0,0)\\" y=\\"-100002\\" opacity=\\"1\\">5</text></g>
                  </svg></div>
              </div>;
            </div>"
        `); /* ... gets filled automatically by jest ... */
    });
});
