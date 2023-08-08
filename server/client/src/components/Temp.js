// import React, { useRef } from 'react';
// import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
// import { Toast } from 'primereact/toast';
// import { Button } from 'primereact/button';
// import 'primeicons/primeicons.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

// function Temp() {

//   const toast = useRef(null);

//     const accept = () => {
//         toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
//     }

//     const reject = () => {
//         toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
//     }

//     const confirm2 = () => {
//         confirmDialog({
//             message: 'Do you want to delete this record?',
//             header: 'Delete Confirmation',
//             icon: 'pi pi-info-circle',
//             acceptClassName: 'p-button-danger',
//             accept,
//             reject
//         });
//     };
//   return (
//     <>
//         <Toast ref={toast} />
//         <ConfirmDialog />
//         <Button onClick={confirm2} icon="pi pi-times" label="Delete"></Button>
//     </>
// );
// }

// export default Temp;

import React from "react";
function Temp() {

    const search = "third";
  const keys = [0, 4, 2, 3, 1];
  const values = ["first", "second", "third", "fourth", "fifth"];
  const buildMap = (keys, values) => {
    const map = new Map();
    for (let i = 0; i < keys.length; i++) {

      map.set(keys[i], values[i]);
    }
    return map;
  };
  console.log(buildMap(keys, values));

  return <div>Map Function</div>;
}

export default Temp;
