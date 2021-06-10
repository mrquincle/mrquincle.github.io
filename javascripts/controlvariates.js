var DELAY = 1; // delay in ms to add new data points

var names = ['no control variate', 'g(x)=x+1', 'g(x)=log(x+1)'];

var groups = new vis.DataSet();

var nof_lines=3;

// defines resolution of the x-axis
var x_scale = 1000;

for (var i = 0; i < 3; i++) {
  groups.add({
    id: i,
    content: names[i],
    options: {
      drawPoints: true,
      interpolation: {
        enabled: false
      }
    }});
}

var container = document.getElementById('visualization-controlvariates');
var dataset = new vis.DataSet();

var options = {
  drawPoints: true,
  dataAxis: {visible: true,
    left: {range: { min: 0.25, max: 1} } },
  legend: true,
  start: -0 * x_scale,
  end: 1 * x_scale,
  showMajorLabels: false,
  format: {
    minorLabels: {
      millisecond: '0.S',
    }
  }
};
var graph2d = new vis.Graph2d(container, dataset, groups, options);

function f0(u) {
  var result = 1/(1+u);
  return result;
}

function f1(u) {
  var c = 0.4773;
  var d = 1/2;
  var result = 1/(1+u)+c*u - c*d;
  return result;
}

function f2(u) {
  var c = 0.72;
  var d = Math.log(4)-1;
  var result = 1/(1+u)+c*Math.log(u+1) - c*d;
  return result;
}

function var_x() {
  u_sample = Math.random();
  return u_sample;
}

var t_min = 0;
var t_max = 100;
var t_inc = t_min;

function var_t() {
  t_inc = t_inc + 1;
  return t_inc;
}

var m_global;

function addDataPoint() {
  var_x();
  var_t();
  if (t_inc > t_max) {
    //console.log('Stop');
    t_inc = t_min;
    return;
  }
    
  //console.log('Add datapoint', f1(u_sample));
  
  dataset.add({
    x: u_sample*x_scale, // display on 1000 time larger scale
    y: f0(u_sample),
    group: 0
  });

  dataset.add({
    x: u_sample*x_scale, // display on 1000 time larger scale
    y: f1(u_sample),
    group: 1
  });
  
  dataset.add({
    x: u_sample*x_scale, // display on 1000 time larger scale
    y: f2(u_sample),
    group: 2
  });

  setTimeout(addDataPoint, DELAY);
}

addDataPoint(1);

