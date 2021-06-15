import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import UpdateStudent from '../UpdateStudent/UpdateStudent';

const StudentProfile = () => {
    const { roll, department } = useParams();

    let history = useHistory();
    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setIsOpen] = useState(false);
    document.title = 'Details';
    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }
    useEffect(() => {
        fetch(`https://agile-hamlet-70271.herokuapp.com/students/${department}/${roll}`)
            .then(res => res.json())
            .then(data => {
                window.scrollTo(0, 0);
                setStudent(data);
                setLoading(false);
            })
    }, [roll, department])
    const handleDelete = (id) => {
        fetch(`https://agile-hamlet-70271.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                localStorage.removeItem("student");
                if (result) {
                    history.goBack()
                }

            })
    }


    return (
        <>

            <div>
                <Header></Header>
                <div className="d-flex">
                    <div style={{ backgroundColor: '#FFFFE0' }} className="col-md-12 pt-4 vh-100">
                        <div className="col-md-12">
                            <h2 className="text-center"><u>Student's Information</u></h2>
                            <div className="mt-4">
                                <div className=" pt-2 ">
                                    <table class="table table-bordered container col-6">

                                        <tbody>
                                            <tr>
                                                <th scope="col"><h2 className="text-center">Name:</h2></th>
                                                <td scope="col"><h2 className="text-center">{student.name}</h2></td>
                                            </tr>
                                            <tr>
                                                <th scope="col"><h2 className="text-center">Roll:</h2></th>
                                                <td scope="col"><h2 className="text-center">{student.roll}</h2></td>
                                            </tr>
                                            <tr>
                                                <th scope="col"><h2 className="text-center">Department:</h2></th>
                                                <td scope="col"><h2 className="text-center">{student.department}</h2></td>
                                            </tr>
                                            <tr>
                                                <th scope="col"><h2 className="text-center">Session:</h2></th>
                                                <td scope="col"><h2 className="text-center">{student.session}</h2></td>
                                            </tr>
                                            <tr>
                                                <th scope="col"><h2 className="text-center">Email:</h2></th>
                                                <td scope="col"><h2 className="text-center">{student.email}</h2></td>
                                            </tr>
                                            <tr>
                                                <th scope="col"><h2 className="text-center">Contact No:</h2></th>
                                                <td scope="col"><h2 className="text-center">{student.mobile}</h2></td>
                                            </tr>
                                        </tbody>

                                    </table>
                                    <div className="row mt-4 justify-content-center">
                                        <button onClick={openModal} className="m-3 btn btn-dark  btn-sm text-white">Update Information</button>
                                        <UpdateStudent modalIsOpen={modalIsOpen} student={student} closeModal={closeModal}></UpdateStudent>
                                        <button onClick={() => { handleDelete(student._id) }} className="m-3 btn btn-warning btn-sm">Delete Student</button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default StudentProfile;