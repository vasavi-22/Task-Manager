import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Tasks.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "primeicons/primeicons.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faListCheck,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure({
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

const baseUrl = "http://127.0.0.1:8000/coreapp/tasks/";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    task_name: "",
    description: "",
    assigned_date: "",
    due_date: "",
    priority_level: "",
  });
  // for put method
  const [edit, setEdit] = useState({
    task_name: "",
    description: "",
    assigned_date: "",
    due_date: "",
    priority_level: "",
  });

  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const weeks = [{ name: "this week" }, { name: "last week" }];
  const [alert, setAlert] = useState(false);
  const [record, setRecord] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    axios({
      method: "GET",
      url: baseUrl,
    })
      .then((response) => {
        const data = response.data;
        setTasks(data);
        console.log(data);
      })
      .catch((error) => console.log(error.message));
  };

  function createTask() {
    setVisible(false);
    toast.info("Task Created Successfully!");
    axios({
      method: "POST",
      url: baseUrl,
      data: {
        task_name: task.task_name,
        description: task.description,
        assigned_date: task.assigned_date,
        due_date: task.due_date,
        priority_level: task.priority_level,
      },
    })
      .then((response) => {
        console.log(response);
        getTasks();
      })
      .catch((error) => console.log(error.message));
    setTask({
      task_name: "",
      description: "",
      assigned_date: "",
      due_date: "",
      priority_level: "",
    });
  }

  function handleEdit(id) {
    console.log(id);
    axios.get(`${baseUrl}${id}/`).then((response) => {
      console.log(response.data);
      setEdit(response.data);
    });
    setShow(true);
  }

  function editTask(id) {
    console.log(id);
    setShow(false);
    toast.success("Edited Successfully!");
    axios({
      method: "PUT",
      url: `${baseUrl}${id}/`,
      data: {
        task_name: edit.task_name,
        description: edit.description,
        assigned_date: edit.assigned_date,
        due_date: edit.due_date,
        priority_level: edit.priority_level,
      },
    })
      .then((response) => {
        console.log(response.data);
        getTasks();
      })
      .catch((error) => console.log(error.message));

    setEdit({
      task_name: "",
      description: "",
      assigned_date: "",
      due_date: "",
      priority_level: "",
    });
  }

  function handleDelete(id) {
    console.log(id);
    axios.get(`${baseUrl}${id}/`).then((response) => {
      console.log(response.data);
      setRecord(response.data.id);
    });
    setAlert(true);
  }

  function deleteTask(id) {
    setAlert(false);
    toast.success("Deleted Successfully!");
    axios({
      method: "DELETE",
      url: `${baseUrl}${id}/`,
    }).then((response) => {
      getTasks();
    });
  }
  const forwardPage = (id) => {
    let url = `http://127.0.0.1:8000/coreapp/tasks/${id}/`;
    axios.get(url).then((response) => {
      // setTask(response.data);
      const myObj = {
        task_name: response.data.task_name,
        description: response.data.description,
        assigned_date: response.data.assigned_date,
        due_date: response.data.due_date,
        priority_level: response.data.priority_level,
      };
      navigate("/viewcard", { state: myObj });
    });
    // navigate("/viewcard");
  };

  const searchHandler = (search) => {
    if (search === "") {
      axios.get(`${baseUrl}`).then((response) => setTasks(response.data));
    } else {
      try {
        axios.get(`${baseUrl}${search}/`).then((response) => {
          setTasks(response.data);
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const fetchHandler = (selected, search) => {
    const filter = selected.name;
    console.log(filter);
    console.log(search);
    try {
      if (search === "") {
        axios.get(`${baseUrl}${filter}/`).then((response) => {
          setTasks(response.data);
        });
      } else if (selected === "") {
        axios.get(`${baseUrl}${search}/`).then((response) => {
          setTasks(response.data);
        });
      } else {
        axios.get(`${baseUrl}${filter}/${search}/`).then((response) => {
          setTasks(response.data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // function handleChange(event){
  //   const {name, value}= event.target;
  //   setTask({...task, [name]:value});
  // }

  return (
    <>
      <h1>
        <FontAwesomeIcon icon={faListCheck} />
        &nbsp;Tasks
      </h1>
      <div className="header" style={{ margin: "20px" }}>
        <Button
          label="Add Task"
          style={{ float: "left", marginLeft: "50px" }}
          onClick={() => setVisible(true)}
        />
        <Dialog
          header="New Task Details"
          visible={visible}
          style={{ width: "25vw" }}
          onHide={() => setVisible(false)}
          footer={
            <div>
              <Button
                label="No"
                onClick={() => {
                  setVisible(false);
                  toast.error("Please enter all the details.");
                }}
              />
              <Button label="Yes" onClick={createTask} autoFocus />
            </div>
          }
        >
          <form>
            <div className="form-group">
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Task Name"
                onChange={(e) => (task.task_name = e.target.value)}
              />
              <br />
              <textarea
                className="form-control"
                rows="3"
                placeholder="Description"
                id="des"
                onChange={(e) => (task.description = e.target.value)}
              ></textarea>
              <br />
              <label htmlFor="s_date">Assigned Date</label>
              <input
                type="date"
                className="form-control"
                id="s_date"
                onChange={(e) => (task.assigned_date = e.target.value)}
              />
              <br />
              <label htmlFor="d_date">Due Date</label>
              <input
                type="date"
                className="form-control"
                id="d_date"
                onChange={(e) => (task.due_date = e.target.value)}
              />
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Priority"
                id="level"
                onChange={(e) => (task.priority_level = e.target.value)}
              />
            </div>
          </form>
        </Dialog>

        <span className="p-input-icon-left" style={{ float: "center" }}>
          <Button
            icon="pi pi-search"
            aria-label="Search"
            onClick={() => searchHandler(search)}
          />
          <InputText
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </span>
        <span style={{ float: "right" }}>
          <Button
            icon="pi pi-check"
            aria-label="Filter"
            onClick={() => fetchHandler(selected, search)}
          />
          <Dropdown
            value={selected}
            onChange={(e) => setSelected(e.value)}
            options={weeks}
            optionLabel="name"
            editable
            placeholder="Select a Week"
            className="w-full md:w-14rem"
          />
        </span>
      </div>
      <div className="tasks-content">
        {tasks.map((task) => {
          return (
            <div
              className="card shadow p-3 mb-5 bg-white rounded"
              key={task.id}
              style={{ width: "25rem", height: "13rem" }}
            >
              <div className="card-body">
                <h3 className="card-title">{task.task_name}</h3>
                <h6
                  style={{
                    color:
                      task.priority_level === "high"
                        ? "#d10000"
                        : task.priority_level === "medium"
                        ? "#ffbf00"
                        : "green",
                  }}
                >
                  {task.priority_level}
                </h6>
                <button
                  type="button"
                  className="btn btn-light"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                  }}
                  onClick={() => forwardPage(task.id)}
                >
                  View Details
                </button>
                <br />
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{
                    marginTop: "20px",
                    marginLeft: "30px",
                    float: "right",
                    color: "#d10000",
                  }}
                  // onClick={() => deleteTask(task.id)}
                  onClick={() => handleDelete(task.id)}
                />
                <Dialog
                  header="Delete Confirmation"
                  visible={alert}
                  style={{ width: "20vw" }}
                  onHide={() => setAlert(false)}
                  footer={
                    <div>
                      <Button
                        label="No"
                        icon="pi pi-times"
                        onClick={() => {
                          setAlert(false);
                          toast.error("Task can't be deleted!");
                        }}
                        className="p-button-text"
                      />
                      <Button
                        label="Yes"
                        icon="pi pi-check"
                        onClick={() => deleteTask(record)}
                        autoFocus
                        style={{ backgroundColor: "red", border: "red" }}
                      />
                    </div>
                  }
                >
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  &nbsp;Do you want to delete this record?
                </Dialog>
                <FontAwesomeIcon
                  icon={faPen}
                  style={{ marginTop: "20px", float: "right" }}
                  onClick={() => handleEdit(task.id)}
                />
                <Dialog
                  header="Edit Task Details"
                  visible={show}
                  style={{ width: "25vw" }}
                  onHide={() => setShow(false)}
                  footer={
                    <div>
                      <Button label="No" onClick={() => setShow(false)} />
                      <Button
                        label="Yes"
                        onClick={() => editTask(edit.id)}
                        autoFocus
                      />
                    </div>
                  }
                >
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Task Name"
                        value={edit.task_name}
                        onChange={(e) =>
                          setEdit((prevVal) => ({
                            ...prevVal,
                            task_name: e.target.value,
                          }))
                        }
                      />
                      <br />
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Description"
                        id="des"
                        value={edit.description}
                        onChange={(e) =>
                          setEdit((prevVal) => ({
                            ...prevVal,
                            description: e.target.value,
                          }))
                        }
                      ></textarea>
                      <br />
                      <label htmlFor="s_date">Assigned Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="s_date"
                        value={edit.assigned_date}
                        onChange={(e) =>
                          setEdit((prevVal) => ({
                            ...prevVal,
                            assigned_date: e.target.value,
                          }))
                        }
                      />
                      <br />
                      <label htmlFor="d_date">Due Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="d_date"
                        value={edit.due_date}
                        onChange={(e) =>
                          setEdit((prevVal) => ({
                            ...prevVal,
                            due_date: e.target.value,
                          }))
                        }
                      />
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Priority"
                        id="level"
                        value={edit.priority_level}
                        onChange={(e) =>
                          setEdit((prevVal) => ({
                            ...prevVal,
                            priority_level: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </form>
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Tasks;
