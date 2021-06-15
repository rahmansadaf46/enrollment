import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../Header/Header';

const EnrollStudent = () => {
    const { register, handleSubmit, errors } = useForm();
    const [currentDepartment, setCurrentDepartment] = useState('CSE');
    const [loading, setLoading] = useState(false);
    const [dept, setDept] = useState([]);
    document.title = "Enroll A Student";

    const changeDepartment = (newDepartment) => {
        setCurrentDepartment(newDepartment)
    }

    const onSubmit = data => {
        if (data) {
            setLoading(true);
        }
        data.department = currentDepartment;

        fetch('https://agile-hamlet-70271.herokuapp.com/addStudent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setLoading(false);
                    localStorage.removeItem("student");
                    window.location.reload();
                }
            })

            .catch(error => {
                console.error(error)
            })

    }

    useEffect(() => {
        setDept(JSON.parse(localStorage.getItem("dept")) || {});
    }, [])


    return (
        <>

            <div>
                <Header></Header>
                <div className="d-flex">
                    <div style={{ backgroundColor: '#FFFFE0', height: '94vh' }} className="col-md-12 pt-4">
                        <div className="col-md-12 row">
                            <div className="col-md-12">
                                <h2 className="text-center"><u>Enroll a Student</u></h2>
                                <form className="p-3 container col-6" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <label for=""><b>Enter Name</b></label>
                                        <input type="text" ref={register({ required: true })} name="name" placeholder="Student's Name" className="form-control" />
                                        {errors.name && <span className="text-danger">This field is required</span>}
                                    </div>
                                    <div className="form-group row mb-1">
                                        <div className="form-group col-6">
                                            <label for=""><b>Enter Roll</b></label>
                                            <input type="number" ref={register({ required: true })} name="roll" placeholder="Student's Roll" className="form-control" />
                                            {errors.roll && <span className="text-danger">This field is required</span>}
                                        </div>
                                        <div className="form-group col-6">
                                            <label for=""><b>Enter Session</b></label>
                                            <input type="text" ref={register({ required: true })} name="session" placeholder="Session Year" className="form-control" />
                                            {errors.session && <span className="text-danger">This field is required</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <label for=""><b>Enter Email</b></label>
                                            <input type="text" ref={register({ required: true })} name="email" placeholder="Email Id" className="form-control" />
                                            {errors.email && <span className="text-danger">This field is required</span>}
                                        </div>

                                    </div>
                                    <div className="form-group row">
                                        <div className="form-group col-md-6">
                                            <label for=""><b>Enter Mobile No.</b></label>
                                            <input type="number" ref={register({ required: true })} name="mobile" placeholder="Mobile No." className="form-control" />
                                            {errors.mobile && <span className="text-danger">This field is required</span>}
                                        </div>
                                        <div className="col-md-6">
                                            <label for=""><b>Department</b></label>

                                            <select
                                                onChange={(event) => changeDepartment(event.target.value)}
                                                value={currentDepartment} className="form-control">
                                                <option disabled={true} value="Not set">Select Department</option>
                                                {
                                                    dept.length === 0 && <option>CSE</option>
                                                }
                                                {
                                                    dept.map(department => <option value={department.department}>{department.department}</option>)
                                                }

                                            </select>
                                            {errors.age && <span className="text-danger">This field is required</span>}

                                        </div>
                                        <div className="form-group col-md-12 mt-4 pt-1 d-flex justify-content-center">
                                            <button type="submit" style={{ padding: '10px 90px' }} className="btn text-white btn-success">Submit</button>
                                        </div>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};

export default EnrollStudent;