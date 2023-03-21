
am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    // Hide the watermark
    chart.logo.disabled = true;


    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.dateFormats.setKey("year", "yyyy");
    dateAxis.renderer.minGridDistance = 60;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    var countries = ['AUSTRALIA', 'USA', 'UK', 'IND', 'CANADA'];
    for (var i = 0; i < countries.length; i++) {
        createSeries(countries[i], countries[i]);
    }
    
    // Create series
    function createSeries(s, name) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value" + s;
        series.dataFields.dateX = "date";
        series.name = name;
        series.strokeWidth = 2;
        // series.minBulletDistance = 2;
    
        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "horizontal";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        // series.tooltip.label.textValign = "middle";


        // Make bullets grow on hover
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 3;
        bullet.circle.fill = am4core.color("#fff");

        
        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.4;

        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;

        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();


        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        dateAxis.start = 0.8;
        dateAxis.keepSelection = true;

        var segment = series.segments.template;
        segment.interactionsEnabled = true;

        var hoverState = segment.states.create("hover");
        hoverState.properties.strokeWidth = 3;

        var dimmed = segment.states.create("dimmed");
        dimmed.properties.stroke = am4core.color("#cccccc");

        segment.events.on("over", function (event) {
            processOver(event.target.parent.parent.parent);
        });

        segment.events.on("out", function (event) {
            processOut(event.target.parent.parent.parent);
        });
        
        var data;
        // var data =[]
        if (name === "AUSTRALIA") {
            data = [{'date': 1990, 'valueAUSTRALIA': 14}, {'date': 1991, 'valueAUSTRALIA': 24}, {'date': 1992, 'valueAUSTRALIA': 30}, {'date': 1993, 'valueAUSTRALIA': 28}, {'date': 1994, 'valueAUSTRALIA': 37}, {'date': 1995, 'valueAUSTRALIA': 114}, {'date': 1996, 'valueAUSTRALIA': 205}, {'date': 1997, 'valueAUSTRALIA': 385}, {'date': 1998, 'valueAUSTRALIA': 532}, {'date': 1999, 'valueAUSTRALIA': 1830}, {'date': 2000, 'valueAUSTRALIA': 1419}, {'date': 2001, 'valueAUSTRALIA': 3598}, {'date': 2002, 'valueAUSTRALIA': 4437}, {'date': 2003, 'valueAUSTRALIA': 4951}, {'date': 2004, 'valueAUSTRALIA': 5634}, {'date': 2005, 'valueAUSTRALIA': 5801}, {'date': 2006, 'valueAUSTRALIA': 5964}, {'date': 2007, 'valueAUSTRALIA': 7400}, {'date': 2008, 'valueAUSTRALIA': 7117}, {'date': 2009, 'valueAUSTRALIA': 6164}, {'date': 2010, 'valueAUSTRALIA': 3615}, {'date': 2011, 'valueAUSTRALIA': 2518}, {'date': 2012, 'valueAUSTRALIA': 3930}, {'date': 2013, 'valueAUSTRALIA': 4726}, {'date': 2014, 'valueAUSTRALIA': 3937}, {'date': 2015, 'valueAUSTRALIA': 5203}, {'date': 2016, 'valueAUSTRALIA': 4578}, {'date': 2017, 'valueAUSTRALIA': 4891}, {'date': 2018, 'valueAUSTRALIA': 4643}, {'date': 2019, 'valueAUSTRALIA': 5160}, {'date': 2020, 'valueAUSTRALIA': 5274}, {'date': 2021, 'valueAUSTRALIA': 4499}, {'date': 2022, 'valueAUSTRALIA': 4090}];
        }
        if (name === 'USA') {
            data = [{'date': 1990, 'valueUSA': 811}, {'date': 1991, 'valueUSA': 660}, {'date': 1992, 'valueUSA': 1034}, {'date': 1993, 'valueUSA': 2240}, {'date': 1994, 'valueUSA': 17026}, {'date': 1995, 'valueUSA': 17811}, {'date': 1996, 'valueUSA': 17708}, {'date': 1997, 'valueUSA': 15928}, {'date': 1998, 'valueUSA': 15843}, {'date': 1999, 'valueUSA': 15838}, {'date': 2000, 'valueUSA': 6069}, {'date': 2001, 'valueUSA': 4889}, {'date': 2002, 'valueUSA': 9981}, {'date': 2003, 'valueUSA': 14857}, {'date': 2004, 'valueUSA': 20249}, {'date': 2005, 'valueUSA': 16363}, {'date': 2006, 'valueUSA': 13051}, {'date': 2007, 'valueUSA': 13538}, {'date': 2008, 'valueUSA': 16424}, {'date': 2009, 'valueUSA': 20022}, {'date': 2010, 'valueUSA': 20369}, {'date': 2011, 'valueUSA': 23281}, {'date': 2012, 'valueUSA': 34481}, {'date': 2013, 'valueUSA': 49626}, {'date': 2014, 'valueUSA': 39939}, {'date': 2015, 'valueUSA': 41406}, {'date': 2016, 'valueUSA': 40190}, {'date': 2017, 'valueUSA': 48397}, {'date': 2018, 'valueUSA': 49057}, {'date': 2019, 'valueUSA': 49340}, {'date': 2020, 'valueUSA': 38724}, {'date': 2021, 'valueUSA': 37491}, {'date': 2022, 'valueUSA': 41655}];
        }
        if (name === 'UK') {
            data = [{'date': 1990, 'valueUK': 209}, {'date': 1991, 'valueUK': 97}, {'date': 1992, 'valueUK': 134}, {'date': 1993, 'valueUK': 133}, {'date': 1994, 'valueUK': 59}, {'date': 1995, 'valueUK': 433}, {'date': 1996, 'valueUK': 330}, {'date': 1997, 'valueUK': 445}, {'date': 1998, 'valueUK': 1431}, {'date': 1999, 'valueUK': 1691}, {'date': 2000, 'valueUK': 1392}, {'date': 2001, 'valueUK': 6042}, {'date': 2002, 'valueUK': 9834}, {'date': 2003, 'valueUK': 9445}, {'date': 2004, 'valueUK': 10904}, {'date': 2005, 'valueUK': 12696}, {'date': 2006, 'valueUK': 12718}, {'date': 2007, 'valueUK': 14883}, {'date': 2008, 'valueUK': 13305}, {'date': 2009, 'valueUK': 12270}, {'date': 2010, 'valueUK': 7704}, {'date': 2011, 'valueUK': 4202}, {'date': 2012, 'valueUK': 10776}, {'date': 2013, 'valueUK': 18723}, {'date': 2014, 'valueUK': 15403}, {'date': 2015, 'valueUK': 19725}, {'date': 2016, 'valueUK': 22421}, {'date': 2017, 'valueUK': 27620}, {'date': 2018, 'valueUK': 29505}, {'date': 2019, 'valueUK': 31786}, {'date': 2020, 'valueUK': 31326}, {'date': 2021, 'valueUK': 29908}, {'date': 2022, 'valueUK': 31842}];
        }
        if (name === 'IND') {
            data = [{'date': 1990, 'valueIND': 0}, {'date': 1991, 'valueIND': 0}, {'date': 1992, 'valueIND': 0}, {'date': 1993, 'valueIND': 0}, {'date': 1994, 'valueIND': 0}, {'date': 1995, 'valueIND': 0}, {'date': 1996, 'valueIND': 0}, {'date': 1997, 'valueIND': 0}, {'date': 1998, 'valueIND': 0}, {'date': 1999, 'valueIND': 0}, {'date': 2000, 'valueIND': 0}, {'date': 2001, 'valueIND': 1}, {'date': 2002, 'valueIND': 1}, {'date': 2003, 'valueIND': 1}, {'date': 2004, 'valueIND': 18}, {'date': 2005, 'valueIND': 78}, {'date': 2006, 'valueIND': 163}, {'date': 2007, 'valueIND': 343}, {'date': 2008, 'valueIND': 478}, {'date': 2009, 'valueIND': 800}, {'date': 2010, 'valueIND': 322}, {'date': 2011, 'valueIND': 431}, {'date': 2012, 'valueIND': 512}, {'date': 2013, 'valueIND': 840}, {'date': 2014, 'valueIND': 616}, {'date': 2015, 'valueIND': 957}, {'date': 2016, 'valueIND': 854}, {'date': 2017, 'valueIND': 694}, {'date': 2018, 'valueIND': 872}, {'date': 2019, 'valueIND': 947}, {'date': 2020, 'valueIND': 1276}, {'date': 2021, 'valueIND': 1209}, {'date': 2022, 'valueIND': 1103}];
        }
        if (name === 'CANADA') {
            data = [{'date': 1990, 'valueCANADA': 371}, {'date': 1991, 'valueCANADA': 405}, {'date': 1992, 'valueCANADA': 621}, {'date': 1993, 'valueCANADA': 508}, {'date': 1994, 'valueCANADA': 446}, {'date': 1995, 'valueCANADA': 499}, {'date': 1996, 'valueCANADA': 603}, {'date': 1997, 'valueCANADA': 799}, {'date': 1998, 'valueCANADA': 730}, {'date': 1999, 'valueCANADA': 262}, {'date': 2000, 'valueCANADA': 452}, {'date': 2001, 'valueCANADA': 794}, {'date': 2002, 'valueCANADA': 620}, {'date': 2003, 'valueCANADA': 1230}, {'date': 2004, 'valueCANADA': 1917}, {'date': 2005, 'valueCANADA': 1576}, {'date': 2006, 'valueCANADA': 1914}, {'date': 2007, 'valueCANADA': 2135}, {'date': 2008, 'valueCANADA': 2018}, {'date': 2009, 'valueCANADA': 2787}, {'date': 2010, 'valueCANADA': 2696}, {'date': 2011, 'valueCANADA': 3395}, {'date': 2012, 'valueCANADA': 4267}, {'date': 2013, 'valueCANADA': 8895}, {'date': 2014, 'valueCANADA': 9361}, {'date': 2015, 'valueCANADA': 9939}, {'date': 2016, 'valueCANADA': 6695}, {'date': 2017, 'valueCANADA': 4415}, {'date': 2018, 'valueCANADA': 3489}, {'date': 2019, 'valueCANADA': 3912}, {'date': 2020, 'valueCANADA': 3420}, {'date': 2021, 'valueCANADA': 3524}, {'date': 2022, 'valueCANADA': 3083}];
        }
        // var value = Math.round(Math.random() * 100) + 100;
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i].date)
            data[i].date = new Date(data[i].date, 0, 0)
        }

       

        // 	value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 30 + i / 5);
        // 	var dataItem = { date: new Date(2018, 0, i) };
        // 	dataItem["value" + s] = value;
        // 	data.push(dataItem);
        // }
        // console.log(data[0])
        // series.data = data;
        // for (i = 0; i < 2; i++){
        //     series.data[i] = data[i];

        // }
        // series.data = data[0];
        // series.data = data[1];
        series.data = data;
        // console.log(series.data.length)
        return series;
    }

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.scrollable = true;

    // setTimeout(function() {
    //   chart.legend.markers.getIndex(0).opacity = 0.3;
    // }, 3000)
    chart.legend.markers.template.states.create("dimmed").properties.opacity = 0.3;
    chart.legend.labels.template.states.create("dimmed").properties.opacity = 0.3;

    chart.legend.itemContainers.template.events.on("over", function (event) {
        processOver(event.target.dataItem.dataContext);
    })

    chart.legend.itemContainers.template.events.on("out", function (event) {
        processOut(event.target.dataItem.dataContext);
    })

    function processOver(hoveredSeries) {
        hoveredSeries.toFront();

        hoveredSeries.segments.each(function (segment) {
            segment.setState("hover");
        })

        hoveredSeries.legendDataItem.marker.setState("default");
        hoveredSeries.legendDataItem.label.setState("default");

        chart.series.each(function (series) {
            if (series != hoveredSeries) {
                series.segments.each(function (segment) {
                    segment.setState("dimmed");
                })
                series.bulletsContainer.setState("dimmed");
                series.legendDataItem.marker.setState("dimmed");
                series.legendDataItem.label.setState("dimmed");
            }
        });
    }

    function processOut() {
        chart.series.each(function (series) {
            series.segments.each(function (segment) {
                segment.setState("default");
            })
            series.bulletsContainer.setState("default");
            series.legendDataItem.marker.setState("default");
            series.legendDataItem.label.setState("default");
        });
    }

    // document.getElementById("button").addEventListener("click", function () {
    //     processOver(chart.series.getIndex(3));
    // })

}); // end am4core.ready()

