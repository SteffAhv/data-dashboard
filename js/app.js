window.addEventListener('load', function(e) {
  var showHide = function(e) {
    var tabSelected = e.target.dataset.tabSelected;
    var overview = document.getElementById('container-overview');
    var students = document.getElementById('container-students');
    var teachers = document.getElementById('container-teachers');
  
    if (tabSelected === 'tabOverview') {
      console.log('This is overview section');
      // ocultar students, teachers  
      students.style.display = 'none';
      teachers.style.display = 'none';
      // mostrar solo overview
      overview.style.display = 'block';
    } else if (tabSelected === 'tabStudents') {
      console.log('This is students section');
      // ocultar overview, teachers
      overview.style.display = 'none';
      teachers.style.display = 'none';
      // mostrar solo students
      students.style.display = 'block';
    } else if (tabSelected === 'tabTeachers') {
      console.log('This is teachers section');
      // ocultar overview, students 
      overview.style.display = 'none';
      students.style.display = 'none';
      // mostrar solo teachers
      teachers.style.display = 'block';
    }
  };
  
  var loadPage = function() {
    var overview = document.getElementById('container-overview');
    var students = document.getElementById('container-students');
    var teachers = document.getElementById('container-teachers'); 
    overview.style.display = 'none';
    students.style.display = 'none';
    teachers.style.display = 'none';
    var tabElements = document.getElementsByClassName('tab');
    for (var i = 0;i < tabElements.length; i++) {
      tabElements[i].addEventListener('click', showHide);
    }
  };

  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(drawChartEnrollment);
  google.chart.setOnLoadCallback(drawChartEstudentSatisfaction);
});

function drawChartEnrollment() {
  var data = new google.visualization.DataTable();
  // llamando el dato desde la funcion
  // var divText = document.getElementById('student');
  // var divPor = document.getElementById('student-dropout');
  // divPor.innerHTML = studentsDesert() + '% ';

  data.addColumn('string', 'alumnas');
  data.addColumn('number', 'count');
  data.addRows(
    [
      ['Alumn Desert', 139],
      ['Alumn Active', 122]
    ]
  );
  var opciones = {'width': 300,
    'height': 150
  };
  var graphic = new google.visualization.ColumnChart(document.getElementById('column-enrollment'));
  graphic.draw(data, opciones);
}

function drawChartEstudentSatisfaction() {
  var data = new google.visualization.DataTable();

  data.addColumn('string', 'level');
  data.addColumn('number', 'num');
  data.addRows([['Alum Satisfaction', 89], ['num', 12]]);

  var option = {'width': 300, 
    'height': 150};
  var graphic = new google.visualization.PieChart(document.getElementById('column-StudentsSatisfaction'));
  graphic.draw(data, option);
}


// El total de estudiantes presentes por sede y generación.


// sede            arrSede[sede] = arrSede[sede] || {};
// generación      arrSede[sede][generacion] = arrSede[sede][generacion] || { total: 0 };
//                                             valida si existe sino { total: 0};
// active          arrSede[sede][generacion].total++;

function studentGeneration() {
  var arrSede = [];
  for (var sede in data) {
    arrSede[sede] = arrSede[sede] || [];
    for (var generacion in data[sede]) {
      var tmpgeneracion = data[sede][generacion];
      arrSede[sede][generacion] = arrSede[sede][generacion] || { total: 0 };
      for (var indexStudent in tmpgeneracion.students) {
        var tmpdata = tmpgeneracion.students[indexStudent];
        if (tmpdata.active === true) {
          arrSede[sede][generacion].total++;
        }
      }
    }
  }
  return console.log(arrSede);
}
  
studentGeneration();

// lo que devuelve la funcion
// [ AQP: [ '2016-2': { total: 7 }, '2017-1': { total: 8 } ],
// CDMX: [ '2017-1': { total: 9 }, '2017-2': { total: 21 } ],
// LIM: [ '2016-2': { total: 16 },
//   '2017-1': { total: 12 },
//   '2017-2': { total: 6 } ],
// SCL: [ '2016-2': { total: 3 },
//   '2017-1': { total: 14 },
//   '2017-2': { total: 26 } ] ]

var p = document.getElementById('prueba');
var div = document.getElementById('container-teachers');
div.appendChild(p);


loadPage();


// extrayendo todas las fotos de las alumnas
// for (var props in data) {
//   // console.log(props);
//   for (var generation in data[props]) {
//     var tmpgeneration = data[props][generation];
//     // console.log(generation);
//     for (var indexStudent in tmpgeneration.students) {
//     // console.log(studiante);
//       var tmpData = tmpgeneration.students[indexStudent]['photo'];
//       console.log(tmpData);
//     }
//   }
// }


// Porcentaje de desercion de estudiantes
function studentsDesert() {
  var studentDesert = 0;
  var total = 0;
  for (var props in data) {
    for (var generation in data[props]) {
      var tmpgeneration = data[props][generation];
      for (var indexStudent in tmpgeneration.students) {
        if (tmpgeneration.students[indexStudent]['active'] === true);
        else {
          studentDesert++;
        }
        total++;
      }
    }
  }
  return Math.floor((studentDesert / total) * 100);
}
console.log(studentsDesert());
// el dato que devuelve la funcion 53;

// % de estudiantes satisfechas con laboratoria
function studentSatisfied() {
  var totalCumple = 0; // no es necesario
  var totalSupera = 0;
  var totalNoSupera = 0;
  var totalGeneral = 0;
  var total = 0;
  for (var prop in data) { // obtengo la sede
    for (var generation in data[prop]) { // obtengo la generacion 2016-2
      var tmpGeneration = data[prop][generation]; // obtengo students y rating
      for (var indexRating in tmpGeneration.ratings) { // obtengo rating
        var tmpRatings = tmpGeneration.ratings[indexRating]; // obtengo todos los ratings
        for (var arrStudent in tmpRatings.student) { // obtengo el array student
          var nota = tmpRatings.student[arrStudent]; // obtengo el nro de notas
          if (arrStudent === 'supera') {
            totalSupera += nota; // cantidad de alumnas que superan
          } else if (arrStudent === 'cumple') {
            totalCumple += nota;
          } else if (arrStudent === 'no-cumple') {
            totalNoSupera += nota;
          }
          totalGeneral = (totalSupera + totalCumple + totalNoSupera);
          total = Math.floor(((totalCumple + totalSupera) / totalGeneral) * 100);
        }
      }
    }
  }
  console.log(total);
}
studentSatisfied(); // devuelve 89% 

// funcion para calcular el promedio de los profesores
function promTeacher() {
  var countTeacher = 0;
  var prom = 0;
  var total = 0;
  for (var prop in data) { // obtengo la sede
    for (var generation in data[prop]) { // obtengo la generacion 2016-2
      var tmpGeneration = data[prop][generation]; // obtengo students y rating
      for (var indexRating in tmpGeneration.ratings) { // obtengo rating
        var scoreTeacher = tmpGeneration.ratings[indexRating]['teacher']; // obtengo todos las notas de los profesores
        // console.log(tmpRatings);
        total += scoreTeacher;
        countTeacher++;
        // devuelve 3.9931....
        prom = total / countTeacher;
      }
    }
  }
  // para que cortar a solo 2 decimales 3.99
  console.log(prom.toFixed(2));
}
promTeacher();

// funcion para calcular el promedio de los jedi
function promJedi() {
  // creación de variables numericas
  var countJedi = 0, prom = 0; total = 0;
  // obteniendo la sede: AQP, CDM, LIM, SCH
  for (var sede in data) {
    // obteniendo la generacion: 2016-2, 2017-1
    for (var generation in data[sede]) {
      // creando una variable donde se obtiene los array: students y ratings
      var tmpGeneration = data[sede][generation];
      // obteniendo el ratings
      for (var indexRating in tmpGeneration.ratings) {
        // creando la variable para almacenar las notas de los jedi
        var scoreJedi = tmpGeneration.ratings[indexRating]['jedi'];
        // sumando todas las notas de los jedi
        total += scoreJedi;
        // contando la cantidad de notas de los jedi
        countJedi++;
        // calculando el promedio
        prom = total / countJedi;
      }
    }
  }
  // para que me cuente solo dos decimales
  console.log(prom.toFixed(2));
}
promJedi();

// funcion para calcular el nps

function calcNps() {
  // declaracion de variables
  debugger;
  var count = 0; total = 0; 
  // obteniendo la sede
  for (var sede in data) {
    // obteniendo la generacion
    for (var generation in data[sede]) {
      // ingresando a los array students y rating
      var tmpGeneration = data[sede][generation];
      console.log(tmpGeneration);
    }
  }
}

calcNps();

// function calcNps() {
//   // declaracion de variables
//   var count = 0; total = 0; 
//   // obteniendo la sede
//   for (var sede in data) {
//     // obteniendo la generacion
//     for (var generation in data[sede]) {
//       // ingresando a los array students y rating
//       for (var arr in data[sede][generation]) {
//         // console.log(arr); // obtengo student y rating
//         for (var nro in data[sede][generation][arr]) {
//           for (var arrSprint in data[sede][generation][arr][nro]) {
//             for (var sprint in data[sede][generation][arr][nro]['sprints']) {
//               for (var score in data[sede][generation][arr][nro]['sprints']['1']['score']) {
//                 var scorTech = data[sede][generation][arr][nro]['sprints']['1']['score'];
//                 var test = Object.values(scorTech);
//                 console.log(test);
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }


// Puedes hacer uso de la base de datos a través de la variable `data`
// console.log(data);
