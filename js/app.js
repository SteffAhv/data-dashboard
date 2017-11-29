
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

alert('probando rama de funcionalidad');
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

// Puedes hacer uso de la base de datos a través de la variable `data`
// console.log(data);
