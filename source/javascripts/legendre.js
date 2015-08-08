var DELAY = 1; // delay in ms to add new data points
var DELAY1 = 1; // delay in ms to add new data points
var DELAY2 = 4000; // delay in ms to add new data points

// for function F(x)=c*x^2, the Legendre transform G(m)=1/(4*c)*m^2

// the variable c in f(x)=c*x^2
var const_c = 2;

var names = ['f(x,c=' + const_c + ')=c*x^2=' + const_c + '*x^2',
    'h(m)=m*x',
    'k(m)=[m*x - f(x)]',
    'g(m)=sup_x[m*x-f(x)]',
    'g(m)=sup_x [x*m - f(x)]=1/(4*c)*m^2','v'];

var groups = new vis.DataSet();

// the number of supporting lines we want to draw
var nof_lines=9;


groups.add({
  id: 0,
  content: names[0],
  options: {
    drawPoints: false,
    shaded: {
      orientation: 'top'
    }
  }});

for (var i = 1; i < 3; i++) {
  groups.add({
    id: i,
    content: names[i],
    options: {
      drawPoints: false,
      interpolation: {
        enabled: false
      }
    }});
}

groups.add({
  id: 3,
  content: names[i],
  options: {
    drawPoints: true,
    yAxisOrientation: 'right',
    interpolation: {
      enabled: false
    }
  }});

groups.add({
  id: 4,
  content: names[4],
  options: {
    drawPoints: true,
    yAxisOrientation: 'right',
    shaded: {
      orientation: 'top'
    }
  }});

var container = document.getElementById('visualization');
var dataset = new vis.DataSet();

var options = {
  drawPoints: true,
  dataAxis: {visible: true,
    left: {range: { min: -2, max: 3} },
    right: {range: { min: -2, max: (3-2)} }}, // mistake in max?
  legend: true,
  start: -3000,
  end: +3000,
  showMajorLabels: false,
  format: {
    minorLabels: {
      millisecond: 'X',
      second: 'X',
      minute: 'X'
    }
  }
};
var graph2d = new vis.Graph2d(container, dataset, groups, options);

function y(x) {
  var result = const_c*x*x;
  return result;
}

var x_min = -2;
var x_delta = 0.02;
var x_max = 2;
var x_inc = x_min;

var x_axis_max = 2;

function var_x() {
  x_inc = x_inc + x_delta;
  return x_inc;
}

var m_global;

function addDataPoint() {
  var_x();
  if (x_inc > x_max) {
    m_global = -2;
    x_inc = x_min;
    groups.update({id: 1, content: 'h(m=' + m_global + ')=m*x'});
    addDataPoint1();
    return;
  }

  dataset.add({
    x: x_inc*1000, // display on 1000 time larger scale
    y: y(x_inc),
    group: 0
  });

  setTimeout(addDataPoint, DELAY);
}

/* Draw line with slope m
*/
function curve_straight(x,m) {
  var result = m*x;
  return result;
}

/* The difference between the function and the line with slope m
 */
function curve_diff(x,m) {
  var result = curve_straight(x,m) - y(x);
  return result;
}

/* Differentiate curve_straight(x,m) - y(x): m*x - c*x^2
 * Set to zero to obtain location of maximum: -2*c*x + m = 0, so -2*c*x = -m, and x=m/(2*c)
 */
function pos_max_diff(m) {
  var x = m/(2*const_c);
  var result = x;
  return result;
}

/* Use differentiation to actually get maximum difference
 */
function max_diff(m) {
  var result=curve_diff(pos_max_diff(m), m);
  return result;
}

function addDataPoint2() {
    // add line that points to maximum of k(m)
    var x0 = pos_max_diff(m_global);
    dataset.add({
      x: x0*1000, // display on 1000 time larger scale
      y: 0,
      group: 3
    });
    dataset.add({
      x: x0*1000, // display on 1000 time larger scale
      y: max_diff(m_global),
      group: 3,
      label: { content: 'm=' + m_global.toFixed(2) }
    });

    // add point (m_global, x0)
    dataset.add({
      x: m_global*1000, // display on 1000 time larger scale
      y: curve_diff(x0, m_global),
      group: 4
    });

    setTimeout(deletePoints, DELAY2);
}

/* We will delete the points that are related with the previous supporting hyperplane before we add the points of the
 * next hyperplane.
 */
function deletePoints() {
    var group = dataset.get({
      filter: function (item) {
        return (item.group >= 1 && item.group < 4);
      }
    });
    dataset.remove(group);
    m_global += 4/(nof_lines-1);
    if (m_global > x_axis_max) return;
    groups.update({id: 1, content: 'h(m=' + m_global + ')=m*x=' + m_global + 'x'});
    groups.update({id: 2, content: 'k(m=' + m_global + ')=m*x-f(x)=' + m_global + '*x-' + const_c + '*x^2' });
    groups.update({id: 3, content: 'g(m=' + m_global + ')=sup_x[m*x-f(x)]'});
    setTimeout(addDataPoint1, DELAY1);
}

function addDataPoint1() {
  var_x();
  if (x_inc > x_max) {
    x_inc = x_min;
    setTimeout(addDataPoint2, DELAY1);
    return;
  }

  dataset.add({
    x: x_inc*1000, // display on 1000 time larger scale
    y: curve_straight(x_inc, m_global),
    group: 1
  });

  dataset.add({
    x: x_inc*1000, // display on 1000 time larger scale
    y: curve_diff(x_inc, m_global),
    group: 2
  });

  setTimeout(addDataPoint1, DELAY1);
}

addDataPoint(1);

