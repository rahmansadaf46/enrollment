import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const UpdateStudent = ({ modalIsOpen, closeModal, student }) => {
    const { register, handleSubmit, errors } = useForm();
    let history = useHistory();

    const [dept, setDept] = useState([]);
    useEffect(() => {
        setDept(JSON.parse(localStorage.getItem("dept")) || {});
    }, [])



    const onSubmit = data => {
        fetch(`http://localhost:4200/update/${student._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    closeModal();
                    localStorage.removeItem("student");
                    history.goBack()
                }
            })

    }
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="d-flex justify-content-end">



            </div>

            <h4 className="text-center text-brand"><u>Update Student's Information</u> </h4>
            <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="form-group col-6">
                        <label for="">Student's Name:</label>
                        <input type="text" ref={register({ required: true })} defaultValue={student.name} name="name" placeholder="Enter Name" className="form-control" />
                        {errors.name && <span className="text-danger">This field is required</span>}

                    </div>
                    <div className="col-6">
                        <label for="">Student's Roll:</label>
                        <input ref={register({ required: true })} className="form-control" name="roll" defaultValue={student.roll} placeholder="roll" type="number" />
                        {errors.weight && <span className="text-danger">This field is required</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-6">
                        <label for="">Student's Contact no:</label>
                        <input type="number" ref={register({ required: true })} name="mobile" defaultValue={student.mobile} placeholder="Phone Number" className="form-control" />
                        {errors.phone && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group col-6">
                        <label for="">Student's Email:</label>
                        <input type="text" ref={register({ required: true })} name="email" defaultValue={student.email} placeholder="Email" className="form-control" />
                        {errors.email && <span className="text-danger">This field is required</span>}
                    </div>
                </div>
                <div className="form-group row">

                    <div className="col-6">
                        <label for="">Student's Session:</label>
                        <input ref={register({ required: true })} className="form-control" name="session" defaultValue={student.session} placeholder="Enter session" type="text" />
                        {errors.age && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="col-6">
                        <label for="">Student's Department:</label>
                        <select className="form-control" defaultValue={student.department} name="department" ref={register({ required: true })} >
                            <option disabled={true} value="Not set">Select Department</option>
                            {
                                dept.length === 0 && <option defaultValue={student.department}>{student.department}</option>
                            }
                            {
                                dept.map(department => <option defaultValue={department.department}>{department.department}</option>)
                            }

                        </select>
                        {errors.gender && <span className="text-danger">This field is required</span>}

                    </div>

                </div>

                <div className="form-group text-center">
                    <button type="submit" style={{ background: "#21B573" }} className="btn mt-4 text-white">Update Information</button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateStudent;



