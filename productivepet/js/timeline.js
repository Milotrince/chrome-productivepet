"use strict";

class Timeline {
    
    constructor(webhistory, webicons) {
        this.webhistory = webhistory;
        this.webicons = webicons;
 
        this.margin = {
            top: 10,
            right: 15,
            bottom: 50,
            left: 20
        }
        this.laneHeight = 30;
        this.tooltip = d3.select("body").append("div")
            .attr("id", "tooltip")
            .style("opacity", 0);
    }

    draw() {
        var firstDate = this.webhistory[0]['start']
        var lastDate = this.webhistory[this.webhistory.length-1]['end']
        var laneLength = daysBetween(firstDate, lastDate)
        var dates = datesBetweenArray(firstDate, lastDate) 
        
        var width = 600;
        var height = laneLength * this.laneHeight * 1.5;

        var firstHour = new Date(0)
        var lastHour = new Date(0)
        lastHour.setDate(firstHour.getDate() + 1)
        var xScale = d3.scaleTime()
            .domain([firstHour, lastHour])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([0, laneLength])
            .range([0, height]);

        var chart = d3.select("svg")
            .attr("width", width)
            .attr("height", height + this.margin.top + this.margin.bottom)
            .attr("class", "chart");


        //chart lanes
        chart.append("g").selectAll(".lanelines")
            .data(dates)
            .enter().append("line")
            .attr("x1", this.margin.left)
            .attr("y1", (d, i) => {return yScale(i) + this.laneHeight + this.margin.top;})
            .attr("x2", width)
            .attr("y2", (d, i) => {return yScale(i) + this.laneHeight + this.margin.top;})
            .attr("stroke", "black")
            .attr("stroke-width", "2");

        // date text
        chart.append("g").selectAll(".lanetext")
            .data(dates)
            .enter().append("text")
            .text((d) => {return d})
            .attr("x", 50)
            .attr("y", (d, i) => {return yScale(i) + this.laneHeight / 2 + this.margin.top;})
            .attr("text-anchor", "end")
            .attr("class", "lanetext");

        //chart item rects
        chart.append("g").selectAll("chartitems")
            .data(this.webhistory)
            .enter().append("rect")
            .attr("class", "entry")
            .attr("x", (d) => {return xScale(timeDate(d.start)) ;})
            .attr("y", (d) => {return yScale(dates.indexOf(MMdd(d.start))) + this.margin.top;})
            .attr("width", (d) => {return xScale(d.end-d.start);})
            .attr("height", this.laneHeight)
            .attr("fill", "white")
            .on("mouseover", (d) => {this.hoverIn(d, this)})
            .on("mouseout", (d) => {this.hoverOut(d, this)});

        // icons
        chart.append("g").selectAll(".chartLabels")
            .data(this.webhistory)
            .enter().append("image")
            .attr("href", (d) => {return this.webicons[d.url]})
            .attr("x", (d) => {return xScale(timeDate(d.start));})
            .attr("y", (d) => {return yScale(dates.indexOf(MMdd(d.start))) + this.margin.top;})
            .attr("height", 20)
            .attr("width", 20)


    }

    hoverIn(d, t) {
        let icon = !!t.webicons && (d.url in t.webicons) ? this.webicons[d.url] : ""
        t.tooltip.transition()
            .duration(200)
            .style("opacity", .9);
            t.tooltip.html(`
                <img src=${icon} alt="icon?" height="16" width="16">
                ${d.url}<br/>
                ${prettyTime(d.start)}, ${prettyTime(d.end)}`)
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - t.laneHeight) + "px");
    }

    hoverOut(d, t) {
        t.tooltip.transition()
            .duration(300)
            .style("opacity", 0);
    }
}


function MMdd(date) {
    date = !(date instanceof Date) ? new Date(date) : date 
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day;
}

function daysBetween(startDate, endDate) {
    return Math.round((endDate-startDate) / (1000*60*60*24));
}

function datesBetweenArray(startDate, endDate) {
    startDate = !(startDate instanceof Date) ? new Date(startDate) : startDate 
    startDate.setHours(0,0,0,0)
    endDate = !(endDate instanceof Date) ? new Date(endDate) : endDate 
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= endDate) {
        dateArray.push(MMdd(new Date (currentDate)));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
}

function timeDate(date) {
    date = !(date instanceof Date) ? new Date(date) : date 
    var t = ((((date.getHours() * 60) + date.getMinutes()) * 60 + date.getSeconds()) * 1000) + date.getMilliseconds()
    return new Date(t)
}

function prettyTime(date) {
    date = !(date instanceof Date) ? new Date(date) : date 
    let hour = date.getHours().toString().padStart(2, '0');
    let minute = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hour}:${minute}:${seconds}`
}