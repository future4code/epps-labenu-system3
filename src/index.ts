import app from "./app";
import addUser from "./endpoints/addUser";
import addHobby from "./endpoints/addHobby";
import addSpeciality from "./endpoints/addSpeciality";
import addClass from "./endpoints/addClass";
import getStudentAge from "./endpoints/getStudentAge";
import getClassStudents from "./endpoints/getClassStudents";
import getClassTeachers from './endpoints/getClassTeachers';
import addClasstoUser from './endpoints/addClasstoUser';
import addFakeUsers from './endpoints/addFakeUsers';

app.post("/user/create", addUser);

app.post("/user/create/hobby", addHobby);

app.post("/user/create/speciality", addSpeciality);

app.post("/class/create", addClass);

app.get("/student/:id", getStudentAge);
app.post("/user/class/add",addClasstoUser)
app.get("/student", getClassStudents);
app.get("/teacher", getClassTeachers);

app.post("/fake",addFakeUsers)
