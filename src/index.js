import {getUsers, deleteUser} from './api/userApi';
import './styles/main.scss';

//import numeral from 'numeral';


//const courseValue = numeral(1000).format('$0,0.00');
//debugger;
//console.log(`I would pay ${courseValue} for this awesome course!`); //eslint-disable-line no-console


getUsers().then(r => {
  let usersBody = "";


  r.forEach(user => {
    //console.log(`UserName: ${user.firstName}`);  //eslint-disable-line no-console

    usersBody += `<tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      </tr>`
  });

  global.window.document.getElementById('users').innerHTML = usersBody;

  const deleteLinks = global.document.getElementsByClassName('deleteUser');

  Array.from(deleteLinks, link =>{
    link.onclick = function(event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    }
  });
});


