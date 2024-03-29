am5.ready(function() {
  
  // Data
  var allData = {"1990":{"AUSTRALIA":14.0,"CANADA":371.0,"IND":null,"UK":209.0,"USA":811.0},"1991":{"AUSTRALIA":24.0,"CANADA":405.0,"IND":null,"UK":97.0,"USA":660.0},"1992":{"AUSTRALIA":30.0,"CANADA":621.0,"IND":null,"UK":134.0,"USA":1034.0},"1993":{"AUSTRALIA":28.0,"CANADA":508.0,"IND":null,"UK":133.0,"USA":2240.0},"1994":{"AUSTRALIA":37.0,"CANADA":446.0,"IND":null,"UK":59.0,"USA":17026.0},"1995":{"AUSTRALIA":114.0,"CANADA":499.0,"IND":null,"UK":433.0,"USA":17811.0},"1996":{"AUSTRALIA":205.0,"CANADA":603.0,"IND":null,"UK":330.0,"USA":17708.0},"1997":{"AUSTRALIA":385.0,"CANADA":799.0,"IND":null,"UK":445.0,"USA":15928.0},"1998":{"AUSTRALIA":532.0,"CANADA":730.0,"IND":null,"UK":1431.0,"USA":15843.0},"1999":{"AUSTRALIA":1830.0,"CANADA":262.0,"IND":null,"UK":1691.0,"USA":15838.0},"2000":{"AUSTRALIA":1419.0,"CANADA":452.0,"IND":null,"UK":1392.0,"USA":6069.0},"2001":{"AUSTRALIA":3598.0,"CANADA":794.0,"IND":1.0,"UK":6042.0,"USA":4889.0},"2002":{"AUSTRALIA":4437.0,"CANADA":620.0,"IND":1.0,"UK":9834.0,"USA":9981.0},"2003":{"AUSTRALIA":4951.0,"CANADA":1230.0,"IND":1.0,"UK":9445.0,"USA":14857.0},"2004":{"AUSTRALIA":5634.0,"CANADA":1917.0,"IND":18.0,"UK":10904.0,"USA":20249.0},"2005":{"AUSTRALIA":5801.0,"CANADA":1576.0,"IND":78.0,"UK":12696.0,"USA":16363.0},"2006":{"AUSTRALIA":5964.0,"CANADA":1914.0,"IND":163.0,"UK":12718.0,"USA":13051.0},"2007":{"AUSTRALIA":7400.0,"CANADA":2135.0,"IND":343.0,"UK":14883.0,"USA":13538.0},"2008":{"AUSTRALIA":7117.0,"CANADA":2018.0,"IND":478.0,"UK":13305.0,"USA":16424.0},"2009":{"AUSTRALIA":6164.0,"CANADA":2787.0,"IND":800.0,"UK":12270.0,"USA":20022.0},"2010":{"AUSTRALIA":3615.0,"CANADA":2696.0,"IND":322.0,"UK":7704.0,"USA":20369.0},"2011":{"AUSTRALIA":2518.0,"CANADA":3395.0,"IND":431.0,"UK":4202.0,"USA":23281.0},"2012":{"AUSTRALIA":3930.0,"CANADA":4267.0,"IND":512.0,"UK":10776.0,"USA":34481.0},"2013":{"AUSTRALIA":4726.0,"CANADA":8895.0,"IND":840.0,"UK":18723.0,"USA":49626.0},"2014":{"AUSTRALIA":3937.0,"CANADA":9361.0,"IND":616.0,"UK":15403.0,"USA":39939.0},"2015":{"AUSTRALIA":5203.0,"CANADA":9939.0,"IND":957.0,"UK":19725.0,"USA":41406.0},"2016":{"AUSTRALIA":4578.0,"CANADA":6695.0,"IND":854.0,"UK":22421.0,"USA":40190.0},"2017":{"AUSTRALIA":4891.0,"CANADA":4415.0,"IND":694.0,"UK":27620.0,"USA":48397.0},"2018":{"AUSTRALIA":4643.0,"CANADA":3489.0,"IND":872.0,"UK":29505.0,"USA":49057.0},"2019":{"AUSTRALIA":5160.0,"CANADA":3912.0,"IND":947.0,"UK":31786.0,"USA":49340.0},"2020":{"AUSTRALIA":5274.0,"CANADA":3420.0,"IND":1276.0,"UK":31326.0,"USA":38724.0},"2021":{"AUSTRALIA":4499.0,"CANADA":3524.0,"IND":1209.0,"UK":29908.0,"USA":37491.0},"2022":{"AUSTRALIA":4090.0,"CANADA":3083.0,"IND":1103.0,"UK":31842.0,"USA":41655.0}}
  
  
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");
  root._logo.dispose();
  root.numberFormatter.setAll({
    numberFormat: "#a",
  
    // Group only into M (millions), and B (billions)
    bigNumberPrefixes: [
      { number: 1e6, suffix: "M" },
      { number: 1e9, suffix: "B" }
    ],
  
    // Do not use small number prefixes at all
    smallNumberPrefixes: []
  });
  
  var stepDuration = 1000;
  
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);
  
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "none",
    wheelY: "none"
  }));
  
  
  // We don't want zoom-out button to appear while animating, so we hide it at all
  chart.zoomOutButton.set("forceHidden", true);
  
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var yRenderer = am5xy.AxisRendererY.new(root, {
    minGridDistance: 20,
    inversed: true
  });
  // hide grid
  yRenderer.grid.template.set("visible", false);
  
  var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    categoryField: "network",
    renderer: yRenderer
  }));
  
  var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    strictMinMax: true,
    extraMax: 0.1,
    renderer: am5xy.AxisRendererX.new(root, {})
  }));
  
  xAxis.set("interpolationDuration", stepDuration / 10);
  xAxis.set("interpolationEasing", am5.ease.linear);
  
  
  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "value",
    categoryYField: "network"
  }));
  
  // Rounded corners for columns
  series.columns.template.setAll({ cornerRadiusBR: 5, cornerRadiusTR: 5 });
  
  // Make each column to be of a different color
  series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });
  
  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });
  
  // Add label bullet
  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 1,
      sprite: am5.Label.new(root, {
        text: "{valueXWorking.formatNumber('#.# a')}",
        fill: root.interfaceColors.get("alternativeText"),
        centerX: am5.p100,
        centerY: am5.p50,
        populateText: true
      })
    });
  });
  
  var label = chart.plotContainer.children.push(am5.Label.new(root, {
    text: "1990",
    fontSize: "8em",
    opacity: 0.2,
    x: am5.p100,
    y: am5.p100,
    centerY: am5.p100,
    centerX: am5.p100
  }));
  
  // Get series item by category
  function getSeriesItem(category) {
    for (var i = 0; i < series.dataItems.length; i++) {
      var dataItem = series.dataItems[i];
      if (dataItem.get("categoryY") == category) {
        return dataItem;
      }
    }
  }
  
  // Axis sorting
  function sortCategoryAxis() {
    // sort by value
    series.dataItems.sort(function (x, y) {
      return y.get("valueX") - x.get("valueX"); // descending
      //return x.get("valueX") - y.get("valueX"); // ascending
    });
  
    // go through each axis item
    am5.array.each(yAxis.dataItems, function (dataItem) {
      // get corresponding series item
      var seriesDataItem = getSeriesItem(dataItem.get("category"));
  
      if (seriesDataItem) {
        // get index of series data item
        var index = series.dataItems.indexOf(seriesDataItem);
        // calculate delta position
        var deltaPosition =
          (index - dataItem.get("index", 0)) / series.dataItems.length;
        // set index to be the same as series data item index
        if (dataItem.get("index") != index) {
          dataItem.set("index", index);
          // set deltaPosition instanlty
          dataItem.set("deltaPosition", -deltaPosition);
          // animate delta position to 0
          dataItem.animate({
            key: "deltaPosition",
            to: 0,
            duration: stepDuration / 2,
            easing: am5.ease.out(am5.ease.cubic)
          });
        }
      }
    });
    // sort axis items by index.
    // This changes the order instantly, but as deltaPosition is set, they keep in the same places and then animate to true positions.
    yAxis.dataItems.sort(function (x, y) {
      return x.get("index") - y.get("index");
    });
  }
  
  var year = 1990;
  
  // update data with values each 1.5 sec
  var interval = setInterval(function () {
    year++;
  
    if (year > 2022) {
      clearInterval(interval);
      clearInterval(sortInterval);
    }
  
    updateData();
  }, stepDuration);
  
  var sortInterval = setInterval(function () {
    sortCategoryAxis();
  }, 100);
  
  function setInitialData() {
    var d = allData[year];
  
    for (var n in d) {
      series.data.push({ network: n, value: d[n] });
      yAxis.data.push({ network: n });
    }
  }
  
  function updateData() {
    var itemsWithNonZero = 0;
  
    if (allData[year]) {
      label.set("text", year.toString());
  
      am5.array.each(series.dataItems, function (dataItem) {
        var category = dataItem.get("categoryY");
        var value = allData[year][category];
        // var previousYear = year

        // if (previousYear < 1990) {
        //   value = value
        // }
        // else if (previousYear >= 1990) {
        //   for (var i = 1990; i < parseInt(year); i++) {
        //     value = value + allData[i.toString()][category]
        //     // console.log(value)
        //   }
          
        // }

        if (value > 0) {
          itemsWithNonZero++;
        }
  
        dataItem.animate({
          key: "valueX",
          to: value,
          duration: stepDuration,
          easing: am5.ease.linear
        });
        dataItem.animate({
          key: "valueXWorking",
          to: value,
          duration: stepDuration,
          easing: am5.ease.linear
        });
      });
  
      yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
    }
  }
  
  setInitialData();
  setTimeout(function () {
    year++;
    updateData();
  }, 50);
  
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);
  
  }); // end am5.ready()