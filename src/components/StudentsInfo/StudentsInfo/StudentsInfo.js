import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { UserContext } from '../../../App';
import AllStudentsData from '../AllStudentsData/AllStudentsData';
import Header from '../Header/Header';
import './StudentsInfo.css';
const deptData = [
    {
        department: "CSE"
    },
    {
        department: "BBA"
    },
    {
        department: "ECE"
    }

];
const StudentsInfo = () => {
    const { register, handleSubmit, errors } = useForm();
    const [students, setStudents] = useState([]);


    const [rollNF, setRollNF] = useState(false);
    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    document.title = "List of Student";
    localStorage.setItem('dept', JSON.stringify(deptData));

    const onSubmit = data => {
        setStudents([]);
        console.log(data);
        fetch('http://localhost:4200/studentsByRoll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roll: data.Roll })
        })
            .then(response => response.json())
            .then(roll => {
                if (roll.length === 0) {
                    setRollNF(true);
                }
                if (roll.length > 0) {
                    setRollNF(false);
                }
                setStudents(roll);
                console.log(roll)
            })
            .catch(error => {
                console.error(error)
            })

    }


    function MyComponent() {
        useEffect(() => {
            setStudents(JSON.parse(localStorage.getItem("student")) || {});
        }, [])
    }

    function MyComponent2() {
        useEffect(() => {
            fetch('http://localhost:4200/students')
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        localStorage.setItem('student', JSON.stringify(data));

                    }
                    console.log(data)
                    setStudents(data);
                })
        }, [])
    }

    if (localStorage.getItem("student")) {
        MyComponent();
    }
    else {
        MyComponent2()
    }


    return (
        

            <div>
                <Header></Header>
                <div className="d-flex ">
                    <div style={{ backgroundColor: '#FFFFE0' }} className="col-md-12 pt-4 min-vh-100 ">
                        <div className="col-md-12">
                            <div className="pr-5  container">
                                <h2 className="text-center"><u>List of Student</u></h2>
                                <br />
                                <form style={{ width: '400px', position: 'absolute' }} className=" d-flex" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <input type="text" ref={register({ required: true })} name="Roll" placeholder="Enter Roll Here..." className="form-control" />
                                        {errors.name && <span className="text-danger">This field is required</span>}
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" style={{ width: '150px' }} className="btn ml-2 mr-3 btn-secondary ">Search Student</button>
                                    </div>
                                </form>
                            </div>
                            <br />
                            <br />
                            <div className="container">
                                {rollNF === true ? <h1 style={{ color: '#656D74' }} className="text-center mt-5 pt-5">Data Not Found</h1> : <AllStudentsData key={students._id} students={students}></AllStudentsData>}

                            </div>
                        </div>
                    </div>
                </div>

            </div>
      
        
    );
};

export default StudentsInfo;