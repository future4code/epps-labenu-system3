import app from "./app";
import addUser from './endpoints/addUser';
import addHobby from './endpoints/addHobby';
import addSpeciality from './endpoints/addSpeciality';
import addClass from './endpoints/addClass';
import getStudentAge from './endpoints/getStudentAge';

app.post("/user/create",addUser)

app.post("/user/create/hobby", addHobby);

app.post("/user/create/speciality", addSpeciality);

app.post("/class/create",addClass);

app.get("/user/:id",getStudentAge)
